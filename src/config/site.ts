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
  problemStatements: string[];
  hardwareStack: string[];
  evaluationCriteria: { criteria: string; weight: string }[];
}

export const TRACKS: TrackItem[] = [
  {
    id: "track-1",
    number: "01",
    title: "Robotics, IoT & Intelligent Automation",
    tagline: "Robotics · IoT · Embedded Systems · Autonomous Systems · Drones · Industrial Automation",
    prizePool: "₹15,000 Track Winner + Swag & Mentorship",
    description:
      "Build the machines of tomorrow. From autonomous drones and industrial robots to smart embedded systems and edge AI — this track covers the full spectrum of physical intelligence. Projects span robotics, IoT sensor networks, autonomous systems, control engineering, and smart device integration.",
    iconName: "Cpu",
    tags: ["Robotics", "IoT", "Embedded Systems", "Autonomous Systems", "Drones", "Edge AI", "Sensors", "Control Systems"],
    gradient: "from-cyan-500/15 via-black to-black",
    accentColor: "#00F0FF",
    problemStatements: [
      "Autonomous ground robot with real-time obstacle avoidance and path planning for warehouse logistics.",
      "IoT-based smart factory sensor mesh for predictive machine maintenance using edge AI anomaly detection.",
      "Multi-rotor drone with precision payload delivery and GPS-denied indoor navigation.",
      "Embedded industrial automation controller with adaptive PID and remote monitoring dashboard."
    ],
    hardwareStack: ["STM32 / ESP32 MCU", "ROS / ROS2 Framework", "LoRa / Zigbee / BLE", "IMU & LIDAR Sensors", "Servo & Stepper Drivers"],
    evaluationCriteria: [
      { criteria: "Autonomy & Intelligence Level", weight: "35%" },
      { criteria: "Hardware Design & Reliability", weight: "25%" },
      { criteria: "Real-time Performance & Latency", weight: "20%" },
      { criteria: "Scalability & Real-world Impact", weight: "20%" },
    ],
  },
  {
    id: "track-2",
    number: "02",
    title: "Sustainable Energy, Smart Systems & Infrastructure",
    tagline: "Renewable Energy · Smart Grid · Energy Storage · EVs & Charging · Power Electronics · Microgrids",
    prizePool: "₹15,000 Track Winner + Swag & Mentorship",
    description:
      "Power a greener future. This track brings together renewable energy systems, smart grid technologies, EV charging infrastructure, energy storage, power electronics, and sustainable smart buildings. Projects should address real-world challenges in energy efficiency, resource management, and decarbonization.",
    iconName: "SunMedium",
    tags: ["Renewable Energy", "Smart Grid", "Energy Storage", "EVs & Charging", "Microgrids", "Smart Buildings", "Water & Resource Mgmt"],
    gradient: "from-emerald-500/15 via-black to-black",
    accentColor: "#10B981",
    problemStatements: [
      "Solar-wind hybrid microgrid with intelligent energy dispatch and demand-response forecasting.",
      "Bidirectional EV smart charging station with V2G capability and grid stability support.",
      "IoT-based smart building energy management system with occupancy-aware HVAC optimization.",
      "Decentralized water quality monitoring and automated purification control for rural communities."
    ],
    hardwareStack: ["ESP32-S3 / Raspberry Pi", "IGBT / GaN Power Modules", "CT / Voltage Sensors", "MPPT Solar Controllers", "MQTT / Modbus Protocols"],
    evaluationCriteria: [
      { criteria: "Energy Efficiency & Sustainability Impact", weight: "35%" },
      { criteria: "Grid Integration & Power Quality", weight: "25%" },
      { criteria: "System Monitoring & Data Analytics", weight: "20%" },
      { criteria: "Economic Viability & Scalability", weight: "20%" },
    ],
  },
  {
    id: "track-3",
    number: "03",
    title: "AI, Computing & Digital Technologies",
    tagline: "AI/ML · Computer Vision · Cybersecurity · Software Platforms · Data Science · Cloud/Edge Computing",
    prizePool: "₹15,000 Track Winner + Swag & Mentorship",
    description:
      "Shape the digital future. This track covers AI and machine learning applications, computer vision systems, cybersecurity tools, software platforms, cloud and edge computing architectures, digital twins, VLSI/FPGA design, and intelligent computing solutions across all engineering domains.",
    iconName: "Zap",
    tags: ["AI/ML", "Computer Vision", "Cybersecurity", "Data Science", "Cloud/Edge Computing", "Digital Twins", "VLSI/FPGA"],
    gradient: "from-amber-500/15 via-black to-black",
    accentColor: "#FFD166",
    problemStatements: [
      "Real-time computer vision system for automated defect inspection in PCB manufacturing.",
      "AI-powered cybersecurity intrusion detection system with explainable threat classification.",
      "Digital twin platform for industrial equipment simulation and predictive maintenance analytics.",
      "FPGA-accelerated inference engine for low-latency edge AI deployment in resource-constrained devices."
    ],
    hardwareStack: ["NVIDIA Jetson / Coral TPU", "Xilinx / Intel FPGA", "Cloud: AWS / GCP / Azure", "OpenCV / TensorFlow Lite", "Docker / Kubernetes"],
    evaluationCriteria: [
      { criteria: "Model Accuracy & Algorithm Innovation", weight: "35%" },
      { criteria: "System Performance & Scalability", weight: "25%" },
      { criteria: "Security, Privacy & Robustness", weight: "20%" },
      { criteria: "Practical Deployment & Demo Quality", weight: "20%" },
    ],
  },
  {
    id: "track-4",
    number: "04",
    title: "Healthcare, Assistive Technology & Social Impact",
    tagline: "Healthcare · MedTech · Assistive Devices · Agriculture · Rural Technology · Safety · Education",
    prizePool: "₹15,000 Track Winner + Swag & Mentorship",
    description:
      "Engineer solutions that matter. This track focuses on medical technology, assistive devices for people with disabilities, accessibility tools, agritech for farmers, rural and community technology, safety systems, educational technology, disaster management, and social impact innovations.",
    iconName: "Activity",
    tags: ["Healthcare", "MedTech", "Assistive Devices", "Agriculture", "Rural Technology", "Safety", "Disaster Mgmt", "Community Solutions"],
    gradient: "from-rose-500/15 via-black to-black",
    accentColor: "#F43F5E",
    problemStatements: [
      "Wearable non-invasive multi-parameter health monitor with AI-based early disease detection and telemedicine integration.",
      "Affordable assistive communication device for individuals with speech and motor disabilities.",
      "AI-driven precision agriculture advisory system with soil sensing for smallholder farmers.",
      "IoT-based disaster early warning and community alert system for flood-prone rural areas."
    ],
    hardwareStack: ["ADS1299 / MAX30102 Bio-Sensors", "Raspberry Pi / Arduino", "GSM / LoRa Modules", "Soil & Environmental Sensors", "TFT / E-Paper Display"],
    evaluationCriteria: [
      { criteria: "Real-world Social Impact & Need", weight: "35%" },
      { criteria: "Clinical / Field Accuracy & Reliability", weight: "25%" },
      { criteria: "Affordability & Accessibility", weight: "20%" },
      { criteria: "Working Prototype & Usability", weight: "20%" },
    ],
  },
  {
    id: "track-5",
    number: "05",
    title: "Open Innovation",
    tagline: "Interdisciplinary Projects · Emerging Technologies · Novel Prototypes · Aerospace · Advanced Materials",
    prizePool: "₹15,000 Track Winner + Swag & Mentorship",
    description:
      "Where rules don't apply — only ideas do. Open Innovation is for bold, interdisciplinary projects that cross boundaries and defy categorization. Aerospace systems, advanced materials, manufacturing breakthroughs, creative engineering solutions, and any project that doesn't fit Tracks 1–4 is welcome here.",
    iconName: "Sparkles",
    tags: ["Interdisciplinary", "Emerging Technologies", "Novel Prototypes", "Aerospace", "Advanced Materials", "Manufacturing", "Creative Engineering"],
    gradient: "from-purple-500/15 via-black to-black",
    accentColor: "#A855F7",
    problemStatements: [
      "CubeSat attitude determination and control system testbed with hardware-in-the-loop simulation.",
      "3D-printed adaptive metamaterial structure with tunable vibration damping for aerospace applications.",
      "Autonomous micro-UAV swarm for collaborative indoor mapping and search-and-rescue.",
      "Novel bio-inspired manufacturing process for lightweight composite structures with embedded sensing."
    ],
    hardwareStack: ["Pixhawk / Ardupilot", "3D Printer & CNC Mill", "HackRF / RTL-SDR", "NVIDIA Jetson Nano", "Custom PCB & Mechatronics"],
    evaluationCriteria: [
      { criteria: "Novelty, Ambition & Technical Complexity", weight: "40%" },
      { criteria: "Proof-of-Concept & Live Demo Quality", weight: "30%" },
      { criteria: "Interdisciplinary Depth & Innovation", weight: "15%" },
      { criteria: "Commercialization & Dual-use Potential", weight: "15%" },
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
  { value: 100, prefix: "₹", suffix: "k+", label: "Prize & Grant Pool", subtext: "Cash & incubation" },
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

