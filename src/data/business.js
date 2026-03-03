const TOOLS = [
    { phase: 0, name: "Commonstack Dashboard", job: "Product analytics + usage tracking", cost: "Built", setup: "Built", action: "Instrument API usage, track developer onboarding" },
    { phase: 0, name: "Typefully", job: "Content scheduling", cost: "$12/mo", setup: "15 min", action: "Draft + schedule first 10 posts" },
    { phase: 0, name: "Supabase", job: "Database + auth", cost: "Free", setup: "Built", action: "Developer signups + usage analytics" },
    { phase: 1, name: "SparkToro", job: "Audience intelligence", cost: "$50/mo", setup: "20 min", action: "Find where AI developers hang out online" },
    { phase: 1, name: "Loops", job: "Developer lifecycle emails", cost: "Free", setup: "1 hr", action: "Build 5-email post-signup sequence" },
    { phase: 2, name: "Phantombuster", job: "X follower extraction", cost: "$69/mo", setup: "1 hr", action: "Extract from AI/crypto developer accounts" },
    { phase: 2, name: "Trigify", job: "LinkedIn engagement data", cost: "$49/mo", setup: "30 min", action: "Extract engagers from DePIN/AI infra posts" },
    { phase: 2, name: "Clay", job: "Lead enrichment + AI lines", cost: "$134/mo", setup: "1 hr", action: "Enrich developer leads, generate openers" },
    { phase: 2, name: "HeyReach", job: "LinkedIn sequences", cost: "$79/mo", setup: "1 hr", action: "Launch first 50-person developer sequence" },
    { phase: 2, name: "Instantly", job: "Cold email + warmup", cost: "$30/mo", setup: "1 hr", action: "Set up warmup, launch 50 emails to AI startups" },
    { phase: 2, name: "HubSpot", job: "CRM + pipeline", cost: "Free", setup: "30 min", action: "Import leads, create developer pipeline" },
    { phase: 3, name: "Stripe", job: "Payments", cost: "2.9%+30c", setup: "2 hr", action: "Usage-based billing for Commonstack" },
    { phase: 3, name: "Make", job: "Automation glue", cost: "$16/mo", setup: "1 hr", action: "Connect tools without native integrations" },
    { phase: 3, name: "Audiense", job: "Deep X segmentation", cost: "$58/mo", setup: "30 min", action: "Cluster followers by developer/AI ICP fit" },
    { phase: 3, name: "X Ads", job: "Developer audience targeting", cost: "Variable", setup: "30 min", action: "Upload developer list, first promoted post" },
];

const CAT_LABELS = { offer: "Offers & Pricing", copy: "Copy & Content", funnel: "Funnels & Flows", growth: "Distribution & Growth" };

// ========================================
// CUSTOMER JOURNEY DATA
// ========================================

const CUSTOMER_JOURNEY = [
    { id: "awareness", name: "Awareness", icon: "*", description: "They discover Gradient/Commonstack", channels: ["Twitter/X", "Dev communities", "Solana ecosystem", "Content"], metric: "Impressions", color: "#6366f1" },
    { id: "landing", name: "Landing Page", icon: "*", description: "They visit commonstack.ai", channels: ["Direct link", "Docs", "GitHub"], metric: "Page visits", color: "#8b5cf6" },
    { id: "signup", name: "Free Signup", icon: "*", description: "Create account, get API key", channels: ["Self-serve", "Docs"], metric: "Signups", conversion: "10% of visitors", color: "#a855f7" },
    { id: "active", name: "First API Call", icon: "*", description: "Make their first inference call", channels: ["API docs", "Quickstart"], metric: "Activated users", conversion: "40% of signups", color: "#d946ef" },
    { id: "paying", name: "Paying Customer", icon: "*", description: "$200+/mo inference spend", channels: ["Usage growth", "Volume discounts"], metric: "Paying customers", conversion: "25% of active", color: "#ec4899" },
    { id: "scaled", name: "Scaled Account", icon: "*", description: "$1K-$15K/mo spend", channels: ["Usage growth", "Team expansion"], metric: "Revenue retention", conversion: "120% NRR", color: "#f43f5e" },
];

