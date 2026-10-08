export interface ClubEvent {
  id: string;
  title: string;
  tagline: string;
  category: "HACKATHON" | "WORKSHOP" | "TECH TALK" | "CODE JAM" | "COMPETITION";
  date: string;
  time: string;
  location: string;
  status: "REGISTRATION OPEN" | "UPCOMING" | "FEATURED" | "COMPLETED";
  description: string;
  highlights: string[];
  spotsLeft?: number;
  tags: string[];
}

export const CLUB_EVENTS: ClubEvent[] = [
  {
    id: "orbit-code-jam-2026",
    title: "CODE JAM 4.0",
    tagline: "Hack • Build • Ship",
    category: "CODE JAM",
    date: "OCTOBER 24, 2026",
    time: "10:00 AM – 10:00 PM IST",
    location: "Main Tech Auditorium & Discord Live",
    status: "REGISTRATION OPEN",
    description:
      "A 12-hour high-octane engineering marathon where students team up to ship functional products from scratch. Mentors on deck, pizza on demand, real prizes.",
    highlights: [
      "Rapid prototyping sprint",
      "Live mentorship from senior engineers",
      "Cash prizes & API credits",
      "Direct showcase to partner startups",
    ],
    spotsLeft: 28,
    tags: ["FullStack", "AI Agents", "Web3", "Hardware"],
  },
  {
    id: "deep-tech-talk-agents",
    title: "TECH TALKS: AUTONOMOUS AGENTS",
    tagline: "Ideas • Knowledge • Inspiration",
    category: "TECH TALK",
    date: "NOVEMBER 06, 2026",
    time: "05:30 PM – 07:30 PM IST",
    location: "Orbital Studio & YouTube Stream",
    status: "UPCOMING",
    description:
      "A deep dive into next-generation multi-agent architectures, neural reasoning, and local inference models with industry research engineers.",
    highlights: [
      "Production LLM pipelines & RAG",
      "Autonomous tool use & execution loops",
      "Open Q&A with tech leads",
    ],
    spotsLeft: 64,
    tags: ["AI/ML", "LLMs", "Systems", "Python"],
  },
  {
    id: "ic-orbit-hackathon-annual",
    title: "ORBIT HACK: THE MISSION",
    tagline: "Think • Solve • Create",
    category: "HACKATHON",
    date: "DECEMBER 12-14, 2026",
    time: "36-Hour Global Hybrid Hackathon",
    location: "Campus Innovation Hub & Global Remote",
    status: "FEATURED",
    description:
      "The flagship annual hackathon of IC ORBITE. 500+ builders worldwide solving grand challenges across climate tech, developer tooling, decentralized systems, and AI safety.",
    highlights: [
      "₹1,50,000+ Prize Pool",
      "Sponsors from top tech ecosystems",
      "Incubation opportunities for winning MVPs",
      "Keynotes from pioneering founders",
    ],
    spotsLeft: 120,
    tags: ["Flagship", "36 Hours", "Global Hybrid", "Innovation"],
  },
  {
    id: "threejs-creative-workshop",
    title: "CREATIVE 3D WEB WORKSHOP",
    tagline: "Learn • Practice • Build",
    category: "WORKSHOP",
    date: "NOVEMBER 18, 2026",
    time: "02:00 PM – 06:00 PM IST",
    location: "Computer Lab 4B",
    status: "REGISTRATION OPEN",
    description:
      "Master Three.js, GLSL shaders, camera kinetics, and WebGL optimization. Leave with a stunning interactive 3D portfolio project hosted live on Vercel.",
    highlights: [
      "GLSL vertex & fragment shader fundamentals",
      "Post-processing & bloom pipelines",
      "Physics & particle systems in WebGL",
    ],
    spotsLeft: 14,
    tags: ["Three.js", "WebGL", "GLSL", "React"],
  },
  {
    id: "algorithmic-speed-clash",
    title: "ALGO CLASH: SPEED DRILLS",
    tagline: "Challenge Yourself • Level Up",
    category: "COMPETITION",
    date: "NOVEMBER 28, 2026",
    time: "04:00 PM – 07:00 PM IST",
    location: "Online Arena",
    status: "UPCOMING",
    description:
      "Competitive programming showdown designed to sharpen intuition for graph algorithms, dynamic programming, and systems design under time constraints.",
    highlights: [
      "Custom test cases & live leaderboards",
      "Post-contest editorial & breakdown",
      "Exclusive IC ORBITE badge & swag",
    ],
    spotsLeft: 80,
    tags: ["Algorithms", "Data Structures", "C++", "Python"],
  },
];
