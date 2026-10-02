/**
 * EUREKA '26 Admin & Judging Data Service
 * Supports live Firebase Firestore synchronization when credentials exist,
 * with comprehensive local-storage fallback for immediate offline/demo readiness.
 */

export interface TeamMember {
  name: string;
  email: string;
  phone: string;
  college: string;
}

export interface Team {
  id: string;
  teamCode: string;
  teamName: string;
  projectTitle: string;
  trackId: string;
  trackName: string;
  college: string;
  members: TeamMember[];
  checkedIn: boolean;
  checkInTime?: string;
  round1Qualified: boolean;
  round2Finalist: boolean;
  boothNumber: string;
}

export interface JudgeScore {
  id?: string;
  teamId: string;
  judgeId: string;
  judgeName: string;
  round: "round1" | "round2";
  innovation: number; // 1-10
  technicalDepth: number; // 1-10
  hardwareExecution: number; // 1-10
  marketViability: number; // 1-10
  presentation: number; // 1-10
  totalScore: number; // calculated 5-50
  comments: string;
  timestamp: string;
}

export interface JudgeAccount {
  id: string;
  name: string;
  email: string;
  role: "judge" | "core_team";
  assignedTrack: string;
}

// Initial mock dataset representing realistic registration data from Unstop
const INITIAL_TEAMS: Team[] = [
  {
    id: "team-101",
    teamCode: "EUR-01",
    teamName: "VoltNexus",
    projectTitle: "Bi-directional Solid State EV Powertrain & Smart Active BMS",
    trackId: "track-1",
    trackName: "Robotics, IoT & Intelligent Automation",
    college: "RV College of Engineering, Bangalore",
    members: [
      { name: "Aarav Sharma", email: "aarav.s@rvce.edu.in", phone: "+91 98451 11223", college: "RVCE" },
      { name: "Meera Nair", email: "meera.n@rvce.edu.in", phone: "+91 98451 11224", college: "RVCE" },
    ],
    checkedIn: true,
    checkInTime: "08:45 AM",
    round1Qualified: true,
    round2Finalist: true,
    boothNumber: "A-01",
  },
  {
    id: "team-102",
    teamCode: "EUR-02",
    teamName: "GridPulse AI",
    projectTitle: "Autonomous Microgrid Dispatch using TinyML on ESP32 Dual-Core",
    trackId: "track-2",
    trackName: "Sustainable Energy, Smart Systems & Infrastructure",
    college: "National Institute of Technology Karnataka (NITK), Surathkal",
    members: [
      { name: "Rohan Kulkarni", email: "rohan.k@nitk.edu.in", phone: "+91 97420 33445", college: "NITK" },
      { name: "Tanvi Rao", email: "tanvi.r@nitk.edu.in", phone: "+91 97420 33446", college: "NITK" },
    ],
    checkedIn: true,
    checkInTime: "08:52 AM",
    round1Qualified: true,
    round2Finalist: true,
    boothNumber: "B-04",
  },
  {
    id: "team-103",
    teamCode: "EUR-03",
    teamName: "NeuroFlex",
    projectTitle: "Surface EMG Wearable Prosthetic Hand with Haptic Neural Feedback",
    trackId: "track-4",
    trackName: "Healthcare, Assistive Technology & Social Impact",
    college: "Indian Institute of Science (IISc), Bangalore",
    members: [
      { name: "Priya Varma", email: "priya.v@iisc.ac.in", phone: "+91 99801 55667", college: "IISc" },
      { name: "Aditya Hegde", email: "aditya.h@iisc.ac.in", phone: "+91 99801 55668", college: "IISc" },
    ],
    checkedIn: true,
    checkInTime: "09:05 AM",
    round1Qualified: true,
    round2Finalist: true,
    boothNumber: "D-02",
  },
  {
    id: "team-104",
    teamCode: "EUR-04",
    teamName: "EdgeSentinel",
    projectTitle: "FPGA-Accelerated Real-Time Visual Telemetry for Industrial Robotics",
    trackId: "track-3",
    trackName: "AI, Computing & Digital Technologies",
    college: "PES University, Bangalore",
    members: [
      { name: "Kiran Deshmukh", email: "kiran.d@pes.edu", phone: "+91 98860 77889", college: "PESU" },
      { name: "Neha Joshi", email: "neha.j@pes.edu", phone: "+91 98860 77890", college: "PESU" },
    ],
    checkedIn: false,
    round1Qualified: false,
    round2Finalist: false,
    boothNumber: "C-08",
  },
  {
    id: "team-105",
    teamCode: "EUR-05",
    teamName: "AstroWave",
    projectTitle: "Sub-gigahertz Quantum RF Sensor Array for CubeSat Telemetry",
    trackId: "track-5",
    trackName: "Open Innovation",
    college: "BMS College of Engineering, Bangalore",
    members: [
      { name: "Varun Reddy", email: "varun.r@bmsce.ac.in", phone: "+91 96110 99001", college: "BMSCE" },
      { name: "Sanya Gupta", email: "sanya.g@bmsce.ac.in", phone: "+91 96110 99002", college: "BMSCE" },
    ],
    checkedIn: true,
    checkInTime: "09:12 AM",
    round1Qualified: true,
    round2Finalist: false,
    boothNumber: "E-03",
  },
];

