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
  prizePool: string;
  description: string;
  iconName: string;
  tags: string[];
  gradient: string;
  accentColor: string;
  problemStatements: string[];
  hardwareStack: string[];
  evaluationCriteria: { criteria: string; weight: string }[];
}

export const TRACKS: TrackItem[] = [
  {
    id: "track-1",
    number: "01",
    title: "Smart Mobility & Electric Vehicles",
    tagline: "Next-gen powertrain, BMS, V2X, regenerative braking & autonomous EV subsystems",
    prizePool: "₹15,000 Track Winner + Swag & Mentorship",
    description:
      "Design and engineer intelligent EV technologies: advanced Battery Management Systems (BMS) with thermal runaway prediction, ultra-efficient motor controllers, bidirectional vehicle-to-grid (V2G) converters, and autonomous driver-assistance edge units.",
    iconName: "Zap",
    tags: ["BMS & Thermal", "V2G & V2X", "Motor Drives", "CAN Bus", "ADAS Edge AI"],
    gradient: "from-amber-500/15 via-black to-black",
    accentColor: "#FFD166",
    problemStatements: [
      "AI-driven State-of-Health (SOH) and thermal runaway early warning system for Lithium/Solid-State battery packs.",
      "High-efficiency GaN/SiC bidirectional onboard charger with Vehicle-to-Home (V2H) capability.",
      "Low-cost edge ADAS sensor fusion module with real-time blindspot & collision prevention for 2-wheelers.",
      "Smart wireless resonant charging platform with dynamic foreign-object detection."
    ],
    hardwareStack: ["STM32 / TI C2000 MCU", "GaN / SiC MOSFETs", "CAN / LIN Transceivers", "LiFePO4 / NMC Cells", "Hall / Current Sensors"],
    evaluationCriteria: [
      { criteria: "Hardware Architecture & Efficiency", weight: "35%" },
      { criteria: "Safety, Reliability & BMS Precision", weight: "25%" },
      { criteria: "Real-time Telemetry & Edge Intelligence", weight: "20%" },
      { criteria: "Scalability & Market Viability", weight: "20%" },
    ],
  },
  {
    id: "track-2",
    number: "02",
    title: "Clean Energy & Smart Grid Systems",
    tagline: "Renewables, microgrids, high-efficiency converters, power quality & storage",
    prizePool: "₹15,000 Track Winner + Swag & Mentorship",
    description:
      "Pioneer the future of decentralized green energy. Build microgrid dispatch controllers, smart inverters with active harmonic suppression, solid-state transformers, and IoT power monitors for sustainable smart cities.",
    iconName: "SunMedium",
    tags: ["Solar/Wind IoT", "Microgrid EMS", "Power Quality", "Solid State Transformers", "Energy Storage"],
    gradient: "from-emerald-500/15 via-black to-black",
    accentColor: "#10B981",
    problemStatements: [
      "Autonomous hybrid solar-wind microgrid energy management controller with demand-response forecasting.",
      "Grid-tied multilevel inverter with active power factor correction (PFC) and harmonic mitigation.",
      "IoT non-intrusive load monitoring (NILM) edge device for industrial energy auditing.",
      "Decentralized peer-to-peer (P2P) renewable energy trading hardware meter with tamper detection."
    ],
    hardwareStack: ["ESP32-S3 / Raspberry Pi Pico", "Current / Voltage CT Sensors", "IGBT / MOSFET Inverter H-Bridge", "Optoisolators", "MQTT / Modbus"],
    evaluationCriteria: [
      { criteria: "Power Conversion Efficiency & Harmonic Control", weight: "35%" },
      { criteria: "Grid Stability & Response Speed", weight: "25%" },
      { criteria: "Telemetry & Cloud Dashboard Integration", weight: "20%" },
      { criteria: "Environmental & Economic Impact", weight: "20%" },
    ],
  },
  {
    id: "track-3",
    number: "03",
    title: "AIoT & Edge Embedded Intelligence",
    tagline: "Ultra-low power TinyML, industrial telemetry, smart robotics & edge accelerators",
    prizePool: "₹15,000 Track Winner + Swag & Mentorship",
    description:
      "Merge physical sensors with neural inference right on the silicon. Build real-time anomaly detection for industrial machinery, ultra-low power wearable neural chips, autonomous warehouse rovers, and secure wireless sensor meshes.",
    iconName: "Cpu",
    tags: ["TinyML", "ESP32 / STM32", "Edge AI", "FPGA Accelerators", "Industrial Robotics"],
    gradient: "from-cyan-500/15 via-black to-black",
    accentColor: "#00F0FF",
    problemStatements: [
      "On-device TinyML vibration & acoustic anomaly detector for predictive machine maintenance.",
      "FPGA-accelerated low-latency computer vision system for real-time robotic quality inspection.",
      "Sub-GHz LoRaWAN multi-hop sensor mesh for agricultural soil nutrient & weather telemetry.",
      "Edge biometric authentication gateway with anti-spoofing thermal and vision fusion."
    ],
    hardwareStack: ["Xilinx / Gowin FPGA", "ARM Cortex-M4/M7", "Seeed Xiao BLE / ESP32-CAM", "IMU & MEMS Sensors", "LoRa / BLE 5.3"],
    evaluationCriteria: [
      { criteria: "Algorithm Optimization & On-device Inference Latency", weight: "35%" },
      { criteria: "Hardware Power Efficiency & Battery Life", weight: "25%" },
      { criteria: "Industrial Robustness & Fault Tolerance", weight: "20%" },
      { criteria: "End-to-End System Usability", weight: "20%" },
    ],
  },
  {
    id: "track-4",
    number: "04",
    title: "Biomedical & Assistive Tech",
    tagline: "Wearable diagnostics, patient monitoring, bio-signal telemetry & assistive bionics",
    prizePool: "₹15,000 Track Winner + Swag & Mentorship",
    description:
      "Engineering technologies that save and elevate lives. Develop non-invasive bio-potential acquisition devices (ECG/EMG/EEG), smart bionic prosthetics with haptic feedback, real-time fall detectors for the elderly, and ICU telemetry monitors.",
    iconName: "Activity",
    tags: ["Bio-Sensors (ECG/EMG)", "Smart Prosthetics", "Wearable Telemetry", "Assistive Audio/Vision"],
    gradient: "from-rose-500/15 via-black to-black",
    accentColor: "#F43F5E",
    problemStatements: [
      "Continuous non-invasive multi-lead ECG & arrhythmia detection wearable with emergency cellular alert.",
      "EMG-controlled multi-articulated prosthetic hand with closed-loop tactile force feedback.",
      "Smart assistive navigation glasses with spatial audio obstacle alerts for visually impaired individuals.",
      "Portable vital-signs screening kit with automated triage reporting for rural health clinics."
    ],
    hardwareStack: ["ADS1299 / AD8232 Bio-Amps", "Servo & Actuator Drivers", "Bluetooth LE SoC", "OLED / E-Paper Display", "Rechargeable LiPo PMIC"],
    evaluationCriteria: [
      { criteria: "Clinical Accuracy, Signal Quality & Noise Rejection", weight: "35%" },
      { criteria: "Ergonomics, Patient Safety & Wearability", weight: "25%" },
      { criteria: "Affordability & Accessibility in Indian Context", weight: "20%" },
      { criteria: "Demonstrated Working Prototype", weight: "20%" },
    ],
  },
  {
    id: "track-5",
    number: "05",
    title: "Open Hardware & Deep Tech Innovation",
    tagline: "Disruptive multidisciplinary engineering, quantum sensors, aerospace & defense",
    prizePool: "₹15,000 Track Winner + Swag & Mentorship",
    description:
      "For radical breakthroughs that redefine engineering frontiers. Build CubeSat sub-systems, quantum magnetometer demonstrators, autonomous drone delivery hardware, agritech harvesting robots, and advanced RF communication systems.",
    iconName: "Sparkles",
    tags: ["Aerospace / Drones", "Quantum Sensors", "Agritech Robotics", "Defense Tech", "Software-Defined Radio"],
    gradient: "from-purple-500/15 via-black to-black",
    accentColor: "#A855F7",
    problemStatements: [
      "Autonomous precision agriculture drone payload with multispectral crop-health analysis.",
      "Software-Defined Radio (SDR) emergency mesh transceiver for disaster relief zones.",
      "Low-cost CubeSat attitude determination and control system (ADCS) test bench.",
      "Laser vibrometer acoustic sensor for structural health monitoring of bridges and dams."
    ],
    hardwareStack: ["HackRF / RTL-SDR", "Brushless Drone Motors & ESCs", "Pixhawk Flight Controller", "LiDAR / Time-of-Flight Sensors", "NVIDIA Jetson Nano"],
    evaluationCriteria: [
      { criteria: "Novelty, Technical Ambition & Hard-tech Complexity", weight: "40%" },
      { criteria: "Proof-of-Concept Fidelity & Live Demonstration", weight: "30%" },
      { criteria: "Commercialization / Dual-Use Potential", weight: "15%" },
      { criteria: "Presentation & Interdisciplinary Rigor", weight: "15%" },
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
