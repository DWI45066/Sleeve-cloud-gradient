const STORAGE_KEY = "sleeve-cloud-os";
const defaultState = () => ({ checks: {}, metrics: {}, notes: "", outputs: {}, currentPhase: 0 });


// ================================================================
// HUB MODE DATA -- EXECUTE + BUILD
// ================================================================

const MODES = [
    { id: "execute", icon: "E", label: "EXECUTE", color: "#f59e0b", desc: "Master plan - This week - Kill criteria" },
    { id: "operate", icon: "O", label: "OPERATE", color: "#10b981", desc: "Playbooks - Agents - Offer - Frameworks" },
    { id: "build", icon: "B", label: "BUILD", color: "#6366f1", desc: "Database - Agents - Frontend setup" },
];

const EXEC_NAV = [
    { id: "thisweek", icon: "!", label: "This Week" },
    { id: "timeline", icon: "#", label: "8-Week Plan" },
    { id: "revenue", icon: "$", label: "Track A: Revenue" },
    { id: "infra", icon: "%", label: "Track B: Infra" },
    { id: "kill", icon: "X", label: "Kill Criteria" },
];

const BUILD_NAV = [
    { id: "bmap", icon: "M", label: "The Map" },
    { id: "btables", icon: "T", label: "Database Tables" },
    { id: "bsteps", icon: "S", label: "DB Setup Steps" },
    { id: "bagents", icon: "A", label: "Agent Contracts" },
    { id: "bknowledge", icon: "K", label: "Knowledge Base" },
    { id: "bclaude", icon: "C", label: "Claude Code Setup" },
];

const HUB_WEEKS = [
    {
        week: 1, label: "SHIP OR DIE", split: "80/20", cash: "$0",
        rev: { focus: "Landing page + first outreach", tasks: ["Landing page live on sleeve.cloud", "Finalize pricing (Teardown $1,500 / Builder $3,500 / Growth $6K)", "Build warm list - 20 founders you actually know", "Send first 5 personalized outreach messages", "Set up Calendly for discovery calls"], milestone: "5 outreach sent, landing page live" },
        inf: { focus: "Supabase project + tables", tasks: ["Create Supabase account and project", "Run migration SQL (all 6 tables)", "Verify with test data", "Save connection credentials"], milestone: "6 tables live, test query works" },
    },
    {
        week: 2, label: "CONVERSATIONS", split: "85/15", cash: "$0",
        rev: { focus: "Continue outreach + first calls", tasks: ["Send remaining 15 warm outreach (5/day)", "Follow up Week 1 messages (Day 3 + Day 7)", "Book first discovery calls", "Run 1-2 calls using OS script", "Practice teardown pitch"], milestone: "20 outreach sent, 2-3 calls booked" },
        inf: { focus: "Upload transcripts to knowledge base", tasks: ["Re-find 7-8 source transcripts", "Paste raw text into knowledge_chunks", "Tag with speaker, topic, framework IDs", "No embeddings yet - just preservation"], milestone: "Source transcripts in database" },
    },
    {
        week: 3, label: "FIRST MONEY", split: "90/10", cash: "$1,500",
        rev: { focus: "Close first teardown", tasks: ["Run 3-5 discovery calls", "Close first teardown ($1,500)", "Deliver: intake > agents in Claude.ai > synthesize", "Competitive intel + positioning + framework scoring", "Document EVERY step - becomes agent workflow"], milestone: "First $1,500 collected" },
        inf: { focus: "First real data in Supabase", tasks: ["Paste client Company Sleeve into companies table", "Paste agent output into research_runs", "Paste framework applications", "Manual copy-paste - ugly but persistent"], milestone: "Real client data in database" },
    },
    {
        week: 4, label: "DELIVER + CLOSE", split: "75/25", cash: "$4,000",
        rev: { focus: "Deliver teardown + close pilot", tasks: ["Deliver teardown document", "Run delivery call - walk through findings", "Close upsell: $2,500/mo founders pricing", "Continue outreach", "Close second teardown if pipeline allows"], milestone: "Pilot signed ($2,500/mo recurring)" },
        inf: { focus: "Introduce Claude Code", tasks: ["Install Claude Code + run /init", "Build CLAUDE.md with schema + connections", "Run Intake Extractor > writes to Supabase", "First agent reading/writing to DB"], milestone: "One agent on database" },
    },
    {
        week: 5, label: "PROVING GROUND", split: "70/30", cash: "$6,500",
        rev: { focus: "Deliver for pilot + grow pipeline", tasks: ["Week 1 pilot delivery: intel + content", "Run weekly delivery rhythm from OS", "Document time sinks > automation priorities", "Ask for referrals", "Start cold outreach if warm exhausted"], milestone: "First client receiving deliverables" },
        inf: { focus: "3 agents on database", tasks: ["Competitive Intel > DB read/write", "GTM Strategist > DB read/write", "Save both as Claude Code skills", "Validation loop: run > check Supabase > correct"], milestone: "3 agents operational" },
    },
    {
        week: 6, label: "COMPOUND", split: "65/35", cash: "$9,000",
        rev: { focus: "Second pilot + refine delivery", tasks: ["Close second pilot ($2,500/mo)", "Deliver Week 2 for first pilot", "Start outreach sequences", "Collect first feedback", "Document feedback > product roadmap"], milestone: "2 paying pilots" },
        inf: { focus: "All agents + vector search", tasks: ["Content Agent > reads frameworks + knowledge_chunks", "Outreach Agent > same pattern", "Enable vector embeddings (OpenAI API)", "Test semantic search"], milestone: "All 6 agents + vector search live" },
    },
    {
        week: 7, label: "DASHBOARD", split: "60/40", cash: "$11,500+",
        rev: { focus: "Third client + case study", tasks: ["Close third pilot or second teardown", "Week 3 delivery for first pilot", "Build first case study from results", "Record Loom showing system"], milestone: "3 clients, first performance data" },
        inf: { focus: "Wire frontend to Supabase", tasks: ["Install Supabase client in React", "Client selector > companies table", "Research tab > research_runs", "Frameworks tab > framework_applications", "Assets tab > assets"], milestone: "Dashboard shows real data" },
    },
    {
        week: 8, label: "SYSTEM LIVE", split: "50/50", cash: "$7,500+/mo",
        rev: { focus: "Stabilize + systematize", tasks: ["All 3 pilots in active delivery", "Weekly rhythm consistent", "Case study published", "Scale beyond warm list", "Evaluate pricing/capacity"], milestone: "$7,500+/mo MRR validated" },
        inf: { focus: "Real-time dashboard", tasks: ["Real-time Supabase subscriptions", "Delivery log tab", "Polish: loading, errors, empty states", "Performance feedback loops"], milestone: "Full system operational" },
    },
];

