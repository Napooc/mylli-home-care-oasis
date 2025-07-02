
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  noindex?: boolean;
  nofollow?: boolean;
  structuredData?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords = 'soins domicile casablanca, infirmier domicile casablanca, aide soignant domicile casablanca, garde malade casablanca, soins infirmiers domicile, mylli services casablanca, aide domicile personnes agees, infirmier nuit casablanca, garde malade 24h casablanca, soins palliatifs domicile, assistance medicale domicile, infirmier liberal casablanca',
  canonicalUrl,
  ogImage = '/lovable-uploads/f8839c98-c2b6-4a1b-86d6-d6858f3f38df.png',
  ogType = 'website',
  noindex = false,
  nofollow = false,
  structuredData
}) => {
  const baseUrl = 'https://mylliservices.com';
  const fullCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : undefined;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      {fullCanonicalUrl && <link rel="canonical" href={fullCanonicalUrl} />}
      
      {/* Advanced SEO Meta */}
      <meta name="robots" content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'},max-snippet:160,max-image-preview:large,max-video-preview:30`} />
      <meta name="googlebot" content="index,follow" />
      <meta name="bingbot" content="index,follow" />
      <meta name="language" content="fr-MA" />
      <meta name="author" content="Mylli Services Casablanca" />
      <meta name="publisher" content="Mylli Services" />
      <meta name="copyright" content="Mylli Services 2024" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      
      {/* Geo Meta Tags */}
      <meta name="geo.region" content="MA-06" />
      <meta name="geo.placename" content="Casablanca, Morocco" />
      <meta name="geo.position" content="33.5731;-7.5898" />
      <meta name="ICBM" content="33.5731, -7.5898" />
      <meta name="distribution" content="local" />
      <meta name="coverage" content="Casablanca" />
      
      {/* Open Graph Tags with new home care logo */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:image:alt" content="Mylli Services - Soins à domicile professionnels Casablanca" />
      <meta property="og:image:type" content="image/png" />
      {fullCanonicalUrl && <meta property="og:url" content={fullCanonicalUrl} />}
      <meta property="og:site_name" content="Mylli Services - Soins à Domicile Casablanca" />
      <meta property="og:locale" content="fr_MA" />
      <meta property="og:locale:alternate" content="ar_MA" />
      
      {/* Twitter Card Tags with new home care logo */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@mylli_services" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content="Mylli Services - Soins à domicile professionnels Casablanca" />
      <meta name="twitter:creator" content="@mylli_services" />
      
      {/* Additional Social Media Meta Tags */}
      <meta property="fb:app_id" content="mylli-services-app" />
      <meta name="thumbnail" content={fullOgImage} />
      <meta name="image" content={fullOgImage} />
      
      {/* Hreflang */}
      <link rel="alternate" hrefLang="fr-ma" href={fullCanonicalUrl || baseUrl} />
      <link rel="alternate" hrefLang="x-default" href={fullCanonicalUrl || baseUrl} />
      
      {/* iOS-specific favicon meta tags for window switching - NEW HOME CARE LOGO */}
      <link rel="apple-touch-icon" href={fullOgImage} />
      <link rel="apple-touch-icon" sizes="180x180" href={fullOgImage} />
      <link rel="apple-touch-icon" sizes="152x152" href={fullOgImage} />
      <link rel="apple-touch-icon" sizes="120x120" href={fullOgImage} />
      <link rel="apple-touch-icon" sizes="76x76" href={fullOgImage} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
