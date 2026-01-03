import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Vote } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { createClient } from '../utils/supabase/client';
import { toast } from 'sonner';
import { useVoiceAccessibility } from '../utils/VoiceAccessibilityContext';

export default function ValidatingVotePage() {
  const navigate = useNavigate();
  const { isVoiceMode, speak } = useVoiceAccessibility();
  const selectedCandidateID = sessionStorage.getItem('selectedCandidateID');
  const voterID = sessionStorage.getItem('voterID');
  const hasSpoken = useRef(false);

  useEffect(() => {
    // Announce to voice users (only once)
    if (isVoiceMode && !hasSpoken.current) {
      speak('Processing your vote. Please wait while we validate and save your choice.');
      hasSpoken.current = true;
    }
    
    processVote();
  }, []); // Empty dependency array - only run once

  const processVote = async () => {
    try {
      if (!voterID || !selectedCandidateID) {
        toast.error('Missing voter or candidate information');
        navigate('/dashboard');
        return;
      }

      const supabase = createClient();

      console.log('🔍 ValidatingVote: Checking voter status...', { voterID });

      // Check if voter has already voted (globally)
      const { data: voterData, error: voterError } = await supabase
        .from('voters')
        .select('has_voted')
        .eq('id', voterID)
        .single();

      if (voterError) {
        console.error('❌ Error checking voter:', voterError);
        toast.error('Failed to verify voter status');
        navigate('/dashboard');
        return;
      }

      if (voterData.has_voted) {
        console.warn('⚠️ Voter has already cast their vote!');
        toast.error('You have already cast your vote. Only one vote is allowed per Aadhaar.');
        navigate('/dashboard');
        return;
      }

      // Get election ID from session storage (set by BallotPage)
      const electionID = sessionStorage.getItem('currentElectionID');
      
      if (!electionID) {
        toast.error('No active election found');
        navigate('/dashboard');
        return;
      }

      console.log('✅ Voter eligible to vote, proceeding...');

      // Insert vote record
      const { error: voteError } = await supabase
        .from('votes')
        .insert({
          voter_id: voterID,
          election_id: electionID,
          candidate_id: selectedCandidateID,
          timestamp: new Date().toISOString()
        });

      if (voteError) {
        console.error('❌ Error casting vote:', voteError);
        toast.error('Failed to cast vote. Please try again.');
        navigate('/ballot');
        return;
      }

      // Generate receipt
      const receiptID = `RECEIPT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      const confirmationHash = `HASH-${Math.random().toString(36).substr(2, 16).toUpperCase()}`;
      
      const voteReceipt = {
        receiptID,
        confirmationHash,
        timestamp: new Date().toLocaleString('en-IN'),
        electionID
      };

      // UPDATE: Mark voter as has_voted = true in database
      const { error: updateError } = await supabase
        .from('voters')
        .update({
          has_voted: true,
          receipt_id: receiptID
        })
        .eq('id', voterID);

      if (updateError) {
        console.error('❌ Error updating voter status:', updateError);
        toast.error('Vote recorded but failed to update voter status');
        // Still continue - vote was cast successfully
      } else {
        console.log('✅ Voter status updated: has_voted = true');
      }

      // Save receipt to session storage
      sessionStorage.setItem('voteReceipt', JSON.stringify(voteReceipt));
      
      console.log('✅ Vote cast successfully!');
      toast.success('Vote cast successfully!');
      
      // Wait a moment then navigate
      setTimeout(() => {
        navigate('/confirmation');
      }, 2000);

    } catch (err) {
      console.error('Vote processing error:', err);
      toast.error('An error occurred while processing your vote');
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header showNav={false} />
      
      <main className="flex-1 py-12 bg-gray-50 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#002B5B] flex items-center gap-2">
                  <Vote className="size-5" />
                  Validating Your Vote
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="size-16 text-[#002B5B] animate-spin" />
                    <div className="text-center">
                      <p className="text-[#002B5B] mb-2">
                        Processing Your Vote
                      </p>
                      <p className="text-sm text-gray-600">
                        Please wait while we save and validate your choice...
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <ul className="text-xs text-blue-900 space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="size-2 bg-blue-600 rounded-full animate-pulse"></div>
                        Validating your selection
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="size-2 bg-blue-600 rounded-full animate-pulse"></div>
                        Saving vote to database
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="size-2 bg-blue-600 rounded-full animate-pulse"></div>
                        Marking voter status as voted
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="size-2 bg-blue-600 rounded-full animate-pulse"></div>
                        Generating vote receipt
                      </li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-xs text-amber-900 text-center">
                      Do not close this window or navigate away
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}