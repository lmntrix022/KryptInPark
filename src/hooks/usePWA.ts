
import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const usePWA = () => {
  // Initialize with safe default values
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(() => {
    // Safe check for navigator.onLine
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });

  useEffect(() => {
    // Early return if we're not in a browser environment
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return;
    }

    // Vérifier si l'app est déjà installée
    const checkIfInstalled = () => {
      try {
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        const isInWebAppiOS = (window.navigator as any).standalone === true;
        setIsInstalled(isStandalone || isInWebAppiOS);
      } catch (error) {
        console.warn('[PWA] Error checking installation status:', error);
      }
    };

    checkIfInstalled();

    // Écouter l'événement beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    // Écouter l'événement appinstalled
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      console.log('[PWA] Application installée avec succès');
    };

    // Écouter les changements de statut en ligne/hors ligne
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const installPWA = async () => {
    if (!deferredPrompt) return false;

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('[PWA] Installation acceptée par l\'utilisateur');
      } else {
        console.log('[PWA] Installation refusée par l\'utilisateur');
      }

      setDeferredPrompt(null);
      setIsInstallable(false);
      return outcome === 'accepted';
    } catch (error) {
      console.error('[PWA] Error during installation:', error);
      return false;
    }
  };

  return {
    isInstallable,
    isInstalled,
    isOnline,
    installPWA
  };
};
