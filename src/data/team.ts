export interface TeamMember {
  id: string;
  name: string;
  role: string;
  title: string;
  badge: string;
  specialty: string;
  bio: string;
  coordinates: string;
  avatarSeed: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  metrics: {
    label: string;
    value: string;
  };
}

export const EXECUTIVE_TEAM: TeamMember[] = [
  {
    id: "mahak-saxena",
    name: "Mahak Saxena",
    role: "President",
    title: "FOUNDING PRESIDENT",
    badge: "MISSION COMMAND",
    specialty: "Club Governance • Strategy • Industry Alliances",
    bio: "Pioneering the vision of IC ORBITE. Fosters strategic partnerships, steers campus chapter governance, and champions an ambitious culture where every student turns latent curiosity into production engineering capability.",
    coordinates: "ORBIT_ALPHA // NODE 01",
    avatarSeed: "mahak",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    metrics: {
      label: "Leadership Term",
      value: "2026 – Present",
    },
  },
  {
    id: "amit-dhanoriya",
    name: "Amit Dhanoriya",
    role: "Vice President",
    title: "FOUNDING VICE PRESIDENT",
    badge: "OPERATIONS COMMAND",
    specialty: "Operations • Hackathon Delegations • Community Growth",
    bio: "Architecting operations across all orbital cohorts. Directs hackathon war rooms, manages cross-university initiatives, and ensures every member finds their optimal trajectory within the club ecosystem.",
    coordinates: "ORBIT_BETA // NODE 02",
    avatarSeed: "amit",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    metrics: {
      label: "Delegations Led",
      value: "18+ Hackathons",
    },
  },
  {
    id: "atharva-vyas",
    name: "Atharva Vyas",
    role: "Vice President",
    title: "VICE PRESIDENT",
    badge: "STRATEGY & OUTREACH",
    specialty: "Strategy • Campus Outreach • Cohort Growth",
    bio: "Driving strategic growth and student outreach across all club programs. Spearheads campus partnerships, industry mentorship networks, and ensures seamless execution across flagship club initiatives.",
    coordinates: "ORBIT_GAMMA // NODE 03",
    avatarSeed: "atharva",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    metrics: {
      label: "Strategic Initiatives",
      value: "12+ Campus Chapters",
    },
  },
  {
    id: "rohit-kurve",
    name: "Rohit Kurve",
    role: "Tech Lead",
    title: "TECHNICAL ARCHITECT & LEAD",
    badge: "ENGINEERING CORE",
    specialty: "Systems Architecture • Deep Tech • AI & Research",
    bio: "Leading deep technical initiatives, code reviews, and high-performance engineering tracks. Specializes in low-latency distributed networks, compiler design, and modern neural architectures.",
    coordinates: "ORBIT_DELTA // NODE 04",
    avatarSeed: "rohit",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    metrics: {
      label: "Architected Repos",
      value: "45+ Production Builds",
    },
  },
  {
    id: "naman-pandey",
    name: "Naman Pandey",
    role: "Development Lead",
    title: "DEVELOPMENT & PLATFORMS LEAD",
    badge: "PLATFORM ARCHITECT",
    specialty: "FullStack Engineering • Cloud & DevOps • WebGL",
    bio: "Directing product engineering sprints and club software platforms. Mentors student squads through end-to-end SDLC, continuous deployment pipelines, and cutting-edge creative web experiences.",
    coordinates: "ORBIT_EPSILON // NODE 05",
    avatarSeed: "naman",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    metrics: {
      label: "Platforms Shipped",
      value: "20+ Web & Mobile Apps",
    },
  },
];
