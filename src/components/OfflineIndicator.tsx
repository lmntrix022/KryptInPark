
import { WifiOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { usePWA } from '@/hooks/usePWA';

const OfflineIndicator = () => {
  const { isOnline } = usePWA();

  if (isOnline) {
    return null;
  }

  return (
    <Alert className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-auto glass-card border-orange-300/50 glow-effect">
      <WifiOff className="h-5 w-5 text-orange-400" />
      <AlertDescription className="text-white font-medium ml-2">
        Mode hors ligne - Certaines fonctionnalités peuvent être limitées
      </AlertDescription>
    </Alert>
  );
};

export default OfflineIndicator;