const EXECUTION_PHASES_MAP = [
    { id: 0, name: "Build Machine", tasks: ["Landing page", "Docs", "Developer onboarding", "Pricing"], feeds: ["awareness", "landing"] },
    { id: 1, name: "First Users", tasks: ["Dev outreach", "Community building", "Early adopters"], feeds: ["signup", "active", "paying"] },
    { id: 2, name: "Prove & Scale", tasks: ["Usage growth", "Case studies", "Paid acquisition"], feeds: ["scaled"] },
];

const FUNNEL_NUMBERS = [5000, 500, 200, 80, 20, 10];

// ========================================
// PHASES -- Gradient GTM execution phases
// ========================================

const PHASES = [
    {
        id: 0,
        name: "SHIP OR DIE",
        tag: "This Week",
        objective: "Commonstack landing live + developer docs ready + first 10 developer outreach sent",
        kill: "If commonstack.ai landing is not live by Friday, nothing else matters",
        items: [
            { key: "landing", label: "Landing page deployed", owner: "Team", note: "commonstack.ai live with clear value prop", workflow: "landing" },
            { key: "docs", label: "API docs + quickstart guide", owner: "Team", note: "Developer can go from signup to first call in 5 min", workflow: null },
            { key: "intake", label: "Intake form built", owner: "Team", note: "56-question Company Sleeve", workflow: "intake" },
            { key: "prompts", label: "Agent prompts documented", owner: "Team", note: "Intel, Content, Outreach agents", workflow: "prompts" },
            { key: "pricing", label: "Pricing finalized", owner: "Team", note: "Usage-based with volume discounts", workflow: "pricing" },
            { key: "devList", label: "Target developer list -- 50 leads", owner: "Team", note: "AI startups spending on inference", workflow: "warmList" },
            { key: "firstOutreach", label: "First 10 outreach -- sent", owner: "Team", note: "Personal messages to AI dev leads", workflow: "firstOutreach" },
        ],
    },
    {
        id: 1,
        name: "FIRST 20 DEVELOPERS",
        tag: "Weeks 1-2",
        objective: "20 active developers on Commonstack making API calls",
        kill: "< 10% signup-to-active rate OR zero paying users after 50 signups",
        items: [
            { key: "outreachSent", label: "50 developer outreach sent", owner: "Team", note: "Personalized to their AI stack", workflow: "firstOutreach" },
            { key: "signups20", label: "20+ developer signups", owner: "Team", note: "Free tier activated", workflow: null },
            { key: "active10", label: "10+ making API calls", owner: "Team", note: "At least 1 call per developer", workflow: null },
            { key: "paying5", label: "5+ paying ($200+/mo)", owner: "Team", note: "Crossed free tier threshold", workflow: null },
            { key: "feedback", label: "Weekly developer feedback", owner: "Team", note: "What is friction? What models do they want?", workflow: null },
            { key: "content5", label: "5+ developer content pieces", owner: "Team", note: "Tutorials, comparisons, benchmarks", workflow: null },
            { key: "community", label: "Discord/Telegram developer channel active", owner: "Team", note: "Place for devs to get help", workflow: null },
            { key: "testimonial1", label: "1+ developer testimonial", owner: "Team", note: "Quote or usage screenshot", workflow: null },
        ],
    },
    {
        id: 2,
        name: "PROVE & SYSTEMATIZE",
        tag: "Weeks 3-6",
        objective: "Developers seeing cost savings, usage growing, case studies built",
        kill: "Zero usage growth after 6 weeks OR all early adopters churned",
        items: [
            { key: "results", label: "Measurable cost savings for developers", owner: "Team", note: "% saved vs direct provider billing", workflow: null },
            { key: "caseStudy", label: "1 full developer case study", owner: "Team", note: "Before/after: cost, reliability, DX", workflow: null },
            { key: "nrr", label: "Net revenue retention > 100%", owner: "Team", note: "Developers increasing usage over time", workflow: null },
            { key: "sentryConvert", label: "Sentry Node -> Developer pipeline", owner: "Team", note: "Convert crypto community to API users", workflow: null },
            { key: "coldStart", label: "Cold outreach to AI startups started", owner: "Team", note: "LinkedIn + email to CTOs/dev leads", workflow: null },
            { key: "pipeline20", label: "20+ prospects in pipeline", owner: "Team", note: "Beyond initial network", workflow: null },
            { key: "partnerships", label: "2+ Solana ecosystem partnerships", owner: "Team", note: "Co-marketing with DePIN projects", workflow: null },
        ],
    },
    {
        id: 3,
        name: "SCALE",
        tag: "Month 2+",
        objective: "100+ active developers, $50K+ MRR from Commonstack usage",
        kill: "Cannot get past 30 active developers OR churn > 20%/month",
        items: [
            { key: "devs100", label: "100+ active developers", owner: "Team", note: "Regular API usage", workflow: null },
            { key: "mrr50", label: "$50K+ MRR", owner: "Team", note: "Usage-based revenue", workflow: null },
            { key: "nrr120", label: "120%+ NRR", owner: "Team", note: "Developers expanding usage", workflow: null },
            { key: "selfServe", label: "Self-serve onboarding optimized", owner: "Team", note: "< 5 min to first API call", workflow: null },
            { key: "caseStudies3", label: "3+ case studies", owner: "Team", note: "Cost savings + reliability proof", workflow: null },
            { key: "inbound", label: "Inbound developer signups growing", owner: "Team", note: "Content + referrals + word of mouth", workflow: null },
            { key: "enterprise", label: "First enterprise lead ($5K+/mo)", owner: "Team", note: "Larger AI company consolidating", workflow: null },
            { key: "latticaLaunch", label: "Lattica/Parallax protocol live", owner: "Team", note: "Core protocol milestone", workflow: null },
        ],
    },
];

