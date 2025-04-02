import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import Auth from './pages/Auth';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import VendorTerms from './pages/VendorTerms';
import VendorDashboard from './pages/VendorDashboard';
import VendorShop from './pages/VendorShop';
import OrderManagement from './pages/OrderManagement';
import CustomerManagement from './pages/CustomerManagement';
import ProductListing from './pages/ProductListing';
import PublicProducts from './pages/PublicProducts';
import GroupBuyList from './pages/GroupBuyList';
import LeaderBoard from './pages/LeaderBoard';
import VendorShops from './pages/VendorShops';
import Analytics from './pages/Analytics';
import Messaging from './pages/Messaging';
import VendorSignup from './pages/VendorSignup';
import { useAuthStore } from './store/authStore';

function App() {
  const { isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/vendor-terms" element={<VendorTerms />} />
            <Route path="/products" element={<PublicProducts />} />
            <Route path="/group-buys" element={<GroupBuyList />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="/vendors" element={<VendorShops />} />
            <Route path="/vendor-signup" element={<VendorSignup />} />
            <Route path="/vendor/dashboard" element={<VendorDashboard />} />
            <Route path="/vendor/products" element={<ProductListing />} />
            <Route path="/vendor/orders" element={<OrderManagement />} />
            <Route path="/vendor/customers" element={<CustomerManagement />} />
            <Route path="/vendor/analytics" element={<Analytics />} />
            <Route path="/messages" element={<Messaging />} />
            <Route path="/shop/:vendorId" element={<VendorShop />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;