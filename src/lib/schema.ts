export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://tagx.co.in/#website",
  "url": "https://tagx.co.in",
  "name": "TagX",
  "description": "Premium garment trims, hang tags, woven labels, satin labels, and PU labels manufacturer in Ahmedabad, Gujarat, India.",
  "inLanguage": "en-IN",
  "publisher": {
    "@id": "https://tagx.co.in/#organization"
  }
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "Manufacturer"],
  "@id": "https://tagx.co.in/#organization",
  "name": "TagX",
  "legalName": "TagX Garment Accessories",
  "url": "https://tagx.co.in",
  "logo": {
    "@type": "ImageObject",
    "url": "https://tagx.co.in/TagXLogo.jpeg",
    "caption": "TagX Logo"
  },
  "image": "https://tagx.co.in/tag1.jpeg",
  "description": "In-house manufacturer of premium garment accessories and clothing trims including Hang Tags, Woven Labels, Satin Wash Care Labels, and PU Leather Labels in Ahmedabad, India.",
  "telephone": "+91-7203952969",
  "email": "info@tagx.co.in",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Ahmedabad",
    "addressRegion": "Gujarat",
    "addressCountry": "IN"
  },
  "areaServed": [
    {
      "@type": "Country",
      "name": "India"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Worldwide"
    }
  ],
  "priceRange": "$$",
  "sameAs": [
    "https://wa.me/917203952969"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-7203952969",
    "contactType": "customer service",
    "email": "info@tagx.co.in",
    "availableLanguage": ["English", "Hindi", "Gujarati"]
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Garment Trims & Accessories Catalog",
    "itemListElement": [
      {
        "@type": "OfferCatalog",
        "name": "Hang Tags",
        "description": "Custom die-cut paper tags with luxury finishes (foil stamping, embossing, debossing, UV coating, lamination)."
      },
      {
        "@type": "OfferCatalog",
        "name": "Woven Labels",
        "description": "High-density damask woven fabric labels for apparel branding."
      },
      {
        "@type": "OfferCatalog",
        "name": "Satin Labels",
        "description": "Soft printed satin care and size labels for garments."
      },
      {
        "@type": "OfferCatalog",
        "name": "PU Labels",
        "description": "Polyurethane and leather patch labels for jeans, outerwear, and activewear."
      }
    ]
  }
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of garment tags and labels does TagX manufacture?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TagX manufactures premium Hang Tags (Kraft, Artboard, Recycled stock), High-Density Woven Labels, Soft Printed Satin Care Labels, and Durable PU Leather Labels for apparel brands."
      }
    },
    {
      "@type": "Question",
      "name": "Where is TagX located and do you deliver across India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TagX is based in Ahmedabad, Gujarat, India with complete in-house manufacturing capabilities. We deliver custom garment trims to clothing brands nationwide across India and internationally."
      }
    },
    {
      "@type": "Question",
      "name": "What special finishes are available for custom hang tags?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer luxury finishes including Foil Stamping (Gold, Silver, Rose Gold), Embossing, Debossing, Spot UV Coating, Matte/Gloss Lamination, and custom die-cut shapes."
      }
    },
    {
      "@type": "Question",
      "name": "How fast can I get a quotation for custom labels and tags?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can request a quote directly through our website or WhatsApp (+91 72039 52969), and our team provides detailed custom quotes within 24 hours."
      }
    }
  ]
};
