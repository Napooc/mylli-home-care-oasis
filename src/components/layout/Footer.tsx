
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, Map } from 'lucide-react';
import ManageCookiesButton from '@/components/cookies/ManageCookiesButton';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section with Updated Logo */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img 
                alt="Mylli Services Logo" 
                className="h-16 w-auto" 
                src="/lovable-uploads/0c9706b2-918b-4ec9-9b7c-25c18e0feafe.png" 
              />
            </Link>
            <p className="text-mylli-gray mb-6">
              Votre partenaire de confiance pour des services de santé à domicile de qualité, adaptés à vos besoins spécifiques.
            </p>
            <div className="flex space-x-3">
              <a href="https://web.facebook.com/mylliservices" aria-label="Facebook" className="w-9 h-9 bg-mylli-primary/10 hover:bg-mylli-primary/20 rounded-full flex items-center justify-center transition-colors">
                <Facebook size={18} className="text-mylli-primary" />
              </a>
              <a href="https://www.instagram.com/mylliservices" aria-label="Instagram" className="w-9 h-9 bg-mylli-primary/10 hover:bg-mylli-primary/20 rounded-full flex items-center justify-center transition-colors">
                <Instagram size={18} className="text-mylli-primary" />
              </a>
              <a href="https://x.com/mylliservices" aria-label="Twitter/X" className="w-9 h-9 bg-mylli-primary/10 hover:bg-mylli-primary/20 rounded-full flex items-center justify-center transition-colors">
                <Twitter size={18} className="text-mylli-primary" />
              </a>
              <a href="https://www.linkedin.com/company/mylli-services/?originalSubdomain=ma" aria-label="LinkedIn" className="w-9 h-9 bg-mylli-primary/10 hover:bg-mylli-primary/20 rounded-full flex items-center justify-center transition-colors">
                <Linkedin size={18} className="text-mylli-primary" />
              </a>
              <a href="https://maps.app.goo.gl/ieapN24MH4oen3pA9" target="_blank" rel="noopener noreferrer" aria-label="Google Business" className="w-9 h-9 bg-mylli-primary/10 hover:bg-mylli-primary/20 rounded-full flex items-center justify-center transition-colors">
                <Map size={18} className="text-mylli-primary" />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-4 text-mylli-dark">Liens utiles</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-mylli-gray hover:text-mylli-primary transition-colors">Accueil</Link></li>
              <li><Link to="/services" className="text-mylli-gray hover:text-mylli-primary transition-colors">Nos Services</Link></li>
              <li><Link to="/fonctionnement" className="text-mylli-gray hover:text-mylli-primary transition-colors">Notre Fonctionnement</Link></li>
              <li><Link to="/equipe" className="text-mylli-gray hover:text-mylli-primary transition-colors">Nos Outils</Link></li>
              <li><Link to="/apropos" className="text-mylli-gray hover:text-mylli-primary transition-colors">À Propos</Link></li>
              <li><Link to="/articles" className="text-mylli-gray hover:text-mylli-primary transition-colors">Articles</Link></li>
              <li><Link to="/contact" className="text-mylli-gray hover:text-mylli-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-4 text-mylli-dark">Nos Services</h4>
            <ul className="space-y-2">
              <li><Link to="/services/aide-soignant" className="text-mylli-gray hover:text-mylli-primary transition-colors">AIDE-SOIGNANT(E) À DOMICILE</Link></li>
              <li><Link to="/services/infirmier" className="text-mylli-gray hover:text-mylli-primary transition-colors">INFIRMIER(ÈRE) À DOMICILE</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-4 text-mylli-dark">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-mylli-primary mt-1 mr-3 flex-shrink-0" />
                <span className="text-mylli-gray">19, rue Masmouda hay Al Hana - Casablanca - 20210</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-mylli-primary mr-3 flex-shrink-0" />
                <a href="tel:+212661377438" className="text-mylli-gray hover:text-mylli-primary transition-colors">+212 661 37 74 38</a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-mylli-primary mr-3 flex-shrink-0" />
                <a href="mailto:info@mylliservices.com" className="text-mylli-gray hover:text-mylli-primary transition-colors">info@mylliservices.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-mylli-gray text-sm">&copy; {currentYear} Mylli Services. Tous droits réservés.</p>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row items-center gap-4 text-sm">
            <div className="flex space-x-4">
              <Link 
                to="/politique-cookies" 
                className="text-mylli-gray hover:text-mylli-primary transition-colors"
              >
                Politique de cookies
              </Link>
              <Link 
                to="/politique-confidentialite" 
                className="text-mylli-gray hover:text-mylli-primary transition-colors"
              >
                Confidentialité
              </Link>
            </div>
            <ManageCookiesButton />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
