export interface OrbitNode {
  id: string;
  label: string;
  subtitle: string;
  angle: number; // in degrees for circular orbital layout
  radius: number; // orbital distance
  color: string;
  glowColor: string;
  description: string;
  coreFocus: string[];
  metric: string;
}

export const ORBIT_NODES: OrbitNode[] = [
  {
    id: "learn",
    label: "LEARN",
    subtitle: "Deep Engineering Fundamentals",
    angle: 0,
    radius: 180,
    color: "#6366F1",
    glowColor: "rgba(99, 102, 241, 0.6)",
    description:
      "Master foundational concepts and modern stacks. From computer systems, compilers, and networks to bleeding-edge generative AI, our structured cohorts make complex tech approachable.",
    coreFocus: [
      "Guided roadmaps in Systems, Web, and ML",
      "Interactive code reviews & office hours",
      "Curated research papers & engineering writeups",
    ],
    metric: "40+ Tech Workshops Run",
  },
  {
    id: "build",
    label: "BUILD",
    subtitle: "Turn Knowledge Into Real Software",
    angle: 60,
    radius: 200,
    color: "#7C3AED",
    glowColor: "rgba(124, 58, 237, 0.6)",
    description:
      "Theory without execution is dormant. At IC ORBITE, every member ships real applications, writes clean tests, packages binaries, and deploys scalable production backends.",
    coreFocus: [
      "Collaborative open-source team repositories",
      "Full-stack web, mobile, and hardware prototypes",
      "Automated CI/CD deployment pipelines",
    ],
    metric: "120+ Repositories Shipped",
  },
  {
    id: "compete",
    label: "COMPETE",
    subtitle: "Pressure-Tested Innovation",
    angle: 120,
    radius: 190,
    color: "#EC4899",
    glowColor: "rgba(236, 72, 153, 0.6)",
    description:
      "Test your skills on global stages. We train teams for hackathons, algorithmic speed drills, CTF cybersecurity defense, and robotics challenges across the globe.",
    coreFocus: [
      "Hackathon team incubators & war rooms",
      "Weekly competitive programming sprints",
      "Direct sponsorship and travel grants",
    ],
    metric: "18+ National Hackathon Podiums",
  },
  {
    id: "create",
    label: "CREATE",
    subtitle: "Creative Coding & UI Aesthetics",
    angle: 180,
    radius: 210,
    color: "#8B5CF6",
    glowColor: "rgba(139, 92, 246, 0.6)",
    description:
      "Software is art. We cultivate designers and creative engineers who craft fluid 3D web experiences, generative shaders, interactive spatial audio, and cinematic UI/UX.",
    coreFocus: [
      "Three.js, WebGL & GLSL shader labs",
      "Design systems & micro-interaction craft",
      "Generative art and computational design",
    ],
    metric: "30+ Creative Web Projects",
  },
  {
    id: "collaborate",
    label: "COLLABORATE",
    subtitle: "The Power of High-Trust Teams",
    angle: 240,
    radius: 195,
    color: "#3B82F6",
    glowColor: "rgba(59, 130, 246, 0.6)",
    description:
      "Never code in isolation. Join multidisciplinary pods where backend architects, UI designers, and systems hackers build synergies that elevate everyone's standard.",
    coreFocus: [
      "Pair programming and cross-team code swaps",
      "Active 24/7 Discord dev lounges",
      "Senior-junior peer mentoring circles",
    ],
    metric: "400+ Active Student Members",
  },
  {
    id: "lead",
    label: "LEAD",
    subtitle: "Shape the Future Community",
    angle: 300,
    radius: 185,
    color: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.6)",
    description:
      "Step up as project maintainers, track leaders, workshop instructors, and event organizers. Develop the technical leadership skills that define top-tier engineers.",
    coreFocus: [
      "Mentorship program leadership",
      "Public speaking and workshop delivery",
      "Organizing high-impact campus tech conferences",
    ],
    metric: "25+ Student Track Mentors",
  },
];
