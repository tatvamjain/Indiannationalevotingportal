import { useState } from 'react';
import { Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useLanguage } from '../utils/i18n/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission - just show success message
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#002B5B] mb-4 tracking-tight">
              {t.contactPageTitle}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.contactPageSubtitle}
            </p>
          </div>

          {/* Contact Information Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Support Email */}
            <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,43,91,0.08)] border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 size-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="size-6 text-[#002B5B]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#002B5B] mb-2">
                    {t.supportEmail}
                  </h3>
                  <a 
                    href="mailto:demo-support@evoting.in" 
                    className="text-[#FF9933] hover:underline"
                  >
                    demo-support@evoting.in
                  </a>
                </div>
              </div>
            </div>

            {/* Phone Number */}
            <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(0,43,91,0.08)] border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 size-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="size-6 text-[#FF9933]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#002B5B] mb-2">
                    {t.phoneDemo}
                  </h3>
                  <p className="text-gray-700 mb-1">+91-00000-00000</p>
                  <p className="text-sm text-gray-500">{t.demoPhoneDisclaimer}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Form */}
          <div className="bg-white p-8 rounded-xl shadow-[0_4px_24px_rgba(0,43,91,0.1)] border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 size-12 rounded-lg flex items-center justify-center">
                <MessageSquare className="size-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-[#002B5B]">
                {t.feedbackForm}
              </h2>
            </div>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <CheckCircle className="size-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  {t.formSubmittedTitle}
                </h3>
                <p className="text-green-700">
                  {t.formSubmittedMessage}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.yourName}
                  </label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full"
                    placeholder={t.yourName}
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.yourEmail}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full"
                    placeholder={t.yourEmail}
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.yourMessage}
                  </label>
                  <Textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full min-h-[150px] resize-none"
                    placeholder={t.messagePlaceholder}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-[#FF9933] hover:bg-[#E88A2E] text-white shadow-md"
                >
                  {t.sendMessage}
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
