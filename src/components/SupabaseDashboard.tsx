import { useEffect, useState } from 'react';
import { Database, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { createClient } from '../utils/supabase/client';

export default function SupabaseDashboard() {
  const [isConnected, setIsConnected] = useState(false);
  const [dbStats, setDbStats] = useState({
    voters: 0,
    elections: 0,
    candidates: 0,
    votes: 0
  });

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('elections').select('count');
      
      if (!error) {
        setIsConnected(true);
        loadStats();
      }
    } catch (err) {
      console.log('Supabase connection check:', err);
      setIsConnected(false);
    }
  };

  const loadStats = async () => {
    try {
      const supabase = createClient();
      
      const [votersRes, electionsRes, candidatesRes, votesRes] = await Promise.all([
        supabase.from('voters').select('count', { count: 'exact', head: true }),
        supabase.from('elections').select('count', { count: 'exact', head: true }),
        supabase.from('candidates').select('count', { count: 'exact', head: true }),
        supabase.from('results').select('vote_count')
      ]);

      const totalVotes = votesRes.data?.reduce((sum, r) => sum + (r.vote_count || 0), 0) || 0;

      setDbStats({
        voters: votersRes.count || 0,
        elections: electionsRes.count || 0,
        candidates: candidatesRes.count || 0,
        votes: totalVotes
      });
    } catch (err) {
      console.log('Stats loading error:', err);
    }
  };

  const tables = [
    {
      name: 'voters',
      icon: '🧾',
      count: dbStats.voters,
      fields: [
        { name: 'id', type: 'uuid', key: 'primary key' },
        { name: 'aadhaar_number', type: 'varchar(12)', key: 'unique' },
        { name: 'phone_number', type: 'varchar(10)' },
        { name: 'has_voted', type: 'boolean' },
        { name: 'session_status', type: 'boolean' },
        { name: 'receipt_id', type: 'varchar(255)' },
        { name: 'created_at', type: 'timestamp' }
      ],
      operations: ['READ', 'WRITE', 'UPDATE']
    },
    {
      name: 'elections',
      icon: '🗳️',
      count: dbStats.elections,
      fields: [
        { name: 'id', type: 'uuid', key: 'primary key' },
        { name: 'name', type: 'varchar(255)' },
        { name: 'constituency', type: 'varchar(255)' },
        { name: 'start_date', type: 'timestamp' },
        { name: 'end_date', type: 'timestamp' },
        { name: 'is_active', type: 'boolean' },
        { name: 'created_at', type: 'timestamp' }
      ],
      operations: ['READ', 'WRITE', 'UPDATE']
    },
    {
      name: 'candidates',
      icon: '👤',
      count: dbStats.candidates,
      fields: [
        { name: 'id', type: 'uuid', key: 'primary key' },
        { name: 'election_id', type: 'uuid', key: 'foreign key' },
        { name: 'name', type: 'varchar(255)' },
        { name: 'party', type: 'varchar(255)' },
        { name: 'symbol', type: 'varchar(10)' },
        { name: 'description', type: 'text' },
        { name: 'created_at', type: 'timestamp' }
      ],
      operations: ['READ', 'WRITE', 'UPDATE']
    },
    {
      name: 'votes',
      icon: '✅',
      count: dbStats.votes,
      fields: [
        { name: 'id', type: 'uuid', key: 'primary key' },
        { name: 'voter_id', type: 'uuid', key: 'foreign key' },
        { name: 'election_id', type: 'uuid', key: 'foreign key' },
        { name: 'candidate_id', type: 'uuid', key: 'foreign key' },
        { name: 'timestamp', type: 'timestamp' }
      ],
      operations: ['WRITE', 'TALLY']
    },
    {
      name: 'results',
      icon: '📊',
      count: '—',
      fields: [
        { name: 'id', type: 'uuid', key: 'primary key' },
        { name: 'election_id', type: 'uuid', key: 'foreign key' },
        { name: 'candidate_id', type: 'uuid', key: 'foreign key' },
        { name: 'vote_count', type: 'integer' },
        { name: 'updated_at', type: 'timestamp' }
      ],
      operations: ['READ', 'UPDATE', 'TALLY']
    }
  ];

  const apiEndpoints = [
    { method: 'POST', path: '/auth/login', description: 'Authenticate voter with Aadhaar + OTP', table: 'voters' },
    { method: 'GET', path: '/elections', description: 'Fetch all active elections', table: 'elections' },
    { method: 'GET', path: '/candidates?electionId=', description: 'Get candidates for election', table: 'candidates' },
    { method: 'POST', path: '/vote', description: 'Submit vote (idempotent)', table: 'votes, results' },
    { method: 'GET', path: '/results/:electionId', description: 'Fetch election results', table: 'results' },
    { method: 'POST', path: '/admin/election', description: 'Create new election', table: 'elections' },
    { method: 'PUT', path: '/admin/candidate', description: 'Update candidate info', table: 'candidates' }
  ];

  const dataFlow = [
    { module: 'Registration & Auth', table: 'voters', operations: ['READ', 'WRITE', 'UPDATE'] },
    { module: 'Election Setup (Admin)', table: 'elections, candidates', operations: ['READ', 'WRITE'] },
    { module: 'Vote Casting', table: 'votes, voters', operations: ['WRITE', 'UPDATE'] },
    { module: 'Results & Reports', table: 'votes, results', operations: ['READ', 'TALLY'] }
  ];

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card className={`border-2 ${isConnected ? 'border-green-500' : 'border-amber-500'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`size-12 ${isConnected ? 'bg-green-100' : 'bg-amber-100'} rounded-lg flex items-center justify-center`}>
                <Database className={`size-6 ${isConnected ? 'text-green-600' : 'text-amber-600'}`} />
              </div>
              <div>
                <CardTitle className="text-[#002B5B]">Supabase Database Integration</CardTitle>
                <CardDescription>
                  {isConnected ? 'Connected to Supabase (Active)' : 'Demo Mode - Database Setup Required'}
                </CardDescription>
              </div>
            </div>
            <Badge className={isConnected ? 'bg-green-500 hover:bg-green-600' : 'bg-amber-500 hover:bg-amber-600'}>
              <div className="size-2 bg-white rounded-full animate-pulse mr-2"></div>
              {isConnected ? 'Connection: Active' : 'Connection: Demo Mode'}
            </Badge>
          </div>
        </CardHeader>
        {!isConnected && (
          <CardContent>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="size-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-900 mb-2">
                    <span className="font-semibold">Setup Required:</span> To enable live database functionality, 
                    run the SQL commands from <code className="bg-amber-100 px-1 rounded">/utils/supabase/setup.sql</code> in your Supabase SQL Editor.
                  </p>
                  <p className="text-xs text-amber-700">
                    This will create the tables: voters, elections, candidates, votes, and results.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Database Statistics */}
      {isConnected && (
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl text-[#002B5B] mb-1">{dbStats.voters}</p>
              <p className="text-sm text-gray-600">Voters</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl text-[#002B5B] mb-1">{dbStats.elections}</p>
              <p className="text-sm text-gray-600">Elections</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl text-[#002B5B] mb-1">{dbStats.candidates}</p>
              <p className="text-sm text-gray-600">Candidates</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl text-[#002B5B] mb-1">{dbStats.votes}</p>
              <p className="text-sm text-gray-600">Total Votes</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Database Tables */}
      <div>
        <h2 className="text-[#002B5B] mb-4">Database Schema</h2>
        <div className="grid lg:grid-cols-2 gap-4">
          {tables.map((table) => (
            <Card key={table.name} className="border-l-4 border-l-[#002B5B]">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[#002B5B] flex items-center gap-2 text-lg">
                    <span className="text-2xl">{table.icon}</span>
                    {table.name}
                  </CardTitle>
                  {typeof table.count === 'number' && (
                    <Badge variant="outline" className="font-mono">
                      {table.count} rows
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2 mt-2">
                  {table.operations.map(op => (
                    <Badge key={op} variant="outline" className="text-xs">
                      {op}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-3 font-mono text-xs space-y-1">
                  {table.fields.map((field) => (
                    <div key={field.name} className="flex items-center justify-between">
                      <span className={field.key ? 'text-[#002B5B] font-semibold' : 'text-gray-700'}>
                        {field.name}
                      </span>
                      <span className="text-gray-500">
                        {field.type}
                        {field.key && ` (${field.key})`}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Data Flow Mapping */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#002B5B]">Data Flow Mapping</CardTitle>
          <CardDescription>UI modules connected to Supabase tables</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dataFlow.map((flow, index) => (
              <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-[#002B5B] font-semibold mb-1">{flow.module}</p>
                    <div className="flex gap-2">
                      {flow.operations.map(op => (
                        <Badge key={op} className="bg-[#FF9933] text-xs">
                          {op}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <ArrowRight className="size-8 text-[#002B5B] flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Supabase Tables:</p>
                    <p className="text-[#002B5B] font-mono text-sm">{flow.table}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Layer */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#002B5B]">Supabase API Layer</CardTitle>
          <CardDescription>RESTful endpoints for database operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {apiEndpoints.map((endpoint, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Badge 
                  variant={endpoint.method === 'GET' ? 'outline' : 'default'}
                  className={`w-16 justify-center ${
                    endpoint.method === 'POST' ? 'bg-green-600' : 
                    endpoint.method === 'PUT' ? 'bg-amber-600' : 
                    'border-blue-600 text-blue-600'
                  }`}
                >
                  {endpoint.method}
                </Badge>
                <code className="font-mono text-sm text-[#002B5B] flex-1">{endpoint.path}</code>
                <p className="text-xs text-gray-600 flex-1">{endpoint.description}</p>
                <Badge variant="outline" className="text-xs font-mono">
                  {endpoint.table}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Architecture Diagram */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#002B5B]">System Architecture</CardTitle>
          <CardDescription>Three-tier architecture with Supabase backend</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
            <div className="grid grid-cols-3 gap-4 items-center">
              {/* Frontend Layer */}
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 border-2 border-[#002B5B] shadow-sm">
                  <p className="font-semibold text-[#002B5B] text-center mb-2">Frontend Layer</p>
                  <div className="space-y-1 text-xs">
                    <div className="bg-blue-50 p-2 rounded">React + TypeScript</div>
                    <div className="bg-blue-50 p-2 rounded">Voter Dashboard</div>
                    <div className="bg-blue-50 p-2 rounded">Admin Panel</div>
                    <div className="bg-blue-50 p-2 rounded">Vote Casting UI</div>
                  </div>
                </div>
              </div>

              {/* API Layer */}
              <div className="space-y-3">
                <div className="flex justify-center">
                  <ArrowRight className="size-8 text-[#002B5B]" />
                </div>
                <div className="bg-white rounded-lg p-3 border-2 border-[#FF9933] shadow-sm">
                  <p className="font-semibold text-[#FF9933] text-center mb-2">Supabase API</p>
                  <div className="space-y-1 text-xs">
                    <div className="bg-orange-50 p-2 rounded">REST Endpoints</div>
                    <div className="bg-orange-50 p-2 rounded">Row Level Security</div>
                    <div className="bg-orange-50 p-2 rounded">Real-time Updates</div>
                    <div className="bg-orange-50 p-2 rounded">Auto-scaling</div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="size-8 text-[#002B5B]" />
                </div>
              </div>

              {/* Database Layer */}
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 border-2 border-green-600 shadow-sm">
                  <p className="font-semibold text-green-600 text-center mb-2">Database Layer</p>
                  <div className="space-y-1 text-xs">
                    <div className="bg-green-50 p-2 rounded">PostgreSQL 15</div>
                    <div className="bg-green-50 p-2 rounded">5 Tables + Indexes</div>
                    <div className="bg-green-50 p-2 rounded">Encrypted Storage</div>
                    <div className="bg-green-50 p-2 rounded">ACID Compliant</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Setup Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-900 mb-3">
                <span className="font-semibold">Database Setup Instructions:</span>
              </p>
              <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                <li>Open your Supabase project dashboard</li>
                <li>Navigate to SQL Editor</li>
                <li>Copy the contents of <code className="bg-blue-100 px-1 rounded font-mono">/utils/supabase/setup.sql</code></li>
                <li>Run the SQL commands to create tables and insert demo data</li>
                <li>Refresh this page to see live database statistics</li>
              </ol>
              <p className="text-xs text-blue-700 mt-3">
                The SQL file includes table creation, indexes, triggers, and Row Level Security policies for production-ready setup.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
