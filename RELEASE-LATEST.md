# Resolve initial layout shift and remove homepage CSS round trips

Static documents contain the resolved route before the footer. Initial client hydration waits for the active route. Homepage CSS is embedded in cascade order; print-only route links prevent redundant Vite stylesheet insertion. Interior stylesheets remain cacheable.

Validation: 62 tests, 9 audits, 225 routes. Root-fix PSI mobile runs 92/82/99, median 92 and LCP 2.120s, CLS 0 throughout; desktop 100 twice. These runs precede the additional CSS delivery change. Further live measurements required; no guaranteed score.

Private source: 9551c1bb87d6f1a2f03a91c168fc1ece8806b794. Static artifacts only. Rollback through a forward commit restoring the previous release manifest and archive parts.
