import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { categories, subcategories } from '@/data/mockData';
import { useCart } from '@/context/CartContext';

const Sell = () => {
  const { isLoggedIn } = useCart();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [form, setForm] = useState({ title: '', description: '', price: '', condition: '', subcategory: '', expiryDate: '', weight: '', isFree: false });

  const update = (key: string, value: any) => setForm(prev => ({ ...prev, [key]: value }));
  const subs = subcategories[selectedCategory] || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) { navigate('/login'); return; }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="font-display text-4xl font-bold text-foreground mb-2">List an Item</h1>
        <p className="text-muted-foreground mb-8">Sell, give away, or recycle items within your community</p>

        {/* Category Selection */}
        {!selectedCategory ? (
          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Choose a Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map(cat => (
                <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                  className="text-left bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary transition-all">
                  <span className="text-3xl mb-3 block">{cat.icon}</span>
                  <h3 className="font-display font-bold text-foreground">{cat.title}</h3>
                  <p className="text-sm text-primary">{cat.subtitle}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <button type="button" onClick={() => setSelectedCategory('')} className="text-sm text-primary hover:underline mb-4">
              ← Change category
            </button>

            <div className="bg-muted/50 rounded-xl p-4 flex items-center gap-3">
              <span className="text-2xl">{categories.find(c => c.id === selectedCategory)?.icon}</span>
              <div>
                <p className="font-semibold text-foreground">{categories.find(c => c.id === selectedCategory)?.title}</p>
                <p className="text-sm text-muted-foreground">{categories.find(c => c.id === selectedCategory)?.subtitle}</p>
              </div>
            </div>

            {/* Image upload */}
            <div>
              <Label>Photos</Label>
              <div className="mt-1.5 border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <div className="flex justify-center gap-4 mb-3">
                  <Camera className="w-8 h-8 text-muted-foreground" />
                  <Upload className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">Click to upload or take a photo</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
              </div>
            </div>

            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={form.title} onChange={e => update('title', e.target.value)}
                placeholder="What are you selling?" className="mt-1.5" required />
            </div>

            <div>
              <Label htmlFor="desc">Description</Label>
              <Textarea id="desc" value={form.description} onChange={e => update('description', e.target.value)}
                placeholder="Describe your item in detail..." className="mt-1.5 min-h-[100px]" required />
            </div>

            {subs.length > 0 && (
              <div>
                <Label>Subcategory</Label>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {subs.map(sub => (
                    <button key={sub} type="button" onClick={() => update('subcategory', sub)}
                      className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${form.subcategory === sub ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-foreground hover:bg-muted'}`}>
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedCategory !== 'waste' && (
              <div>
                <Label>Condition</Label>
                <div className="flex gap-2 mt-1.5">
                  {['New', 'Like New', 'Good', 'Used'].map(c => (
                    <button key={c} type="button" onClick={() => update('condition', c)}
                      className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${form.condition === c ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-foreground hover:bg-muted'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price (₹)</Label>
                <Input id="price" type="number" value={form.price} onChange={e => update('price', e.target.value)}
                  placeholder="0" className="mt-1.5" disabled={form.isFree} />
                <label className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <input type="checkbox" checked={form.isFree} onChange={e => update('isFree', e.target.checked)}
                    className="accent-primary" /> Give away for free
                </label>
              </div>
              {(selectedCategory === 'last-chance') && (
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" type="date" value={form.expiryDate} onChange={e => update('expiryDate', e.target.value)}
                    className="mt-1.5" />
                </div>
              )}
              {selectedCategory === 'waste' && (
                <div>
                  <Label htmlFor="weight">Estimated Weight</Label>
                  <Input id="weight" value={form.weight} onChange={e => update('weight', e.target.value)}
                    placeholder="e.g. 5kg" className="mt-1.5" />
                </div>
              )}
            </div>

            <Button type="submit" size="lg" className="w-full">
              Post Listing <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Sell;
