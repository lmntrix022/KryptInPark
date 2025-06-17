
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, QrCode } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <Badge className="mb-8 bg-amber-100 text-amber-800 border-amber-200" variant="secondary">
          Solution de Stationnement Intelligent pour Dakar
        </Badge>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-8 text-amber-900 leading-tight">
          Stationnement
          <span className="block gold-text-gradient">Simplifié</span>
        </h1>
        
        <p className="text-xl text-amber-700 mb-12 max-w-3xl mx-auto leading-relaxed">
          Une plateforme moderne pour gérer vos abonnements, effectuer vos paiements et faciliter 
          le contrôle du stationnement avec une interface intuitive et performante.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="button-primary-clean px-8 py-3"
            onClick={onGetStarted}
          >
            <Car className="h-5 w-5 mr-2" />
            Commencer Maintenant
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="button-secondary-clean px-8 py-3"
          >
            <QrCode className="h-5 w-5 mr-2" />
            Scanner QR Code
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
