import { useNavigate } from 'react-router-dom';
import { CheckCircle, Download, ArrowLeft } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

export default function ConfirmationPage() {
  const navigate = useNavigate();
  
  const voteReceipt = JSON.parse(sessionStorage.getItem('voteReceipt') || '{}');
  const receiptID = voteReceipt.receiptID || 'RECEIPT-DEMO-123456';
  const confirmationHash = voteReceipt.confirmationHash || 'HASH-DEMO-ABCDEF';
  const timestamp = voteReceipt.timestamp || new Date().toLocaleString('en-IN');

  const handleDownloadReceipt = () => {
    const receiptText = `
═══════════════════════════════════════
    DEMO VOTE RECEIPT
    National E-Voting Portal
═══════════════════════════════════════

Receipt ID: ${receiptID}
Confirmation Hash: ${confirmationHash}
Date & Time: ${timestamp}

Election: Mock Lok Sabha Elections 2025
Election ID: ELECTION-2025-001
Constituency: Demo Constituency 001

═══════════════════════════════════════

Your vote has been recorded successfully.

This is a DEMO receipt for educational 
purposes only. Not a real election receipt.

Important: Keep this receipt for 
verification purposes. Do not share the
confirmation hash with anyone.

Thank you for participating!
═══════════════════════════════════════
    `;

    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vote-receipt-${receiptID}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header showNav={false} />
      
      <main className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center size-20 bg-green-100 rounded-full mb-4">
                <CheckCircle className="size-10 text-green-600" />
              </div>
              <h1 className="text-[#002B5B] mb-2">Vote Successfully Recorded</h1>
              <p className="text-gray-600">
                Thank you for participating in the democratic process
              </p>
            </div>

            <Card className="border-2 border-green-500 mb-6">
              <CardContent className="pt-6">
                <div className="bg-green-50 rounded-lg p-6 mb-6">
                  <div className="text-center mb-6">
                    <p className="text-sm text-gray-600 mb-2">Vote Receipt</p>
                    <p className="text-xs text-gray-500 mb-4">Keep this information secure</p>
                  </div>
                  
                  <div className="space-y-4 bg-white rounded-lg p-4 border border-green-200">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Receipt ID</p>
                      <p className="text-sm text-[#002B5B] font-mono break-all">{receiptID}</p>
                    </div>
                    <div className="border-t pt-3">
                      <p className="text-xs text-gray-500 mb-1">Confirmation Hash</p>
                      <p className="text-sm text-[#002B5B] font-mono break-all">{confirmationHash}</p>
                    </div>
                    <div className="border-t pt-3">
                      <p className="text-xs text-gray-500 mb-1">Timestamp</p>
                      <p className="text-sm text-[#002B5B]">{timestamp}</p>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-green-200 pt-4 space-y-2 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Election ID:</span>
                      <span className="text-[#002B5B] font-mono">ELECTION-2025-001</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Constituency:</span>
                      <span className="text-[#002B5B]">Demo Constituency 001</span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-amber-900">
                    <span className="font-semibold">Important:</span> Save your Receipt ID and Confirmation Hash for future verification. 
                    This is a demo receipt for educational purposes only.
                  </p>
                </div>

                <Button 
                  onClick={handleDownloadReceipt}
                  variant="outline"
                  className="w-full border-[#002B5B] text-[#002B5B] hover:bg-blue-50"
                >
                  <Download className="size-4 mr-2" />
                  Download Vote Receipt
                </Button>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-[#002B5B] hover:bg-[#003D7A]"
              >
                <ArrowLeft className="size-4 mr-2" />
                Return to Dashboard
              </Button>
              <Button
                onClick={() => navigate('/results')}
                variant="outline"
                className="flex-1 border-[#002B5B] text-[#002B5B] hover:bg-blue-50"
              >
                View Election Results
              </Button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-[#002B5B] mb-2">What Happens Next?</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF9933] mt-1">•</span>
                  <span>Your demo vote is securely recorded in the system</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF9933] mt-1">•</span>
                  <span>Results will be announced after the voting window closes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF9933] mt-1">•</span>
                  <span>Use your confirmation hash to verify your vote was counted</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}