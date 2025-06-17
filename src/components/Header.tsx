
import { Button } from "@/components/ui/button";
import { Shield, Settings, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface HeaderProps {
  onUserLogin: () => void;
  onPoliceLogin: () => void;
}

const Header = ({ onUserLogin, onPoliceLogin }: HeaderProps) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="clean-header sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo et titre */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center p-1 shadow-sm">
              <img 
                src="/lovable-uploads/de0f9bfc-2341-4990-bc41-7469635b17c7.png" 
                alt="KRYPT ID Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-amber-900">ParkZen Dakar</h1>
              <p className="text-sm text-amber-700 hidden sm:block">Stationnement Intelligent</p>
            </div>
          </div>
          
          {/* Navigation desktop */}
          <div className="hidden md:flex space-x-3">
            <Button 
              onClick={() => navigate('/admin')}
              variant="outline"
              className="button-secondary-clean"
            >
              <Settings className="h-4 w-4 mr-2" />
              Administration
            </Button>
            <Button 
              onClick={onUserLogin}
              className="button-primary-clean"
            >
              Connexion Usager
            </Button>
            <Button 
              onClick={onPoliceLogin}
              variant="outline"
              className="button-secondary-clean"
            >
              <Shield className="h-4 w-4 mr-2" />
              Police
            </Button>
          </div>

          {/* Bouton menu mobile */}
          <Button
            variant="outline"
            size="sm"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-amber-100">
            <div className="flex flex-col space-y-2 pt-4">
              <Button 
                onClick={() => {
                  navigate('/admin');
                  setIsMobileMenuOpen(false);
                }}
                variant="outline"
                className="button-secondary-clean w-full justify-start"
              >
                <Settings className="h-4 w-4 mr-2" />
                Administration
              </Button>
              <Button 
                onClick={() => {
                  onUserLogin();
                  setIsMobileMenuOpen(false);
                }}
                className="button-primary-clean w-full"
              >
                Connexion Usager
              </Button>
              <Button 
                onClick={() => {
                  onPoliceLogin();
                  setIsMobileMenuOpen(false);
                }}
                variant="outline"
                className="button-secondary-clean w-full justify-start"
              >
                <Shield className="h-4 w-4 mr-2" />
                Police
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