const HUB_THIS_WEEK = [
    { track: "A", time: "2-3h", task: "Finalize and deploy landing page to sleeve.cloud", detail: "Use existing components. Deploy via Vercel. Get a real URL.", p: "BLOCKER", color: "#ef4444" },
    { track: "A", time: "1h", task: "Set up Calendly with discovery call booking", detail: "30-min slots. Brief intake: company, what they do, GTM challenge.", p: "HIGH", color: "#f59e0b" },
    { track: "A", time: "1h", task: "Build warm list - 20 founders", detail: "Spreadsheet: name, company, channel, why they fit, relationship.", p: "HIGH", color: "#f59e0b" },
    { track: "A", time: "1h", task: "Write and send first 5 outreach messages", detail: "Personalized. Use Playbooks templates. Reference something specific.", p: "HIGH", color: "#f59e0b" },
    { track: "A", time: "30m", task: "Set up tracking spreadsheet", detail: "Name | Channel | Date | Response | Call | Teardown | Notes", p: "MED", color: "#6366f1" },
    { track: "B", time: "30m", task: "Create Supabase account + project", detail: "supabase.com > new project > save credentials.", p: "MED", color: "#6366f1" },
    { track: "B", time: "30m", task: "Run migration SQL - all 6 tables", detail: "Paste SQL into editor > Run > Verify tables.", p: "MED", color: "#6366f1" },
];

const HUB_KILL_CRITERIA = [
    { metric: "Warm outreach response rate", threshold: "< 15% after 20 messages", action: "Rewrite messaging. If still low after 40, the offer needs work.", week: "W2-3", sev: "warn" },
    { metric: "Call > teardown conversion", threshold: "< 20% (1 in 5)", action: "Record calls, review pitch. Is $1,500 too high for current proof?", week: "W3-4", sev: "warn" },
    { metric: "Zero teardowns after 10 calls", threshold: "0 sold", action: "Drop to $500 or free pilot. Get PROOF at any cost.", week: "W4-5", sev: "crit" },
    { metric: "Teardown > pilot conversion", threshold: "< 30%", action: "Teardown not impressive enough or execution offer unclear.", week: "W5-6", sev: "warn" },
    { metric: "Client churn month 1", threshold: "Any pilot cancels early", action: "Emergency: interview client. Fix delivery before adding more.", week: "W6-8", sev: "crit" },
    { metric: "Time per client per week", threshold: "> 15 hours", action: "Not sustainable at $2,500/mo. Automate biggest time sinks.", week: "W5+", sev: "warn" },
    { metric: "No MRR by Week 8", threshold: "$0 recurring", action: "Full evaluation. ICP wrong, offer wrong, or quality not there.", week: "W8", sev: "crit" },
];

