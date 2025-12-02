import { useNavigate } from 'react-router-dom';
import { Settings, Users, BarChart, FileText, Vote, Database } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const adminData = {
    adminID: 'ADMIN-001',
    accessLevel: 'Super Admin',
    name: 'Admin User'
  };

  const stats = [
    { label: 'Total Voters', value: '12,345', icon: Users },
    { label: 'Total Votes Cast', value: '8,432', icon: Vote },
    { label: 'Active Elections', value: '1', icon: Settings },
    { label: 'Total Candidates', value: '4', icon: FileText }
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
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label}>
                  <CardContent className="pt-6">
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