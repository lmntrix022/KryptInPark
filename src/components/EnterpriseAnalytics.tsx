
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Users, Car, AlertTriangle, Target, Calendar, Download, Filter } from "lucide-react";

const EnterpriseAnalytics = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  // Données de simulation pour les graphiques
  const revenueData = [
    { month: "Jan", revenue: 2400000, target: 2500000, growth: 12 },
    { month: "Fév", revenue: 2800000, target: 2600000, growth: 16 },
    { month: "Mar", revenue: 3200000, target: 2700000, growth: 18 },
    { month: "Avr", revenue: 2900000, target: 2800000, growth: 15 },
    { month: "Mai", revenue: 3500000, target: 2900000, growth: 22 },
    { month: "Juin", revenue: 4100000, target: 3000000, growth: 28 }
  ];

  const userActivityData = [
    { day: "Lun", subscriptions: 120, fines: 85, payments: 200 },
    { day: "Mar", subscriptions: 150, fines: 92, payments: 240 },
    { day: "Mer", subscriptions: 180, fines: 78, payments: 280 },
    { day: "Jeu", subscriptions: 140, fines: 110, payments: 220 },
    { day: "Ven", subscriptions: 200, fines: 95, payments: 320 },
    { day: "Sam", subscriptions: 160, fines: 45, payments: 180 },
    { day: "Dim", subscriptions: 90, fines: 30, payments: 120 }
  ];

  const geographicData = [
    { zone: "Plateau", revenue: 1200000, users: 2500, coverage: 85 },
    { zone: "Almadies", revenue: 980000, users: 1800, coverage: 78 },
    { zone: "Parcelles", revenue: 850000, users: 1600, coverage: 72 },
    { zone: "Mermoz", revenue: 720000, users: 1400, coverage: 68 },
    { zone: "Point E", revenue: 650000, users: 1200, coverage: 65 }
  ];

  const complianceData = [
    { name: "Conformes", value: 78, color: "#27AE60" },
    { name: "Alertes mineures", value: 15, color: "#F39C12" },
    { name: "Non conformes", value: 7, color: "#E74C3C" }
  ];

  const kpiData = [
    {
      title: "Revenus Totaux",
      value: "24.8M FCFA",
      change: "+18.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Utilisateurs Actifs",
      value: "15,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Véhicules Contrôlés",
      value: "8,765",
      change: "+5.3%",
      trend: "up",
      icon: Car,
      color: "text-purple-600"
    },
    {
      title: "Incidents Sécurité",
      value: "23",
      change: "-32.1%",
      trend: "down",
      icon: AlertTriangle,
      color: "text-red-600"
    }
  ];

  const objectives = [
    {
      title: "Revenus Mensuels",
      current: 3500000,
      target: 4000000,
      unit: "FCFA",
      progress: 87.5
    },
    {
      title: "Adoption Utilisateurs",
      current: 15847,
      target: 20000,
      unit: "utilisateurs",
      progress: 79.2
    },
    {
      title: "Couverture Géographique",
      current: 73,
      target: 85,
      unit: "%",
      progress: 85.9
    },
    {
      title: "Satisfaction Client",
      current: 4.2,
      target: 4.5,
      unit: "/5",
      progress: 93.3
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(value);
  };

  const exportReport = () => {
    // Simulation d'export de rapport
    console.log("Exportation du rapport d'analytics...");
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec contrôles */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Entreprise</h2>
          <p className="text-gray-600">Tableaux de bord et indicateurs de performance</p>
        </div>
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 derniers jours</SelectItem>
              <SelectItem value="30d">30 derniers jours</SelectItem>
              <SelectItem value="90d">3 derniers mois</SelectItem>
              <SelectItem value="1y">12 derniers mois</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={exportReport}>
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </Button>
        </div>
      </div>

      {/* KPIs principaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                  <div className="flex items-center mt-2">
                    {kpi.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <span className={`text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-gray-100`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Objectifs et cibles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-senegal-gold" />
            Objectifs Stratégiques
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {objectives.map((objective, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{objective.title}</span>
                  <Badge variant="outline">
                    {objective.progress.toFixed(1)}%
                  </Badge>
                </div>
                <Progress value={objective.progress} className="h-3" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>
                    {typeof objective.current === 'number' && objective.current > 1000 
                      ? objective.current.toLocaleString() 
                      : objective.current} {objective.unit}
                  </span>
                  <span>
                    Objectif: {typeof objective.target === 'number' && objective.target > 1000 
                      ? objective.target.toLocaleString() 
                      : objective.target} {objective.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Graphiques détaillés */}
      <Tabs defaultValue="revenue" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">Revenus</TabsTrigger>
          <TabsTrigger value="activity">Activité</TabsTrigger>
          <TabsTrigger value="geographic">Géographique</TabsTrigger>
          <TabsTrigger value="compliance">Conformité</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des Revenus vs Objectifs</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stackId="1" 
                    stroke="#27AE60" 
                    fill="#27AE60" 
                    fillOpacity={0.6}
                    name="Revenus Réels"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#F39C12" 
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    name="Objectif"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Activité Quotidienne</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="subscriptions" fill="#3498DB" name="Abonnements" />
                  <Bar dataKey="fines" fill="#E74C3C" name="Amendes" />
                  <Bar dataKey="payments" fill="#27AE60" name="Paiements" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance par Zone Géographique</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {geographicData.map((zone, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium">{zone.zone}</h3>
                      <Badge className="bg-senegal-blue text-white">
                        {zone.coverage}% couverture
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Revenus</p>
                        <p className="font-semibold">{formatCurrency(zone.revenue)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Utilisateurs</p>
                        <p className="font-semibold">{zone.users.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Couverture</p>
                        <Progress value={zone.coverage} className="h-2 mt-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>État de Conformité</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={complianceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {complianceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Détails de Conformité</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-medium text-green-800">Systèmes Conformes (78%)</h4>
                    <p className="text-sm text-gray-600">
                      Tous les critères de sécurité et de performance sont respectés
                    </p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-medium text-yellow-800">Alertes Mineures (15%)</h4>
                    <p className="text-sm text-gray-600">
                      Problèmes mineurs nécessitant une attention
                    </p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-medium text-red-800">Non Conformes (7%)</h4>
                    <p className="text-sm text-gray-600">
                      Problèmes critiques nécessitant une action immédiate
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnterpriseAnalytics;
