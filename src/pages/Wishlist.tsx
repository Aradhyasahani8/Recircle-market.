import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { useCart } from '@/context/CartContext';

const Wishlist = () => {
  const { wishlist } = useCart();

  if (wishlist.length === 0) return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Your Wishlist is Empty</h1>
        <p className="text-muted-foreground mb-6">Save items you love and get notified about price drops</p>
        <Link to="/buy"><Button size="lg">Browse Items <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">My Wishlist</h1>
        <p className="text-muted-foreground mb-8">{wishlist.length} saved items • Get notified when prices drop</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
