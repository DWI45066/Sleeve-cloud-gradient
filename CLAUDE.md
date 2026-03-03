# Sleeve Cloud Hub

## What This Is
A React-based GTM (Go-To-Market) operating system for Sleeve Cloud — a fractional GTM service for B2B SaaS founders. The hub contains workflows, frameworks, agent prompts, intake forms, playbooks, and tracking tools.

## Tech Stack
- **Framework**: React (no TypeScript)
- **Build**: Vite + @vitejs/plugin-react
- **Entry**: `index.html` → `src/main.jsx` → `sleeve-cloud-hub.jsx`
- **Dev**: `npm run dev` (port 5173)
- **Build**: `npm run build`

## Current State (2026-03-03)
The app is a **single 5,253-line JSX file** (`sleeve-cloud-hub.jsx`). We are in the process of extracting data constants into `src/data/` files. The UI will remain in the main JSX for now.

### File Structure
```
sleeve-cloud-hub/
├── index.html              # Vite entry point
├── vite.config.js           # Vite config with React plugin
├── package.json             # Dependencies and scripts
├── CLAUDE.md                # THIS FILE — project context
├── .gitignore               # Node, build, env exclusions
├── sleeve-cloud-hub.jsx     # Main component (being refactored)
├── src/
│   ├── main.jsx             # React DOM render
│   └── data/                # Extracted data constants (in progress)
│       ├── context.js       # DEFAULT_CONTEXT, PROMPT_CONTEXT
│       ├── competitors.js   # COMPETITORS, MARKET_INTEL
│       ├── prompts.js       # Agent prompts, RESEARCH_AGENTS
│       ├── intake.js        # INTAKE_QUESTIONS
│       ├── workflows.js     # WORKFLOWS object
│       ├── frameworks.js    # 47 GTM frameworks, CAT_LABELS
│       ├── business.js      # OFFER, FUNNEL, PLAYBOOKS, METRICS, etc.
│       ├── quest.js         # Quest nodes, milestones, tools
│       └── hub.js           # Hub mode nav, weeks, kill criteria
└── plans/                   # Phase docs and retro log
```

## Conventions
- No TypeScript — plain JSX and JS only
- Named exports from data files (`export const FRAMEWORKS = [...]`)
- One constant per concern per file in `src/data/`
- Keep data files as pure data — no React imports, no components
- The main JSX file imports everything it needs from `src/data/`

## Content Sync Process
The business content (workflows, prompts, frameworks) is actively evolved in Claude.ai conversations. When updated:
1. User pastes updated content here
2. We update the appropriate `src/data/` file
3. Verify: `npm run dev` + browser check
4. Commit to git

## What NOT to Do
- Do NOT add TypeScript
- Do NOT install new UI frameworks (no Tailwind, no Material UI)
- Do NOT restructure the React component tree yet (deferred)
- Do NOT modify business logic — only move data to new files
- Do NOT create unnecessary .md files in the project root
- Do NOT use `default export` for data files — use named exports
