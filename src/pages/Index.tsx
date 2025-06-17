
import { useState } from "react";
import AuthModal from "@/components/AuthModal";
import UserDashboard from "@/components/UserDashboard";
import PoliceDashboard from "@/components/PoliceDashboard";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import FeaturesSection from "@/components/FeaturesSection";
import CallToActionSection from "@/components/CallToActionSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [authModal, setAuthModal] = useState({ open: false, type: 'user' as 'user' | 'police' });
  const [currentUser, setCurrentUser] = useState<{ 
    type: 'user' | 'police'; 
    name: string; 
  } | null>(null);

  const handleLogin = (user: { type: 'user' | 'police'; name: string }) => {
    setCurrentUser(user);
  };

  const handleUserLogin = () => {
    setAuthModal({ open: true, type: 'user' });
  };

  const handlePoliceLogin = () => {
    setAuthModal({ open: true, type: 'police' });
  };

  const handleGetStarted = () => {
    setAuthModal({ open: true, type: 'user' });
  };

  if (currentUser) {
    if (currentUser.type === 'user') {
      return <UserDashboard user={currentUser} onLogout={() => setCurrentUser(null)} />;
    } else {
      return <PoliceDashboard user={currentUser} onLogout={() => setCurrentUser(null)} />;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 to-white">
      <Header 
        onUserLogin={handleUserLogin}
        onPoliceLogin={handlePoliceLogin}
      />
      
      <HeroSection onGetStarted={handleGetStarted} />
      
      <StatsSection />
      
      <FeaturesSection />
      
      <CallToActionSection onGetStarted={handleGetStarted} />
      
      <Footer />

      <AuthModal 
        open={authModal.open}
        onClose={() => setAuthModal({ ...authModal, open: false })}
        type={authModal.type}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Index;