const HUB_TABLES = [
    { name: "companies", color: "#6366f1", what: "Client profiles - name, domain, 40-field intake, status, plan, MRR. Starting point for everything.", why: "Every agent reads from this. Every asset links to a company." },
    { name: "research_runs", color: "#f59e0b", what: "Every agent output timestamped. Agent type, input context, raw output, quality score.", why: "Research stops disappearing into chat windows. Compare v1 vs v2." },
    { name: "framework_applications", color: "#10b981", what: "Which frameworks applied to which client, with specific inputs/outputs.", why: "THE KEY TABLE. Prevents re-deriving insights.", isKey: true },
    { name: "assets", color: "#ec4899", what: "Every deliverable - headlines, pages, emails. Version tracked + approval status.", why: "Version tracking. frameworks_used field traces lineage." },
    { name: "delivery_log", color: "#8b5cf6", what: "Phase transitions, approvals, weekly deliveries. Engagement timeline.", why: "Operational visibility. Client X status at a glance." },
    { name: "knowledge_chunks", color: "#14b8a6", what: "~500-word transcript chunks with vector embeddings for semantic search.", why: "The REAL source material. Agents search by meaning, not keywords.", isKey: true },
];

const HUB_DB_STEPS = [
    { n: 1, title: "Create Supabase Project", time: "5 min", actions: ["Go to supabase.com > Start your project", "New Project: org Sleeve Cloud, name sleeve-cloud-prod", "Save: Project URL, anon key, service_role key"] },
    { n: 2, title: "Enable Extensions", time: "2 min", actions: ["SQL Editor > CREATE EXTENSION IF NOT EXISTS uuid-ossp;", "SQL Editor > CREATE EXTENSION IF NOT EXISTS vector;"] },
    { n: 3, title: "Create All 6 Tables", time: "5 min", actions: ["New SQL Editor tab", "Paste full migration SQL (sleeve-cloud-migration.sql)", "Click Run > verify 6 tables in Table Editor"] },
    { n: 4, title: "Seed Test Data", time: "10 min", actions: ["Insert test company in companies table", "Insert test research_run linked to company", "Insert test framework_application linked to company", "Run cross-table verification query"] },
    { n: 5, title: "Save Credentials", time: "5 min", actions: ["Create .env.local with URL + keys", "Add to .gitignore", "Never share service_role key publicly"] },
];

const HUB_AGENT_CONTRACTS = [
    { name: "Intake Extractor", reads: "Raw forms", writes: "companies.sleeve_json", color: "#6366f1" },
    { name: "Competitive Intel", reads: "companies", writes: "research_runs + framework_apps", color: "#f59e0b" },
    { name: "GTM Strategist", reads: "companies + research", writes: "research_runs + framework_apps", color: "#10b981" },
    { name: "Devils Advocate", reads: "All research_runs", writes: "quality_score", color: "#ef4444" },
    { name: "Content Agent", reads: "companies + frameworks + knowledge", writes: "assets", color: "#ec4899" },
    { name: "Outreach Agent", reads: "companies + frameworks + knowledge", writes: "assets", color: "#8b5cf6" },
];

const HUB_TRANSCRIPTS = [
    { speaker: "Russell Brunson", topic: "Diary of a CEO", fws: "Dream 100, value stacking, 7-step" },
    { speaker: "Mike Killan", topic: "Surfboard Funnel", fws: "3-page funnel, Currency Concept" },
    { speaker: "Russell Brunson", topic: "Funnel Hacking Live", fws: "Stack Slide, Epiphany Bridge, 3 False Beliefs" },
    { speaker: "Alex Hormozi", topic: "Lead gen strategy", fws: "Core Four, irresistible offer" },
    { speaker: "Alex Hormozi", topic: "Growth levers", fws: "BOOM, proof > promise, 70/20/10" },
    { speaker: "Alex Hormozi", topic: "Get Customers Fast", fws: "Lead magnet, need-to-believes, LTV" },
    { speaker: "Unknown", topic: "YouTube + Email", fws: "Email ROI, 99/90 rule" },
    { speaker: "Kent Summers", topic: "MIT/Harvard B2B Sales", fws: "4 Pillars, Facilitator vs Pusher" },
];



export { STORAGE_KEY, defaultState, MODES, EXEC_NAV, BUILD_NAV, HUB_WEEKS, HUB_THIS_WEEK, HUB_KILL_CRITERIA, HUB_TABLES, HUB_DB_STEPS, HUB_AGENT_CONTRACTS, HUB_TRANSCRIPTS };
