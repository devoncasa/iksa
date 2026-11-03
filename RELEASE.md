# hithobe reviewed static release

Authorized release: 3 November 2026. Production: www.hithobe.com / Netlify iksa002, main branch.

The editable source is maintained in the owner's private source repository. This public repository deploys only its reviewed compiled website. Older source remains preserved for history; changing those older source files does not rebuild this reviewed release.

## Build

Netlify runs `node scripts/prepare-reviewed-release.mjs`. The script verifies every artifact part and the complete archive SHA-256, validates archive paths, and extracts the reviewed dist output. Publish directory: dist. No credential, pricing rule, server fixture or original photograph is included in the release artifact. Do not substitute the owner-private preview's banner/noindex build.

Source checkpoint: 49cee72af7aa8a5d88858d829f4773a5b776072c. Archive SHA-256: afd696950861d704e608ad5e8841926adf2a2cff50c302fe0edad77fabe07342.

## Future updates

Build and validate in the private source project, regenerate the versioned release parts and manifest, and update them in one main commit. Netlify CI then publishes that exact artifact. Keep the extraction script checksum checks enabled. A source or visual change must be rebuilt before updating these artifacts.

## Runtime limits

The website accepts written fabric enquiries, not payments or confirmed orders. The quote basket carries references and indicative public display totals into an enquiry. Verified server pricing remains disabled pending separately authorized runtime configuration and testing. No server function or private pricing configuration is published by this static release. Netlify Forms receives the existing hithobe-enquiry HTML form; successful delivery and notifications need separate operational verification.

## Verification and recovery

Private-source TypeScript, 61 tests, build and eight static audits pass. Nine languages, 225 prerendered routes, metadata, redirects, responsive images and protected static output are checked. Browser/device visual QA and field Core Web Vitals remain unverified. The extraction script was tested against the exact archive before publication.

For an unwanted published result, use a forward revert commit through CI; do not change DNS or restore/publish an old deploy directly. No pages were permanently deleted. The preceding production source was 301a6a8dbf4881c7f587f70a8f752701b2869a12.
