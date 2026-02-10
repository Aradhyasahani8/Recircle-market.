import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Recycle, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/context/CartContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useCart();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setOtpSent(true);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setUser({ name: 'User', email, society: 'Green Valley Apartments' });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-9 h-9 eco-gradient rounded-lg flex items-center justify-center">
              <Recycle className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">ReCircle Market</span>
          </Link>

          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Welcome back</h1>
          <p className="text-muted-foreground mb-8">Login to your account to continue</p>

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <Label htmlFor="email">Email or Phone</Label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email or phone" className="pl-10" required />
                </div>
              </div>
              <Button type="submit" className="w-full" size="lg">
                Send OTP <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4">
              <p className="text-sm text-muted-foreground">OTP sent to <strong className="text-foreground">{email}</strong></p>
              <div>
                <Label htmlFor="otp">Enter OTP</Label>
                <Input id="otp" value={otp} onChange={e => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP" className="mt-1.5 text-center text-lg tracking-widest" maxLength={6} required />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Verify & Login <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <button type="button" onClick={() => setOtpSent(false)} className="text-sm text-primary hover:underline w-full text-center">
                Change email
              </button>
            </form>
          )}

          <p className="text-sm text-muted-foreground text-center mt-8">
            Don't have an account? <Link to="/signup" className="text-primary font-medium hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>

      {/* Right - Decorative */}
      <div className="hidden lg:flex flex-1 eco-gradient items-center justify-center p-12">
        <div className="text-primary-foreground text-center max-w-md">
          <Recycle className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="font-display text-3xl font-bold mb-4">Join Your Community</h2>
          <p className="opacity-80 leading-relaxed">Connect with your residential society, reduce waste, save money, and build a sustainable community together.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
