import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, 
  LogOut, 
  Car, 
  Bell, 
  BarChart3,
  Shield,
  Activity,
  FileText,
  Settings,
  ArrowLeft,
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import EnterpriseAnalytics from "@/components/EnterpriseAnalytics";
import AuditSystem from "@/components/AuditSystem";
import RoleManagement from "@/components/RoleManagement";
import SystemMonitoring from "@/components/SystemMonitoring";

interface AdminUser {
  name: string;
  role: string;
  permissions: string[];
}

interface AdminDashboardProps {
  user: AdminUser;
  onLogout: () => void;
}

const AdminDashboard = ({ user, onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const navigationItems = [
    {
      id: "overview",
      label: "Vue d'Ensemble",
      icon: BarChart3,
      component: <AdminOverview />,
      permission: true
    },
    {
      id: "analytics",
      label: "Analytics Entreprise",
      icon: Activity,
      component: <EnterpriseAnalytics />,
      permission: user.permissions?.includes('reports.read')
    },
    {
      id: "monitoring",
      label: "Surveillance Système",
      icon: Shield,
      component: <SystemMonitoring />,
      permission: user.permissions?.includes('system.config')
    },
    {
      id: "audit",
      label: "Audit & Sécurité",
      icon: FileText,
      component: <AuditSystem />,
      permission: user.permissions?.includes('audit.read')
    },
    {
      id: "roles",
      label: "Gestion des Rôles",
      icon: Users,
      component: <RoleManagement />,
      permission: user.permissions?.includes('user.write')
    }
  ].filter(item => item.permission);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header Admin */}
      <header className="bg-white/90 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
              <div className="w-10 h-10 bg-gradient-senegal rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Administration ParkZen</h1>
                <p className="text-sm text-gray-600">Panneau de Contrôle Administrateur</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-gray-600" />
                <Badge className="bg-red-500 text-white">2</Badge>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-senegal-gold text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-600">{user.role}</p>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                onClick={onLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar Navigation */}
          <div className="col-span-12 lg:col-span-3">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Navigation Admin</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <nav className="space-y-1">
                  {navigationItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={activeTab === item.id ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        activeTab === item.id 
                          ? "bg-senegal-gold text-white hover:bg-senegal-gold/90" 
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      {item.label}
                    </Button>
                  ))}
                </nav>
              </CardContent>
            </Card>

            {/* Raccourcis Rapides */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-sm">Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Nouvel Utilisateur
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Configuration
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Rapport
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9">
            <div className="space-y-6">
              {/* Breadcrumb */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Administration</span>
                <span>/</span>
                <span className="text-gray-900 font-medium">
                  {navigationItems.find(item => item.id === activeTab)?.label}
                </span>
              </div>

              {/* Dynamic Content */}
              {navigationItems.find(item => item.id === activeTab)?.component}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant Vue d'Ensemble Admin
const AdminOverview = () => {
  const stats = [
    { label: "Utilisateurs Actifs", value: "25,847", icon: Users, color: "text-blue-600" },
    { label: "Revenus du Jour", value: "847,500 FCFA", icon: BarChart3, color: "text-green-600" },
    { label: "Alertes Système", value: "3", icon: Bell, color: "text-red-600" },
    { label: "Uptime", value: "99.2%", icon: Activity, color: "text-purple-600" }
  ];

  return (
    <div className="space-y-6">
      {/* Stats rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Résumé des activités récentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Activités Récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Nouveau paiement reçu</p>
                  <p className="text-xs text-gray-500">Il y a 5 minutes</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Utilisateur créé</p>
                  <p className="text-xs text-gray-500">Il y a 12 minutes</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Alerte système</p>
                  <p className="text-xs text-gray-500">Il y a 30 minutes</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Système</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>CPU</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Mémoire</span>
                  <span>68%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "68%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Stockage</span>
                  <span>34%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "34%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
