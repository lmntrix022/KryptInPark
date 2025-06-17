
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, User, AlertTriangle, CheckCircle, Clock, Download, Search } from "lucide-react";

interface AuditLog {
  id: string;
  timestamp: Date;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'warning' | 'error';
  severity: 'low' | 'medium' | 'high' | 'critical';
}

const AuditSystem = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");

  // Simulation des logs d'audit
  useEffect(() => {
    const mockLogs: AuditLog[] = [
      {
        id: "1",
        timestamp: new Date(),
        userId: "user123",
        userName: "Amadou Diallo",
        action: "LOGIN",
        resource: "USER_PORTAL",
        details: "Connexion réussie depuis l'application mobile",
        ipAddress: "192.168.1.100",
        userAgent: "Mobile App v2.1",
        status: "success",
        severity: "low"
      },
      {
        id: "2",
        timestamp: new Date(Date.now() - 3600000),
        userId: "police456",
        userName: "Fatou Sow",
        action: "FINE_ISSUED",
        resource: "PARKING_FINE",
        details: "Amende émise pour stationnement non autorisé - Véhicule DK-123-AB",
        ipAddress: "10.0.0.50",
        userAgent: "Police Scanner App v1.5",
        status: "success",
        severity: "medium"
      },
      {
        id: "3",
        timestamp: new Date(Date.now() - 7200000),
        userId: "admin789",
        userName: "Moussa Ndiaye",
        action: "SYSTEM_CONFIG",
        resource: "PAYMENT_GATEWAY",
        details: "Modification des paramètres de paiement mobile",
        ipAddress: "192.168.1.10",
        userAgent: "Admin Dashboard v3.0",
        status: "success",
        severity: "high"
      },
      {
        id: "4",
        timestamp: new Date(Date.now() - 10800000),
        userId: "user789",
        userName: "Awa Sarr",
        action: "PAYMENT_FAILED",
        resource: "SUBSCRIPTION",
        details: "Échec du paiement d'abonnement - Carte expirée",
        ipAddress: "192.168.1.200",
        userAgent: "Web App Chrome/120.0",
        status: "error",
        severity: "medium"
      },
      {
        id: "5",
        timestamp: new Date(Date.now() - 14400000),
        userId: "police123",
        userName: "Cheikh Fall",
        action: "UNAUTHORIZED_ACCESS",
        resource: "ADMIN_PANEL",
        details: "Tentative d'accès non autorisé au panneau d'administration",
        ipAddress: "unknown",
        userAgent: "Unknown",
        status: "error",
        severity: "critical"
      }
    ];
    setAuditLogs(mockLogs);
    setFilteredLogs(mockLogs);
  }, []);

  // Filtrage des logs
  useEffect(() => {
    let filtered = auditLogs;

    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(log => log.status === statusFilter);
    }

    if (severityFilter !== "all") {
      filtered = filtered.filter(log => log.severity === severityFilter);
    }

    setFilteredLogs(filtered);
  }, [auditLogs, searchTerm, statusFilter, severityFilter]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const exportLogs = () => {
    const csvContent = [
      ['Timestamp', 'User', 'Action', 'Resource', 'Status', 'Severity', 'IP Address', 'Details'],
      ...filteredLogs.map(log => [
        log.timestamp.toISOString(),
        log.userName,
        log.action,
        log.resource,
        log.status,
        log.severity,
        log.ipAddress,
        log.details
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_logs_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-senegal-blue" />
            Système d'Audit et de Sécurité
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher dans les logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="success">Succès</SelectItem>
                <SelectItem value="warning">Avertissement</SelectItem>
                <SelectItem value="error">Erreur</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sévérité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="low">Faible</SelectItem>
                <SelectItem value="medium">Moyenne</SelectItem>
                <SelectItem value="high">Élevée</SelectItem>
                <SelectItem value="critical">Critique</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={exportLogs} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>

          <ScrollArea className="h-96">
            <div className="space-y-3">
              {filteredLogs.map((log) => (
                <div key={log.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(log.status)}
                        <span className="font-medium">{log.action}</span>
                        <Badge className={getSeverityColor(log.severity)}>
                          {log.severity}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {log.userName}
                          </span>
                          <span>{log.timestamp.toLocaleString('fr-FR')}</span>
                        </div>
                      </div>
                      <p className="text-sm">{log.details}</p>
                      <div className="text-xs text-gray-500 mt-2">
                        Resource: {log.resource} | IP: {log.ipAddress}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditSystem;
