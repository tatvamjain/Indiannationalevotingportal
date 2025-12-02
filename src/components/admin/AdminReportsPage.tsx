import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BarChart, Download, FileText } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

interface VoteRecord {
  voteID: string;
  electionID: string;
  candidateID: string;
  timestamp: string;
}

interface ResultRecord {
  candidateID: string;
  candidateName: string;
  party: string;
  voteCount: number;
  percentage: number;
}

export default function AdminReportsPage() {
  const navigate = useNavigate();

  // Mock Vote data (from Votes table)
  const [votes] = useState<VoteRecord[]>([
    { voteID: 'VOTE-001', electionID: 'ELECTION-2025-001', candidateID: 'CAND-001', timestamp: '2025-01-15T10:30:00' },
    { voteID: 'VOTE-002', electionID: 'ELECTION-2025-001', candidateID: 'CAND-002', timestamp: '2025-01-15T11:15:00' },
    { voteID: 'VOTE-003', electionID: 'ELECTION-2025-001', candidateID: 'CAND-002', timestamp: '2025-01-15T12:00:00' },
    { voteID: 'VOTE-004', electionID: 'ELECTION-2025-001', candidateID: 'CAND-003', timestamp: '2025-01-15T13:45:00' },
    { voteID: 'VOTE-005', electionID: 'ELECTION-2025-001', candidateID: 'CAND-001', timestamp: '2025-01-15T14:20:00' },
  ]);

  // Aggregated Results (from Results table)
  const [results] = useState<ResultRecord[]>([
    { candidateID: 'CAND-001', candidateName: 'Candidate A', party: 'Demo Party Alpha', voteCount: 3542, percentage: 29.1 },
    { candidateID: 'CAND-002', candidateName: 'Candidate B', party: 'Demo Party Beta', voteCount: 4123, percentage: 33.8 },
    { candidateID: 'CAND-003', candidateName: 'Candidate C', party: 'Demo Party Gamma', voteCount: 2891, percentage: 23.7 },
    { candidateID: 'CAND-004', candidateName: 'Candidate D', party: 'Demo Party Delta', voteCount: 1764, percentage: 14.5 },
  ]);

  const totalVotes = results.reduce((sum, r) => sum + r.voteCount, 0);
  const winner = results.reduce((prev, current) => (current.voteCount > prev.voteCount ? current : prev));

  const generateReport = () => {
    const reportText = `
═══════════════════════════════════════
    ELECTION RESULTS REPORT
    National E-Voting Portal (Demo)
═══════════════════════════════════════

Election: Mock Lok Sabha Elections 2025
Election ID: ELECTION-2025-001
Constituency: Demo Constituency 001
Report Generated: ${new Date().toLocaleString('en-IN')}

═══════════════════════════════════════
SUMMARY
═══════════════════════════════════════

Total Votes Cast: ${totalVotes.toLocaleString()}
Total Candidates: ${results.length}
Winner: ${winner.candidateName} (${winner.party})
Winning Votes: ${winner.voteCount.toLocaleString()} (${winner.percentage}%)

═══════════════════════════════════════
DETAILED RESULTS
═══════════════════════════════════════

${results.sort((a, b) => b.voteCount - a.voteCount).map((r, i) => `
${i + 1}. ${r.candidateName}
   Candidate ID: ${r.candidateID}
   Party: ${r.party}
   Votes: ${r.voteCount.toLocaleString()}
   Percentage: ${r.percentage}%
`).join('\n')}

═══════════════════════════════════════
VOTE RECORDS (Sample)
═══════════════════════════════════════

${votes.slice(0, 10).map(v => `
Vote ID: ${v.voteID}
Candidate ID: ${v.candidateID}
Timestamp: ${new Date(v.timestamp).toLocaleString('en-IN')}
`).join('\n')}

═══════════════════════════════════════
This is a demo report for educational purposes only.
═══════════════════════════════════════
    `;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `election-report-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

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
                <h1 className="text-[#002B5B]">Results & Reports</h1>
                <p className="text-gray-600">Election results, vote analysis, and report generation</p>
              </div>
            </div>
            <Button onClick={generateReport}>
              <Download className="size-4 mr-2" />
              Generate Report
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Votes Cast</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl text-[#002B5B]">{totalVotes.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Candidates</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl text-[#002B5B]">{results.length}</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#FF9933]">
              <CardHeader className="pb-3">
                <CardDescription>Winner</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xl text-[#002B5B]">{winner.candidateName}</p>
                <p className="text-sm text-gray-600">{winner.voteCount.toLocaleString()} votes</p>
              </CardContent>
            </Card>
          </div>

          {/* Results Table */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-[#002B5B] flex items-center gap-2">
                <BarChart className="size-5" />
                Results Summary
              </CardTitle>
              <CardDescription>Aggregated vote counts from Results table</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {results.sort((a, b) => b.voteCount - a.voteCount).map((result, index) => (
                  <div key={result.candidateID} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-[#002B5B]">{result.candidateName}</h3>
                          <p className="text-sm text-gray-600">{result.party}</p>
                          <p className="text-xs text-gray-400 font-mono">{result.candidateID}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl text-[#002B5B]">{result.voteCount.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{result.percentage}%</p>
                      </div>
                    </div>
                    <Progress value={result.percentage} className="h-3" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Votes Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#002B5B] flex items-center gap-2">
                <FileText className="size-5" />
                Vote Records
              </CardTitle>
              <CardDescription>
                Individual vote entries from Votes table (showing latest 10)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vote ID</TableHead>
                    <TableHead>Election ID</TableHead>
                    <TableHead>Candidate ID</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {votes.slice(0, 10).map((vote) => (
                    <TableRow key={vote.voteID}>
                      <TableCell className="font-mono text-sm">{vote.voteID}</TableCell>
                      <TableCell className="font-mono text-sm">{vote.electionID}</TableCell>
                      <TableCell className="font-mono text-sm">{vote.candidateID}</TableCell>
                      <TableCell className="text-sm">
                        {new Date(vote.timestamp).toLocaleString('en-IN')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
