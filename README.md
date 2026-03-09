# ToDo-App
To do app with google sheet integration, with week planner

# 📝 Todo + Week Planner

A full-stack productivity app built with **React**, **Node.js**, and **Google Sheets** as a live database. Features real-time sync, an Eisenhower Matrix week planner with drag-and-drop, role-based task tagging, and a responsive dark/light UI.

> Built as a portfolio project to demonstrate full-stack skills — external API integration, real-time sync, modular React architecture, and production-ready UI/UX.

---

## 🚀 Live Demo

> _Add your deployed link here (Vercel / Netlify)_

---

## 📸 Screenshots

> _Add screenshots here after deploying_

| Todo List (Dark) | Week Planner | Light Mode |
|---|---|---|
|<img width="1437" height="808" alt="image" src="https://github.com/user-attachments/assets/db4512bd-6b96-43bc-a600-b383ff046e46" />

 | <img width="1430" height="731" alt="image" src="https://github.com/user-attachments/assets/9e6f25f1-3940-4b9c-bf96-537cc64dd0e2" />

| <img width="1431" height="807" alt="image" src="https://github.com/user-attachments/assets/91b49c29-0b8c-43d8-b837-e01c5efa78d6" /> 
|

---

## ✨ Features

### ✅ Todo Management
- Add, edit (double-click), complete, and delete tasks
- **6 categories** — Personal, Work, Health, Learning, Finance, Creative
- **8 tags** — Urgent, Scheduled, Recurring, Waiting, Idea, Important, Quick Win, Deep Work
- **Time estimates** — 15 min / 30 min / 1 hr / 2 hr / 3 hr+
- Filter by status (All / Active / Completed) and by category
- Animated progress ring showing completion percentage
- Tasks persist in `localStorage` for instant load

### 📊 Google Sheets Sync
- Real-time sync to Google Sheets via **Google Apps Script** Web App API
- Every action syncs live — add, complete, delete, move to quadrant
- Timestamps stored in **IST (Indian Standard Time)**
- Live sync status badge — Syncing / Saved / Error / Demo mode
- Two sheet tabs: `Tasks` (all task data) and `WeeklyPlan` (quadrant assignments)

### 🗓️ Eisenhower Matrix Week Planner
- Drag and drop tasks into 4 priority quadrants:
  - ⚡ **High Priority · Low Time** — Do it now
  - 🎯 **High Priority · High Time** — Schedule it
  - ✅ **Low Priority · Low Time** — Delegate or batch
  - 📚 **Low Priority · High Time** — Do it later
- Each task card shows priority tag, time tag, category, and time estimate
- Total estimated time shown per quadrant
- ⚠️ Overload warning when High Priority quadrant exceeds 3 tasks
- Completing a task automatically removes it from its quadrant

### 🎨 UI / UX
- Dark mode and light mode with smooth transitions
- Theme preference saved to `localStorage`
- Fully responsive — Desktop, Tablet, Mobile
- Skeleton-friendly loading states
- Drag-and-drop unplanned task dock
- Animated task entry and checkbox interactions

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | CSS Modules (per-component) |
| State | React Context API + useRef for stale closure fix |
| Persistence | localStorage + Google Sheets |
| Backend | Google Apps Script (Web App API) |
| Database | Google Sheets (Tasks + WeeklyPlan tabs) |
| Deployment | Vercel (frontend) |

---

## 📁 Project Structure

