
import React, { useEffect, useState } from 'react';
import { checkFaviconHealth } from '../../utils/faviconManager';

const FaviconHealthMonitor: React.FC = () => {
  const [faviconStatus, setFaviconStatus] = useState<'loading' | 'healthy' | 'error'>('loading');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const isHealthy = await checkFaviconHealth();
        setFaviconStatus(isHealthy ? 'healthy' : 'error');
      } catch (error) {
        console.error('Favicon health check failed:', error);
        setFaviconStatus('error');
      }
    };

    // Initial check
    checkHealth();

    // Check every 5 minutes
    const interval = setInterval(checkHealth, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Only show in development or when there's an error
  if (process.env.NODE_ENV === 'production' && faviconStatus === 'healthy') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {faviconStatus === 'error' && (
        <div className="bg-red-500 text-white px-3 py-2 rounded-md text-sm">
          ⚠️ Favicon loading issue detected
        </div>
      )}
      {faviconStatus === 'loading' && process.env.NODE_ENV === 'development' && (
        <div className="bg-yellow-500 text-white px-3 py-2 rounded-md text-sm">
          🔄 Checking favicon health...
        </div>
      )}
      {faviconStatus === 'healthy' && process.env.NODE_ENV === 'development' && (
        <div className="bg-green-500 text-white px-3 py-2 rounded-md text-sm">
          ✅ Favicon healthy
        </div>
      )}
    </div>
  );
};

export default FaviconHealthMonitor;
