
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, X, Smartphone, Sparkles } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';

const PWAInstallPrompt = () => {
  const { isInstallable, installPWA } = usePWA();
  const [isVisible, setIsVisible] = useState(true);

  if (!isInstallable || !isVisible) {
    return null;
  }

  const handleInstall = async () => {
    const success = await installPWA();
    if (success) {
      setIsVisible(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <Card className="fixed bottom-6 right-6 z-50 w-80 glass-card border-0 shadow-2xl glow-effect">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-senegal rounded-xl flex items-center justify-center">
              <Smartphone className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-semibold text-white flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-yellow-400" />
              Installer ParkZen
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="text-white/70 hover:text-white hover:bg-white/10 h-8 w-8 p-0 rounded-lg"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-sm text-white/80 mb-6 leading-relaxed">
          Installez ParkZen sur votre appareil pour un accès rapide et une meilleure expérience.
        </p>
        
        <div className="flex space-x-3">
          <Button
            onClick={handleInstall}
            className="button-modern text-white flex-1 font-medium"
            size="sm"
          >
            <Download className="h-4 w-4 mr-2" />
            Installer
          </Button>
          <Button
            onClick={handleDismiss}
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10"
            size="sm"
          >
            Plus tard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PWAInstallPrompt;
