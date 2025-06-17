
import { useEffect, useState } from 'react';
import PWAInstallPrompt from './PWAInstallPrompt';
import OfflineIndicator from './OfflineIndicator';

const PWAWrapper = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Ensure React is fully initialized and DOM is ready
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Don't render PWA components until React is fully ready
  if (!isReady) {
    return null;
  }

  return (
    <>
      <OfflineIndicator />
      <PWAInstallPrompt />
    </>
  );
};

export default PWAWrapper;
