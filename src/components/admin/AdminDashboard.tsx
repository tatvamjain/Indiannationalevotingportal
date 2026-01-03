import { useNavigate } from 'react-router-dom';
import { Settings, Users, BarChart, FileText, Vote, Database } from 'lucide-react';
import { useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { createClient } from '../../utils/supabase/client';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalVoters: 0,
    totalVotesCast: 0,
    activeElections: 0,
    totalCandidates: 0
  });
  const [loading, setLoading] = useState(true);

  const adminData = {
    adminID: 'ADMIN-001',
    accessLevel: 'Super Admin',
    name: 'Admin User'
  };

  useEffect(() => {
    fetchDashboardStats();

    // Set up real-time subscription for votes table
    const supabase = createClient();
    
    const votesSubscription = supabase
      .channel('votes_changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'votes'
        },
        (payload) => {
          console.log('Votes table changed:', payload);
          // Update the votes count in real-time
          if (payload.eventType === 'INSERT') {
            setStats(prev => ({
              ...prev,
              totalVotesCast: prev.totalVotesCast + 1
            }));
          } else if (payload.eventType === 'DELETE') {
            setStats(prev => ({
              ...prev,
              totalVotesCast: Math.max(0, prev.totalVotesCast - 1)
            }));
          } else {
            // For UPDATE or other events, refetch the count to be safe
            fetchVotesCount();
          }
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(votesSubscription);
    };
  }, []);

  const fetchVotesCount = async () => {
    try {
      const supabase = createClient();
      const { count: votesCount, error: votesError } = await supabase
        .from('votes')
        .select('*', { count: 'exact', head: true });

      if (votesError) {
        console.error('Error fetching votes count:', votesError);
      } else {
        setStats(prev => ({
          ...prev,
          totalVotesCast: votesCount || 0
        }));
      }
    } catch (error) {
      console.error('Error fetching votes count:', error);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const supabase = createClient();

      // Fetch total voters count
      const { count: votersCount, error: votersError } = await supabase
        .from('voters')
        .select('*', { count: 'exact', head: true });

      if (votersError) {
        console.error('Error fetching voters:', votersError);
      }

      // Fetch total votes cast count
      const { count: votesCount, error: votesError } = await supabase
        .from('votes')
        .select('*', { count: 'exact', head: true });

      if (votesError) {
        console.error('Error fetching votes:', votesError);
      }

      // Fetch active elections count
      const { count: electionsCount, error: electionsError } = await supabase
        .from('elections')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      if (electionsError) {
        console.error('Error fetching elections:', electionsError);
      }

      // Fetch total candidates count
      const { count: candidatesCount, error: candidatesError } = await supabase
        .from('candidates')
        .select('*', { count: 'exact', head: true });

      if (candidatesError) {
        console.error('Error fetching candidates:', candidatesError);
      }

      setStats({
        totalVoters: votersCount || 0,
        totalVotesCast: votesCount || 0,
        activeElections: electionsCount || 0,
        totalCandidates: candidatesCount || 0
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsDisplay = [
    { label: 'Total Voters', value: stats.totalVoters.toLocaleString(), icon: Users },
    { label: 'Total Votes Cast', value: stats.totalVotesCast.toLocaleString(), icon: Vote },
    { label: 'Active Elections', value: stats.activeElections.toString(), icon: Settings },
    { label: 'Total Candidates', value: stats.totalCandidates.toString(), icon: FileText }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header isAdmin />
      
      <main className="flex-1 py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-[#002B5B] mb-2">Admin Dashboard</h1>
            <div className="flex items-center gap-3">
              <p className="text-gray-600">Welcome, {adminData.name}</p>
              <Badge variant="outline" className="border-[#002B5B] text-[#002B5B]">
                {adminData.accessLevel}
              </Badge>
              <span className="text-sm text-gray-500 font-mono">ID: {adminData.adminID}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {statsDisplay.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="relative">
                  <CardContent className="pt-6">
                    {loading && (
                      <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-lg">
                        <div className="size-6 border-2 border-[#002B5B] border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <Icon className="size-6 text-[#002B5B]" />
                      </div>
                      <div>
                        <p className="text-2xl text-[#002B5B]">{stat.value}</p>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/admin/election-setup')}>
              <CardHeader>
                <CardTitle className="text-[#002B5B] flex items-center gap-2">
                  <Settings className="size-5" />
                  Election Setup
                </CardTitle>
                <CardDescription>
                  Create and manage elections, set schedules, and configure constituencies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  Manage Elections
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/admin/candidates')}>
              <CardHeader>
                <CardTitle className="text-[#002B5B] flex items-center gap-2">
                  <Users className="size-5" />
                  Candidate Management
                </CardTitle>
                <CardDescription>
                  Add, edit, and manage candidate information and party details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  Manage Candidates
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/admin/reports')}>
              <CardHeader>
                <CardTitle className="text-[#002B5B] flex items-center gap-2">
                  <BarChart className="size-5" />
                  Results & Reports
                </CardTitle>
                <CardDescription>
                  View election results, generate reports, and analyze voting patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  View Reports
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Supabase Integration Card */}
          <Card className="mt-6 border-2 border-green-500 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/admin/supabase')}>
            <CardHeader>
              <CardTitle className="text-[#002B5B] flex items-center gap-2">
                <Database className="size-5" />
                Supabase Backend Integration
              </CardTitle>
              <CardDescription>
                View database schema, API endpoints, and system architecture
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                View Supabase Integration
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}