// ========================================
// REST OF DATA -- OFFER, FUNNEL, PLAYBOOKS, METRICS, etc.
// ========================================

const OFFER = {
    wedge: {
        name: "GTM Teardown",
        price: "$1,500",
        description: "We analyze Gradient's current developer acquisition, competitive positioning, and community-to-revenue conversion against 47 GTM frameworks.",
        includes: [
            "DePIN competitive landscape analysis",
            "Developer content audit + scorecard",
            "Sentry Node community activation strategy",
            "Commonstack positioning gap analysis",
            "Framework-by-framework scoring",
            "90-day developer acquisition roadmap",
            "2 strategy calls (kickoff + delivery)",
        ],
        deliverable: "15-20 page report + recommendations",
        timeline: "Delivered in 5-7 days",
        conversion: "Credits toward first month if they continue",
    },
    tiers: [
        {
            name: "Builder",
            price: "$3,500/mo",
            commitment: "3-month minimum",
            description: "Core GTM execution for developer acquisition",
            includes: [
                "Company Sleeve (full context profile)",
                "Competitive intel -- weekly DePIN/AI infra report",
                "Developer content -- 8 pieces/month (tutorials, benchmarks, comparisons)",
                "Outreach -- 200 personalized contacts/month (CTOs, dev leads)",
                "Dashboard access",
                "Async support (Slack/email)",
                "Monthly strategy call (30 min)",
            ],
            bestFor: "Early developer acquisition phase",
        },
        {
            name: "Growth",
            price: "$6,000/mo",
            commitment: "3-month minimum",
            description: "Full GTM engine for scaling developer adoption",
            includes: [
                "Everything in Builder, plus:",
                "Developer content -- 16 pieces/month",
                "Outreach -- 400 contacts/month",
                "Community activation campaigns -- Sentry Node to Commonstack",
                "Messaging testing -- 8 variants/month",
                "Priority QA",
                "Bi-weekly strategy calls (30 min each)",
            ],
            bestFor: "Scaling developer community to paying users",
        },
        {
            name: "Scale",
            price: "$10,000/mo",
            commitment: "Month-to-month after 3",
            description: "Premium GTM for multi-product growth (Commonstack + Lattica + Parallax)",
            includes: [
                "Everything in Growth, plus:",
                "Multiple product GTM (Commonstack, Lattica, Parallax)",
                "Enterprise developer outreach",
                "Dedicated Slack channel",
                "Weekly strategy calls",
                "Quarterly business reviews",
            ],
            bestFor: "Full protocol ecosystem growth",
        },
    ],
    pilotOffer: {
        name: "Founder's Circle",
        price: "$2,500/mo",
        slots: 3,
        description: "Discounted pilot — first client engagement",
        requirement: "Case study rights + weekly feedback + testimonial",
        note: "This is how you get proof. Take the hit on margin.",
    },
};

