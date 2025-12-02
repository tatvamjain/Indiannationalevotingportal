import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import SupabaseDashboard from '../SupabaseDashboard';
import DatabaseSetup from './DatabaseSetup';
import QuickFixRLS from './QuickFixRLS';
import { createClient } from '../../utils/supabase/client';

export default function SupabaseIntegrationPage() {
  const navigate = useNavigate();
  const [tablesExist, setTablesExist] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);
  const [showRLSFix, setShowRLSFix] = useState(false);

  useEffect(() => {
    checkTables();
  }, []);

  const checkTables = async () => {
    setChecking(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('elections').select('count', { count: 'exact', head: true });
      
      if (error) {
        // Table doesn't exist or other error
        setTablesExist(false);
      } else {
        // Tables exist
        setTablesExist(true);
      }
    } catch (err) {
      console.log('Table check error:', err);
      setTablesExist(false);
    }
    setChecking(false);
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
                <h1 className="text-[#002B5B]">Supabase Backend Integration</h1>
                <p className="text-gray-600">Database architecture and setup</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowRLSFix(!showRLSFix)}
                size="sm"
                className="border-amber-500 text-amber-700"
              >
                {showRLSFix ? 'Hide' : 'Show'} RLS Fix
              </Button>
              <Button
                variant="outline"
                onClick={checkTables}
                disabled={checking}
                size="sm"
              >
                <RefreshCw className={`size-4 mr-2 ${checking ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>

          {showRLSFix && (
            <div className="mb-6">
              <QuickFixRLS />
            </div>
          )}

          <Tabs defaultValue={tablesExist === false ? "setup" : "dashboard"} className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="setup">Database Setup</TabsTrigger>
              <TabsTrigger value="dashboard">Architecture Dashboard</TabsTrigger>
            </TabsList>
            
            <TabsContent value="setup" className="space-y-4">
              <DatabaseSetup />
            </TabsContent>
            
            <TabsContent value="dashboard" className="space-y-4">
              <SupabaseDashboard />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}