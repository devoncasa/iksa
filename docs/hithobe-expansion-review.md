# Hithobe expansion review — 29 October 2026

## Implemented

Four additional page types preserve the existing header, shopping cart, seven fabric SKUs, prices and colour-to-cart behaviour. Six editorial stories provide more routes into the existing collection without inventing inventory.

- `/atelier`: six switchable styling stories, related fabric links carrying validated colour parameters, two new original campaign photographs and existing model colour images.
- `/fabric-library`: 52 user-supplied research entries, query-string search/origin/drape filters, up to three reference comparisons, sourcing checklists and source provenance.
- `/trade-studio`: validated roll yield and mass calculator, explicit formulas and six screen-tone comparisons with neutral/warm surrounds.
- `/sourcing-guide`: five reviewable buying documents, print/save-as-PDF presentation and mailto enquiry template. No email is sent automatically.
- English and Arabic routes; source catalogue names and technical fields retain their original English/transliterated text with `lang=en` and LTR direction.
- New page titles, descriptions, canonical URLs, alternate language links, WebPage structured data and eight additional sitemap routes. Build prerenders 44 routes total.
- Homepage and collections link to the new pages. Collections hero uses a local WebP instead of an external postimg dependency.

## Source handling

Source: https://gemini.google.com/share/a7885d989724 (resolved from the user's share link). Read all seven main sections. Transcribed the 52 visible table rows. This reference explicitly describes a simulated fabric database; individual specifications have not been independently verified. They are labelled research, not products, certifications or stock.

Official references corroborate the existence of Toyobo's thobe textile business, Shikibo's Middle East materials and Dubai's Textile Souk, not the detailed reference table or a hithobe supply relationship:

- https://toyobo-tex.co.jp/en/textile/
- https://shikibo.co.jp/english/enterprise/textile/materials/
- https://www.visitdubai.com/en/places-to-visit/the-textile-souk

Unverified market size, CAGR, producer market-share charts, trade prices, lab pass grades, universal garment dimensions and free-sample promises were not adopted. The regional anatomy topic remains linked through the existing Thobe Guide rather than duplicating unsupported tailoring prescriptions.

## Engineering corrections

58 inches is 147.32 cm, not 150 cm. 25 yards is 22.86 m. The calculator uses actual width and editable cut length. It distinguishes linear length utilisation from pattern-area marker efficiency. Remnants are not pooled across rolls. Packing mass is an explicit total input. There is no claim to estimate freight prices, volumetric weight or customs charges.

## Images

Built-in image-generation tool; two original photographic illustrations converted to WebP at 640 and 1280 pixels, approximately 25–77 kB each. Existing model variants retained. Photographs are explicitly illustrative rather than evidence of a particular mill's material.

Prompt briefs:
1. Low-angle male Emirati kandura editorial beside limestone courtyard steps; subtle East Asian facial features, collarless ivory garment, long tassel, natural skin and weave, architectural daylight.
2. Female taupe abaya editorial viewed through an atelier doorway; matching shayla, soft window light, realistic skin, seams and drape, restrained neutral posture.

## Validation

TypeScript, production build and ten tests pass. Tests cover cart migration, colour variants, quantities, money precision, fabric mass formulas, exact cut boundaries and invalid calculator inputs. Browser checks cover story switching, reference filtering/comparison, calculator updates and Arabic route rendering. Responsive CSS includes small-screen single-column layouts and reduced motion; a complete mobile-device/accessibility audit is still outstanding.

## Remaining priorities

1. Obtain manufacturer technical data sheets, batch-specific test reports and sellable SKU data before converting research entries into inventory.
2. Replace or verify remaining external postimg assets elsewhere in the old site; HTTP success alone does not detect a placeholder image.
3. Validate legacy marketing, composition and performance claims already in the original content.
4. Establish actual sample-order, order-submission and payment services. Current checkout and enquiry flows open email drafts.
5. Replace Tailwind's runtime CDN with a compiled stylesheet and split the large JS bundle in a dedicated performance pass; these affect existing styling and warrant broader regression coverage.
6. Complete real-device mobile, keyboard, screen-reader and field performance checks.
7. Do not claim to be the region's largest supplier or promise search rankings without evidence.
