# TANK: Build and Architectural Log

## Milestone: Watson Color System + Bennett & Clive Experience Redesign
**Date**: October 8, 2026  
**Environment**: Windows, Node.js v26.4.0, npm 12.0.2, Next.js 16.4.0 (Turbopack), Tailwind CSS v4, Framer Motion

---

### 1. Source of Truth: Watson LA Color System
* **Inspected Tokens from `watson.la` DOM & CSS Variables**:
  * Canvas Base: Warm porcelain off-white (`#fefefe` / `#ffffff`)
  * Alternate Surface: Warm chalk (`#f5f4ef`)
  * Accent Surface: Sandstone / Oatmeal (`#e6e3d9`) and highlight parchment (`#dbcabd`)
  * Primary Typography: Solid black (`#000000`)
  * Typographic Tones via opacity: `rgba(0,0,0,0.70)`, `rgba(0,0,0,0.55)`, `rgba(0,0,0,0.35)`, `rgba(0,0,0,0.18)`
  * Dark Chapter Surface: Inky boardroom black (`#0a0a0c` / `#121318`) with white text (`#fefefe`)
  * Watson Signature CTA: Royal Electric Cobalt Blue (`--color-cta-bg: #00f;` -> `#0000ff`, hover `#0000cc`, text `#ffffff`)
  * Hairline Dividers: `rgba(0,0,0,0.08)` and `rgba(0,0,0,0.12)` on light surfaces; `rgba(255,255,255,0.10)` on dark surfaces.
  * Investor Persona Accents:
    * Marcus Vance (The Skeptic): Oxblood Crimson (`#b91c1c`)
    * Dr. Elena Rostova (The Quant): Watson Electric Cobalt (`#0000ff`)
    * Aria Chen (The Visionary): Warm Sandstone Ochre (`#b48c36`)
    * David Sullivan (The Operator): Deep Forest Slate (`#15803d`)

---

