import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Calendar, MapPin, Loader2 } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';
import { createClient } from '../../utils/supabase/client';

interface Election {
  id: string;
  name: string;
  constituency: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
}

export default function ElectionSetupPage() {
  const navigate = useNavigate();
  
  const [elections, setElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newElection, setNewElection] = useState({
    name: '',
    constituency: '',
    startDate: '',
    endDate: '',
    isActive: false
  });

  useEffect(() => {
    loadElections();
  }, []);

  const loadElections = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('elections')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading elections:', error);
        toast.error('Failed to load elections');
      } else {
        setElections(data || []);
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error('Failed to load elections');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateElection = async () => {
    if (!newElection.name || !newElection.constituency || !newElection.startDate || !newElection.endDate) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      const supabase = createClient();
      
      // Convert dates to ISO format with timezone
      const startISO = new Date(newElection.startDate + 'T00:00:00').toISOString();
      const endISO = new Date(newElection.endDate + 'T23:59:59').toISOString();

      const { data, error } = await supabase
        .from('elections')
        .insert({
          name: newElection.name,
          constituency: newElection.constituency,
          start_date: startISO,
          end_date: endISO,
          is_active: newElection.isActive
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating election:', error);
        toast.error('Failed to create election');
        return;
      }

      setElections([data, ...elections]);
      setShowForm(false);
      setNewElection({ name: '', constituency: '', startDate: '', endDate: '', isActive: false });
      toast.success('Election created successfully');
    } catch (err) {
      console.error('Error:', err);
      toast.error('Failed to create election');
    }
  };

  const toggleElectionStatus = async (electionId: string, currentStatus: boolean) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('elections')
        .update({ is_active: !currentStatus })
        .eq('id', electionId);

      if (error) {
        console.error('Error updating election:', error);
        toast.error('Failed to update election status');
        return;
      }

      setElections(elections.map(e => 
        e.id === electionId ? { ...e, is_active: !currentStatus } : e
      ));
      toast.success('Election status updated');
    } catch (err) {
      console.error('Error:', err);
      toast.error('Failed to update election');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header isAdmin />
        <main className="flex-1 py-12 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="size-12 animate-spin text-[#002B5B] mx-auto mb-4" />
            <p className="text-[#002B5B]">Loading elections...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header isAdmin />
      
      <main className="flex-1 py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/admin')}
                size="sm"
              >
                <ArrowLeft className="size-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-[#002B5B]">Election Setup</h1>
                <p className="text-gray-600">Manage elections, schedules, and constituencies</p>
              </div>
            </div>
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="size-4 mr-2" />
              Create Election
            </Button>
          </div>

          {/* Create Election Form */}
          {showForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-[#002B5B]">Create New Election</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="name">Election Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Lok Sabha Elections 2025"
                      value={newElection.name}
                      onChange={(e) => setNewElection({ ...newElection, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="constituency">Constituency *</Label>
                    <Input
                      id="constituency"
                      placeholder="e.g., Constituency 001"
                      value={newElection.constituency}
                      onChange={(e) => setNewElection({ ...newElection, constituency: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>Status</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Switch
                        checked={newElection.isActive}
                        onCheckedChange={(checked) => setNewElection({ ...newElection, isActive: checked })}
                      />
                      <span className="text-sm text-gray-600">
                        {newElection.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newElection.startDate}
                      onChange={(e) => setNewElection({ ...newElection, startDate: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newElection.endDate}
                      onChange={(e) => setNewElection({ ...newElection, endDate: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button onClick={handleCreateElection} className="flex-1">
                    Create Election
                  </Button>
                  <Button onClick={() => setShowForm(false)} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Elections List */}
          <div className="space-y-4">
            {elections.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-gray-500">No elections found. Create your first election above.</p>
                </CardContent>
              </Card>
            ) : (
              elections.map((election) => (
                <Card key={election.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-[#002B5B] mb-2">{election.name}</CardTitle>
                        <p className="text-sm text-gray-500 font-mono">ID: {election.id.slice(0, 8)}...</p>
                      </div>
                      <Badge className={election.is_active ? 'bg-green-500' : 'bg-gray-500'}>
                        {election.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="size-4 text-gray-500" />
                          <p className="text-sm text-gray-600">Constituency</p>
                        </div>
                        <p className="text-[#002B5B]">{election.constituency}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="size-4 text-gray-500" />
                          <p className="text-sm text-gray-600">Schedule</p>
                        </div>
                        <p className="text-[#002B5B] text-sm">
                          {new Date(election.start_date).toLocaleDateString()} - {new Date(election.end_date).toLocaleDateString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-2">Created</p>
                        <p className="text-[#002B5B] text-sm">{new Date(election.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleElectionStatus(election.id, election.is_active)}
                      >
                        {election.is_active ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/admin/candidates')}
                      >
                        Manage Candidates
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}