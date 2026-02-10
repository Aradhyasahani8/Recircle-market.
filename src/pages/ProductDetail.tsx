import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Star, MapPin, Clock, ArrowLeft, MessageCircle, Leaf, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { products } from '@/data/mockData';
import { useCart } from '@/context/CartContext';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist, isInCart, isLoggedIn } = useCart();
  const product = products.find(p => p.id === id);

  if (!product) return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-foreground">Product not found</h1>
        <Link to="/buy"><Button className="mt-4">Browse Items</Button></Link>
      </div>
      <Footer />
    </div>
  );

  const handleBuyNow = () => {
    if (!isLoggedIn) { navigate('/login'); return; }
    addToCart(product);
    navigate('/checkout');
  };

  const wishlisted = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-square bg-muted">
            <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
            {product.isExpiringSoon && (
              <span className="absolute top-4 left-4 bg-secondary text-secondary-foreground text-sm font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                <Clock className="w-4 h-4" /> Expiring Soon
              </span>
            )}
            <button onClick={() => toggleWishlist(product)}
              className="absolute top-4 right-4 w-10 h-10 bg-card/90 backdrop-blur rounded-full flex items-center justify-center hover:scale-110 transition-transform">
              <Heart className={`w-5 h-5 ${wishlisted ? 'text-destructive fill-destructive' : 'text-muted-foreground'}`} />
            </button>
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product.condition && <span className="text-xs bg-muted text-foreground px-2.5 py-1 rounded-full font-medium">{product.condition}</span>}
              {product.isFree && <span className="text-xs bg-primary text-primary-foreground px-2.5 py-1 rounded-full font-bold">FREE</span>}
            </div>

            <h1 className="font-display text-3xl font-bold text-foreground mb-2">{product.title}</h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{product.location}</span>
              <span>{product.postedAt}</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-4xl font-bold text-primary">
                {product.isFree ? 'Free' : `₹${product.price.toLocaleString()}`}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
              )}
              {product.originalPrice && (
                <span className="text-sm bg-secondary/10 text-secondary font-bold px-2 py-0.5 rounded">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            {product.expiryDate && (
              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-4 mb-6">
                <p className="text-sm font-medium text-secondary">⚠️ Expiry Date: {new Date(product.expiryDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
            )}

            <p className="text-foreground leading-relaxed mb-6">{product.description}</p>

            {product.co2Saved && (
              <div className="flex items-center gap-2 text-sm text-primary mb-6 eco-light-bg rounded-lg px-4 py-3">
                <Leaf className="w-4 h-4" />
                <span>Buying this saves approximately <strong>{product.co2Saved} kg CO₂</strong></span>
              </div>
            )}

            {/* Seller */}
            <div className="border border-border rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 eco-gradient rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  {product.seller.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{product.seller.name}</p>
                  <p className="text-sm text-muted-foreground">{product.seller.society}</p>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-secondary text-secondary" />
                  <span className="font-medium text-foreground">{product.seller.rating}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <Button size="lg" className="flex-1" onClick={handleBuyNow}>
                  Buy Now
                </Button>
                <Button size="lg" variant={inCart ? 'outline' : 'secondary'} className="flex-1" onClick={() => addToCart(product)}>
                  <ShoppingCart className="w-4 h-4 mr-2" />{inCart ? 'In Cart' : 'Add to Cart'}
                </Button>
              </div>
              <div className="flex gap-3">
                <Link to="/chat" className="flex-1">
                  <Button size="lg" variant="outline" className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" /> Chat with Seller
                  </Button>
                </Link>
                <Button size="lg" variant="ghost">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