```
src/
├── App.jsx                        # Root component, wraps all providers
├── App.css                        # Global styles + responsive breakpoints
├── main.jsx                       # Vite entry point
│
├── constants/
│   ├── index.js                   # Categories, tags, time options, quadrants
│   └── theme.js                   # Dark and light theme token objects
│
├── utils/
│   ├── index.js                   # genId, getISTDate, truncate, minsToLabel
│   └── sheetApi.js                # Google Sheets fetch helper
│
├── hooks/
│   └── useLocalStorage.js         # Custom hook with ref for stale closure fix
│
├── context/
│   ├── ThemeContext.jsx            # Dark/light theme state shared via context
│   └── TodoContext.jsx            # All todos state, CRUD, and sheet sync logic
│
└── components/
    ├── Header.jsx / .css           # App title, sync badge, progress ring, theme toggle
    ├── ThemeToggle.jsx / .css      # Dark/light toggle button
    ├── ProgressRing.jsx            # SVG animated completion ring
    ├── SyncBadge.jsx / .css        # Live sync status indicator
    ├── Checkbox.jsx / .css         # Animated circular checkbox
    ├── Pill.jsx / .css             # Reusable category/tag/filter pill button
    ├── TodoInput.jsx / .css        # Add task form with category, time, tags
    ├── TodoList.jsx / .css         # Filter bar + rendered todo items
    ├── TodoItem.jsx / .css         # Single draggable task row
    ├── WeekPlanner.jsx / .css      # Eisenhower matrix section
    ├── Quadrant.jsx / .css         # Individual drop zone panel
    └── MatrixCard.jsx / .css       # Task card inside a quadrant
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- A Google account

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/todo-planner.git
cd todo-planner
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Google Sheets

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet
2. Rename it **Todo App Tracker**
3. Create two tabs at the bottom — name them exactly:
   - `Tasks`
   - `WeeklyPlan`
4. In the **Tasks** tab, add these headers in Row 1:

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| ID | Task | Category | Tags | TimeEstimate | Status | CreatedDate | CompletedDate | Notes |

5. In the **WeeklyPlan** tab, add these headers in Row 1:

| A | B | C | D |
|---|---|---|---|
| TaskID | Quadrant | WeekOf | MovedAt |

### 4. Deploy the Apps Script

1. In your Google Sheet → **Extensions → Apps Script**
2. Delete existing code and paste the contents of `AppsScript.js` (in the root of this repo)
3. Click **Save**, then **Deploy → New deployment**
4. Type: **Web app**, Execute as: **Me**, Who has access: **Anyone**
5. Click **Deploy → Authorize access → Allow**
6. Copy the Web App URL (looks like `https://script.google.com/macros/s/ABC.../exec`)

### 5. Add your Sheet URL to the app

Open `src/constants/index.js` and paste your URL on line 2:

```js
export const SHEET_URL = "https://script.google.com/macros/s/YOUR_URL/exec";
```

### 6. Run the app

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🔄 How Google Sheets Sync Works

```
User Action (React)
       ↓
TodoContext.jsx — updates local state immediately (optimistic UI)
       ↓
sheetApi.js — POST request to Apps Script Web App URL
       ↓
AppsScript.js — reads/writes to Google Sheets tabs
       ↓
SyncBadge updates — Syncing → Saved ✓
```

### Sheet Actions

| Action | Sheet Operation |
|---|---|
| Add task | Append row to Tasks tab |
| Complete task | Update Status + CompletedDate columns |
| Delete task | Delete row from Tasks + WeeklyPlan |
| Drag to quadrant | Upsert row in WeeklyPlan tab |
| Complete task in matrix | Remove from WeeklyPlan tab |

---

## 📱 Responsive Breakpoints

| Screen | Breakpoint | Layout Changes |
|---|---|---|
| Desktop | 640px+ | Full layout, max-width container |
| Tablet | 601–900px | Full width, adjusted padding |
| Large Mobile | 481–600px | Reduced padding, smaller fonts |
| Small Mobile | ≤480px | Chips hidden on todo items, stacked filters |
| Tiny Mobile | ≤420px | Matrix stacks to single column |

---

## 🧠 Key Technical Decisions

### Stale Closure Fix with useRef
React's `useState` closures inside async functions can capture stale values. `toggleTodo` was reading an empty `todos` array because the sheet data had loaded after the function was created. Fixed by exposing a `ref` from `useLocalStorage` that always points to the latest value:

```js
const currentTodos = todosRef.current; // always fresh, never stale
```

### Google Apps Script as Backend
Instead of setting up a full Express server for a portfolio project, Google Apps Script acts as a free serverless backend with direct Sheets access — no hosting cost, no credentials exposed.

### Optimistic UI Updates
All state updates happen locally first, then sync to the sheet. This makes the UI feel instant even on slow connections. If the sheet sync fails, the badge shows an error but local state is preserved.

### Context + localStorage as State Layer
No Redux or Zustand needed. React Context handles shared state, and `useLocalStorage` keeps data between sessions. The sheet is the source of truth on every fresh load.

---

## 🚧 Roadmap

- [ ] Due dates on tasks
- [ ] Recurring task support
- [ ] Email/WhatsApp reminders via Apps Script triggers
- [ ] Multi-user support with Supabase backend
- [ ] React Native mobile app
- [ ] Export week plan as PDF

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/rohityk-2025)
- LinkedIn: [your-linkedin](www.linkedin.com/in/rohitykavathekar)
- Portfolio: [yourportfolio.com](https://rohit-dev.netlify.app)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [Vite](https://vitejs.dev/) — Lightning fast build tool
- [Google Apps Script](https://script.google.com/) — Free serverless backend
- [Eisenhower Matrix](https://en.wikipedia.org/wiki/Time_management#The_Eisenhower_Method) — Priority framework

---

<div align="center">
  <p>If this project helped you, please ⭐ star the repo!</p>
  <p>Made with ❤️ as a portfolio project</p>
</div>
