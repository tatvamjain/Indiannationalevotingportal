import { Link } from 'react-router-dom';
import { Vote, Shield, Clock, CheckCircle, BarChart } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { Button } from './ui/button';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#002B5B] to-[#004080] text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
                <div className="size-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Demo System Active</span>
              </div>
              
              <h1 className="text-white mb-4">
                National E-Voting Portal
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Secure, transparent, and accessible digital voting for the Mock Lok Sabha Elections 2025
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" className="bg-[#FF9933] hover:bg-[#E88A2E] text-white border-0">
                    Register to Vote
                  </Button>
                </Link>
                <Link to="/results">
                  <Button size="lg" variant="outline" className="bg-white text-[#002B5B] border-white hover:bg-gray-100">
                    <BarChart className="size-4 mr-2" />
                    View Results
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-[#002B5B] mb-12">
              Why E-Voting?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center p-6">
                <div className="bg-blue-50 size-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="size-8 text-[#002B5B]" />
                </div>
                <h3 className="text-[#002B5B] mb-2">Secure</h3>
                <p className="text-gray-600">
                  Demo Aadhaar-based verification ensures voter authenticity in this educational simulation
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-orange-50 size-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="size-8 text-[#FF9933]" />
                </div>
                <h3 className="text-[#002B5B] mb-2">Convenient</h3>
                <p className="text-gray-600">
                  Cast your demo vote from anywhere, anytime during the voting window
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-green-50 size-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="size-8 text-green-600" />
                </div>
                <h3 className="text-[#002B5B] mb-2">Transparent</h3>
                <p className="text-gray-600">
                  Receive instant confirmation with a demo vote receipt for your records
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-[#002B5B] mb-12">
              How It Works
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                {[
                  { step: '1', title: 'Register', desc: 'Enter your demo details (Name, Aadhaar, Mobile)' },
                  { step: '2', title: 'Verify OTP', desc: 'Verify with mock OTP sent to your mobile' },
                  { step: '3', title: 'Vote', desc: 'Select your preferred candidate from the ballot' },
                  { step: '4', title: 'View Results', desc: 'Check live election results and vote distribution' }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 items-start">
                    <div className="bg-[#FF9933] text-white size-12 rounded-full flex items-center justify-center flex-shrink-0">
                      {item.step}
                    </div>
                    <div className="pt-2">
                      <h3 className="text-[#002B5B] mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