const FUNNEL = [
    {
        name: "Awareness",
        people: "5,000",
        metric: "Impressions/week",
        target: "5K+",
        pct: 100,
        color: "#0d9488",
        desc: "Developer content, Twitter/X, Solana ecosystem, crypto communities",
        channels: ["Twitter/X", "Dev communities", "Solana ecosystem", "Content"],
    },
    {
        name: "Website Visit",
        people: "500",
        metric: "Visit rate",
        target: "> 10%",
        pct: 60,
        color: "#14b8a6",
        desc: "Visit commonstack.ai or gradient.network",
        channels: ["Direct", "Docs", "GitHub"],
    },
    {
        name: "Signup",
        people: "200",
        metric: "Visit -> Signup",
        target: "> 40%",
        pct: 40,
        color: "#2dd4bf",
        desc: "Create account, get API key",
        channels: ["Self-serve", "Docs"],
    },
    {
        name: "Activated",
        people: "80",
        metric: "Signup -> First call",
        target: "> 40%",
        pct: 25,
        color: "#5eead4",
        desc: "Make first inference API call",
        channels: ["Quickstart", "Docs"],
    },
    {
        name: "Paying",
        people: "20",
        metric: "Active -> Paying",
        target: "> 25%",
        pct: 15,
        color: "#99f6e4",
        desc: "$200+/mo in inference spend, scaling usage",
        channels: ["Volume discounts", "Usage growth"],
    },
];

