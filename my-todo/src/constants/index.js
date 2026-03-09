// ─── Google Sheet URL ───────────────────────────────────────
export const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbwXf65GR-99iwxH5EvQDb79VrIpAU6NMJKPCBn6LDWwu_fGafy89iP5hnRwJyL_zwa7/exec";

// ─── Categories ─────────────────────────────────────────────
export const CATEGORIES = [
  "Personal",
  "Work",
  "Health",
  "Learning",
  "Finance",
  "Creative",
];
export const CAT_COLORS = {
  Personal: "#f59e0b",
  Work: "#3b82f6",
  Health: "#10b981",
  Learning: "#a78bfa",
  Finance: "#f43f5e",
  Creative: "#ec4899",
};

// ─── Tags ────────────────────────────────────────────────────
export const TAGS = [
  "Urgent",
  "Scheduled",
  "Recurring",
  "Waiting",
  "Idea",
  "Important",
  "Quick Win",
  "Deep Work",
];
export const TAG_COLORS = {
  Urgent: "#ef4444",
  Scheduled: "#3b82f6",
  Recurring: "#8b5cf6",
  Waiting: "#f97316",
  Idea: "#eab308",
  Important: "#ec4899",
  "Quick Win": "#10b981",
  "Deep Work": "#06b6d4",
};

// ─── Time ────────────────────────────────────────────────────
export const TIME_OPTIONS = ["15 min", "30 min", "1 hr", "2 hr", "3 hr+"];
export const TIME_COLORS = {
  "15 min": "#10b981",
  "30 min": "#3b82f6",
  "1 hr": "#f59e0b",
  "2 hr": "#f97316",
  "3 hr+": "#ef4444",
};

// ─── Quadrants ───────────────────────────────────────────────
export const QUADRANTS = [
  {
    id: "q1",
    label: "High Priority",
    sub: "Low Time",
    emoji: "⚡",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.07)",
    border: "rgba(239,68,68,0.22)",
  },
  {
    id: "q2",
    label: "High Priority",
    sub: "High Time",
    emoji: "🎯",
    color: "#f97316",
    bg: "rgba(249,115,22,0.07)",
    border: "rgba(249,115,22,0.22)",
  },
  {
    id: "q3",
    label: "Low Priority",
    sub: "Low Time",
    emoji: "✅",
    color: "#10b981",
    bg: "rgba(16,185,129,0.07)",
    border: "rgba(16,185,129,0.22)",
  },
  {
    id: "q4",
    label: "Low Priority",
    sub: "High Time",
    emoji: "📚",
    color: "#6366f1",
    bg: "rgba(99,102,241,0.07)",
    border: "rgba(99,102,241,0.22)",
  },
];

// ─── Filters ─────────────────────────────────────────────────
export const FILTERS = ["All", "Active", "Completed"];

// ─── Demo Tasks ──────────────────────────────────────────────
export const DEMO_TASKS = [
  {
    id: "demo1",
    text: "Set up project structure",
    done: true,
    category: "Work",
    tags: ["Important"],
    timeEstimate: "1 hr",
    status: "Completed",
    createdDate: new Date().toISOString(),
    quadrant: null,
  },
  {
    id: "demo2",
    text: "Design the database schema",
    done: false,
    category: "Work",
    tags: ["Deep Work"],
    timeEstimate: "2 hr",
    status: "Active",
    createdDate: new Date().toISOString(),
    quadrant: null,
  },
  {
    id: "demo3",
    text: "Morning run — 5km",
    done: false,
    category: "Health",
    tags: ["Recurring"],
    timeEstimate: "30 min",
    status: "Active",
    createdDate: new Date().toISOString(),
    quadrant: null,
  },
  {
    id: "demo4",
    text: "Read about Supabase RLS",
    done: false,
    category: "Learning",
    tags: ["Deep Work"],
    timeEstimate: "1 hr",
    status: "Active",
    createdDate: new Date().toISOString(),
    quadrant: null,
  },
  {
    id: "demo5",
    text: "Plan monthly budget",
    done: false,
    category: "Finance",
    tags: ["Scheduled"],
    timeEstimate: "30 min",
    status: "Active",
    createdDate: new Date().toISOString(),
    quadrant: null,
  },
];
