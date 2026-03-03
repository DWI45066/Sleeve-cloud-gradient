const QUEST_NODES = [
    { id: "landing", label: "Landing Page", icon: "*", x: 12, y: 18, revenue: 0, note: "Enables all", requires: [], unlocks: ["intake", "warmlist"] },
    { id: "intake", label: "Intake Form", icon: "*", x: 32, y: 18, revenue: 0, note: "Captures clients", requires: ["landing"], unlocks: ["agents"] },
    { id: "agents", label: "Agent Prompts", icon: "*", x: 52, y: 18, revenue: 0, note: "Your delivery engine", requires: ["intake"], unlocks: ["delivery"] },
    { id: "delivery", label: "Delivery Setup", icon: "*", x: 72, y: 18, revenue: 0, note: "Client workspace", requires: ["agents"], unlocks: [] },
    { id: "warmlist", label: "Warm List", icon: "*", x: 12, y: 42, revenue: 0, note: "20 founders", requires: ["landing"], unlocks: ["outreach5"] },
    { id: "outreach5", label: "First 5 Sent", icon: "*", x: 32, y: 42, revenue: 0, note: "Conversations start", requires: ["warmlist"], unlocks: ["outreach20"] },
    { id: "outreach20", label: "20 Outreach", icon: "*", x: 52, y: 42, revenue: 0, note: "-> 5 calls", requires: ["outreach5"], unlocks: ["calls"] },
    { id: "calls", label: "5 Calls", icon: "*", x: 72, y: 42, revenue: 0, note: "-> 2 teardowns", requires: ["outreach20", "delivery"], unlocks: ["teardown1"] },
    { id: "teardown1", label: "1st Teardown", icon: "*", x: 52, y: 66, revenue: 1500, note: "First cash!", requires: ["calls"], unlocks: ["teardown2", "pilot1"], milestone: true },
    { id: "teardown2", label: "2nd Teardown", icon: "*", x: 32, y: 66, revenue: 1500, note: "+$1,500", requires: ["teardown1"], unlocks: [] },
    { id: "pilot1", label: "1st Pilot", icon: "*", x: 72, y: 66, revenue: 2500, note: "$2.5K/mo!", requires: ["teardown1"], unlocks: ["pilot2"], mrr: true, milestone: true },
    { id: "pilot2", label: "2nd Pilot", icon: "*", x: 52, y: 88, revenue: 2500, note: "$5K MRR", requires: ["pilot1"], unlocks: ["pilot3"], mrr: true },
    { id: "pilot3", label: "3rd Pilot", icon: "*", x: 72, y: 88, revenue: 2500, note: "$7.5K MRR", requires: ["pilot2"], unlocks: [], mrr: true, milestone: true },
];

const QUEST_MILESTONES = [
    { id: "m1", label: "First $1.5K", icon: "*", target: 1500 },
    { id: "m2", label: "First MRR", icon: "*", target: 2500, mrr: true },
    { id: "m3", label: "$7.5K MRR", icon: "*", target: 7500, mrr: true },
];

const QUEST_FUNNEL = [
    { id: "outreach", label: "Outreach", count: 20, icon: "*", color: "#6366f1", width: 100 },
    { id: "replies", label: "Replies", count: 10, icon: "*", color: "#8b5cf6", width: 85, rate: "50%" },
    { id: "calls", label: "Calls", count: 5, icon: "*", color: "#a855f7", width: 70, rate: "50%" },
    { id: "teardowns", label: "Teardowns", count: 2, icon: "*", color: "#fbbf24", width: 55, rate: "40%", revenue: "$3K" },
    { id: "pilots", label: "Pilots", count: 1, icon: "*", color: "#10b981", width: 40, rate: "50%", revenue: "$2.5K/mo" },
];

const QUEST_CORE_TOOLS = [
    { id: "supabase", name: "Supabase", category: "Infrastructure", cost: 0, icon: "*", note: "Database + Auth", required: true },
    { id: "vercel", name: "Vercel", category: "Infrastructure", cost: 0, icon: "*", note: "Hosting", required: true },
    { id: "stripe", name: "Stripe", category: "Infrastructure", cost: 0, icon: "*", note: "Payments (2.9%+30)", required: true },
    { id: "notion", name: "Notion", category: "Delivery", cost: 0, icon: "*", note: "Client workspace", required: true },
    { id: "claude", name: "Claude API", category: "Delivery", cost: 50, icon: "*", note: "AI agents", required: true },
    { id: "loom", name: "Loom", category: "Delivery", cost: 15, icon: "*", note: "Video walkthroughs", required: false },
    { id: "hubspot", name: "HubSpot", category: "CRM", cost: 0, icon: "*", note: "CRM (free tier)", required: true },
    { id: "slack", name: "Slack", category: "CRM", cost: 0, icon: "*", note: "Client comms", required: true },
    { id: "calendly", name: "Calendly", category: "CRM", cost: 0, icon: "*", note: "Scheduling", required: true },
    { id: "zapier", name: "Zapier", category: "CRM", cost: 20, icon: "*", note: "Automations", required: false },
    { id: "posthog", name: "PostHog", category: "Analytics", cost: 0, icon: "*", note: "Product analytics", required: false },
    { id: "sheets", name: "Google Sheets", category: "Analytics", cost: 0, icon: "*", note: "Tracking", required: true },
];

