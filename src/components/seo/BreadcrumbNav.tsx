
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

interface BreadcrumbNavProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ items, className = '' }) => {
  const location = useLocation();
  
  // Auto-generate breadcrumbs if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Accueil', path: '/' }
    ];
    
    let currentPath = '';
    pathParts.forEach((part, index) => {
      currentPath += `/${part}`;
      const isLast = index === pathParts.length - 1;
      
      // Convert path segments to readable labels
      let label = part.charAt(0).toUpperCase() + part.slice(1);
      if (part === 'services') label = 'Services';
      if (part === 'equipe') label = 'Notre Équipe';
      if (part === 'apropos') label = 'À Propos';
      if (part === 'contact') label = 'Contact';
      if (part === 'fonctionnement') label = 'Fonctionnement';
      if (part === 'articles') label = 'Articles';
      if (part === 'aide-soignant') label = 'Aide-Soignant';
      if (part === 'infirmier') label = 'Infirmier';
      
      breadcrumbs.push({
        label,
        path: currentPath,
        isActive: isLast
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbItems = items || generateBreadcrumbs();
  
  if (breadcrumbItems.length <= 1) return null;
  
  // Generate structured data for breadcrumbs
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://mylliservices.com${item.path}`
    }))
  };
  
  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      <nav className={`bg-white border-b border-gray-100 py-3 ${className}`} aria-label="Breadcrumb">
        <div className="container-custom">
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbItems.map((item, index) => (
              <li key={item.path} className="flex items-center">
                {index > 0 && (
                  <ChevronRight size={16} className="text-gray-400 mx-2" />
                )}
                
                {item.isActive ? (
                  <span className="text-mylli-primary font-medium" aria-current="page">
                    {index === 0 && <Home size={16} className="inline mr-1" />}
                    {item.label}
                  </span>
                ) : (
                  <Link 
                    to={item.path} 
                    className="text-gray-600 hover:text-mylli-primary transition-colors"
                  >
                    {index === 0 && <Home size={16} className="inline mr-1" />}
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default BreadcrumbNav;
