import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Vote, CheckCircle, Clock, AlertCircle, BarChart, Shield, Receipt, FileText } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { createClient } from '../utils/supabase/client';
import { toast } from 'sonner';
import { useVoiceGuide } from '../hooks/useVoiceGuide';
import { useVoiceAccessibility } from '../utils/VoiceAccessibilityContext';
import { useLanguage } from '../utils/i18n/LanguageContext';

interface Election {
  id: string;
  name: string;
  constituency: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { isVoiceMode } = useVoiceAccessibility();
  const { t } = useLanguage();
  const hasAnnounced = useRef(false); // Track if we've already announced
  
  // Get session data
  const sessionData = JSON.parse(sessionStorage.getItem('sessionData') || '{}');
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
  const voterID = sessionStorage.getItem('voterID');
  
  const [hasVoted, setHasVoted] = useState(false);
  const [voteReceipt, setVoteReceipt] = useState<string | null>(null);
  const [elections, setElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dynamic welcome message based on current state
  const getWelcomeMessage = () => {
    if (hasVoted) {
      return 'You have already cast your vote. Say "View Results" to see election results, or "View Receipt" to see your vote receipt.';
    } else if (elections.length > 0) {
      return `Welcome to your voter dashboard. There is an active election: ${elections[0]?.name}. Say "Vote" to cast your vote, or "View Results" to see current results.`;
    } else {
      return 'Welcome to your voter dashboard. There are currently no active elections.';
    }
  };

  const voiceGuide = useVoiceGuide({
    page: 'dashboard',
    welcomeMessage: '', // We'll handle the welcome message manually in useEffect
    commands: {
      'vote': () => {
        if (hasVoted) {
          voiceGuide.speak('You have already cast your vote. Only one vote is allowed.', () => {
            voiceGuide.startListening(); // Restart listening after speaking
          });
        } else if (elections.length > 0) {
          voiceGuide.speak('Navigating to ballot page.', () => {
            handleStartVoting(elections[0]);
          });
        } else {
          voiceGuide.speak('There are no active elections at this time.', () => {
            voiceGuide.startListening(); // Restart listening after speaking
          });
        }
      },
      'view results': () => {
        voiceGuide.speak('Navigating to election results.', () => {
          navigate('/results');
        });
      },
      'results': () => {
        voiceGuide.speak('Navigating to election results.', () => {
          navigate('/results');
        });
      },
      'view receipt': () => {
        if (hasVoted) {
          voiceGuide.speak('Navigating to your vote receipt.', () => {
            navigate('/receipt-history');
          });
        } else {
          voiceGuide.speak('You have not voted yet. Please cast your vote first.', () => {
            voiceGuide.startListening(); // Restart listening after speaking
          });
        }
      },
    },
    autoStart: false, // Disable autoStart - we'll manually control it
  });

  const handleStartVoting = (election: Election) => {
    sessionStorage.setItem('currentElectionID', election.id);
    navigate('/ballot-loading');
  };

  useEffect(() => {
    if (voterID) {
      loadActiveElections();
    } else {
      setLoading(false);
    }
  }, [voterID]);

  const loadActiveElections = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('🔍 Dashboard: Loading data...', { voterID });
      
      const supabase = createClient();

      // Load voter data first to check global has_voted status
      const { data: voterData, error: voterError } = await supabase
        .from('voters')
        .select('has_voted, receipt_id')
        .eq('id', voterID)
        .single();

      console.log('📊 Dashboard: Voter data:', voterData);

      if (voterError) {
        console.error('❌ Error loading voter data:', voterError);
        setError('Failed to load voter information');
        setLoading(false);
        return;
      }

      // Store global voting status
      setHasVoted(voterData?.has_voted || false);
      setVoteReceipt(voterData?.receipt_id || null);

      // Load all active elections
      const { data: electionsData, error: electionsError } = await supabase
        .from('elections')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      console.log('📊 Dashboard: Elections data:', electionsData);

      if (electionsError) {
        console.error('❌ Error loading elections:', electionsError);
        setError('Failed to load elections');
        setLoading(false);
        return;
      }

      if (!electionsData || electionsData.length === 0) {
        console.log('⚠️ No active elections found');
        setElections([]);
        setLoading(false);
        return;
      }

      console.log('✅ Dashboard: Successfully loaded data');
      setElections(electionsData);
    } catch (err) {
      console.error('❌ Dashboard: Error loading elections:', err);
      toast.error('Failed to load elections');
    } finally {
      setLoading(false);
    }
  };

  const checkVotedInElection = async (electionId: string): Promise<boolean> => {
    if (!voterID) {
      console.log('⚠️ No voter ID, returning false');
      return false;
    }
    
    try {
      const supabase = createClient();
      
      console.log('🔍 Checking if voted in election:', { voterID, electionId });
      
      const { data, error } = await supabase
        .from('votes')
        .select('id')
        .eq('voter_id', voterID)
        .eq('election_id', electionId);

      console.log('📊 Vote check result:', { data, error, hasVoted: !!data && data.length > 0 });

      if (error) {
        console.error('❌ Error checking vote status:', error);
        return false; // On error, allow voting (fail open)
      }

      return data && data.length > 0;
    } catch (err) {
      console.error('❌ Exception checking vote status:', err);
      return false;
    }
  };

  const handleProceedToVote = async (electionId: string) => {
    console.log('🗳️ handleProceedToVote called for election:', electionId);
    
    if (!voterID) {
      toast.error('Voter ID not found. Please login again.');
      navigate('/login');
      return;
    }

    // Check if already voted in THIS specific election
    console.log('🔍 Checking if already voted...');
    const hasVotedInThisElection = await checkVotedInElection(electionId);
    
    console.log('📊 Vote check complete:', { hasVotedInThisElection });
    
    if (hasVotedInThisElection) {
      console.warn('⚠️ Already voted in this election');
      toast.error('You have already voted in this election!');
      return;
    }

    // Store the election ID they want to vote in
    console.log(' Proceeding to vote, storing election ID:', electionId);
    sessionStorage.setItem('currentElectionID', electionId);
    
    console.log('🚀 Navigating to ballot-loading...');
    navigate('/ballot-loading');
  };

  // Reload elections when page becomes visible (e.g., after voting)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && voterID) {
        console.log('🔄 Dashboard: Page visible, reloading elections...');
        loadActiveElections();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [voterID]);

  // Announce when elections and voting status are loaded
  useEffect(() => {
    if (!loading && isVoiceMode && !hasAnnounced.current) {
      if (hasVoted) {
        voiceGuide.speak('You have already cast your vote. Say "View Results" to see election results, or "View Receipt" to see your vote receipt.', () => {
          voiceGuide.startListening();
        });
      } else if (elections.length > 0) {
        voiceGuide.speak(`Welcome to your voter dashboard. There is an active election: ${elections[0]?.name}. Say "Vote" to cast your vote, or "View Results" to see current results.`, () => {
          voiceGuide.startListening();
        });
      } else {
        voiceGuide.speak('Welcome to your voter dashboard. There are currently no active elections.', () => {
          voiceGuide.startListening();
        });
      }
      hasAnnounced.current = true; // Set to true to prevent re-announcing
    }
  }, [loading, hasVoted, elections, isVoiceMode]); // Removed voiceGuide from dependencies

  // Also reload when navigating back to this page
  useEffect(() => {
    const currentRef = window.location.href;
    const handlePopState = () => {
      if (window.location.href === currentRef) {
        console.log('🔄 Dashboard: Navigated back, reloading elections...');
        loadActiveElections();
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [voterID]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header showNav={false} />
        <main className="flex-1 py-12 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin size-12 border-4 border-[#002B5B] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-[#002B5B]">{t.loading}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header showNav={false} />
      
      <main className="flex-1 py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-[#002B5B] mb-2">{t.voterDashboard}</h1>
            <p className="text-gray-600">{t.welcomeMessage}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Voting Card */}
            <div className="lg:col-span-2 space-y-6">
              {/* Session Status Card */}
              <Card className="border-2 border-[#002B5B]">
                <CardHeader>
                  <CardTitle className="text-[#002B5B] flex items-center gap-2">
                    <Shield className="size-5" />
                    {t.sessionStatus}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{t.status}:</span>
                      <Badge className={isAuthenticated ? 'bg-green-500' : 'bg-red-500'}>
                        {isAuthenticated ? t.active : t.inactive}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{t.userID}:</span>
                      <span className="text-sm text-[#002B5B] font-mono">{sessionData.userID || 'N/A'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{t.sessionID}:</span>
                      <span className="text-sm text-[#002B5B] font-mono">{sessionData.sessionID || 'N/A'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{t.hasVoted}:</span>
                      <Badge variant={hasVoted ? 'default' : 'outline'} className={hasVoted ? 'bg-green-500' : ''}>
                        {hasVoted ? t.yes : t.no}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Election Card */}
              {elections.length === 0 ? (
                <Card className="border-2 border-amber-500">
                  <CardContent className="py-12 text-center">
                    <AlertCircle className="size-12 text-amber-600 mx-auto mb-4" />
                    <p className="text-[#002B5B] mb-2">{t.noActiveElections}</p>
                    <p className="text-sm text-gray-600">
                      {t.noElectionsDesc}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                elections.map(election => (
                  <Card key={election.id} className="border-2 border-[#002B5B]">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-[#002B5B] flex items-center gap-2">
                            <Vote className="size-5" />
                            {election.name}
                          </CardTitle>
                          <CardDescription className="mt-2">
                            {t.electionID}: {election.id.slice(0, 18)}...
                          </CardDescription>
                        </div>
                        <Badge className="bg-green-500 hover:bg-green-600">
                          <Clock className="size-3 mr-1" />
                          {t.active}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-600">{t.schedule}</p>
                              <p className="text-[#002B5B]">
                                {new Date(election.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - {new Date(election.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">{t.constituency}</p>
                              <p className="text-[#002B5B]">{election.constituency}</p>
                            </div>
                          </div>
                        </div>

                        {hasVoted ? (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                            <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-green-900">
                                {t.votedSuccess}
                              </p>
                              <p className="text-sm text-green-700 mt-1">
                                {t.votedThankYou}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                              <AlertCircle className="size-5 text-amber-600 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-amber-900">
                                  {t.notVotedYet}
                                </p>
                                <p className="text-sm text-amber-700 mt-1">
                                  {t.castVoteSoon}
                                </p>
                              </div>
                            </div>

                            <Button 
                              onClick={() => handleProceedToVote(election.id)}
                              className="w-full bg-[#FF9933] hover:bg-[#E88A2E] text-white"
                              size="lg"
                            >
                              <Vote className="size-4 mr-2" />
                              {t.proceedToVote}
                            </Button>
                          </>
                        )}

                        <Button
                          onClick={() => {
                            sessionStorage.setItem('currentElectionID', election.id);
                            navigate('/results');
                          }}
                          variant="outline"
                          className="w-full"
                        >
                          <BarChart className="size-4 mr-2" />
                          {t.viewElectionResults}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Voter Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#002B5B]">{t.voterInformation}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{t.name}:</span>
                      <span className="text-[#002B5B]">{sessionData.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{t.aadhaar}:</span>
                      <span className="text-[#002B5B] font-mono">
                        XXXX-XXXX-{sessionData.aadhaar?.slice(-4)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Vote Receipt Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#002B5B] flex items-center gap-2">
                    <Receipt className="size-5" />
                    {t.voteReceipt}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {hasVoted && voteReceipt ? (
                    <div className="space-y-3">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-xs text-gray-600 mb-1">{t.receiptID}</p>
                        <p className="text-xs text-[#002B5B] font-mono break-all">{voteReceipt}</p>
                      </div>
                      <Button
                        onClick={() => navigate('/receipt-history')}
                        variant="outline"
                        className="w-full"
                        size="sm"
                      >
                        {t.viewReceiptHistory}
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">{t.noReceipt}</p>
                  )}
                </CardContent>
              </Card>

              {/* Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#002B5B] flex items-center gap-2">
                    <FileText className="size-5" />
                    {t.instructions}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF9933] mt-1">•</span>
                      <span>{t.instruction1}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF9933] mt-1">•</span>
                      <span>{t.instruction2}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF9933] mt-1">•</span>
                      <span>{t.instruction3}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FF9933] mt-1">•</span>
                      <span>{t.instruction4}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}