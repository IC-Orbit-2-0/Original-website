export interface CommunityMember {
  id: string;
  name: string;
  role?: string;
  image: string;
  specialty: string;
  quote: string;
  x: number; // percentage in constellation field
  y: number;
}

export const COMMUNITY_MEMBERS: CommunityMember[] = [
  {
    id: "mahak",
    name: "Mahak Saxena",
    role: "President",
    image: "/images/members/Mahak.png",
    specialty: "Club Governance & Strategy",
    quote: "IC ORBITE was created so that no student with an ambitious idea has to build in isolation.",
    x: 50,
    y: 18,
  },
  {
    id: "amit",
    name: "Amit",
    role: "Vice President",
    image: "/images/members/Amit.png",
    specialty: "Operations & Hackathon Delegations",
    quote: "We don't wait for opportunities—we code, coordinate, and conquer hackathons together.",
    x: 20,
    y: 45,
  },
  {
    id: "athrava",
    name: "Athrava",
    role: "Vice President",
    image: "/images/members/Athrava.jpeg",
    specialty: "Strategic Outreach & Cohort Growth",
    quote: "Building a premier tech community is about lowering barriers so every student can realize their boldest ideas.",
    x: 80,
    y: 45,
  },
  {
    id: "naman",
    name: "Naman",
    image: "/images/members/Naman.jpeg",
    specialty: "FullStack & Platform Engineering",
    quote: "From our first commit to scaling production apps, every sprint here is an adventure in craft.",
    x: 32,
    y: 78,
  },
  {
    id: "rohit",
    name: "Rohit",
    image: "/images/members/Rohit.jpeg",
    specialty: "Systems Architecture & Deep Tech",
    quote: "Deep technical rigor paired with peer curiosity is the fastest catalyst for engineering excellence.",
    x: 68,
    y: 78,
  },
];

export const COMMUNITY_METRICS = [
  { label: "Active Builders", value: "400+", detail: "Across multiple campus cohorts" },
  { label: "Production Repos", value: "120+", detail: "Open-source & team projects" },
  { label: "Hackathon Victories", value: "18+", detail: "Podiums in national tech hackathons" },
  { label: "Hours in Code Orbit", value: "15,000+", detail: "Workshops, jams & build sessions" },
];
