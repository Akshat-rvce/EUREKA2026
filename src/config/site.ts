/**
 * EUREKA '26 — Site Configuration & Data Constants
 * Dept. of Electronics & Electrical Engineering, RVCE Bangalore
 */

// ============================================================================
// 1. PRIMARY REGISTRATION LINK (EDIT THIS WHEN UNSTOP LISTING IS LIVE)
// ============================================================================
export const UNSTOP_EVENT_URL = "https://unstop.com/p/eureka-26-national-expo-cum-hackathon-rvce-bangalore-2026";

// ============================================================================
// 2. EVENT METADATA & BRAND CONSTANTS
// ============================================================================
export const SITE_CONFIG = {
  name: "EUREKA '26",
  tagline: "National Project Expo",
  organizer: "Dept. of Electronics & Electrical Engineering",
  institution: "RV College of Engineering (RVCE), Bangalore",
  date: "November 28, 2026",
  eventDateISO: "2026-11-28T09:00:00+05:30",
  venue: "RVCE Campus, Mysuru Road, RV Vidyanikethan, Bangalore, Karnataka 560059",
  contactEmail: "eureka26.eee@rvce.edu.in",
  contactPhone: "+91 98450 12345 / +91 87620 54321",
  socials: {
    instagram: "https://instagram.com/eureka_rvce",
    linkedin: "https://linkedin.com/company/rvce-eee-eureka",
    github: "https://github.com/rvce-eureka",
    brochure: "/docs/EUREKA26_Official_Brochure.pdf",
  },
  registration: {
    teamSize: "2 - 4 Members",
    eligibility: "Open to UG/PG Engineering Students from all AICTE/UGC recognized colleges across India",
    fee: "₹400 / Team",
    deadline: "November 26, 2026",
  },
  prizes: {
    totalPool: "₹15,000 Total Prize Pool",
    summary: "+ Industry Connect · Mentorship · Goodies",
  },
};

// ============================================================================
// 3. FIVE INNOVATION TRACKS (EASILY EDITABLE DATA ARRAY)
// ============================================================================
export interface TrackItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  prizePool: string;
  description: string;
  iconName: string;
  tags: string[];
  gradient: string;
  accentColor: string;
  projectDirections: string[];
}

