
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Shield, MapPin, CreditCard, Bell } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Car,
      title: "Gestion d'Abonnements",
      description: "Souscrivez et gérez vos abonnements de stationnement en temps réel",
    },
    {
      icon: MapPin,
      title: "Géolocalisation",
      description: "Localisez votre véhicule et trouvez les places disponibles",
    },
    {
      icon: CreditCard,
      title: "Paiements Sécurisés",
      description: "Réglez vos amendes et abonnements en toute sécurité",
    },
    {
      icon: Bell,
      title: "Alertes & Notifications",
      description: "Recevez des rappels avant expiration de votre stationnement",
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-amber-50/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-amber-900">
            Fonctionnalités
          </h2>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto">
            Une solution complète pour simplifier et moderniser le stationnement urbain
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="clean-card minimal-hover">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto rounded-lg bg-amber-100 flex items-center justify-center mb-4">
                  <feature.icon className="h-8 w-8 text-amber-600" />
                </div>
                <CardTitle className="text-lg mb-2 text-amber-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700 text-center leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
