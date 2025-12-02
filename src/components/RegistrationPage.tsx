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

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    aadhaar: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.aadhaar || !formData.phone) {
      toast.error('Please fill all required fields');
      return;
    }

    if (formData.aadhaar.length !== 12) {
      toast.error('Aadhaar number must be 12 digits');
      return;
    }

    if (formData.phone.length !== 10) {
      toast.error('Mobile number must be 10 digits');
      return;
    }

    // Store registration data for later use
    sessionStorage.setItem('registrationData', JSON.stringify(formData));
    
    toast.success('Registration data validated');
    navigate('/verify-otp');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#002B5B]">Voter Registration</CardTitle>
                <CardDescription>Register for the Mock Lok Sabha Elections 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 flex items-start gap-2">
                  <AlertCircle className="size-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-900">
                    This is a demo only. No real Aadhaar data is used or stored.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="aadhaar">Aadhaar Number (Demo)</Label>
                    <Input
                      id="aadhaar"
                      type="text"
                      placeholder="XXXX XXXX XXXX"
                      maxLength={12}
                      value={formData.aadhaar}
                      onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value.replace(/\D/g, '') })}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">12-digit number (any digits for demo)</p>
                  </div>

                  <div>
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                      className="mt-1"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-[#002B5B] hover:bg-[#003D7A]">
                    Send OTP (Demo)
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}