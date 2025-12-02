import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner@2.0.3';
import { createClient } from '../../utils/supabase/client';

interface Candidate {
  id: string;
  election_id: string;
  name: string;
  party: string;
  symbol: string;
  description: string;
  created_at?: string;
}

interface Election {
  id: string;
  name: string;
  is_active: boolean;
}

export default function CandidateManagementPage() {
  const navigate = useNavigate();
  
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [elections, setElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);
  const [formData, setFormData] = useState({
    electionId: '',
    name: '',
    party: '',
    symbol: '',
    description: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const supabase = createClient();
      
      // Load elections
      const { data: electionsData, error: electionsError } = await supabase
        .from('elections')
        .select('id, name, is_active')
        .order('created_at', { ascending: false });

      if (electionsError) {
        console.error('Error loading elections:', electionsError);
        toast.error('Failed to load elections');
      } else {
        setElections(electionsData || []);
      }

      // Load candidates
      const { data: candidatesData, error: candidatesError } = await supabase
        .from('candidates')
        .select('*')
        .order('created_at', { ascending: false });

      if (candidatesError) {
        console.error('Error loading candidates:', candidatesError);
        toast.error('Failed to load candidates');
      } else {
        setCandidates(candidatesData || []);
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.electionId || !formData.name || !formData.party || !formData.symbol || !formData.description) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      const supabase = createClient();

      console.log('💾 Saving candidate with election_id:', formData.electionId);

      if (editingCandidate) {
        // Update existing candidate
        const { data, error } = await supabase
          .from('candidates')
          .update({
            election_id: formData.electionId,
            name: formData.name,
            party: formData.party,
            symbol: formData.symbol,
            description: formData.description
          })
          .eq('id', editingCandidate.id)
          .select()
          .single();

        console.log('📊 Update result:', { data, error });

        if (error) {
          console.error('❌ Error updating candidate:', error);
          toast.error('Failed to update candidate');
          return;
        }

        setCandidates(candidates.map(c => 
          c.id === editingCandidate.id ? data : c
        ));
        toast.success('Candidate updated successfully');
      } else {
        // Add new candidate
        const candidateData = {
          election_id: formData.electionId,
          name: formData.name,
          party: formData.party,
          symbol: formData.symbol,
          description: formData.description
        };
        
        console.log('📝 Inserting candidate:', candidateData);
        
        const { data, error } = await supabase
          .from('candidates')
          .insert(candidateData)
          .select()
          .single();

        console.log('📊 Insert result:', { data, error });

        if (error) {
          console.error('❌ Error adding candidate:', error);
          toast.error('Failed to add candidate');
          return;
        }

        console.log('✅ Candidate added successfully with ID:', data.id);
        setCandidates([data, ...candidates]);
        toast.success('Candidate added successfully');
      }

      setShowForm(false);
      setEditingCandidate(null);
      setFormData({ electionId: '', name: '', party: '', symbol: '', description: '' });
    } catch (err) {
      console.error('❌ Error:', err);
      toast.error('Failed to save candidate');
    }
  };

  const handleEdit = (candidate: Candidate) => {
    setEditingCandidate(candidate);
    setFormData({
      electionId: candidate.election_id,
      name: candidate.name,
      party: candidate.party,
      symbol: candidate.symbol,
      description: candidate.description
    });
    setShowForm(true);
  };

  const handleDelete = async (candidateId: string) => {
    if (!confirm('Are you sure you want to delete this candidate?')) {
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('candidates')
        .delete()
        .eq('id', candidateId);

      if (error) {
        console.error('Error deleting candidate:', error);
        toast.error('Failed to delete candidate');
        return;
      }

      setCandidates(candidates.filter(c => c.id !== candidateId));
      toast.success('Candidate deleted successfully');
    } catch (err) {
      console.error('Error:', err);
      toast.error('Failed to delete candidate');
    }
  };

  const addSampleCandidates = async () => {
    if (elections.length === 0) {
      toast.error('Please create an election first');
      return;
    }

    // Use the most recently created active election
    const targetElection = elections.find(e => e.is_active) || elections[0];
    
    if (!targetElection) {
      toast.error('No active election found');
      return;
    }
    
    if (!confirm(`Add 5 sample candidates to "${targetElection.name}"?\n\nThis will add: BJP, INC, AAP, Independent, and NOTA candidates.`)) {
      return;
    }

    const sampleCandidates = [
      {
        election_id: targetElection.id,
        name: 'Rajesh Kumar Singh',
        party: 'Bharatiya Janata Party (BJP)',
        symbol: '🌺',
        description: 'Focus on economic development and infrastructure growth'
      },
      {
        election_id: targetElection.id,
        name: 'Priya Sharma',
        party: 'Indian National Congress (INC)',
        symbol: '✋',
        description: 'Committed to social welfare and inclusive development'
      },
      {
        election_id: targetElection.id,
        name: 'Amit Verma',
        party: 'Aam Aadmi Party (AAP)',
        symbol: '🧹',
        description: 'Dedicated to anti-corruption and good governance'
      },
      {
        election_id: targetElection.id,
        name: 'Sunita Devi',
        party: 'Independent (IND)',
        symbol: '📢',
        description: 'Independent candidate focused on local community issues'
      },
      {
        election_id: targetElection.id,
        name: 'None of the Above',
        party: 'NOTA',
        symbol: '❌',
        description: 'Option to reject all candidates'
      }
    ];

    try {
      const supabase = createClient();
      
      console.log('🌱 Seeding sample candidates for election:', targetElection.id, targetElection.name);
      
      const { data, error } = await supabase
        .from('candidates')
        .insert(sampleCandidates)
        .select();

      if (error) {
        console.error('❌ Error adding sample candidates:', error);
        toast.error('Failed to add sample candidates');
        return;
      }

      console.log('✅ Successfully added sample candidates:', data);
      
      // Refresh the candidates list
      loadData();
      toast.success(`Added ${data.length} sample candidates to "${targetElection.name}"!`);
    } catch (err) {
      console.error('❌ Error:', err);
      toast.error('Failed to add sample candidates');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCandidate(null);
    setFormData({ electionId: '', name: '', party: '', symbol: '', description: '' });
  };

  const getElectionName = (electionId: string) => {
    const election = elections.find(e => e.id === electionId);
    return election ? election.name : 'Unknown Election';
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header isAdmin />
        <main className="flex-1 py-12 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="size-12 animate-spin text-[#002B5B] mx-auto mb-4" />
            <p className="text-[#002B5B]">Loading candidates...</p>
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
                <h1 className="text-[#002B5B]">Candidate Management</h1>
                <p className="text-gray-600">Add, edit, and manage candidate information</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={addSampleCandidates} variant="outline">
                <Plus className="size-4 mr-2" />
                Add Sample Candidates
              </Button>
              <Button onClick={() => setShowForm(!showForm)}>
                <Plus className="size-4 mr-2" />
                Add Candidate
              </Button>
            </div>
          </div>

          {/* Add/Edit Candidate Form */}
          {showForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-[#002B5B]">
                  {editingCandidate ? 'Edit Candidate' : 'Add New Candidate'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="election">Election *</Label>
                    <Select
                      value={formData.electionId}
                      onValueChange={(value) => setFormData({ ...formData, electionId: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select an election" />
                      </SelectTrigger>
                      <SelectContent>
                        {elections.map((election) => (
                          <SelectItem key={election.id} value={election.id}>
                            {election.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="name">Candidate Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="party">Party Name *</Label>
                    <Input
                      id="party"
                      placeholder="e.g., Demo Party Alpha"
                      value={formData.party}
                      onChange={(e) => setFormData({ ...formData, party: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="symbol">Party Symbol (Emoji) *</Label>
                    <Input
                      id="symbol"
                      placeholder="e.g., 🏁"
                      value={formData.symbol}
                      onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                      className="mt-1"
                      maxLength={2}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Candidate's agenda and focus areas"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button onClick={handleSubmit} className="flex-1">
                    {editingCandidate ? 'Update Candidate' : 'Add Candidate'}
                  </Button>
                  <Button onClick={handleCancel} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Candidates List */}
          <div className="grid md:grid-cols-2 gap-4">
            {candidates.length === 0 ? (
              <Card className="md:col-span-2">
                <CardContent className="py-12 text-center">
                  <p className="text-gray-500">No candidates found. Add your first candidate above.</p>
                </CardContent>
              </Card>
            ) : (
              candidates.map((candidate) => (
                <Card key={candidate.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="size-12 bg-blue-50 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                          {candidate.symbol}
                        </div>
                        <div className="min-w-0">
                          <CardTitle className="text-[#002B5B]">{candidate.name}</CardTitle>
                          <p className="text-sm text-gray-600">{candidate.party}</p>
                          <p className="text-xs text-gray-400 mt-1 truncate">
                            {getElectionName(candidate.election_id)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(candidate)}
                        >
                          <Edit className="size-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(candidate.id)}
                        >
                          <Trash2 className="size-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">{candidate.description}</p>
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