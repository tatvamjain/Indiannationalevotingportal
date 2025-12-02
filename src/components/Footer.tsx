import { AlertCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="size-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-900">
              <span className="font-semibold">Disclaimer:</span> This is a mock interface for demonstration and educational purposes only. 
              This is NOT an official government website. No real Aadhaar data, UIDAI services, or Election Commission systems are used.
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 mb-4 text-sm">
          <button onClick={(e) => e.preventDefault()} className="text-gray-600 hover:text-[#002B5B] transition-colors">
            About
          </button>
          <button onClick={(e) => e.preventDefault()} className="text-gray-600 hover:text-[#002B5B] transition-colors">
            Help
          </button>
          <button onClick={(e) => e.preventDefault()} className="text-gray-600 hover:text-[#002B5B] transition-colors">
            Contact
          </button>
          <button onClick={(e) => e.preventDefault()} className="text-gray-600 hover:text-[#002B5B] transition-colors">
            Privacy
          </button>
        </div>
        
        <p className="text-center text-sm text-gray-500">
          © 2025 Demo E-Voting Portal. Educational demonstration only.
        </p>
      </div>
    </footer>
  );
}
