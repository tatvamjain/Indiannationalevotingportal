import { useState, useEffect } from 'react';
import { BarChart, TrendingUp, Users, Vote, Award, Loader2 } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { createClient } from '../utils/supabase/client';
import { toast } from 'sonner';

interface CandidateResult {
  id: string;
  name: string;
  party: string;
  symbol: string;
  votes: number;
  percentage: number;
  color: string;
}

interface Election {
  id: string;
  name: string;
  constituency: string;
}

export default function ResultsPage() {
  const [results, setResults] = useState<CandidateResult[]>([]);
  const [election, setElection] = useState<Election | null>(null);
  const [loading, setLoading] = useState(true);

  const totalVotes = results.reduce((sum, candidate) => sum + candidate.votes, 0);
  const winner = results.length > 0 ? results.reduce((prev, current) => (current.votes > prev.votes ? current : prev)) : null;

  useEffect(() => {
    loadResults();
    
    // Auto-refresh every 10 seconds
    const interval = setInterval(() => {
      loadResults();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const loadResults = async () => {
    try {
      const supabase = createClient();
      
      // Get active election
      const { data: electionData, error: electionError } = await supabase
        .from('elections')
        .select('id, name, constituency')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (electionError || !electionData) {
        console.error('Error loading election:', electionError);
        setLoading(false);
        return;
      }

      setElection(electionData);

      // Get candidates with their vote counts
      const { data: candidatesData, error: candidatesError } = await supabase
        .from('candidates')
        .select('id, name, party, symbol')
        .eq('election_id', electionData.id);

      if (candidatesError) {
        console.error('Error loading candidates:', candidatesError);
        toast.error('Failed to load candidates');
        setLoading(false);
        return;
      }

      // Get vote counts from results table
      const { data: resultsData, error: resultsError } = await supabase
        .from('results')
        .select('candidate_id, vote_count')
        .eq('election_id', electionData.id);

      if (resultsError) {
        console.error('Error loading results:', resultsError);
        toast.error('Failed to load results');
        setLoading(false);
        return;
      }

      // Merge candidates with their vote counts
      const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-amber-500', 'bg-red-500', 'bg-indigo-500'];
      const candidateResults: CandidateResult[] = (candidatesData || []).map((candidate, index) => {
        const result = resultsData?.find(r => r.candidate_id === candidate.id);
        const votes = result?.vote_count || 0;
        
        return {
          id: candidate.id,
          name: candidate.name,
          party: candidate.party,
          symbol: candidate.symbol,
          votes,
          percentage: 0,
          color: colors[index % colors.length]
        };
      });

      // Calculate percentages
      const total = candidateResults.reduce((sum, c) => sum + c.votes, 0);
      const withPercentages = candidateResults.map(c => ({
        ...c,
        percentage: total > 0 ? (c.votes / total) * 100 : 0
      }));

      // Sort by votes (descending)
      withPercentages.sort((a, b) => b.votes - a.votes);

      setResults(withPercentages);
    } catch (err) {
      console.error('Error loading results:', err);
      toast.error('Failed to load results');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-12 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="size-12 animate-spin text-[#002B5B] mx-auto mb-4" />
            <p className="text-[#002B5B]">Loading results...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!election) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <Card className="max-w-md mx-auto">
              <CardContent className="py-12 text-center">
                <p className="text-[#002B5B] mb-2">No Active Elections</p>
                <p className="text-sm text-gray-600">Results will be available once voting begins.</p>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-[#002B5B]">Election Results</h1>
              <Badge className="bg-green-500 hover:bg-green-600">
                <div className="size-2 bg-white rounded-full animate-pulse mr-2"></div>
                Live
              </Badge>
            </div>
            <p className="text-gray-600">{election.name} - {election.constituency}</p>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Votes Cast</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <Users className="size-6 text-[#002B5B]" />
                  </div>
                  <div>
                    <p className="text-3xl text-[#002B5B]">{totalVotes.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">voters participated</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Voter Turnout</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <TrendingUp className="size-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-3xl text-[#002B5B]">68.4%</p>
                    <p className="text-sm text-gray-500">of registered voters</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#FF9933]">
              <CardHeader className="pb-3">
                <CardDescription>Leading Candidate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <Award className="size-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-lg text-[#002B5B]">{winner?.name || 'N/A'}</p>
                    <p className="text-sm text-gray-500">{winner?.party || ''}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Number of Candidates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <Vote className="size-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-3xl text-[#002B5B]">{results.length}</p>
                    <p className="text-sm text-gray-500">in this election</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#002B5B] flex items-center gap-2">
                <BarChart className="size-5" />
                Vote Distribution
              </CardTitle>
              <CardDescription>Real-time vote counts per candidate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {results.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-gray-500">No votes cast yet</p>
                  </div>
                ) : (
                  results.map((candidate, index) => (
                    <div key={candidate.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="size-10 bg-blue-50 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                            {candidate.symbol}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-[#002B5B]">{candidate.name}</p>
                              {index === 0 && totalVotes > 0 && (
                                <Badge className="bg-green-500">Leading</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{candidate.party}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl text-[#002B5B]">{candidate.votes.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">{candidate.percentage.toFixed(1)}%</p>
                        </div>
                      </div>
                      <Progress value={candidate.percentage} className="h-3" />
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}