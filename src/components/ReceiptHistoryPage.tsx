import { useNavigate } from 'react-router-dom';
import { Receipt, ArrowLeft, Download } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export default function ReceiptHistoryPage() {
  const navigate = useNavigate();
  
  const voteReceipt = JSON.parse(sessionStorage.getItem('voteReceipt') || '{}');
  const hasVoted = sessionStorage.getItem('hasVoted') === 'true';

  const receipts = hasVoted && voteReceipt.receiptID ? [voteReceipt] : [];

  const handleDownload = (receipt: any) => {
    const receiptText = `
═══════════════════════════════════════
    DEMO VOTE RECEIPT
    National E-Voting Portal
═══════════════════════════════════════

Receipt ID: ${receipt.receiptID}
Confirmation Hash: ${receipt.confirmationHash}
Date & Time: ${receipt.timestamp}

Election: Mock Lok Sabha Elections 2025
Election ID: ELECTION-2025-001

═══════════════════════════════════════
This is a demo receipt for educational purposes only.
═══════════════════════════════════════
    `;

    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vote-receipt-${receipt.receiptID}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header showNav={false} />
      
      <main className="flex-1 py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
                size="sm"
              >
                <ArrowLeft className="size-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-[#002B5B]">Receipt History</h1>
                <p className="text-gray-600">Your vote receipts and confirmations</p>
              </div>
            </div>

            {receipts.length > 0 ? (
              <div className="space-y-4">
                {receipts.map((receipt) => (
                  <Card key={receipt.receiptID}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-[#002B5B] flex items-center gap-2">
                          <Receipt className="size-5" />
                          Vote Receipt
                        </CardTitle>
                        <Badge className="bg-green-500">Verified</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Receipt ID</p>
                            <p className="text-sm text-[#002B5B] font-mono break-all bg-gray-50 p-2 rounded">
                              {receipt.receiptID}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Confirmation Hash</p>
                            <p className="text-sm text-[#002B5B] font-mono break-all bg-gray-50 p-2 rounded">
                              {receipt.confirmationHash}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Timestamp</p>
                            <p className="text-sm text-[#002B5B]">{receipt.timestamp}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Election</p>
                            <p className="text-sm text-[#002B5B]">Mock Lok Sabha Elections 2025</p>
                            <p className="text-xs text-gray-500 font-mono">ELECTION-2025-001</p>
                          </div>
                          <Button
                            onClick={() => handleDownload(receipt)}
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            <Download className="size-4 mr-2" />
                            Download Receipt
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Receipt className="size-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-gray-600 mb-2">No Receipts Found</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    You haven't voted yet. Cast your vote to generate a receipt.
                  </p>
                  <Button onClick={() => navigate('/dashboard')}>
                    Go to Dashboard
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
