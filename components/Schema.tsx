import { Fabric, Breadcrumb } from '../types';

const ORG_URL = "https://www.iksa-textiles.com";
const ORG_LOGO_URL = "https://i.postimg.cc/C5JBLh7f/iksa-name-logo.webp";

export const generateOrganizationSchema = (translate: (key: string, subKey?: string) => string) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': 'IKSA Textiles',
  'url': ORG_URL,
  'logo': ORG_LOGO_URL,
  'contactPoint': {
    '@type': 'ContactPoint',
    'telephone': '+66-81-851-9922',
    'contactType': 'Customer Service',
    'areaServed': 'WW',
    'availableLanguage': ['en', 'ar'],
  },
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': translate('contact_addressLine2'),
    'addressLocality': 'Bangkok',
    'addressRegion': 'Bangrak',
    'postalCode': '10500',
    'addressCountry': 'TH'
  },
  'sameAs': [
    "https://facebook.com/iksatextile",
    "https://instagram.com/iksatextile",
    "https://tiktok.com/@iksatextile",
    "https://youtube.com/@iksatextile",
    "https://linkedin.com/company/iksatextile",
    "https://twitter.com/iksatextile",
    "https://pinterest.com/iksatextile"
  ]
});

export const generateWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  'url': ORG_URL,
  'name': 'IKSA',
  'potentialAction': {
    '@type': 'SearchAction',
    'target': `${ORG_URL}/#/collections?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
});

export const generateBreadcrumbSchema = (crumbs: Breadcrumb[]) => {
    if (!crumbs || crumbs.length === 0) return null;
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': crumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'name': crumb.name,
            'item': `${ORG_URL}/#${crumb.path}`
        }))
    };
};

export const generateProductSchema = (fabric: Fabric, translate: (key: string, subKey?: string) => string) => {
    const name = translate(fabric.nameKey);
    const description = translate(fabric.detailDescriptionKey);

    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': name,
        'description': description,
        'sku': fabric.id,
        'image': fabric.galleryImages,
        'brand': {
            '@type': 'Brand',
            'name': 'IKSA'
        },
        'offers': {
            '@type': 'Offer',
            'price': fabric.pricePerRoll,
            'priceCurrency': 'USD',
            'availability': 'https://schema.org/InStock',
            'url': `${ORG_URL}/#/collections/${fabric.id}`,
            'seller': {
                '@type': 'Organization',
                'name': 'IKSA Textiles'
            }
        },
        'additionalProperty': [
            { '@type': 'PropertyValue', 'name': 'Roll Length', 'value': `${fabric.rollLengthInMeters} meters` },
            { '@type': 'PropertyValue', 'name': 'Width', 'value': `${fabric.widthInMeters} meters` },
            { '@type': 'PropertyValue', 'name': 'Finish', 'value': translate(`finish${fabric.finishKey.charAt(0).toUpperCase() + fabric.finishKey.slice(1)}`) },
            { '@type': 'PropertyValue', 'name': 'Weight', 'value': translate(`filterWeight${fabric.weightKey.charAt(0).toUpperCase() + fabric.weightKey.slice(1)}`) }
        ]
    };
};

export const generateArticleSchema = (translate: (key: string, subKey?: string) => string) => {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': translate('thobeGuide_full', 'title'),
        'author': {
            '@type': 'Organization',
            'name': 'IKSA Master Tailors'
        },
        'publisher': {
            '@type': 'Organization',
            'name': 'IKSA Textiles',
            'logo': {
                '@type': 'ImageObject',
                'url': ORG_LOGO_URL
            }
        },
        'image': "https://i.postimg.cc/2j5T00Fw/inspiration-kandura.webp",
        'datePublished': '2024-05-01T09:00:00+07:00',
        'dateModified': new Date().toISOString(),
        'mainEntityOfPage': `${ORG_URL}/#/thobe-guide`
    };
};

export const generateHowToSchema = (translate: (key: string, subKey?: string) => string) => {
    return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        'name': translate('artisansTool_pageTitle'),
        'description': translate('page_artisansTool_description'),
        'step': [
            {
                '@type': 'HowToStep',
                'name': translate('selectFabric'),
                'text': 'Choose the IKSA fabric roll you plan to use from the dropdown list.'
            },
            {
                '@type': 'HowToStep',
                'name': translate('enterRollLength'),
                'text': 'Input the total length of the fabric roll, selecting either meters or yards.'
            },
            {
                '@type': 'HowToStep',
                'name': translate('chooseFabricWidth'),
                'text': 'Select the width of your fabric, either standard (150cm) or narrow (110cm).'
            },
            {
                '@type': 'HowToStep',
                'name': translate('chooseGarmentStyle'),
                'text': 'Choose the style of garment you intend to create, for example, a Saudi Thobe or an Abaya.'
            },
            {
                '@type': 'HowToStep',
                'name': translate('chooseGarmentSize'),
                'text': 'Select the target size for the garment (e.g., Medium, Large).'
            }
        ],
        'yield': 'The number of garments that can be produced.',
        'tool': [
            {
                '@type': 'HowToTool',
                'name': 'IKSA Fabric Roll'
            },
            {
                '@type': 'HowToTool',
                'name': 'Measuring Tape'
            },
            {
                '@type': 'HowToTool',
                'name': 'Cutting Shears'
            }
        ]
    };
};