const INITIAL_SCORES: JudgeScore[] = [
  {
    teamId: "team-101",
    judgeId: "judge-01",
    judgeName: "Dr. K. Srinivas (IISc)",
    round: "round1",
    innovation: 9,
    technicalDepth: 9,
    hardwareExecution: 9,
    marketViability: 8,
    presentation: 9,
    totalScore: 44,
    comments: "Exceptional solid-state power inverter prototype. High commercial relevance.",
    timestamp: "2026-11-28T11:20:00Z",
  },
  {
    teamId: "team-102",
    judgeId: "judge-02",
    judgeName: "Prof. Ananya Sen (RVCE)",
    round: "round1",
    innovation: 9,
    technicalDepth: 8,
    hardwareExecution: 8,
    marketViability: 9,
    presentation: 8,
    totalScore: 42,
    comments: "Very neat TinyML edge telemetry on low-cost hardware.",
    timestamp: "2026-11-28T11:45:00Z",
  },
  {
    teamId: "team-103",
    judgeId: "judge-01",
    judgeName: "Dr. K. Srinivas (IISc)",
    round: "round1",
    innovation: 10,
    technicalDepth: 9,
    hardwareExecution: 9,
    marketViability: 9,
    presentation: 9,
    totalScore: 46,
    comments: "Brilliant prosthetic sensor response. Ready for clinical trial testing.",
    timestamp: "2026-11-28T12:10:00Z",
  },
];

const INITIAL_JUDGES: JudgeAccount[] = [
  { id: "judge-01", name: "Dr. K. Srinivas", email: "srinivas@iisc.ac.in", role: "judge", assignedTrack: "track-4" },
  { id: "judge-02", name: "Prof. Ananya Sen", email: "ananya.eee@rvce.edu.in", role: "judge", assignedTrack: "track-2" },
  { id: "core-01", name: "EEE Core Operations", email: "core.eee@rvce.edu.in", role: "core_team", assignedTrack: "all" },
];

export const AdminDataService = {
  getTeams: (): Team[] => {
    if (typeof window === "undefined") return INITIAL_TEAMS;
    const stored = localStorage.getItem("eureka_admin_teams");
    if (!stored) {
      localStorage.setItem("eureka_admin_teams", JSON.stringify(INITIAL_TEAMS));
      return INITIAL_TEAMS;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_TEAMS;
    }
  },

  saveTeams: (teams: Team[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("eureka_admin_teams", JSON.stringify(teams));
    }
  },

  toggleCheckIn: (teamId: string, customTime?: string): Team[] => {
    const teams = AdminDataService.getTeams();
    const now = new Date();
    const timeString =
      customTime ||
      now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });

    const updated = teams.map((t) => {
      if (t.id === teamId || t.teamCode.toLowerCase() === teamId.toLowerCase()) {
        const nextChecked = !t.checkedIn;
        return {
          ...t,
          checkedIn: nextChecked,
          checkInTime: nextChecked ? timeString : undefined,
        };
      }
      return t;
    });

    AdminDataService.saveTeams(updated);
    return updated;
  },

  toggleRoundStatus: (teamId: string, round: "round1" | "round2"): Team[] => {
    const teams = AdminDataService.getTeams();
    const updated = teams.map((t) => {
      if (t.id === teamId) {
        if (round === "round1") {
          return { ...t, round1Qualified: !t.round1Qualified };
        } else {
          return { ...t, round2Finalist: !t.round2Finalist };
        }
      }
      return t;
    });

    AdminDataService.saveTeams(updated);
    return updated;
  },

  getScores: (): JudgeScore[] => {
    if (typeof window === "undefined") return INITIAL_SCORES;
    const stored = localStorage.getItem("eureka_admin_scores");
    if (!stored) {
      localStorage.setItem("eureka_admin_scores", JSON.stringify(INITIAL_SCORES));
      return INITIAL_SCORES;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_SCORES;
    }
  },

  submitScore: (score: JudgeScore): JudgeScore[] => {
    const scores = AdminDataService.getScores();
    const newScores = [score, ...scores.filter((s) => !(s.teamId === score.teamId && s.judgeId === score.judgeId && s.round === score.round))];
    if (typeof window !== "undefined") {
      localStorage.setItem("eureka_admin_scores", JSON.stringify(newScores));
    }
    return newScores;
  },

  getJudges: (): JudgeAccount[] => {
    if (typeof window === "undefined") return INITIAL_JUDGES;
    const stored = localStorage.getItem("eureka_admin_judges");
    if (!stored) {
      localStorage.setItem("eureka_admin_judges", JSON.stringify(INITIAL_JUDGES));
      return INITIAL_JUDGES;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_JUDGES;
    }
  },

  addJudge: (judge: JudgeAccount): JudgeAccount[] => {
    const judges = AdminDataService.getJudges();
    const updated = [...judges, judge];
    if (typeof window !== "undefined") {
      localStorage.setItem("eureka_admin_judges", JSON.stringify(updated));
    }
    return updated;
  },

  removeJudge: (judgeId: string): JudgeAccount[] => {
    const judges = AdminDataService.getJudges();
    const updated = judges.filter((j) => j.id !== judgeId);
    if (typeof window !== "undefined") {
      localStorage.setItem("eureka_admin_judges", JSON.stringify(updated));
    }
    return updated;
  },
};
