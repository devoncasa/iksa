import { Fabric, Breadcrumb } from '../types';

const ORG_URL = "https://www.hithobe.com";
const ORG_LOGO_URL = "https://www.hithobe.com/hithobe-icon.svg";

export const generateOrganizationSchema = (translate: (key: string, subKey?: string) => string) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': 'hithobe',
  'url': ORG_URL,
  'logo': ORG_LOGO_URL,
  'contactPoint': {
    '@type': 'ContactPoint',
    'telephone': '+66-81-851-9922',
    'contactType': 'Customer Service',
  },
  'address': {
    '@type': 'PostalAddress',
    'name': 'HiThobe Textiles',
    'streetAddress': translate('contact_addressLine2'),
    'addressLocality': 'Bangkok',
    'addressRegion': 'Bangrak',
    'postalCode': '10500',
    'addressCountry': 'TH'
  }
});

export const generateWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  'url': ORG_URL,
  'name': 'hithobe',

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
            'item': `${ORG_URL}${crumb.path}`
        }))
    };
};

export const generateProductSchema = (fabric: Fabric, translate: (key: string, subKey?: string) => string, descriptionText?:string) => {
    const name = translate(fabric.nameKey);
    const description = descriptionText ?? translate(fabric.detailDescriptionKey);

    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': name,
        'description': description,
        'sku': fabric.id,
        'image': fabric.galleryImages,
        'brand': {
            '@type': 'Brand',
            'name': 'hithobe'
        },

    };
};

export const generateArticleSchema = (translate: (key: string, subKey?: string) => string) => {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': translate('thobeGuide_full', 'title'),
        'author': {
            '@type': 'Organization',
            'name': 'hithobe'
        },
        'publisher': {
            '@type': 'Organization',
            'name': 'hithobe',
            'logo': {
                '@type': 'ImageObject',
                'url': ORG_LOGO_URL
            }
        },
        'image': "/images/hithobe/editorial/kandura-emirati-1280.webp",
        'mainEntityOfPage': `${ORG_URL}/thobe-guide`
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
                'text': 'Choose the hithobe fabric roll you plan to use from the dropdown list.'
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
                'name': 'hithobe Fabric Roll'
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
