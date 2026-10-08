export interface StudentProject {
  id: string;
  title: string;
  tagline: string;
  category: "AI & ML" | "SYSTEMS" | "CREATIVE 3D" | "WEB PLATFORMS" | "OPEN SOURCE";
  description: string;
  tech: string[];
  githubUrl: string;
  demoUrl: string;
  stats: {
    label: string;
    value: string;
  };
  featured: boolean;
}

export const STUDENT_PROJECTS: StudentProject[] = [
  {
    id: "orbit-mesh",
    title: "AetherMesh Engine",
    tagline: "Decentralized P2P Data Layer",
    category: "SYSTEMS",
    description:
      "A high-throughput distributed peer-to-peer data synchronization network built in Rust and WebAssembly, enabling zero-server offline collaboration for campus applications.",
    tech: ["Rust", "WebAssembly", "WebRTC", "Tokio", "TypeScript"],
    githubUrl: "https://github.com/ic-orbite/aether-mesh",
    demoUrl: "https://aether-mesh.demo.app",
    stats: {
      label: "Latency",
      value: "<12ms Peer Sync",
    },
    featured: true,
  },
  {
    id: "neural-canvas-3d",
    title: "NeuroSphere 3D",
    tagline: "Volumetric Brain Simulation",
    category: "CREATIVE 3D",
    description:
      "An interactive 3D WebGL portal that renders neurological pulse pathways in real time using custom GLSL compute shaders and interactive spatial soundscapes.",
    tech: ["Three.js", "GLSL Shaders", "Web Audio API", "React", "Tailwind CSS"],
    githubUrl: "https://github.com/ic-orbite/neurosphere",
    demoUrl: "https://neurosphere-demo.app",
    stats: {
      label: "Performance",
      value: "60 FPS 100k Nodes",
    },
    featured: true,
  },
  {
    id: "campus-orbit-copilot",
    title: "PulseAI: Student Copilot",
    tagline: "Autonomous Academic Assistant",
    category: "AI & ML",
    description:
      "A local-first reasoning assistant fine-tuned on course syllabi and lab manuals, providing intelligent debugging suggestions and concept breakdowns with citations.",
    tech: ["Python", "Ollama", "FastAPI", "Next.js", "Vector DB"],
    githubUrl: "https://github.com/ic-orbite/pulse-copilot",
    demoUrl: "https://pulse-copilot.demo.app",
    stats: {
      label: "Users",
      value: "1,200+ Active Students",
    },
    featured: true,
  },
  {
    id: "dev-sentinel",
    title: "Sentinel CI/CD",
    tagline: "Automated Student Code Auditor",
    category: "OPEN SOURCE",
    description:
      "A lightweight GitHub Action created by club members that detects security anti-patterns, leaks of keys, and unhandled memory allocations across student hackathon repos.",
    tech: ["Go", "Docker", "GitHub Actions", "AST Parsing"],
    githubUrl: "https://github.com/ic-orbite/sentinel-audit",
    demoUrl: "https://sentinel-audit.demo.app",
    stats: {
      label: "Repos Scanned",
      value: "450+ Projects",
    },
    featured: false,
  },
  {
    id: "satellite-telemetry-ui",
    title: "OrbitTracker Telemetry",
    tagline: "Live Low-Earth Orbit Ground Station",
    category: "WEB PLATFORMS",
    description:
      "A real-time telemetry dashboard visualizing satellite flyovers, pass predictions, and Doppler frequency shifts with custom orbital path visualizers.",
    tech: ["Next.js", "CesiumJS", "WebSockets", "Tailwind CSS"],
    githubUrl: "https://github.com/ic-orbite/orbittracker",
    demoUrl: "https://orbittracker.demo.app",
    stats: {
      label: "Satellites Tracked",
      value: "2,500+ Active Objects",
    },
    featured: false,
  },
];
