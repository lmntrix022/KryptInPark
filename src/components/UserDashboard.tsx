
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Car, 
  MapPin, 
  CreditCard, 
  Bell, 
  LogOut, 
  Plus, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Navigation,
  Flag
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserDashboardProps {
  user: { type: 'user' | 'police'; name: string };
  onLogout: () => void;
}

const UserDashboard = ({ user, onLogout }: UserDashboardProps) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();

  const subscriptions = [
    {
      id: 1,
      zone: "Plateau - Centre Ville",
      status: "active",
      expiresAt: "2024-12-20",
      price: "15,000 FCFA",
      type: "Mensuel"
    },
    {
      id: 2,
      zone: "Mamelles - Corniche",
      status: "expiring",
      expiresAt: "2024-06-18",
      price: "8,000 FCFA",
      type: "Hebdomadaire"
    }
  ];

  const transactions = [
    { id: 1, type: "Abonnement", amount: "15,000", date: "2024-06-15", status: "Payé" },
    { id: 2, type: "Recharge", amount: "5,000", date: "2024-06-14", status: "Payé" },
    { id: 3, type: "Amende", amount: "2,000", date: "2024-06-13", status: "En attente" }
  ];

  const handleQuickPay = () => {
    toast({
      title: "Paiement initié",
      description: "Redirection vers la plateforme de paiement...",
    });
  };

  const handleLocationShare = () => {
    toast({
      title: "Position partagée",
      description: "Votre véhicule a été géolocalisé avec succès",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-senegal rounded-lg flex items-center justify-center">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Tableau de Bord</h1>
                <p className="text-sm text-gray-600">Bienvenue, {user.name}</p>
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Tableau de Bord</TabsTrigger>
            <TabsTrigger value="subscriptions">Abonnements</TabsTrigger>
            <TabsTrigger value="payments">Paiements</TabsTrigger>
            <TabsTrigger value="location">Localisation</TabsTrigger>
            <TabsTrigger value="reports">Signalements</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-card hover-lift">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Abonnements Actifs</CardTitle>
                  <CheckCircle className="h-4 w-4 text-senegal-green" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">+1 ce mois</p>
                </CardContent>
              </Card>

              <Card className="glass-card hover-lift">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Solde Compte</CardTitle>
                  <CreditCard className="h-4 w-4 text-senegal-blue" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,500 FCFA</div>
                  <p className="text-xs text-muted-foreground">Dernière recharge: hier</p>
                </CardContent>
              </Card>

              <Card className="glass-card hover-lift">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Alertes</CardTitle>
                  <Bell className="h-4 w-4 text-senegal-red" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1</div>
                  <p className="text-xs text-muted-foreground">Expiration proche</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-senegal-gold" />
                    Activité Récente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {transactions.slice(0, 3).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{transaction.type}</p>
                        <p className="text-sm text-gray-600">{transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{transaction.amount} FCFA</p>
                        <Badge variant={transaction.status === "Payé" ? "default" : "secondary"}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-senegal-red" />
                    Actions Rapides
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button onClick={handleQuickPay} className="w-full bg-senegal-gold hover:bg-senegal-gold/90">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Paiement Rapide
                  </Button>
                  <Button onClick={handleLocationShare} variant="outline" className="w-full">
                    <MapPin className="h-4 w-4 mr-2" />
                    Localiser ma Voiture
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Nouvel Abonnement
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Mes Abonnements</h2>
              <Button className="bg-senegal-green hover:bg-senegal-green/90">
                <Plus className="h-4 w-4 mr-2" />
                Nouvel Abonnement
              </Button>
            </div>

            <div className="grid gap-6">
              {subscriptions.map((sub) => (
                <Card key={sub.id} className="glass-card hover-lift">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{sub.zone}</CardTitle>
                      <Badge 
                        variant={sub.status === 'active' ? 'default' : 'destructive'}
                        className={sub.status === 'active' ? 'bg-senegal-green' : ''}
                      >
                        {sub.status === 'active' ? 'Actif' : 'Expire bientôt'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Type</p>
                        <p className="font-medium">{sub.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Prix</p>
                        <p className="font-medium">{sub.price}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Expire le</p>
                        <p className="font-medium">{sub.expiresAt}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Renouveler</Button>
                        <Button size="sm" variant="outline">Modifier</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Historique des Paiements</h2>
              <Button onClick={handleQuickPay} className="bg-senegal-blue hover:bg-senegal-blue/90">
                <CreditCard className="h-4 w-4 mr-2" />
                Nouveau Paiement
              </Button>
            </div>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Transactions Récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="font-medium">{transaction.type}</p>
                        <p className="text-sm text-gray-600">{transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{transaction.amount} FCFA</p>
                        <Badge variant={transaction.status === "Payé" ? "default" : "secondary"}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="location" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Géolocalisation</h2>
              <Button onClick={handleLocationShare} className="bg-senegal-green hover:bg-senegal-green/90">
                <Navigation className="h-4 w-4 mr-2" />
                Localiser
              </Button>
            </div>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-senegal-blue" />
                  Dernière Position Connue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-100 rounded-lg p-4 text-center">
                    <MapPin className="h-12 w-12 mx-auto text-senegal-blue mb-2" />
                    <p className="font-medium">Avenue Léopold Sédar Senghor</p>
                    <p className="text-sm text-gray-600">Plateau, Dakar</p>
                    <p className="text-xs text-gray-500">Dernière mise à jour: il y a 5 min</p>
                  </div>
                  <Button onClick={handleLocationShare} variant="outline" className="w-full">
                    <Navigation className="h-4 w-4 mr-2" />
                    Actualiser la Position
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Signalements</h2>
              <Button className="bg-senegal-red hover:bg-senegal-red/90">
                <Flag className="h-4 w-4 mr-2" />
                Nouveau Signalement
              </Button>
            </div>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Signaler un Incident</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-24 flex-col">
                    <Car className="h-8 w-8 mb-2 text-senegal-blue" />
                    Place Occupée Illégalement
                  </Button>
                  <Button variant="outline" className="h-24 flex-col">
                    <AlertTriangle className="h-8 w-8 mb-2 text-senegal-red" />
                    Problème de Voirie
                  </Button>
                </div>
                <div className="text-center text-sm text-gray-600">
                  Aidez-nous à améliorer le stationnement à Dakar en signalant les incidents
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;
