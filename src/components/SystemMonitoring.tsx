
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Activity, 
  Cpu, 
  Database, 
  Globe, 
  HardDrive, 
  MemoryStick, 
  Wifi, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Bell,
  Settings,
  RefreshCw
} from "lucide-react";

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  threshold: number;
  icon: any;
}

interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  acknowledged: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface ServiceStatus {
  name: string;
  status: 'online' | 'offline' | 'degraded';
  uptime: number;
  responseTime: number;
  lastCheck: Date;
}

const SystemMonitoring = () => {
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([
    { name: "CPU", value: 45, unit: "%", status: "healthy", threshold: 80, icon: Cpu },
    { name: "Mémoire RAM", value: 68, unit: "%", status: "warning", threshold: 85, icon: MemoryStick },
    { name: "Stockage", value: 34, unit: "%", status: "healthy", threshold: 90, icon: HardDrive },
    { name: "Base de Données", value: 12, unit: "ms", status: "healthy", threshold: 100, icon: Database },
    { name: "Réseau", value: 156, unit: "Mbps", status: "healthy", threshold: 100, icon: Wifi },
    { name: "API Gateway", value: 89, unit: "ms", status: "warning", threshold: 200, icon: Globe }
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "warning",
      title: "Utilisation mémoire élevée",
      message: "L'utilisation de la mémoire RAM a dépassé 65% sur le serveur principal",
      timestamp: new Date(),
      acknowledged: false,
      severity: "medium"
    },
    {
      id: "2",
      type: "error",
      title: "Échec de paiement en série",
      message: "Plus de 5 échecs de paiement consécutifs détectés",
      timestamp: new Date(Date.now() - 300000),
      acknowledged: false,
      severity: "high"
    },
    {
      id: "3",
      type: "info",
      title: "Maintenance programmée",
      message: "Maintenance du système prévue demain à 02:00",
      timestamp: new Date(Date.now() - 600000),
      acknowledged: true,
      severity: "low"
    },
    {
      id: "4",
      type: "success",
      title: "Sauvegarde complétée",
      message: "Sauvegarde automatique des données terminée avec succès",
      timestamp: new Date(Date.now() - 900000),
      acknowledged: true,
      severity: "low"
    }
  ]);

  const [services, setServices] = useState<ServiceStatus[]>([
    {
      name: "API Principale",
      status: "online",
      uptime: 99.95,
      responseTime: 89,
      lastCheck: new Date()
    },
    {
      name: "Base de Données",
      status: "online",
      uptime: 99.99,
      responseTime: 12,
      lastCheck: new Date()
    },
    {
      name: "Service de Paiement",
      status: "degraded",
      uptime: 98.2,
      responseTime: 234,
      lastCheck: new Date(Date.now() - 30000)
    },
    {
      name: "Notifications Push",
      status: "online",
      uptime: 99.8,
      responseTime: 145,
      lastCheck: new Date()
    },
    {
      name: "Géolocalisation",
      status: "online",
      uptime: 99.7,
      responseTime: 67,
      lastCheck: new Date()
    },
    {
      name: "Analytics",
      status: "offline",
      uptime: 95.2,
      responseTime: 0,
      lastCheck: new Date(Date.now() - 120000)
    }
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulation de mise à jour des métriques en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, metric.value + (Math.random() - 0.5) * 10),
        status: metric.value > metric.threshold * 0.9 ? 'critical' : 
               metric.value > metric.threshold * 0.7 ? 'warning' : 'healthy'
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'online':
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'warning':
      case 'degraded':
        return 'text-yellow-600 bg-yellow-100';
      case 'critical':
      case 'offline':
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'online':
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      case 'warning':
      case 'degraded':
        return <AlertTriangle className="h-4 w-4" />;
      case 'critical':
      case 'offline':
      case 'error':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const refreshMetrics = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const unacknowledgedAlerts = alerts.filter(alert => !alert.acknowledged);

  return (
    <div className="space-y-6">
      {/* En-tête avec statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Statut Système</p>
                <p className="text-2xl font-bold text-green-600">Opérationnel</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Uptime Global</p>
                <p className="text-2xl font-bold">99.2%</p>
              </div>
              <Activity className="h-8 w-8 text-senegal-blue" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Alertes Actives</p>
                <p className="text-2xl font-bold text-red-600">{unacknowledgedAlerts.length}</p>
              </div>
              <Bell className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Services En Ligne</p>
                <p className="text-2xl font-bold text-green-600">
                  {services.filter(s => s.status === 'online').length}/{services.length}
                </p>
              </div>
              <Globe className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertes non acquittées */}
      {unacknowledgedAlerts.length > 0 && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Alertes Nécessitant une Attention ({unacknowledgedAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {unacknowledgedAlerts.slice(0, 3).map((alert) => (
                <Alert key={alert.id} className="border-l-4 border-red-500">
                  <AlertDescription className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{alert.title}</p>
                      <p className="text-sm text-gray-600">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {alert.timestamp.toLocaleString('fr-FR')}
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => acknowledgeAlert(alert.id)}
                    >
                      Acquitter
                    </Button>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="metrics" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="metrics">Métriques Système</TabsTrigger>
            <TabsTrigger value="services">Statut Services</TabsTrigger>
            <TabsTrigger value="alerts">Toutes les Alertes</TabsTrigger>
          </TabsList>
          <Button 
            variant="outline" 
            onClick={refreshMetrics}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>
        </div>

        <TabsContent value="metrics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systemMetrics.map((metric, index) => (
              <Card key={index} className="hover-lift">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <metric.icon className="h-5 w-5" />
                      {metric.name}
                    </CardTitle>
                    <Badge className={getStatusColor(metric.status)}>
                      {getStatusIcon(metric.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">
                        {metric.value.toFixed(metric.name === "Base de Données" || metric.name === "API Gateway" ? 0 : 1)}
                        <span className="text-sm font-normal text-gray-600 ml-1">
                          {metric.unit}
                        </span>
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Utilisation</span>
                        <span>{((metric.value / metric.threshold) * 100).toFixed(0)}%</span>
                      </div>
                      <Progress 
                        value={(metric.value / metric.threshold) * 100}
                        className={`h-2 ${
                          metric.status === 'critical' ? '[&>div]:bg-red-500' :
                          metric.status === 'warning' ? '[&>div]:bg-yellow-500' :
                          '[&>div]:bg-green-500'
                        }`}
                      />
                      <p className="text-xs text-gray-500">
                        Seuil: {metric.threshold} {metric.unit}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>État des Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium">{service.name}</h3>
                          <Badge className={getStatusColor(service.status)}>
                            {getStatusIcon(service.status)}
                            <span className="ml-1 capitalize">{service.status}</span>
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Uptime</p>
                            <p className="font-semibold">{service.uptime}%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Temps de réponse</p>
                            <p className="font-semibold">{service.responseTime}ms</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Dernière vérification</p>
                            <p className="font-semibold">
                              {service.lastCheck.toLocaleTimeString('fr-FR')}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Historique des Alertes</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div 
                      key={alert.id} 
                      className={`border rounded-lg p-4 ${
                        alert.acknowledged ? 'opacity-60' : ''
                      } hover:bg-gray-50`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getStatusColor(alert.type)}>
                              {getStatusIcon(alert.type)}
                            </Badge>
                            <span className="font-medium">{alert.title}</span>
                            <Badge variant="outline" className="text-xs">
                              {alert.severity}
                            </Badge>
                            {alert.acknowledged && (
                              <Badge variant="outline" className="text-xs bg-green-50">
                                Acquittée
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                          <p className="text-xs text-gray-500">
                            {alert.timestamp.toLocaleString('fr-FR')}
                          </p>
                        </div>
                        {!alert.acknowledged && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => acknowledgeAlert(alert.id)}
                          >
                            Acquitter
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemMonitoring;