const PLAYBOOKS = [
    {
        id: "discovery",
        icon: "*",
        title: "Running Discovery Calls",
        when: "Every initial conversation with a developer lead or AI startup founder",
        steps: [
            "First 5 min: Build rapport. Ask about their AI product, their stack, how they are using LLMs today.",
            "Next 10 min: Diagnose. 'Which providers are you using? What is your monthly inference spend? Hit any rate limits? How do you handle failover?'",
            "Next 10 min: Educate. Share how Commonstack solves their specific pain. Show the unified API, load balancing, cost comparisons.",
            "Last 5 min: Next step. 'Want me to set up a sandbox with your models pre-configured? Takes 5 minutes and you can see the difference.'",
            "If not ready: 'No problem. I will send you our benchmarks and a comparison calculator. Let us reconnect in 2 weeks.'",
            "Send follow-up email within 2 hours with summary + API docs link.",
        ],
        templates: [
            '"What does your inference stack look like today? Which providers, which models?"',
            '"What is your monthly spend across all providers? Any idea where most of it goes?"',
            '"Have you hit rate limits in production? How did you handle it?"',
            '"Here is what I am seeing with other teams at your stage... [observation about their multi-provider setup]"',
            '"Based on your usage, you would save roughly $X/month by consolidating through Commonstack. Want me to show you the math?"',
        ],
    },
    {
        id: "teardown",
        icon: "*",
        title: "Delivering a Teardown",
        when: "Client has paid $1,500 for GTM diagnostic",
        steps: [
            "Day 1: Send intake form. They complete Company Sleeve (56 questions).",
            "Day 2-3: Run research. DePIN competitive intel, developer content audit, positioning analysis.",
            "Day 4: Synthesize. Review all agent output. Identify top 3-5 developer acquisition priorities.",
            "Day 5: Build the document. Executive summary, framework scores, competitive analysis, gaps, 90-day roadmap.",
            "Day 6: Internal review. Read it fresh. Would you pay $1,500 for this? If not, improve it.",
            "Day 7: Delivery call. Walk through the Teardown. Let them react. Answer questions. Then: 'Want us to execute this?'",
        ],
        templates: [
            "Teardown structure: 1) Exec Summary, 2) Framework Scores, 3) DePIN Competitive Analysis, 4) Developer Acquisition Gaps, 5) 90-Day Roadmap, 6) Recommendation",
            "Close: 'We can execute this entire roadmap for you. $X/month, 3-month commitment. The $1,500 you paid credits to month 1.'",
        ],
    },
    {
        id: "delivery",
        icon: "*",
        title: "Weekly Client Delivery",
        when: "Ongoing client work — what happens each week",
        steps: [
            "Monday: Run competitive intel agent on DePIN/AI infra landscape. Review output. Format weekly brief.",
            "Tuesday: Run developer content agent — tutorials, benchmarks, comparison posts. Review against QA checklist.",
            "Wednesday: Deliver content for approval. Run developer outreach agent for new targets.",
            "Thursday: Review outreach batch. Check personalization quality. Queue for sending.",
            "Friday: Update dashboard. Prep client update. Note: what worked, what to adjust.",
            "Document time spent. Track what takes longest. This is what you automate next.",
        ],
        templates: [
            "Weekly update: 'Here is what shipped, here is what is performing, here is what is next.'",
            "Content QA: Technical accuracy? CTA present? Developer voice? No marketing fluff? Would a dev share this?",
            "Outreach QA: Personalization real? Under 3 sentences? Clear technical value? Would you reply?",
        ],
    },
    {
        id: "warmOutreach",
        icon: "*",
        title: "Warm Outreach (Developer Network)",
        when: "Phase 0-1 — reaching your developer network",
        steps: [
            "Build your list: 20-30 AI startup founders/CTOs you know. Include: name, company, inference stack, why they would benefit.",
            "Personalize every message. Reference their AI product, recent launch, or specific models they use.",
            "Lead with value, not pitch: 'Noticed you are using [model]. We just shipped something that might save you X% on inference...'",
            "The ask: 'Would you try the API? Takes 5 min to set up. Happy to configure your models.'",
            "Send 5-10/day. Don't blast everyone at once.",
            "Follow up Day 3 and Day 7. Most responses come from follow-up.",
        ],
        templates: [
            '"Hey [name], saw what you are building at [company] — looks like you are hitting [model provider] pretty hard. We built Commonstack to solve exactly this — one API, all models, load balanced so you never hit rate limits. Want to try it? I can set up your sandbox in 5 min."',
            'Follow-up: "Hey, just bumping this — happy to walk you through a quick demo if easier."',
            'After trial: "Saw you made your first calls. How was the experience? Anything we should tweak for your workflow?"',
        ],
    },
    {
        id: "coldOutreach",
        icon: "*",
        title: "Cold Outreach (AI Startups)",
        when: "Phase 2+ — after you have proof",
        steps: [
            "Build target list: AI startups spending on inference. Look at YC batch companies, AI fund portfolios, companies posting LLM job openings.",
            "Find trigger events: Just raised? Launched AI feature? Hiring ML engineers? Complaining about API costs on Twitter?",
            "Lead with insight, not pitch: 'Noticed your team is using 3 different model providers. Here is what that usually costs vs consolidating...'",
            "The ask: Low commitment. 'I put together a cost comparison for your stack — happy to share if useful.'",
            "Volume: 20-30 cold emails/day, 10-15 LinkedIn connections/day.",
            "Follow up: Day 3, Day 7, Day 14. Last email is the 'breakup' email.",
        ],
        templates: [
            '"Hey [name], noticed [company] is building with multiple LLM providers. We help teams like yours consolidate to one API — cuts billing complexity and usually saves 20-40%. Want me to run the numbers for your stack?"',
            '"I have been talking to a lot of AI startups at your stage and the same thing keeps coming up: rate limits in production and surprise bills from [provider]. Is that something you deal with?"',
            'Breakup: "I will stop bugging you — but if inference costs or rate limits ever become a headache, we are here. Good luck with [their product]."',
        ],
    },
    {
        id: "content",
        icon: "*",
        title: "Developer Content Strategy",
        when: "Ongoing — this is your demand generation",
        steps: [
            "Post 3-5x/week on Twitter/X and LinkedIn. Mix: benchmarks, tutorials, cost comparisons, developer stories.",
            "Theme: 'One API for every model — here is why developers are switching.'",
            "Share developer wins (with permission). Cost savings, reliability improvements, DX quotes.",
            "Technical content: Model benchmarks, latency comparisons, migration guides.",
            "Engage: Reply to AI/ML developer conversations. Be helpful, not promotional.",
            "Repurpose: Every developer insight becomes a post. Every cost comparison becomes a thread.",
        ],
        templates: [
            '"We ran [model] through Commonstack vs direct API. Here are the latency numbers: [data]"',
            '"A team migrated from 3 separate provider accounts to Commonstack. Their monthly bill dropped X%. Here is why: [breakdown]"',
            '"Hot take: You do not need to manage 5 API accounts to use 5 models. Here is why: [reasoning]"',
            '"Rate limited in production? Here is what is actually happening and how load balancing fixes it: [technical explanation]"',
        ],
    },
    {
        id: "pricing",
        icon: "*",
        title: "Pricing Conversations",
        when: "When they ask 'how much?'",
        steps: [
            "Start with their current spend: 'What are you paying across all providers right now?'",
            "Show the math: 'At your volume, Commonstack consolidation saves you X% because of [volume discounts / reduced overhead].'",
            "Usage-based pricing is the default — they pay for what they use, just like direct providers.",
            "Volume discount tiers: The more they use, the cheaper per token. Show the tier breakdown.",
            "ROI framing: 'You are spending $X/mo across 4 providers. Commonstack at the same usage = $Y. Plus you get failover and load balancing free.'",
            "If push-back: 'Try it free for a week. Run your production traffic through both. Compare the bills.'",
        ],
        templates: [
            '"What are you spending on inference right now across all providers?"',
            '"At your volume, here is the cost comparison: [direct providers] vs [Commonstack]. The savings come from [volume discounts + reduced overhead]."',
            '"Try it free for a week. No commitment. Just see the difference."',
        ],
    },
];

