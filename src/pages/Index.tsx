import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Users, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { categories, products, impactStats } from '@/data/mockData';
import heroBg from '@/assets/hero-bg.jpg';

const Index = () => {
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="max-w-2xl">
            <span className="inline-block bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              🌍 Sustainable Marketplace & Circular Economy
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              A Smarter Way to <span className="text-secondary">Buy, Sell & Reuse</span> — Within Your Community
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8 max-w-xl">
              ReCircle Market is a digital marketplace designed to reduce waste and promote sustainable consumption. Buy, sell, donate, and recycle items — starting within your own society.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/buy">
                <Button size="lg" variant="hero">
                  Start Reusing <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/sell">
                <Button size="lg" variant="hero-outline">
                  List an Item
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 eco-light-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { label: 'Food Saved', value: impactStats.foodSaved, icon: <Leaf className="w-5 h-5" /> },
              { label: 'Items Reused', value: impactStats.itemsReused, icon: <TrendingDown className="w-5 h-5" /> },
              { label: 'Waste Recycled', value: impactStats.wasteRecycled, icon: <Leaf className="w-5 h-5" /> },
              { label: 'CO₂ Reduced', value: impactStats.co2Reduced, icon: <TrendingDown className="w-5 h-5" /> },
              { label: 'Communities', value: impactStats.communitiesActive.toString(), icon: <Users className="w-5 h-5" /> },
              { label: 'Users', value: impactStats.totalUsers.toLocaleString(), icon: <Users className="w-5 h-5" /> },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 eco-gradient rounded-lg flex items-center justify-center text-primary-foreground">
                  {stat.icon}
                </div>
                <p className="font-display font-bold text-xl text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Explore Categories</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Find what you need or give what you don't — all within your community</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                <Link to={`/category/${cat.id}`}
                  className="block group bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                  <span className="text-4xl mb-4 block">{cat.icon}</span>
                  <h3 className="font-display font-bold text-lg text-foreground mb-1">{cat.title}</h3>
                  <p className="text-sm text-primary font-medium mb-2">{cat.subtitle}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cat.description}</p>
                  <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 eco-light-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-2">Featured Listings</h2>
              <p className="text-muted-foreground">Latest items from your community</p>
            </div>
            <Link to="/buy"><Button variant="outline">View All <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Society First */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="eco-gradient rounded-3xl p-8 md:p-16 text-center text-primary-foreground">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Society-First Visibility</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg mb-8">
              Your listings are first seen by your own society members. If unsold, they gradually expand to nearby communities — maximizing convenience and reducing waste.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { step: '1', title: 'List in Society', desc: 'Item visible to your society first' },
                { step: '2', title: 'Expand Nearby', desc: 'Auto-expand to nearby communities' },
                { step: '3', title: 'Local Communities', desc: 'Reach wider local audience' },
              ].map(s => (
                <div key={s.step} className="bg-primary-foreground/10 backdrop-blur rounded-xl p-6">
                  <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center font-display font-bold text-lg mx-auto mb-3">{s.step}</div>
                  <h4 className="font-semibold mb-1">{s.title}</h4>
                  <p className="text-sm text-primary-foreground/70">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
