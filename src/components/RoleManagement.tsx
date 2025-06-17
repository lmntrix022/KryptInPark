
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Users, Shield, Settings, Plus, Edit3, Trash2, Eye } from "lucide-react";

interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
  actions: string[];
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  isSystem: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: Date;
}

const RoleManagement = () => {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "admin",
      name: "Administrateur Système",
      description: "Accès complet à toutes les fonctionnalités",
      permissions: ["user.read", "user.write", "user.delete", "system.config", "audit.read", "finance.read", "finance.write"],
      userCount: 3,
      isSystem: true
    },
    {
      id: "police_chief",
      name: "Chef de Police",
      description: "Supervision des opérations de contrôle",
      permissions: ["police.read", "police.write", "fine.issue", "fine.cancel", "reports.read", "audit.read"],
      userCount: 5,
      isSystem: false
    },
    {
      id: "police_officer",
      name: "Agent de Police",
      description: "Contrôle et émission d'amendes",
      permissions: ["police.read", "fine.issue", "vehicle.scan"],
      userCount: 25,
      isSystem: false
    },
    {
      id: "finance_manager",
      name: "Gestionnaire Financier",
      description: "Gestion des paiements et finances",
      permissions: ["finance.read", "finance.write", "payment.process", "reports.financial"],
      userCount: 2,
      isSystem: false
    },
    {
      id: "support_agent",
      name: "Agent Support",
      description: "Support client et assistance",
      permissions: ["user.read", "subscription.read", "support.write"],
      userCount: 8,
      isSystem: false
    }
  ]);

  const [permissions] = useState<Permission[]>([
    {
      id: "user.read",
      name: "Lecture Utilisateurs",
      description: "Consulter les informations des utilisateurs",
      module: "Gestion Utilisateurs",
      actions: ["view", "search"]
    },
    {
      id: "user.write",
      name: "Écriture Utilisateurs",
      description: "Créer et modifier les utilisateurs",
      module: "Gestion Utilisateurs",
      actions: ["create", "update"]
    },
    {
      id: "user.delete",
      name: "Suppression Utilisateurs",
      description: "Supprimer des comptes utilisateurs",
      module: "Gestion Utilisateurs",
      actions: ["delete"]
    },
    {
      id: "system.config",
      name: "Configuration Système",
      description: "Modifier la configuration du système",
      module: "Administration",
      actions: ["configure", "backup", "restore"]
    },
    {
      id: "audit.read",
      name: "Lecture Audit",
      description: "Consulter les logs d'audit",
      module: "Sécurité",
      actions: ["view", "export"]
    },
    {
      id: "police.read",
      name: "Lecture Police",
      description: "Consulter les données policières",
      module: "Police",
      actions: ["view", "search"]
    },
    {
      id: "police.write",
      name: "Écriture Police",
      description: "Modifier les données policières",
      module: "Police",
      actions: ["create", "update"]
    },
    {
      id: "fine.issue",
      name: "Émission Amendes",
      description: "Émettre des amendes de stationnement",
      module: "Police",
      actions: ["issue", "validate"]
    },
    {
      id: "fine.cancel",
      name: "Annulation Amendes",
      description: "Annuler des amendes émises",
      module: "Police",
      actions: ["cancel", "refund"]
    },
    {
      id: "finance.read",
      name: "Lecture Finance",
      description: "Consulter les données financières",
      module: "Finance",
      actions: ["view", "report"]
    },
    {
      id: "finance.write",
      name: "Écriture Finance",
      description: "Modifier les données financières",
      module: "Finance",
      actions: ["create", "update", "process"]
    }
  ]);

  const [users] = useState<User[]>([
    {
      id: "1",
      name: "Amadou Diallo",
      email: "amadou.diallo@admin.sn",
      roles: ["admin"],
      status: "active",
      lastLogin: new Date()
    },
    {
      id: "2",
      name: "Fatou Sow",
      email: "fatou.sow@police.sn",
      roles: ["police_chief"],
      status: "active",
      lastLogin: new Date(Date.now() - 3600000)
    },
    {
      id: "3",
      name: "Moussa Ndiaye",
      email: "moussa.ndiaye@finance.sn",
      roles: ["finance_manager"],
      status: "active",
      lastLogin: new Date(Date.now() - 7200000)
    }
  ]);

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);

  const getModuleColor = (module: string) => {
    const colors: Record<string, string> = {
      "Gestion Utilisateurs": "bg-blue-100 text-blue-800",
      "Administration": "bg-purple-100 text-purple-800",
      "Sécurité": "bg-red-100 text-red-800",
      "Police": "bg-green-100 text-green-800",
      "Finance": "bg-yellow-100 text-yellow-800"
    };
    return colors[module] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="roles" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="roles">Rôles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-senegal-blue" />
                  Gestion des Rôles
                </CardTitle>
                <Dialog open={isCreateRoleOpen} onOpenChange={setIsCreateRoleOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-senegal-gold hover:bg-senegal-gold/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Nouveau Rôle
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Créer un Nouveau Rôle</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="roleName">Nom du rôle</Label>
                        <Input id="roleName" placeholder="Ex: Superviseur Parking" />
                      </div>
                      <div>
                        <Label htmlFor="roleDescription">Description</Label>
                        <Input id="roleDescription" placeholder="Description des responsabilités" />
                      </div>
                      <div>
                        <Label>Permissions</Label>
                        <ScrollArea className="h-48 border rounded-md p-4">
                          <div className="space-y-3">
                            {permissions.map((permission) => (
                              <div key={permission.id} className="flex items-center space-x-2">
                                <Switch id={permission.id} />
                                <div className="flex-1">
                                  <Label htmlFor={permission.id} className="text-sm font-medium">
                                    {permission.name}
                                  </Label>
                                  <p className="text-xs text-gray-500">{permission.description}</p>
                                </div>
                                <Badge className={getModuleColor(permission.module)}>
                                  {permission.module}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsCreateRoleOpen(false)}>
                          Annuler
                        </Button>
                        <Button className="bg-senegal-gold hover:bg-senegal-gold/90">
                          Créer le Rôle
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {roles.map((role) => (
                  <div key={role.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{role.name}</h3>
                          {role.isSystem && (
                            <Badge variant="outline" className="text-xs">
                              Système
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{role.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {role.userCount} utilisateur(s)
                          </span>
                          <span>{role.permissions.length} permission(s)</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedRole(role)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {!role.isSystem && (
                          <>
                            <Button variant="outline" size="sm">
                              <Edit3 className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-senegal-green" />
                Permissions Système
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(
                  permissions.reduce((acc, permission) => {
                    if (!acc[permission.module]) acc[permission.module] = [];
                    acc[permission.module].push(permission);
                    return acc;
                  }, {} as Record<string, Permission[]>)
                ).map(([module, modulePermissions]) => (
                  <div key={module}>
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <Badge className={getModuleColor(module)}>{module}</Badge>
                    </h3>
                    <div className="grid gap-2 ml-4">
                      {modulePermissions.map((permission) => (
                        <div key={permission.id} className="border rounded-md p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-sm">{permission.name}</h4>
                              <p className="text-xs text-gray-600">{permission.description}</p>
                            </div>
                            <div className="flex gap-1">
                              {permission.actions.map((action) => (
                                <Badge key={action} variant="outline" className="text-xs">
                                  {action}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-4" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-senegal-blue" />
                Utilisateurs et Attributions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{user.name}</h3>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{user.email}</p>
                        <div className="flex items-center gap-2 mb-2">
                          {user.roles.map((roleId) => {
                            const role = roles.find(r => r.id === roleId);
                            return role ? (
                              <Badge key={roleId} variant="outline">
                                {role.name}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                        <p className="text-xs text-gray-500">
                          Dernière connexion: {user.lastLogin.toLocaleString('fr-FR')}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de détails du rôle */}
      {selectedRole && (
        <Dialog open={!!selectedRole} onOpenChange={() => setSelectedRole(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Détails du Rôle: {selectedRole.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Description</Label>
                <p className="text-sm text-gray-600">{selectedRole.description}</p>
              </div>
              <div>
                <Label>Permissions Accordées</Label>
                <ScrollArea className="h-48 border rounded-md p-4">
                  <div className="space-y-2">
                    {selectedRole.permissions.map((permId) => {
                      const permission = permissions.find(p => p.id === permId);
                      return permission ? (
                        <div key={permId} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{permission.name}</p>
                            <p className="text-xs text-gray-500">{permission.description}</p>
                          </div>
                          <Badge className={getModuleColor(permission.module)}>
                            {permission.module}
                          </Badge>
                        </div>
                      ) : null;
                    })}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default RoleManagement;
