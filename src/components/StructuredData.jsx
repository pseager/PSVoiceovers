import { seo, siteUrl } from '../data/seoData';
import { faqs, siteConfig, socialLinks } from '../data/siteData';

export default function StructuredData() {
  const sameAs = [
    ...socialLinks
      .filter((link) => link.type !== 'source-connect')
      .map((link) => link.href),
    ...seo.profiles,
  ];

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
          addressLocality: seo.location.city,
          addressRegion: seo.location.region,
          addressCountry: seo.location.country,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: seo.location.geo.latitude,
          longitude: seo.location.geo.longitude,
        },
        founder: { '@id': `${siteUrl}/#person` },
        serviceType: seo.services,
        priceRange: '$$',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Voice Over Services',
          itemListElement: seo.services.map((service) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: service },
          })),
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/#faq`,
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
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
