
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  QrCode, 
  Search, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Car,
  LogOut,
  Camera,
  MapPin
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PoliceDashboardProps {
  user: { type: 'user' | 'police'; name: string };
  onLogout: () => void;
}

const PoliceDashboard = ({ user, onLogout }: PoliceDashboardProps) => {
  const [activeTab, setActiveTab] = useState("control");
  const [plateNumber, setPlateNumber] = useState("");
  const [scannedData, setScannedData] = useState<any>(null);
  const { toast } = useToast();

  const todayStats = {
    controls: 45,
    violations: 12,
    validSubscriptions: 33,
    finesIssued: 8
  };

  const recentControls = [
    {
      id: 1,
      plate: "DK-1234-AB",
      time: "14:30",
      status: "valid",
      zone: "Plateau Centre",
      owner: "Moussa Diop"
    },
    {
      id: 2,
      plate: "DK-5678-CD",
      time: "14:25",
      status: "expired",
      zone: "Mamelles",
      owner: "Fatou Sall"
    },
    {
      id: 3,
      plate: "DK-9012-EF",
      time: "14:20",
      status: "no_subscription",
      zone: "Plateau Centre",
      owner: "Inconnu"
    }
  ];

  const handleQRScan = () => {
    // Simulate QR code scanning
    const mockData = {
      plateNumber: "DK-1234-AB",
      owner: "Moussa Diop",
      subscriptionStatus: "active",
      expiresAt: "2024-12-20",
      zone: "Plateau Centre"
    };
    
    setScannedData(mockData);
    toast({
      title: "QR Code scanné",
      description: "Informations du véhicule récupérées",
    });
  };

  const handlePlateSearch = () => {
    if (!plateNumber) return;
    
    // Simulate database search
    const mockResult = {
      plateNumber: plateNumber.toUpperCase(),
      owner: "Jean Dupont",
      subscriptionStatus: Math.random() > 0.5 ? "active" : "expired",
      expiresAt: "2024-07-15",
      zone: "Plateau Centre"
    };
    
    setScannedData(mockResult);
    toast({
      title: "Recherche effectuée",
      description: `Véhicule ${plateNumber} trouvé`,
    });
  };

  const handleIssueFine = () => {
    toast({
      title: "Contravention émise",
      description: "La contravention a été enregistrée avec succès",
    });
    setScannedData(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid':
      case 'active':
        return 'bg-senegal-green';
      case 'expired':
        return 'bg-senegal-red';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'valid':
      case 'active':
        return 'Valide';
      case 'expired':
        return 'Expiré';
      case 'no_subscription':
        return 'Pas d\'abonnement';
      default:
        return 'Inconnu';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-senegal-blue rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Interface Police</h1>
                <p className="text-sm text-gray-600">Agent {user.name}</p>
              </div>
            </div>
            
            <Button onClick={onLogout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="control">Contrôle</TabsTrigger>
            <TabsTrigger value="search">Recherche</TabsTrigger>
            <TabsTrigger value="fines">Contraventions</TabsTrigger>
            <TabsTrigger value="reports">Rapports</TabsTrigger>
          </TabsList>

          <TabsContent value="control" className="space-y-6">
            {/* Today's Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Contrôles</CardTitle>
                  <Shield className="h-4 w-4 text-senegal-blue" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayStats.controls}</div>
                  <p className="text-xs text-muted-foreground">Aujourd'hui</p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Infractions</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-senegal-red" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayStats.violations}</div>
                  <p className="text-xs text-muted-foreground">Détectées</p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Valides</CardTitle>
                  <CheckCircle className="h-4 w-4 text-senegal-green" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayStats.validSubscriptions}</div>
                  <p className="text-xs text-muted-foreground">Abonnements</p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Amendes</CardTitle>
                  <FileText className="h-4 w-4 text-senegal-gold" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayStats.finesIssued}</div>
                  <p className="text-xs text-muted-foreground">Émises</p>
                </CardContent>
              </Card>
            </div>

            {/* QR Code Scanner */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="h-5 w-5 text-senegal-blue" />
                    Scanner QR Code
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-100 rounded-lg p-8 text-center">
                    <QrCode className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">Pointez votre caméra vers le QR code</p>
                  </div>
                  <Button onClick={handleQRScan} className="w-full bg-senegal-blue hover:bg-senegal-blue/90">
                    <Camera className="h-4 w-4 mr-2" />
                    Activer le Scanner
                  </Button>
                </CardContent>
              </Card>

              {/* Vehicle Info */}
              {scannedData && (
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Car className="h-5 w-5 text-senegal-gold" />
                      Informations Véhicule
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Plaque:</span>
                        <span>{scannedData.plateNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Propriétaire:</span>
                        <span>{scannedData.owner}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Statut:</span>
                        <Badge className={getStatusColor(scannedData.subscriptionStatus)}>
                          {getStatusText(scannedData.subscriptionStatus)}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Expire le:</span>
                        <span>{scannedData.expiresAt}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Zone:</span>
                        <span>{scannedData.zone}</span>
                      </div>
                    </div>
                    
                    {scannedData.subscriptionStatus !== 'active' && (
                      <Button onClick={handleIssueFine} className="w-full bg-senegal-red hover:bg-senegal-red/90">
                        <FileText className="h-4 w-4 mr-2" />
                        Émettre une Contravention
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Recent Controls */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-senegal-gold" />
                  Contrôles Récents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentControls.map((control) => (
                    <div key={control.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium">{control.plate}</p>
                          <p className="text-sm text-gray-600">{control.owner}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(control.status)}>
                          {getStatusText(control.status)}
                        </Badge>
                        <p className="text-sm text-gray-600">{control.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-senegal-blue" />
                  Recherche par Plaque
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="DK-1234-AB"
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handlePlateSearch} className="bg-senegal-blue hover:bg-senegal-blue/90">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                
                {scannedData && (
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <h3 className="font-medium">Résultat de la recherche:</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Plaque:</span> {scannedData.plateNumber}
                      </div>
                      <div>
                        <span className="font-medium">Propriétaire:</span> {scannedData.owner}
                      </div>
                      <div>
                        <span className="font-medium">Statut:</span>
                        <Badge className={`ml-2 ${getStatusColor(scannedData.subscriptionStatus)}`}>
                          {getStatusText(scannedData.subscriptionStatus)}
                        </Badge>
                      </div>
                      <div>
                        <span className="font-medium">Expire le:</span> {scannedData.expiresAt}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fines" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestion des Contraventions</h2>
              <Button className="bg-senegal-red hover:bg-senegal-red/90">
                <FileText className="h-4 w-4 mr-2" />
                Nouvelle Contravention
              </Button>
            </div>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Contraventions du Jour</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4" />
                  <p>Aucune contravention émise aujourd'hui</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Rapports et Statistiques</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Performance du Jour</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Taux de conformité:</span>
                      <span className="font-bold text-senegal-green">73%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenus générés:</span>
                      <span className="font-bold">24,000 FCFA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Temps moyen/contrôle:</span>
                      <span className="font-bold">2.5 min</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Zones d'Activité</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-senegal-blue" />
                        <span>Plateau Centre</span>
                      </div>
                      <span className="font-medium">28 contrôles</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-senegal-green" />
                        <span>Mamelles</span>
                      </div>
                      <span className="font-medium">17 contrôles</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PoliceDashboard;