export const TRACKS: TrackItem[] = [
  {
    id: "track-1",
    number: "01",
    title: "Robotics & Automation",
    tagline: "Intelligent machines · Human-centred automation · Reliable systems",
    prizePool: "Part of the ₹15,000 total prize pool",
    description:
      "Build machines that sense their surroundings, make decisions, and act reliably. This theme spans assistive and service robots, autonomous mobility, industrial automation, inspection, and precision mechanisms. Strong projects begin with a real task, explain how people and machines work together, and show how the system performs safely when conditions are less than perfect.",
    iconName: "Cpu",
    tags: ["Robotics", "Automation", "Autonomous systems", "Assistive machines", "Industrial innovation"],
    gradient: "from-cyan-500/15 via-black to-black",
    accentColor: "#00F0FF",
    projectDirections: [
      "How might a robot take on repetitive, hazardous, or physically demanding work while keeping people safe?",
      "Can an automated system adapt when routes, materials, lighting, or operating conditions change?",
      "How could practical robotics improve inspection, accessibility, agriculture, or local manufacturing?",
    ],
  },
  {
    id: "track-2",
    number: "02",
    title: "Digital Twin for Sustainable Campus",
    tagline: "A living digital view of campus spaces, resources, and operations",
    prizePool: "Part of the ₹15,000 total prize pool",
    description:
      "Create a useful digital counterpart of a campus space or system and keep it connected to the reality it represents. Explore buildings, classrooms, labs, water, mobility, waste, or maintenance. The aim is better decisions—lower resource use, earlier fault detection, and more thoughtful planning—not a 3D model for its own sake.",
    iconName: "Workflow",
    tags: ["Digital twin", "Campus planning", "Resource efficiency", "Building operations", "Sustainability"],
    gradient: "from-emerald-500/15 via-black to-black",
    accentColor: "#10B981",
    projectDirections: [
      "How could a campus understand where energy, water, or space is being wasted—and decide what to improve first?",
      "Can a digital model help facilities teams spot faults early or plan maintenance before disruption occurs?",
      "How might students and staff use a live campus view to make everyday journeys and shared spaces work better?",
    ],
  },
  {
    id: "track-3",
    number: "03",
    title: "Smart Energy Systems, Microgrids & Sustainable Technologies",
    tagline: "Resilient power · Renewable integration · Smarter energy use",
    prizePool: "Part of the ₹15,000 total prize pool",
    description:
      "Reimagine how communities and campuses produce, store, distribute, and use energy. Explore renewable integration, microgrids, resilient backup, demand management, storage, power quality, and efficiency. Bring forward an approach that balances reliability, affordability, and environmental impact under realistic operating conditions.",
    iconName: "Zap",
    tags: ["Microgrids", "Renewable energy", "Energy resilience", "Efficient buildings", "Sustainable technology"],
    gradient: "from-amber-500/15 via-black to-black",
    accentColor: "#FFD166",
    projectDirections: [
      "How could a campus or neighbourhood keep essential services running when the main grid is disrupted?",
      "Can local renewable generation, storage, and flexible demand work together more intelligently?",
      "What practical changes could reduce energy waste without compromising comfort, safety, or access?",
    ],
  },
  {
    id: "track-4",
    number: "04",
    title: "MedTech & Healthcare",
    tagline: "Better care · Earlier awareness · Greater independence",
    prizePool: "Part of the ₹15,000 total prize pool",
    description:
      "Develop engineering that supports better care, earlier awareness, safer workflows, or greater independence. Projects may serve patients, clinicians, caregivers, or public health. Put people first: make the idea usable, accessible, private, and dependable, and describe clearly what a prototype can—and cannot yet—demonstrate.",
    iconName: "Activity",
    tags: ["MedTech", "Patient care", "Assistive health", "Clinical workflows", "Accessible design"],
    gradient: "from-rose-500/15 via-black to-black",
    accentColor: "#F43F5E",
    projectDirections: [
      "How might a care team notice changing patient needs sooner while keeping the person at the centre of decisions?",
      "Can an everyday healthcare task be made safer, simpler, or more accessible for patients and caregivers?",
      "What would make a health-focused idea usable in a busy clinic or a resource-constrained community?",
    ],
  },
  {
    id: "track-5",
    number: "05",
    title: "Embedded Systems & IoT",
    tagline: "Connected devices · Real-time response · Thoughtful sensing",
    prizePool: "Part of the ₹15,000 total prize pool",
    description:
      "Connect sensing, computation, and control in compact systems that respond to the world around them. Explore connected devices for homes, industry, infrastructure, the environment, mobility, or agriculture. Start with a clear use case, then consider dependability, security, power, connectivity, and responsible handling of the data your system collects.",
    iconName: "Cpu",
    tags: ["Embedded systems", "Internet of Things", "Connected devices", "Real-time sensing", "Edge computing"],
    gradient: "from-purple-500/15 via-black to-black",
    accentColor: "#A855F7",
    projectDirections: [
      "How can connected devices help people understand and respond to changes in a shared environment?",
      "Can an embedded system keep working safely when power, network access, or sensor readings are unreliable?",
      "What should a connected product collect, protect, and share—and what should it leave private?",
    ],
  },
];

// ============================================================================
// 4. TIMELINE & FORMAT MILESTONES
// ============================================================================
export interface TimelineMilestone {
  time: string;
  round: string;
  title: string;
  badge: string;
  description: string;
  highlights: string[];
}

export const TIMELINE: TimelineMilestone[] = [
  {
    time: "08:30 AM — 09:30 AM",
    round: "Stage 00",
    title: "Check-in & Kit Distribution",
    badge: "Registration Desk",
    description:
      "Participants arrive at the RVCE EEE Innovation Hub, complete QR wristband check-in, receive delegate kits and establish booth setups.",
    highlights: ["QR Wristband Scanning", "Hardware Stalls Allotment", "Welcome Breakfast"],
  },
  {
    time: "09:30 AM — 01:30 PM",
    round: "Round 01",
    title: "Grand Project Expo & Preliminary Screening",
    badge: "All 5 Tracks",
    description:
      "All teams showcase physical hardware prototypes & software simulators to academic and research panels. Continuous evaluation on innovation, execution, and viability.",
    highlights: ["Student Project Showcases", "Peer & Academic Review", "Finalist Presentations"],
  },
  {
    time: "01:30 PM — 02:30 PM",
    round: "Intermission",
    title: "Networking Luncheon & Top 24 Reveal",
    badge: "Main Amphitheater",
    description:
      "High-energy networking lunch with academic mentors, industry dignitaries, and the live release of the Top 24 Grand Finalists.",
    highlights: ["Top 24 Announcement", "Judge Mentor Pairings", "Catered Lunch"],
  },
  {
    time: "02:30 PM — 05:30 PM",
    round: "Round 02",
    title: "The Pitch-Off & Industry Jury Evaluation",
    badge: "Grand Finales",
    description:
      "Top 24 teams present 8-minute high-stakes technical pitches + 4-minute live Q&A before senior tech leaders, venture partners, and engineering directors.",
    highlights: ["Deep Technical Defense", "Market Scalability Grilling", "Live Leaderboard Compilation"],
  },
  {
    time: "05:30 PM — 06:45 PM",
    round: "Valedictory",
    title: "Award Ceremony & Prize Distribution",
    badge: "Main Auditorium",
    description:
      "Felicitation of winners, distribution of the event prize pool, certificates, and keynote addresses.",
    highlights: ["Prize Pool Awards", "Trophy Handover", "Certificates"],
  },
];

