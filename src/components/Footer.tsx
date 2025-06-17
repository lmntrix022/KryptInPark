
const Footer = () => {
  return (
    <footer className="bg-amber-900 text-white py-16 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1">
                <img 
                  src="/lovable-uploads/de0f9bfc-2341-4990-bc41-7469635b17c7.png" 
                  alt="KRYPT ID Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-lg font-semibold">ParkZen Dakar</span>
            </div>
            <p className="text-amber-200 leading-relaxed">
              Solution de stationnement intelligent pour la ville de Dakar, Sénégal.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3 text-amber-200">
              <li className="hover:text-white transition-colors cursor-pointer">Gestion d'abonnements</li>
              <li className="hover:text-white transition-colors cursor-pointer">Analytics entreprise</li>
              <li className="hover:text-white transition-colors cursor-pointer">Audit & sécurité</li>
              <li className="hover:text-white transition-colors cursor-pointer">Monitoring système</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Entreprise</h3>
            <ul className="space-y-3 text-amber-200">
              <li className="hover:text-white transition-colors cursor-pointer">Gestion des rôles</li>
              <li className="hover:text-white transition-colors cursor-pointer">Rapports personnalisés</li>
              <li className="hover:text-white transition-colors cursor-pointer">Support 24/7</li>
              <li className="hover:text-white transition-colors cursor-pointer">Formation équipe</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-3 text-amber-200">
              <li className="hover:text-white transition-colors">enterprise@parkzen-dakar.sn</li>
              <li className="hover:text-white transition-colors">+221 33 123 45 67</li>
              <li className="hover:text-white transition-colors">Dakar, Sénégal</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-amber-800 mt-12 pt-8 text-center text-amber-200">
          <p>&copy; 2024 ParkZen Dakar Enterprise. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
