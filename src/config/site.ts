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
  tagline: "National Project Expo-cum-Hackathon",
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
    fee: "₹400 per team (Inclusive of food, kits & merchandise)",
    deadline: "November 20, 2026 (11:59 PM IST)",
  },
  prizes: {
    totalPool: "₹1,00,000+",
    firstPrize: "₹40,000 + Trophy + Incubation Opportunity",
    secondPrize: "₹25,000 + Trophy",
    thirdPrize: "₹15,000 + Trophy",
    trackWinners: "₹5,000 × 4 Special Track Awards",
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
  description: string;
  iconName: string;
  tags: string[];
  gradient: string;
  accentColor: string;
}

export const TRACKS: TrackItem[] = [
  {
    id: "track-1",
    number: "01",
    title: "Smart Mobility & Electric Vehicles",
    tagline: "Next-gen powertrain, BMS, V2X, autonomous EV subsystems",
    description:
      "Focus on electric powertrain optimization, intelligent battery management systems (BMS), wireless charging, connected vehicle telematics, and autonomous safety micro-controllers.",
    iconName: "Zap",
    tags: ["BMS", "V2G", "Power Electronics", "Autonomous", "CAN Bus"],
    gradient: "from-amber-500/20 via-purple-900/30 to-slate-950/80",
    accentColor: "#FFD166",
  },
  {
    id: "track-2",
    number: "02",
    title: "Clean Energy & Smart Grid Systems",
    tagline: "Renewables, microgrids, high-efficiency converters & storage",
    description:
      "Innovations in distributed renewable energy generation, smart microgrid management, IoT-based power quality monitoring, bidirectional inverters, and hybrid energy storage systems.",
    iconName: "SunMedium",
    tags: ["Solar/Wind IoT", "Microgrids", "Power Quality", "Solid State Transformers"],
    gradient: "from-emerald-500/20 via-purple-900/30 to-slate-950/80",
    accentColor: "#4DDBC5",
  },
  {
    id: "track-3",
    number: "03",
    title: "AIoT & Edge Embedded Intelligence",
    tagline: "Ultra-low power TinyML, industrial telemetry & edge robotics",
    description:
      "Hardware-software codesign using edge processors, TinyML neural acceleration, industrial IoT telemetry, smart sensors, FPGA co-processors, and real-time embedded systems.",
    iconName: "Cpu",
    tags: ["TinyML", "ESP32/STM32", "Edge AI", "FPGA", "Robotics"],
    gradient: "from-cyan-500/20 via-purple-900/30 to-slate-950/80",
    accentColor: "#38BDF8",
  },
  {
    id: "track-4",
    number: "04",
    title: "Biomedical & Assistive Tech",
    tagline: "Wearable diagnostics, patient monitoring & neuro-assist devices",
    description:
      "Non-invasive bio-potential acquisition (ECG/EMG/EEG), wearable health telemetry, smart prosthetics, assistive communication tools, and affordable diagnostic instrumentation.",
    iconName: "Activity",
    tags: ["Bio-Sensors", "Wearables", "Assistive Robotics", "Signal Processing"],
    gradient: "from-rose-500/20 via-purple-900/30 to-slate-950/80",
    accentColor: "#FF6B6B",
  },
  {
    id: "track-5",
    number: "05",
    title: "Open Hardware & Deep Tech Innovation",
    tagline: "Disruptive multidisciplinary engineering solutions",
    description:
      "For visionary projects spanning space electronics, quantum sensor prototypes, agritech automation, defense hardware, and cross-domain breakthroughs.",
    iconName: "Sparkles",
    tags: ["DeepTech", "Agritech", "Avionics", "Quantum/Sensors", "Automation"],
    gradient: "from-purple-500/20 via-indigo-900/30 to-slate-950/80",
    accentColor: "#C084FC",
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
    highlights: ["100+ Booth Showcases", "Peer & Academic Review", "Shortlist of Top 24 Finalists"],
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
      "Felicitation of winners, distribution of ₹1,00,000+ cash prizes, special track awards, certificates, and keynote addresses.",
    highlights: ["₹1 Lakh+ Cash Awards", "Trophy Handover", "Incubation Fast-track"],
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
      "The registration fee covers official delegate ID cards, EUREKA '26 merchandise kits, lunch, high-tea refreshments, participation certificates, and access to all judging rounds and mentoring sessions.",
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
  { value: 100, prefix: "₹", suffix: "k+", label: "Prize & Grant Pool", subtext: "Cash & incubation" },
];
