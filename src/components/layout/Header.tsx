
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import BrandName from '../common/BrandName';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    {
      name: 'Accueil',
      path: '/'
    },
    {
      name: 'Nos Services',
      path: '/services'
    },
    {
      name: 'Notre Fonctionnement',
      path: '/fonctionnement'
    },
    {
      name: 'Nos Outils',
      path: '/outils'
    },
    {
      name: 'À Propos',
      path: '/apropos'
    },
    {
      name: 'Articles',
      path: '/articles'
    }
  ];

  const isActiveLink = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white shadow-md h-16">
      <div className="container-custom flex justify-between items-center h-full">
        {/* Logo - Made bigger and more visible */}
        <Link to="/" className="flex items-center">
          <img 
            alt="Mylli Services Logo" 
            className="h-14 w-auto sm:h-16 md:h-18" 
            src="/lovable-uploads/00945798-dc13-478e-94d1-d1aaa70af5a6.png" 
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map(link => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`nav-link ${isActiveLink(link.path) ? 'active-nav-link' : ''}`} 
              onClick={closeMenu}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        {/* Contact Button */}
        <div className="hidden md:flex items-center">
          <Button asChild className="btn-accent">
            <Link to="/contact">
              Contactez-nous
            </Link>
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            className="text-mylli-dark focus:outline-none" 
            onClick={toggleMenu} 
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md py-4 animate-fade-in">
          <div className="container-custom flex flex-col space-y-4">
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`p-2 ${isActiveLink(link.path) ? 'text-mylli-primary font-medium' : 'text-mylli-dark'}`} 
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
            <Button asChild className="btn-accent w-full">
              <Link to="/contact" onClick={closeMenu}>
                Contactez-nous
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
