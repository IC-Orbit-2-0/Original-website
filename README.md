# IC ORBITE — A Student Coding Club

> **“INTERESTED. CODE ORBIT”**  
> **Brand Philosophy:** “LEARN • BUILD • GROW • TOGETHER”  
> **Vision:** “IDEAS IN ORBIT ∞ A BRIGHTER TOMORROW”

A complete, production-quality, highly immersive 3D motion-based website designed for **IC ORBITE**, a student coding community where curious minds converge to learn modern technology, ship production software, and reach higher orbits together.

---

## 🚀 Key Features & Highlights

1. **Brand Identity & Official Logo**:
   - Preserves and centers the official **IC ORBITE** insignia (`WhatsApp Image 2026-09-21 at 3.32.09 PM.jpeg` / `/public/images/ic-orbite-logo.png`).
   - Deep space color palette: `#05060A`, `#080A12`, `#0B0D18`, `#17152E` accented with electric violet (`#7C3AED`), indigo (`#6366F1`), and soft starlight lavender (`#A78BFA`).

2. **Full-Screen Cinematic Hero & 3D Space**:
   - Central rotating 3D Earth globe with procedural continent textures and atmospheric Fresnel glow.
   - Inclined neon-violet orbital ring with a revolving celestial satellite orb.
   - Floating tech polyhedra and multi-tier starfields.
   - Smooth mouse parallax response that reacts without causing dizziness.
   - Dual CTAs: *“ENTER THE ORBIT”* (smooth scroll to Mission) and *“EXPLORE CLUB”*.

3. **Our Mission**:
   - Main statement: *“Turning curiosity into capability.”*
   - Slowly rotating 3D planetary core with 5 orbiting glowing tags: `LEARN`, `BUILD`, `CREATE`, `COLLABORATE`, `GROW`.
   - Hover and touch interactions revealing core descriptions.

4. **The Orbit (Interactive Ecosystem)**:
   - Interactive celestial system with a central glowing core: `IC ORBITE`.
   - 6 Orbiting nodes: `LEARN`, `BUILD`, `COMPETE`, `CREATE`, `COLLABORATE`, `LEAD`.
   - Clicking any node zooms and highlights it, smoothly dims other nodes, and reveals a comprehensive telemetry HUD panel with deliverables and metrics.

5. **What We Do**:
   - 6 Futuristic glassmorphism cards (`Workshops`, `Projects`, `Hackathons`, `Tech Talks`, `Competitions`, `Community`).
   - 3D cursor-tracking card tilt, glowing border highlights, and tech corner indicators.

6. **The Orbital Journey (LEARN → BUILD → GROW)**:
   - Storytelling timeline visually connected by a continuous glowing orbital beam.

7. **Upcoming Events & Expeditions**:
   - Reusable TypeScript event structure (`data/events.ts`).
   - Categorized filter tabs (`Code Jam`, `Tech Talks`, `Hackathon`, `Workshop`).
   - Real-time spots remaining indicators and registration triggers.

8. **Executive Leadership & Founding Team**:
   - **Mahak Saxena** — President (Founding President)
   - **Amit Dhanoriya** — Vice President (Founding Vice President)
   - **Rohit Kurve** — Tech Lead
   - **Naman Pandey** — Development Lead
   - Dedicated interactive section with 3D tilt glassmorphic cards, orbital badges, specialties, and social links.

9. **Full-Stack Backend & Persistent Storage**:
   - `POST /api/join`: Membership application ingestion, validation, duplicate prevention, and persistent storage in `data/applications.json`.
   - `GET /api/join`: Query total applicants and recent registrations.
   - `POST /api/events/register`: Live RSVP reservation, persistent ticket generation, and spots countdown in `data/events-store.json`.
   - `GET /api/events/register`: Live event schedule with remaining seat quotas.
   - `GET /api/team`: Official founding leadership roster.
   - `GET /api/stats`: Real-time telemetry reporting total dynamic member counts and club metrics.

10. **Projects Showcase**:
   - 3D horizontal carousel with depth, animated slide transitions, tech stack tags, GitHub repositories, and live demo triggers.

