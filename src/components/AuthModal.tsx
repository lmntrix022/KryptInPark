
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, User, X } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  type: 'user' | 'police';
  onLogin: (user: { type: 'user' | 'police'; name: string }) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, type, onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (action: 'login' | 'register') => {
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      const userName = formData.name || formData.email.split('@')[0];
      onLogin({ type, name: userName });
      
      // Show success message in console instead of toast
      console.log(`Connexion réussie ! Bienvenue ${userName}`);
      
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50 grid w-full max-w-md gap-4 border bg-white p-6 shadow-lg rounded-lg">
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold leading-none tracking-tight flex items-center gap-2">
              {type === 'police' ? (
                <>
                  <Shield className="h-5 w-5 text-senegal-blue" />
                  Accès Police
                </>
              ) : (
                <>
                  <User className="h-5 w-5 text-senegal-gold" />
                  Espace Usager
                </>
              )}
            </h2>
            <button
              onClick={onClose}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="register">Inscription</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder={type === 'police' ? "agent@police.sn" : "votre.email@example.com"}
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              />
            </div>
            <Button 
              onClick={() => handleSubmit('login')} 
              className={`w-full ${type === 'police' ? 'bg-senegal-blue hover:bg-senegal-blue/90' : 'bg-senegal-gold hover:bg-senegal-gold/90'}`}
              disabled={isLoading}
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                placeholder="Votre nom complet"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-register">Email</Label>
              <Input
                id="email-register"
                type="email"
                placeholder={type === 'police' ? "agent@police.sn" : "votre.email@example.com"}
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-register">Mot de passe</Label>
              <Input
                id="password-register"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              />
            </div>
            <Button 
              onClick={() => handleSubmit('register')} 
              className={`w-full ${type === 'police' ? 'bg-senegal-blue hover:bg-senegal-blue/90' : 'bg-senegal-gold hover:bg-senegal-gold/90'}`}
              disabled={isLoading}
            >
              {isLoading ? 'Inscription...' : "S'inscrire"}
            </Button>
          </TabsContent>
        </Tabs>

        {type === 'police' && (
          <div className="text-center text-sm text-gray-600 border-t pt-4">
            <Shield className="h-4 w-4 inline mr-1" />
            Accès réservé aux agents de police autorisés
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
