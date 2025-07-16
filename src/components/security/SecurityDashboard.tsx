import React, { useState, useEffect } from 'react';
import { securityMonitor } from '@/utils/securityMonitor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, Activity, Lock } from 'lucide-react';
const SecurityDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>({});
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // Only show in development or if explicitly enabled
    const showDashboard = process.env.NODE_ENV === 'development' || localStorage.getItem('mylli_show_security_dashboard') === 'true';
    setIsVisible(showDashboard);
    if (showDashboard) {
      const updateStats = () => {
        setStats(securityMonitor.getSecurityStats());
      };
      updateStats();
      const interval = setInterval(updateStats, 30000); // Update every 30 seconds

      return () => clearInterval(interval);
    }
  }, []);
  if (!isVisible) {
    return null;
  }
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };
  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'default';
      default:
        return 'outline';
    }
  };
  return <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="bg-white/95 backdrop-blur-sm shadow-lg border border-gray-200">
        
        
      </Card>
    </div>;
};
export default SecurityDashboard;