import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Vote, CheckCircle } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { createClient } from '../utils/supabase/client';
import { toast } from 'sonner';
import VoiceVotingInterface from './VoiceVotingInterface';
import { useLanguage } from '../utils/i18n/LanguageContext';
import { useVoiceGuide } from '../hooks/useVoiceGuide';
import { useVoiceAccessibility } from '../utils/VoiceAccessibilityContext';

interface Candidate {
  id: string;
  name: string;
  party: string;
  symbol: string;
  description: string;
}

interface Election {
  id: string;
  name: string;
  constituency: string;
}

export default function BallotPage() {
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState<string>('');
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [election, setElection] = useState<Election | null>(null);
  const [loading, setLoading] = useState(true);
  const voterID = sessionStorage.getItem('voterID');
  const { language } = useLanguage();
  const { isVoiceMode } = useVoiceAccessibility();
  const hasAnnounced = useRef(false); // Track if we've already announced

  // Generate voice guidance message for candidates
  const generateCandidatesMessage = () => {
    if (candidates.length === 0) return 'No candidates available.';
    
    const candidateList = candidates.map((c, idx) => 
      `Candidate ${idx + 1}: ${c.name}, from ${c.party}.`
    ).join(' ');
    
    return `There are ${candidates.length} candidates. ${candidateList} Say the candidate number or name to select, for example, "Candidate 1" or "Select ${candidates[0]?.name}".`;
  };

  const voiceGuide = useVoiceGuide({
    page: 'ballot',
    welcomeMessage: '', // Empty - we'll handle manually in useEffect
    commands: {
      ...candidates.reduce((acc, candidate, idx) => {
        // Add commands for candidate numbers
        acc[`candidate ${idx + 1}`] = () => {
          setSelectedCandidate(candidate.id);
          voiceGuide.speak(`You have selected candidate ${idx + 1}, ${candidate.name} from ${candidate.party}. Say "Confirm" to cast your vote, or say "Change" to select a different candidate.`, () => {
            voiceGuide.startListening(); // Restart listening after speaking
          });
        };
        
        // Add commands for candidate names
        const nameParts = candidate.name.toLowerCase().split(' ');
        nameParts.forEach(part => {
          if (part.length > 3) { // Only match meaningful name parts
            acc[part] = () => {
              setSelectedCandidate(candidate.id);
              voiceGuide.speak(`You have selected ${candidate.name} from ${candidate.party}. Say "Confirm" to cast your vote, or say "Change" to select a different candidate.`, () => {
                voiceGuide.startListening(); // Restart listening after speaking
              });
            };
          }
        });
        
        return acc;
      }, {} as Record<string, () => void>),
      'confirm': () => {
        if (!selectedCandidate) {
          voiceGuide.speak('No candidate selected. Please select a candidate first.', () => {
            voiceGuide.startListening(); // Restart listening after speaking
          });
          return;
        }
        handleVoiceVote();
      },
      'change': () => {
        setSelectedCandidate('');
        voiceGuide.speak('Selection cleared. ' + generateCandidatesMessage(), () => {
          voiceGuide.startListening(); // Restart listening after speaking
        });
      },
      'list candidates': () => {
        voiceGuide.speak(generateCandidatesMessage(), () => {
          voiceGuide.startListening(); // Restart listening after speaking
        });
      },
    },
    autoStart: false, // Disabled - we control it manually
  });

  // Announce when candidates are loaded
  useEffect(() => {
    if (!loading && election && candidates.length > 0 && isVoiceMode && !hasAnnounced.current) {
      const message = `You are on the ballot page for ${election.name}, ${election.constituency}. ${generateCandidatesMessage()}`;
      voiceGuide.speak(message, () => {
        voiceGuide.startListening(); // Start listening after announcement
      });
      hasAnnounced.current = true; // Prevent re-announcing
    }
  }, [loading, election, candidates, isVoiceMode]); // Removed voiceGuide from dependencies

  const handleVoiceVote = () => {
    const candidate = candidates.find(c => c.id === selectedCandidate);
    if (!candidate) return;

    voiceGuide.confirmAction(
      `You are about to cast your vote for ${candidate.name} from ${candidate.party}. This action cannot be undone.`,
      () => {
        voiceGuide.speak('Submitting your vote. Please wait.', () => {
          handleCastVote();
        });
      },
      () => {
        voiceGuide.speak('Vote cancelled. You can select a different candidate.');
      }
    );
  };

  useEffect(() => {
    loadElectionAndCandidates();
  }, []);

  const checkIfVotedInElection = async (electionId: string) => {
    if (!voterID) return false;

    try {
      const supabase = createClient();
      
      console.log('🔍 BallotPage: Checking global voting status...', { voterID });
      
      // Check global has_voted flag in voters table
      const { data: voterData, error: voterError } = await supabase
        .from('voters')
        .select('has_voted')
        .eq('id', voterID)
        .single();

      console.log('📊 BallotPage voter check result:', { voterData, voterError });

      if (voterData && voterData.has_voted) {
        console.warn('⚠️ Voter has already cast their vote, redirecting...');
        toast.error('You have already cast your vote. Only one vote is allowed per Aadhaar.');
        navigate('/dashboard');
        return true;
      }
      
      return false;
    } catch (err) {
      console.error('❌ Error checking voter status:', err);
      return false;
    }
  };

  const loadElectionAndCandidates = async () => {
    try {
      const supabase = createClient();
      
      // Get the election ID from sessionStorage (set by dashboard)
      const electionId = sessionStorage.getItem('currentElectionID');
      
      console.log('🔍 BallotPage: Loading election from sessionStorage:', electionId);
      
      if (!electionId) {
        console.warn('⚠️ No election ID in sessionStorage, searching for active election...');
        // Fallback: Find an active election
        const { data: electionsData, error: electionsError } = await supabase
          .from('elections')
          .select('id, name, constituency')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(1);

        console.log('📊 Elections query result:', { electionsData, electionsError });

        if (electionsError || !electionsData || electionsData.length === 0) {
          console.error('❌ No active election found');
          toast.error('No active elections available');
          setLoading(false);
          return;
        }

        const activeElection = electionsData[0];
        console.log('✅ Found active election (fallback):', activeElection);
        setElection(activeElection);
        sessionStorage.setItem('currentElectionID', activeElection.id);
        
        // Check if already voted in this election
        const hasVoted = await checkIfVotedInElection(activeElection.id);
        if (hasVoted) return;
        
        await loadCandidatesForElection(activeElection.id);
      } else {
        // Load the specific election
        const { data: electionData, error: electionError } = await supabase
          .from('elections')
          .select('id, name, constituency')
          .eq('id', electionId)
          .single();

        console.log('📊 Election query result:', { electionData, electionError });

        if (electionError || !electionData) {
          console.error('❌ Error loading election:', electionError);
          toast.error('Failed to load election');
          setLoading(false);
          return;
        }

        console.log('✅ Loaded election:', electionData);
        setElection(electionData);
        
        // Check if already voted in this election
        const hasVoted = await checkIfVotedInElection(electionId);
        if (hasVoted) return;
        
        await loadCandidatesForElection(electionId);
      }
    } catch (err) {
      console.error('❌ Error:', err);
      toast.error('Failed to load ballot');
      setLoading(false);
    }
  };

  const loadCandidatesForElection = async (electionId: string) => {
    try {
      const supabase = createClient();
      
      console.log('🔍 Loading candidates for election:', electionId);
      
      const { data: candidatesData, error: candidatesError } = await supabase
        .from('candidates')
        .select('*')
        .eq('election_id', electionId);

      console.log('📊 Candidates query result:', { candidatesData, candidatesError });

      if (candidatesError) {
        console.error('❌ Error loading candidates:', candidatesError);
        toast.error('Failed to load candidates');
      } else if (candidatesData) {
        if (candidatesData.length === 0) {
          console.warn('⚠️ No candidates found for election:', electionId);
          toast.error('No candidates registered for this election');
        } else {
          console.log('✅ Found candidates:', candidatesData.length);
        }
        setCandidates(candidatesData);
      }
    } catch (err) {
      console.error('❌ Error loading candidates:', err);
      toast.error('Failed to load candidates');
    } finally {
      setLoading(false);
    }
  };

  const handleCastVote = () => {
    if (!selectedCandidate) {
      toast.error('Please select a candidate');
      return;
    }

    if (!election) {
      toast.error('No active election found');
      return;
    }

    // Store selected candidate and navigate to validation
    sessionStorage.setItem('selectedCandidateID', selectedCandidate);
    navigate('/validating-vote');
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header showNav={false} />
        <main className="flex-1 py-12 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin size-12 border-4 border-[#002B5B] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-[#002B5B]">Loading ballot...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!election || candidates.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header showNav={false} />
        <main className="flex-1 py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card className="border-2 border-amber-500">
                <CardContent className="py-12 text-center">
                  <p className="text-[#002B5B] mb-2">No Active Elections</p>
                  <p className="text-sm text-gray-600 mb-4">
                    {!election ? 'There are currently no active elections.' : 'No candidates have been registered yet.'}
                  </p>
                  <Button onClick={() => navigate('/dashboard')} variant="outline">
                    Back to Dashboard
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header showNav={false} />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Election Info */}
            <Card className="mb-6 border-2 border-[#002B5B]">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h1 className="text-[#002B5B] mb-2">{election.name}</h1>
                  <p className="text-gray-600">{election.constituency}</p>
                  <Badge className="bg-green-500 mt-2">Active Election</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Voice Voting Interface */}
            <VoiceVotingInterface
              candidates={candidates}
              selectedCandidate={selectedCandidate}
              onSelectCandidate={setSelectedCandidate}
              electionName={election.name}
            />

            <Card>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <h2 className="text-[#002B5B] mb-2">Electronic Ballot</h2>
                  <p className="text-sm text-gray-600">Select your preferred candidate below</p>
                </div>

                <RadioGroup value={selectedCandidate} onValueChange={setSelectedCandidate}>
                  <div className="space-y-3">
                    {candidates.map((candidate) => (
                      <div
                        key={candidate.id}
                        className={`border-2 rounded-lg p-4 transition-all cursor-pointer ${
                          selectedCandidate === candidate.id
                            ? 'border-[#FF9933] bg-orange-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedCandidate(candidate.id)}
                      >
                        <div className="flex items-center">
                          <RadioGroupItem value={candidate.id} id={candidate.id} className="mr-3" />
                          <Label htmlFor={candidate.id} className="flex items-center gap-4 flex-1 cursor-pointer">
                            <div className="size-12 bg-blue-50 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                              {candidate.symbol}
                            </div>
                            <div className="flex-1">
                              <p className="text-[#002B5B] mb-1">{candidate.name}</p>
                              <p className="text-sm text-gray-600">{candidate.party}</p>
                              <p className="text-xs text-gray-500 mt-1">{candidate.description}</p>
                            </div>
                            {selectedCandidate === candidate.id && (
                              <CheckCircle className="size-6 text-[#FF9933] flex-shrink-0" />
                            )}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                <div className="mt-6 space-y-3">
                  <Button
                    onClick={handleCastVote}
                    className="w-full bg-[#FF9933] hover:bg-[#E68A2E]"
                    disabled={!selectedCandidate}
                  >
                    <Vote className="size-4 mr-2" />
                    Cast Vote
                  </Button>
                  <Button
                    onClick={() => navigate('/dashboard')}
                    variant="outline"
                    className="w-full"
                  >
                    Cancel
                  </Button>
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