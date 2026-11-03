# Static route visibility correction

Fix the saved streaming Suspense shell that painted the footer before the real homepage. Await the resolved tree and serialize completed HTML, then wait for the active page module before hydration. Reject pending reveal templates and scripts in all 225 generated pages.

Validation: 62 tests and 9 audits pass. User-supplied PSI baseline: mobile 60, LCP 4.4s, CLS 0.499. No claimed new score until the deployed build is measured.

Source: ab79d6141f6755e9b01c58cf1953799e79713e85. Output: reviewed static artifacts only. Rollback: forward commit restoring previous manifest/artifact.
