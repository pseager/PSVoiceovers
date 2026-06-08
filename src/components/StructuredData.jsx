import { seo, siteUrl } from '../data/seoData';
import { siteConfig, socialLinks } from '../data/siteData';

export default function StructuredData() {
  const sameAs = socialLinks
    .filter((link) => link.type !== 'source-connect')
    .map((link) => link.href);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: siteConfig.name,
        jobTitle: 'Voice Over Artist',
        url: siteUrl,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        image: seo.ogImage,
        worksFor: { '@id': `${siteUrl}/#business` },
        sameAs,
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${siteUrl}/#business`,
        name: seo.businessName,
        url: siteUrl,
        image: seo.ogImage,
        description: seo.description,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        areaServed: seo.location.areaServed,
        address: {
          '@type': 'PostalAddress',
          addressRegion: seo.location.region,
          addressCountry: seo.location.country,
        },
        founder: { '@id': `${siteUrl}/#person` },
        serviceType: seo.services,
        priceRange: '$$',
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: seo.title,
        description: seo.description,
        publisher: { '@id': `${siteUrl}/#business` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
