import { useState } from 'react';
import { ChevronDown, Mail, Phone, Shield, HelpCircle, FileText, AlertTriangle, MessageCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

const faqs = [
  { q: 'How do I buy an item?', a: 'Browse items in the Buy section, click on an item you like, add it to cart or click Buy Now. You\'ll go through checkout with delivery and payment details.' },
  { q: 'How do I sell something?', a: 'Click "Sell" in the navigation bar, choose a category, upload photos, add description and price, then post your listing. It will be visible to your society members first.' },
  { q: 'How does the society-first model work?', a: 'Your listing is first visible only to your residential society members. If it\'s not sold within the specified time, it automatically becomes visible to nearby societies and communities.' },
  { q: 'How do I sell waste for recycling?', a: 'Go to Sell → Waste to Value. Upload photos of your waste, select the type (e-waste, plastic, paper, etc.), estimate weight, and post. Verified recyclers will contact you.' },
  { q: 'Are near-expiry food items safe?', a: 'All near-expiry items clearly display their expiry date. We recommend checking dates carefully. Items past their expiry are automatically removed from the platform.' },
  { q: 'How do refunds work?', a: 'For Eco-Made Store items, we offer full refunds within 7 days. For second-hand items, discuss returns with the seller through in-app chat before purchase.' },
  { q: 'How is my data protected?', a: 'We use encryption for all data, secure payment gateways, and never share your personal information. Chat messages are stored securely and only visible to participants.' },
  { q: 'How do I report a problem?', a: 'Go to Help & Support → Raise Complaint. Describe your issue and our team will respond within 24 hours.' },
];

const Help = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="font-display text-4xl font-bold text-foreground mb-2">Help & Support</h1>
        <p className="text-muted-foreground mb-10">Find answers to common questions or reach out to our support team</p>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: <HelpCircle className="w-6 h-6" />, label: 'FAQs', desc: 'Common questions' },
            { icon: <Shield className="w-6 h-6" />, label: 'Safety', desc: 'Guidelines & tips' },
            { icon: <FileText className="w-6 h-6" />, label: 'Policies', desc: 'Terms & privacy' },
            { icon: <AlertTriangle className="w-6 h-6" />, label: 'Report', desc: 'Raise complaint' },
          ].map((item, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 eco-gradient rounded-xl flex items-center justify-center text-primary-foreground mx-auto mb-3">{item.icon}</div>
              <p className="font-semibold text-foreground text-sm">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between">
                  <span className="font-medium text-foreground pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Security & Trust */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">🔐 Security & Trust</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Verified Sellers & Recyclers', desc: 'All sellers are verified through society codes. Recyclers are vetted for proper certification.' },
              { title: 'Ratings & Reviews', desc: 'Community-driven ratings help you make informed buying decisions.' },
              { title: 'Secure Payments', desc: 'All payments processed through encrypted, secure payment gateways.' },
              { title: 'Chat Moderation', desc: 'Automated and manual moderation to ensure safe communication.' },
              { title: 'Data Privacy', desc: 'Your data is encrypted and never shared with third parties.' },
              { title: 'Dispute Resolution', desc: 'Dedicated support team for resolving any transaction disputes.' },
            ].map((item, i) => (
              <div key={i} className="bg-muted/50 rounded-xl p-4">
                <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="eco-gradient rounded-2xl p-8 text-center text-primary-foreground">
          <h2 className="font-display text-2xl font-bold mb-2">Still need help?</h2>
          <p className="text-primary-foreground/80 mb-6">Our support team is here to help you</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero-outline" size="lg">
              <Mail className="w-4 h-4 mr-2" /> Email Support
            </Button>
            <Button variant="hero-outline" size="lg">
              <Phone className="w-4 h-4 mr-2" /> Call Us
            </Button>
            <Button variant="hero-outline" size="lg">
              <MessageCircle className="w-4 h-4 mr-2" /> Live Chat
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Help;