9. **Community Constellation Network**:
   - Headline: *“YOU DON'T HAVE TO BUILD ALONE.”*
   - Interactive digital network map with connected laser lines and student profile spotlights.

10. **Join The Orbit Modal & Audio Synthesizer**:
    - Interactive application modal with domain tracks (Systems, AI/ML, Creative 3D, Hackathons) and confetti celebration explosion.
    - Web Audio API synthesizer for ambient cosmic drone and interaction chimes (100% opt-in, non-autoplay with floating mute controller).
    - Custom futuristic dual-ring magnetic cursor.
    - High-performance 2D Canvas & CSS fallback for devices without WebGL.
    - Lenis buttery-smooth scrolling.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + Custom Glassmorphism & Keyframe Shaders
- **3D Graphics**: Three.js (Optimized WebGL scenes with memory cleanup & DPR clamping)
- **Motion**: Framer Motion & Lenis Smooth Scroll
- **Audio**: Web Audio API (Zero paid assets, zero external MP3s, instant load)
- **Icons**: Custom High-Fidelity SVGs & Lucide React

---

## 📦 Getting Started

### 1. Installation

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Verification

```bash
npm run build
npm run start
```

---

## 🏛️ Code Architecture

```
src/
├── app/
│   ├── layout.tsx         # Metadata, SEO, font definitions, dark theme
│   ├── page.tsx           # Master page stream, Lenis scroll, audio binding
│   └── globals.css        # Space theme variables, glassmorphism, keyframes
├── components/
│   ├── 3d/
│   │   ├── SpaceScene.tsx               # Master background starfield & nebula
│   │   ├── HeroGlobe.tsx                # 3D Earth, orbit rings & satellite
│   │   ├── MissionPlanet.tsx            # 3D planet with 5 orbiting tags
│   │   ├── InteractiveOrbitSystem.tsx   # Nucleus + 6 interactive nodes + HUD
│   │   ├── ConstellationNetwork.tsx     # Student network map & connection lines
│   │   └── FallbackSpace.tsx            # High-performance 2D Canvas fallback
│   ├── sections/
│   │   ├── Preloader.tsx    # Cinematic entrance sequence
│   │   ├── Navbar.tsx       # Glass navbar + scrollspy + mobile drawer
│   │   ├── Hero.tsx         # Full-screen 3D hero with logo & telemetry
│   │   ├── Mission.tsx      # Mission statement & 3D rotating planet
│   │   ├── TheOrbit.tsx     # Ecosystem interactive solar system
│   │   ├── WhatWeDo.tsx     # 6 Glass cards with 3D tilt
│   │   ├── Journey.tsx      # LEARN → BUILD → GROW connected beam
│   │   ├── Events.tsx       # Filterable event schedule & badges
│   │   ├── Projects.tsx     # 3D depth carousel showcase
│   │   ├── Community.tsx    # Digital network & community statistics
│   │   ├── JoinOrbit.tsx    # Grand finale CTA & warp animation
│   │   └── Footer.tsx       # Logo, links, coordinates, and brand motto
│   └── ui/
│       ├── Button.tsx           # Magnetic glowing buttons
│       ├── GlassCard.tsx        # 3D tilt glassmorphic cards
│       ├── SectionHeading.tsx   # Glowing typography & coordinates
│       ├── CustomCursor.tsx     # Desktop dual-ring magnetic cursor
│       ├── SoundController.tsx  # Ambient cosmic synthesizer toggle
│       ├── JoinModal.tsx        # Application form with confetti
│       └── Icons.tsx            # Crisp SVG brand icons
├── data/
│   ├── events.ts        # Typed club event listings
│   ├── projects.ts      # Typed student showcase projects
│   ├── orbitNodes.ts    # 6 Orbit pillars & telemetry data
│   └── community.ts     # Network member nodes & quotes
└── hooks/
    ├── useWebGLSupport.ts   # Graceful fallback detector
    ├── useMousePosition.ts  # Parallax coordinates
    └── useAudioSynth.ts     # Web Audio API cosmic soundscape
```
# official-website
