import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Recycle, Mail, User, MapPin, KeyRound, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/context/CartContext';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', phone: '', society: '', societyCode: '', otp: '' });
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useCart();

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) { setStep(step + 1); return; }
    setIsLoggedIn(true);
    setUser({ name: form.name, email: form.email, society: form.society });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-9 h-9 eco-gradient rounded-lg flex items-center justify-center">
              <Recycle className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">ReCircle Market</span>
          </Link>

          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground mb-2">Step {step} of 3</p>
          <div className="flex gap-2 mb-8">
            {[1,2,3].map(s => (
              <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= step ? 'eco-gradient' : 'bg-muted'}`} />
            ))}
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            {step === 1 && (
              <>
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative mt-1.5">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="name" value={form.name} onChange={e => update('name', e.target.value)}
                      placeholder="Your full name" className="pl-10" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative mt-1.5">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="email" type="email" value={form.email} onChange={e => update('email', e.target.value)}
                      placeholder="your@email.com" className="pl-10" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" value={form.phone} onChange={e => update('phone', e.target.value)}
                    placeholder="+91 98765 43210" className="mt-1.5" required />
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div>
                  <Label htmlFor="society">Society / Community Name</Label>
                  <div className="relative mt-1.5">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="society" value={form.society} onChange={e => update('society', e.target.value)}
                      placeholder="e.g. Green Valley Apartments" className="pl-10" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="code">Society Code (optional)</Label>
                  <div className="relative mt-1.5">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="code" value={form.societyCode} onChange={e => update('societyCode', e.target.value)}
                      placeholder="Enter code if you have one" className="pl-10" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Your listings will be visible to members of this society first.</p>
              </>
            )}
            {step === 3 && (
              <>
                <p className="text-sm text-muted-foreground">OTP sent to <strong className="text-foreground">{form.email}</strong></p>
                <div>
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input id="otp" value={form.otp} onChange={e => update('otp', e.target.value)}
                    placeholder="Enter 6-digit OTP" className="mt-1.5 text-center text-lg tracking-widest" maxLength={6} required />
                </div>
              </>
            )}
            <Button type="submit" className="w-full" size="lg">
              {step < 3 ? 'Continue' : 'Create Account'} <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            {step > 1 && (
              <button type="button" onClick={() => setStep(step - 1)} className="text-sm text-primary hover:underline w-full text-center">
                Go back
              </button>
            )}
          </form>

          <p className="text-sm text-muted-foreground text-center mt-8">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Login</Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 eco-gradient items-center justify-center p-12">
        <div className="text-primary-foreground text-center max-w-md">
          <Recycle className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="font-display text-3xl font-bold mb-4">Sustainability Mission</h2>
          <p className="opacity-80 leading-relaxed">Join thousands of community members reducing waste, saving food, and building a circular economy — one item at a time.</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
