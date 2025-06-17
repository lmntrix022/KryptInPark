
import { Card, CardContent } from "@/components/ui/card";
import { Users, Car, Shield, BarChart3 } from "lucide-react";

const StatsSection = () => {
  const stats = [
    { label: "Utilisateurs Actifs", value: "25,847", icon: Users },
    { label: "Places Contrôlées", value: "15,234", icon: Car },
    { label: "Amendes Évitées", value: "8,765", icon: Shield },
    { label: "Revenus Générés", value: "2.4M FCFA", icon: BarChart3 }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="clean-card text-center border-0 shadow-none minimal-hover">
              <CardContent className="pt-6 pb-4">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-amber-100 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-amber-600" />
                </div>
                <div className="text-2xl font-bold text-amber-900 mb-1">{stat.value}</div>
                <div className="text-sm text-amber-700">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
