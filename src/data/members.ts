export interface Member {
  id: string;
  name: string;
  role?: string;
  image: string;
  linkedin: string;
  github: string;
  coordinates?: string;
  badge?: string;
}

export const MEMBERS: Member[] = [
  {
    id: "mahak-saxena",
    name: "Mahak Saxena",
    role: "President",
    image: "/images/members/Mahak.png",
    linkedin: "https://in.linkedin.com/in/mahaksaxenatech",
    github: "https://github.com/Mahak-0101",
    coordinates: "ORBIT_ALPHA // NODE 01",
    badge: "MISSION COMMAND",
  },
  {
    id: "amit",
    name: "Amit",
    role: "Vice President",
    image: "/images/members/Amit.png",
    linkedin:
      "https://www.linkedin.com/in/amit-dhanoriya-bb4286353?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    github: "https://github.com/amitdhanoriyacode30-gif",
    coordinates: "ORBIT_BETA // NODE 02",
    badge: "OPERATIONS COMMAND",
  },
  {
    id: "athrava",
    name: "Athrava",
    role: "Vice President",
    image: "/images/members/Athrava.jpeg",
    linkedin:
      "https://www.linkedin.com/in/at-vy-oo0777?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    github: "https://github.com/At-vy",
    coordinates: "ORBIT_GAMMA // NODE 03",
    badge: "STRATEGY & OUTREACH",
  },
  {
    id: "naman",
    name: "Naman",
    // No role provided: do not display any role or placeholder text
    image: "/images/members/Naman.jpeg",
    linkedin:
      "https://www.linkedin.com/in/naman-pandey-187546339?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    github: "https://github.com/Nammupandit",
    coordinates: "ORBIT_DELTA // NODE 04",
    badge: "CORE BUILDER",
  },
  {
    id: "rohit",
    name: "Rohit",
    // No role provided: do not display any role or placeholder text
    image: "/images/members/Rohit.jpeg",
    linkedin:
      "https://www.linkedin.com/in/rohit-kurve-514a07437?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    github: "https://github.com/icOrbit1",
    coordinates: "ORBIT_EPSILON // NODE 05",
    badge: "CORE BUILDER",
  },
];
