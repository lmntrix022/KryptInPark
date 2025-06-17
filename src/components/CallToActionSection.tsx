
import { Button } from "@/components/ui/button";

interface CallToActionSectionProps {
  onGetStarted: () => void;
}

const CallToActionSection = ({ onGetStarted }: CallToActionSectionProps) => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto text-center">
        <div className="clean-card max-w-3xl mx-auto p-12 rounded-lg gold-bg">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-amber-900">
            Rejoignez-nous
          </h2>
          <p className="text-xl text-amber-700 mb-10 max-w-xl mx-auto">
            Simplifiez votre quotidien avec notre solution de stationnement intelligent
          </p>
          <Button 
            size="lg" 
            className="button-primary-clean px-10 py-3"
            onClick={onGetStarted}
          >
            Commencer Maintenant
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
