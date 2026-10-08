export interface CommunityMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  avatarSeed: string;
  quote: string;
  x: number; // percentage in constellation field
  y: number;
}

export const COMMUNITY_MEMBERS: CommunityMember[] = [
  {
    id: "mahak",
    name: "Mahak Saxena",
    role: "President • Founder",
    specialty: "Club Governance & Strategy",
    avatarSeed: "mahak",
    quote: "IC ORBITE was created so that no student with an ambitious idea has to build in isolation.",
    x: 50,
    y: 18,
  },
  {
    id: "amit",
    name: "Amit Dhanoriya",
    role: "Vice President • Co-Founder",
    specialty: "Operations & Hackathon Delegations",
    avatarSeed: "amit",
    quote: "We don't wait for opportunities—we code, coordinate, and conquer hackathons together.",
    x: 22,
    y: 35,
  },
  {
    id: "rohit",
    name: "Rohit Kurve",
    role: "Tech Lead",
    specialty: "Systems Architecture & Deep Tech",
    avatarSeed: "rohit",
    quote: "Deep technical rigor paired with peer curiosity is the fastest catalyst for engineering excellence.",
    x: 78,
    y: 35,
  },
  {
    id: "naman",
    name: "Naman Pandey",
    role: "Development Lead",
    specialty: "FullStack & Platform Engineering",
    avatarSeed: "naman",
    quote: "From our first commit to scaling production apps, every sprint here is an adventure in craft.",
    x: 32,
    y: 72,
  },
  {
    id: "aarav",
    name: "Aarav Sharma",
    role: "Core Lead • Systems",
    specialty: "Rust & Kernel Drivers",
    avatarSeed: "aarav",
    quote: "IC ORBITE transformed how I see code. It's not just syntax; it's building things that endure.",
    x: 68,
    y: 72,
  },
  {
    id: "riya",
    name: "Riya Sen",
    role: "AI Track Lead",
    specialty: "PyTorch & Reasoning Agents",
    avatarSeed: "riya",
    quote: "Shipping our first LLM pipeline with teammates at 3 AM is an experience I will never forget.",
    x: 50,
    y: 84,
  },
];

export const COMMUNITY_METRICS = [
  { label: "Active Builders", value: "400+", detail: "Across multiple campus cohorts" },
  { label: "Production Repos", value: "120+", detail: "Open-source & team projects" },
  { label: "Hackathon Victories", value: "18+", detail: "Podiums in national tech hackathons" },
  { label: "Hours in Code Orbit", value: "15,000+", detail: "Workshops, jams & build sessions" },
];
