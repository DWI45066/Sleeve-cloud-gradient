# Deferred Work

## Phase 2: UI Component Extraction
- **What:** Break the main `SleeveCloudOS` React component (~2,100 lines of UI) into smaller component files (`Sidebar.jsx`, `YourPick.jsx`, etc.)
- **Why:** Reduces cognitive load per file, makes UI changes easier for AI agents, enables isolated testing of components
- **Context:** The main component has deeply shared state (mode, tab, checks, metrics, notes, outputs, context). Extracting components requires careful prop drilling or context API. The data extraction (Phase 1) gives most of the organizational benefit without this complexity.
- **Depends on:** Phase 1 complete. Revisit at Phase 1 checkpoint review — if content sync feels easy enough with just data files, this may not be needed.
