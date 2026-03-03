# Phase 1: Data Extraction

## Goal
Extract all data constants from `sleeve-cloud-hub.jsx` into focused files under `src/data/`. Zero visual change — app works exactly the same.

## Files to Create

| File | Constants | Approx Lines |
|------|-----------|-------------|
| `context.js` | DEFAULT_CONTEXT, PROMPT_CONTEXT, CONTEXT | ~130 |
| `competitors.js` | COMPETITORS, MARKET_INTEL | ~60 |
| `prompts.js` | RESEARCH_AGENT_PROMPT, INTAKE_EXTRACTOR, RESEARCH_AGENTS, AUTOMATION_AGENTS, HUMAN_VS_AGENT, WEEKLY_BRIEF, AGENT_PROMPTS | ~250 |
| `intake.js` | INTAKE_QUESTIONS | ~60 |
| `workflows.js` | WORKFLOWS | ~700 |
| `frameworks.js` | FRAMEWORKS, CAT_LABELS | ~450 |
| `business.js` | OFFER, FUNNEL, PLAYBOOKS, METRICS, WEEKLY_RHYTHM, CORE_RULES, CUSTOMER_JOURNEY, EXECUTION_PHASES_MAP, FUNNEL_NUMBERS | ~300 |
| `quest.js` | QUEST_NODES, QUEST_MILESTONES, QUEST_FUNNEL, QUEST_CORE_TOOLS, QUEST_TOOL_SLOTS, QUEST_CHANNELS, QUEST_JOURNEY_STAGES | ~200 |
| `hub.js` | MODES, EXEC_NAV, BUILD_NAV, HUB_WEEKS, HUB_THIS_WEEK, HUB_KILL_CRITERIA, HUB_TABLES, HUB_DB_STEPS, HUB_AGENT_CONTRACTS, HUB_TRANSCRIPTS, TOOLS, PHASES, STORAGE_KEY, defaultState | ~300 |

## Process
1. Create each `src/data/` file with `export const`
2. Add imports to `sleeve-cloud-hub.jsx`
3. Remove the original constants from the JSX
4. Verify after each file: `npm run dev` + browser

## Verification
- Dev server starts without errors
- Dashboard loads, all 3 modes work
- All tabs render correctly
- `npm run build` succeeds

## Dependencies Between Files
- `prompts.js` references `INTAKE_EXTRACTOR` and `RESEARCH_AGENT_PROMPT` — these must be in the same file or imported
- `context.js` has a mutable `CONTEXT` variable that the component modifies — handle with care
- `hub.js` depends on `WORKFLOWS` being available for the workflow references in PHASES