// ============================================================================
// 5. SPONSOR TIERS (EASILY UPDATEABLE)
// ============================================================================
export interface Sponsor {
  name: string;
  tier: "Title" | "Gold" | "Silver" | "Bronze" | "Partner";
  logoPlaceholder: string;
  description: string;
}

export const SPONSORS: Sponsor[] = [
  {
    name: "RVCE Centre for Clean Energy & EEE Innovation",
    tier: "Title",
    logoPlaceholder: "RVCE EEE",
    description: "Title Academic & Research Patron",
  },
  {
    name: "PowerTech Semiconductors",
    tier: "Gold",
    logoPlaceholder: "PowerTech",
    description: "Hardware Acceleration & Component Partner",
  },
  {
    name: "ElectroEdge Embedded Labs",
    tier: "Gold",
    logoPlaceholder: "ElectroEdge",
    description: "AIoT & Smart Mobility Sponsor",
  },
  {
    name: "VoltGrid Clean Dynamics",
    tier: "Silver",
    logoPlaceholder: "VoltGrid",
    description: "Green Energy & Smart Grid Track Sponsor",
  },
  {
    name: "Nexus Venture Catalysts",
    tier: "Silver",
    logoPlaceholder: "Nexus Labs",
    description: "Incubation & Startup Fellowship Partner",
  },
  {
    name: "CircuitCraft Bangalore",
    tier: "Bronze",
    logoPlaceholder: "CircuitCraft",
    description: "Rapid Prototyping & PCB Manufacturing Partner",
  },
];

// ============================================================================
// 6. FREQUENTLY ASKED QUESTIONS
// ============================================================================
export interface FAQItem {
  question: string;
  answer: string;
  category: "General" | "Participation" | "Judging" | "Logistics";
}

export const FAQS: FAQItem[] = [
  {
    question: "Who is eligible to participate in EUREKA '26?",
    answer:
      "Any undergraduate or postgraduate student enrolled in engineering, technology, or applied sciences from recognized institutions across India can participate. Inter-disciplinary and cross-college teams are fully permitted.",
    category: "Participation",
  },
  {
    question: "What is the team size requirement?",
    answer:
      "Teams must consist of 2 to 4 members. You can designate one team lead who handles registration on Unstop.",
    category: "Participation",
  },
  {
    question: "How are projects evaluated across the two rounds?",
    answer:
      "In Round 1 (Expo), all teams are scored on Innovation (25%), Technical Depth & Hardware Maturity (35%), Practical Viability (20%), and Presentation (20%). The Top 24 advance to Round 2 to pitch in front of industry judges.",
    category: "Judging",
  },
  {
    question: "Do we need to bring working physical hardware?",
    answer:
      "Yes, working prototypes or substantial hardware/software demonstrators are heavily favored for the Expo. Standard 230V AC power outlets and basic lab testing bench facilities will be provided.",
    category: "General",
  },
  {
    question: "What is included with the registration fee?",
    answer:
      "The registration fee covers official event entry for all team members, a dedicated exhibition booth space to display your project, standard 230V AC electrical connection at your booth, participation certificates, and access to all judging rounds and mentoring sessions.",
    category: "Logistics",
  },
  {
    question: "Where is the venue and how do outstation teams reach RVCE?",
    answer:
      "EUREKA '26 is hosted at the Department of Electronics & Electrical Engineering, RV College of Engineering, Mysuru Road, Bangalore. It is easily accessible via the RVCE / Pattanagere Purple Line Metro stations.",
    category: "Logistics",
  },
];

// ============================================================================
// 7. KEY EVENT STATS
// ============================================================================
export const STATS = [
  { value: 500, suffix: "+", label: "Innovators & Delegates", subtext: "From across India" },
  { value: 100, suffix: "+", label: "Working Prototypes", subtext: "Live hardware demos" },
  { value: 5, suffix: "", label: "Engineering Tracks", subtext: "Covering future tech" },
  { value: 15, prefix: "₹", suffix: "k", label: "Total Prize Pool", subtext: "Event prizes" },
];

export interface TeamMember {
  name: string;
  role: string;
  department: string;
}

export const TEAM: TeamMember[] = [
  { name: "Dr. K. S. Geetha", role: "Vice Principal & Patron", department: "RVCE Bangalore" },
  { name: "Dr. Pradeep Kumar", role: "Head of Department", department: "Dept. of EEE, RVCE" },
  { name: "Prof. S. R. Ramesh", role: "Faculty Convener", department: "Dept. of EEE, RVCE" },
  { name: "Student Committee", role: "Organizing Leads", department: "Dept. of EEE, RVCE" },
];

