import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner@2.0.3';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    aadhaarNumber: '',
    mobileNumber: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.aadhaarNumber || !formData.mobileNumber) {
      toast.error('Please fill all fields');
      return;
    }

    if (formData.aadhaarNumber.length !== 12) {
      toast.error('Aadhaar number must be 12 digits');
      return;
    }

    if (formData.mobileNumber.length !== 10) {
      toast.error('Mobile number must be 10 digits');
      return;
    }

    toast.success('Demo OTP sent to your mobile number');
    
    setTimeout(() => {
      navigate('/verify-otp', { state: { type: 'login' } });
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#002B5B]">Voter Login</CardTitle>
                <CardDescription>Access your voter dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 flex items-start gap-2">
                  <AlertCircle className="size-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-900">
                    This is a demo only. No real Aadhaar verification is performed.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="aadhaar">Aadhaar Number (Demo)</Label>
                    <Input
                      id="aadhaar"
                      type="text"
                      placeholder="XXXX XXXX XXXX"
                      maxLength={12}
                      value={formData.aadhaarNumber}
                      onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value.replace(/\D/g, '') })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value.replace(/\D/g, '') })}
                      className="mt-1"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-[#002B5B] hover:bg-[#003D7A]">
                    Send OTP (Demo)
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Not registered yet?{' '}
                    <a href="/register" className="text-[#002B5B] hover:underline">
                      Register here
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