const QUEST_TOOL_SLOTS = [
    {
        id: "lead_database", name: "Lead Database", channelType: "outbound", options: [
            { id: "apollo", name: "Apollo", cost: 49, icon: "*" },
            { id: "clay", name: "Clay", cost: 149, icon: "*" },
            { id: "instantly_leads", name: "Instantly Leads", cost: 47, icon: "*" },
            { id: "none_leads", name: "Manual (Free)", cost: 0, icon: "*" },
        ]
    },
    {
        id: "cold_email", name: "Cold Email", channelType: "outbound", options: [
            { id: "instantly", name: "Instantly", cost: 37, icon: "*" },
            { id: "lemlist", name: "Lemlist", cost: 59, icon: "*" },
            { id: "smartlead", name: "Smartlead", cost: 39, icon: "*" },
            { id: "none_email", name: "Gmail (Free)", cost: 0, icon: "*" },
        ]
    },
    {
        id: "linkedin_outreach", name: "LinkedIn Outreach", channelType: "outbound", options: [
            { id: "heyreach", name: "HeyReach", cost: 79, icon: "*" },
            { id: "expandi", name: "Expandi", cost: 99, icon: "*" },
            { id: "dripify", name: "Dripify", cost: 59, icon: "*" },
            { id: "none_linkedin", name: "Manual (Free)", cost: 0, icon: "*" },
        ]
    },
    {
        id: "newsletter", name: "Newsletter", channelType: "inbound", options: [
            { id: "beehiiv", name: "Beehiiv", cost: 0, icon: "*" },
            { id: "convertkit", name: "ConvertKit", cost: 29, icon: "*" },
            { id: "substack", name: "Substack", cost: 0, icon: "*" },
            { id: "none_newsletter", name: "None", cost: 0, icon: "*" },
        ]
    },
    {
        id: "twitter_tool", name: "Twitter/X", channelType: "inbound", options: [
            { id: "typefully", name: "Typefully", cost: 12, icon: "*" },
            { id: "hypefury", name: "Hypefury", cost: 19, icon: "*" },
            { id: "buffer", name: "Buffer", cost: 15, icon: "*" },
            { id: "none_twitter", name: "Native (Free)", cost: 0, icon: "*" },
        ]
    },
    {
        id: "linkedin_content", name: "LinkedIn Content", channelType: "inbound", options: [
            { id: "taplio", name: "Taplio", cost: 49, icon: "*" },
            { id: "shield", name: "Shield", cost: 25, icon: "*" },
            { id: "none_li_content", name: "Native (Free)", cost: 0, icon: "*" },
        ]
    },
];

const QUEST_CHANNELS = [
    { id: "cold_email", name: "Cold Email", type: "outbound", icon: "*", slot: "cold_email", color: "#6366f1" },
    { id: "linkedin_dm", name: "LinkedIn DM", type: "outbound", icon: "*", slot: "linkedin_outreach", color: "#0077b5" },
    { id: "twitter_dm", name: "Twitter DM", type: "outbound", icon: "*", slot: null, color: "#1da1f2" },
    { id: "newsletter", name: "Newsletter", type: "inbound", icon: "*", slot: "newsletter", color: "#f59e0b" },
    { id: "twitter", name: "Twitter/X", type: "inbound", icon: "*", slot: "twitter_tool", color: "#1da1f2" },
    { id: "linkedin", name: "LinkedIn", type: "inbound", icon: "*", slot: "linkedin_content", color: "#0077b5" },
    { id: "referral", name: "Referrals", type: "inbound", icon: "*", slot: null, color: "#10b981" },
];

const QUEST_JOURNEY_STAGES = [
    { id: "find", label: "Find Leads", icon: "*", color: "#6366f1", people: "100+", slots: ["lead_database"], description: "Build your prospect list" },
    { id: "reach", label: "Reach Out", icon: "*", color: "#8b5cf6", people: "20", slots: ["cold_email", "linkedin_outreach"], description: "Multi-channel outbound" },
    { id: "book", label: "Book Call", icon: "*", color: "#a855f7", people: "5", coreTools: ["calendly", "hubspot"], description: "Schedule discovery calls" },
    { id: "discover", label: "Discovery", icon: "*", color: "#d946ef", people: "5", coreTools: ["notion", "slack"], description: "Understand their needs" },
    { id: "sell", label: "Sell", icon: "*", color: "#fbbf24", people: "2-3", coreTools: ["stripe"], description: "Close the deal" },
    { id: "deliver", label: "Deliver", icon: "*", color: "#10b981", people: "2-3", coreTools: ["claude", "notion", "loom", "slack"], description: "Wow them with value" },
];

// ========================================
// COMPONENT
// ========================================

export { QUEST_NODES, QUEST_MILESTONES, QUEST_FUNNEL, QUEST_CORE_TOOLS, QUEST_TOOL_SLOTS, QUEST_CHANNELS, QUEST_JOURNEY_STAGES };