### 2. Source of Truth: Bennett & Clive Experience & Motion
* **Inspected Design Principles from `bennettandclive.com`**:
  * **Typography**: `Inter` (matching Bennett & Clive's `InterWeb` Bold, tight letter spacing `-0.065em` to `-0.04em`, line-height `0.84` down to `0.77`).
  * **Hero Composition**: Massive display typography, deliberate negative space, stacked bold statements.
  * **Opening & Scroll Reveals**: Smooth line translation (`translateY(2rem)` to `0`, `cubic-bezier(.32,.94,.6,1)`).
  * **Navigation Links**: Interactive hover underline scale (`scaleX(0)` to `scaleX(1)` from left to right).
  * **Layout Density & Spacing**: Generous gutters, 4-column and 12-column asymmetric grids, and numbered stage chips `(1)`, `(2)`, `(3)`.

---

### 3. Full Landing Page Redesign Breakdown
1. **Section 1 — Navigation (`Navbar.tsx`)**:
   * Corner wordmark: `THE TANK` / `(LOS ANGELES)`.
   * Parenthesis navigation anchors: `(1) Experience`, `(2) How It Works`, `(3) Investors`, `(4) Value`, `(5) Evaluation`.
   * Signature Watson Cobalt CTA: `ENTER THE TANK` (`/intake`).
   * Mobile drawer with high-contrast light treatment.
2. **Section 2 — Immersive Hero (`page.tsx`)**:
   * Headline: `YOUR IDEA. / UNDER PRESSURE. / A VERDICT AWAITS.`
   * Supporting Copy: `Four investors. Relentless questions. Real business decisions. Step into the room and discover what your startup needs to prove.`
   * Primary CTA: `ENTER THE TANK` (`/intake`) in Watson Cobalt.
   * Secondary CTA: `EXPLORE THE EXPERIENCE` (`#experience`).
   * Architectural boardroom matrix with live partner stations and founder podium.
3. **Section 3 — Transition into the Experience (`#experience`)**:
   * Surface transition to Watson warm chalk (`#f5f4ef`).
   * Editorial statement: *"From pitch deck slides to the unvarnished scrutiny of the room."*
   * 3-Part narrative breakdown: `(1) HYPOTHESIS` → `(2) INTERROGATION` → `(3) CONVERGENCE`.
4. **Section 4 — How It Works (`#how-it-works`)**:
   * Four-stage protocol in Bennett & Clive 4-column asymmetric grid:
     * `(1) Bring Your Pitch`
     * `(2) Face the Investors`
     * `(3) Defend the Deal`
     * `(4) Get Your Verdict`
5. **Section 5 — Meet the Investors (`#investors`)**:
   * High-stakes inky dark boardroom chapter (`#0a0a0c`).
   * Four fictional personas: Marcus Vance, Dr. Elena Rostova, Aria Chen, David Sullivan.
   * Interactive persona selector with diligence pillars, philosophy, and characteristic questions.
6. **Section 6 — Product Value & Five Essential Stress Tests (`#value`)**:
   * 12-column asymmetric layout covering:
     * `(01) Pressure-test your business model`
     * `(02) Defend your financial assumptions`
     * `(03) Practice investor negotiations`
     * `(04) Identify risks and weaknesses`
     * `(05) Receive actionable feedback`
7. **Section 7 — Sample Evaluation Experience (`#dossier`)**:
   * Post-pitch syndicate memorandum vignette:
     * Overall consensus assessment (Conditional Term Sheet: $2.5M on $18M Post).
     * Individual partner votes and quotes.
     * Strengths, weaknesses, and counter-terms.
     * 3-part remediation roadmap.
     * Prominently marked: `ILLUSTRATIVE DOSSIER PREVIEW ONLY`.
8. **Section 8 — Final Conversion Section**:
   * Headline: `THE ROOM IS WAITING.`
   * Supporting copy: `Bring your idea. Prepare to defend it.`
   * Primary CTA in Watson Cobalt (`/intake`).
9. **Section 9 — Footer**:
   * Restrained editorial footer with wordmark, index links, governance links, and simulation advisory disclaimer.

---

### 4. Changed Files
* [`src/app/globals.css`](file:///d:/TANK/src/app/globals.css) — Replaced black-and-gold theme with exact Watson color system tokens, Bennett & Clive typography, link underline transitions, and cursor styling.
* [`src/app/layout.tsx`](file:///d:/TANK/src/app/layout.tsx) — Configured `Inter` and `JetBrains_Mono` fonts; set light canvas base.
* [`src/components/Navbar.tsx`](file:///d:/TANK/src/components/Navbar.tsx) — Rebuilt with Watson cobalt CTA, Bennett & Clive typography, and parenthesis anchors.
* [`src/components/CustomCursor.tsx`](file:///d:/TANK/src/components/CustomCursor.tsx) — Preserved fine-pointer desktop interaction with Watson cobalt hover rings.
* [`src/app/page.tsx`](file:///d:/TANK/src/app/page.tsx) — Full implementation of all 9 sections under the Watson + Bennett & Clive aesthetic.
* [`BUILD_LOG.md`](file:///d:/TANK/BUILD_LOG.md) — Comprehensive documentation of the implementation and verification.

---

### 5. Build and Verification Records
* **Production Build (`npm run build`)**:
  * **Exit Code: 0 (Success)**
  * Compilation completed in 3.3s with Turbopack.
  * TypeScript validation passed in 7.9s with zero errors.
  * Static page generation succeeded for all 10 routes.
* **HTTP Route Audits (`http://localhost:3000`)**:
  * `GET /`: **HTTP 200 OK** (All 13 content checks PASS)
  * `GET /intake`: **HTTP 200 OK** (Preserved pitch intake page and 3 sample startups)
  * `GET /arena`: **HTTP 200 OK**
  * `GET /report`: **HTTP 200 OK**
  * `GET /privacy`: **HTTP 200 OK**
  * `GET /terms`: **HTTP 200 OK**
* **Reference Inspection Limitations**:
  * Live HTTP text, CSS variables, and HTML DOM structures of both websites were inspected directly. Complex proprietary WebGL/Canvas shaders on Watson LA (`#gp`, `gpe`) were noted and substituted with clean native CSS/Framer Motion equivalents for maximum performance and compatibility.