const METRICS = [
    { key: "outreachSent", label: "Developer outreach sent / week", target: 50, kill: 20, unit: "", fix: "Not enough volume. Block 2 hours/day for developer outreach." },
    { key: "responseRate", label: "Response rate (warm)", target: 30, kill: 10, unit: "%", fix: "Messages not resonating. Lead with cost savings or rate limit pain, not features." },
    { key: "signups", label: "New signups / week", target: 20, kill: 5, unit: "", fix: "Landing page not converting or not enough traffic. Check funnel." },
    { key: "activationRate", label: "Signup -> First API call", target: 40, kill: 15, unit: "%", fix: "Onboarding friction. Simplify quickstart docs. Reduce time to first call." },
    { key: "payingConversion", label: "Active -> Paying", target: 25, kill: 10, unit: "%", fix: "Free tier too generous or pricing unclear. Review value threshold." },
    { key: "nrr", label: "Net revenue retention", target: 120, kill: 80, unit: "%", fix: "Developers not expanding usage. Investigate: wrong ICP? missing models? reliability issues?" },
    { key: "mrr", label: "MRR growth rate", target: 20, kill: 5, unit: "%/mo", fix: "Growth stalled. Need more top-of-funnel or better conversion. Review full funnel." },
];

const WEEKLY_RHYTHM = {
    monday: [
        { time: "9-10am", task: "Week planning: Review developer pipeline, signups, usage metrics", note: "What must happen this week?" },
        { time: "10am-12pm", task: "Outreach block: Send 15-20 personalized messages to AI startup leads", note: "LinkedIn + email" },
        { time: "1-3pm", task: "Content creation: Developer tutorials, benchmarks, comparison posts", note: "Technical content that devs actually share" },
        { time: "3-5pm", task: "Calls: Discovery calls with developer prospects", note: "Cluster calls together" },
    ],
    tuesday: [
        { time: "9am-12pm", task: "Developer content: Write 1-2 Twitter threads + client content QA", note: "Technical accuracy is critical" },
        { time: "1-3pm", task: "Client delivery: Competitive intel, content generation for clients", note: "QA everything before sending" },
        { time: "3-5pm", task: "Calls + follow-ups", note: "Respond to inbound, follow up on pending" },
    ],
    wednesday: [
        { time: "9am-12pm", task: "Outreach block: Another 15-20 messages + follow-ups", note: "Follow up on Monday batch" },
        { time: "1-3pm", task: "Community: Engage in developer channels, answer questions", note: "Discord, Telegram, Twitter" },
        { time: "3-5pm", task: "Calls + admin", note: "Invoicing, proposals, documentation" },
    ],
    thursday: [
        { time: "9am-12pm", task: "Deep work: Process improvement, automation, Sentry-to-dev conversion", note: "Make next week easier" },
        { time: "1-3pm", task: "Client communication: Send weekly updates, handle requests", note: "Async updates if no calls" },
        { time: "3-5pm", task: "Calls + sales", note: "Focus on closing pending deals" },
    ],
    friday: [
        { time: "9am-11am", task: "Week review: What worked? What did not? Update metrics.", note: "Be honest with yourself" },
        { time: "11am-1pm", task: "Content batch: Write next week's developer posts", note: "Get ahead" },
        { time: "1-3pm", task: "Outreach prep: Build next week's target list of AI startups", note: "Research, personalization notes" },
        { time: "3-5pm", task: "Learning + strategic thinking", note: "DePIN trends, new models, competitor moves" },
    ],
};

const CORE_RULES = [
    { rule: "Demand side is the revenue", detail: "400K Sentry nodes is great for supply. Commonstack developer adoption is where revenue comes from. Focus there." },
    { rule: "Proof over promise", detail: "One developer case study with cost savings beats any pitch deck. Get real usage data first." },
    { rule: "Developer experience is marketing", detail: "If signup-to-first-call takes more than 5 minutes, fix that before doing any outreach." },
    { rule: "Lead with pain, not protocol", detail: "Developers care about rate limits and bills, not Solana or DePIN. Lead with their problem." },
    { rule: "Follow up > First touch", detail: "Most developer conversions happen on follow-up 3-5, not the first message." },
    { rule: "Convert the 400K", detail: "Sentry Node users are an existing community. Find the developers among them and activate them on Commonstack." },
];


export { TOOLS, CAT_LABELS, CUSTOMER_JOURNEY, EXECUTION_PHASES_MAP, FUNNEL_NUMBERS, PHASES, OFFER, FUNNEL, PLAYBOOKS, METRICS, WEEKLY_RHYTHM, CORE_RULES };
