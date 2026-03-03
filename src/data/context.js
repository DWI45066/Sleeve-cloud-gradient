// ========================================
// SLEEVE CLOUD OS -- Context & Configuration (Gradient Network)
// ========================================

// DEFAULT_CONTEXT - Edit these values in the Context tab
export const DEFAULT_CONTEXT = {
    name: "Gradient Network",
    domain: "gradient.network",
    product: "commonstack.ai",
    booking: "https://cal.com/mike-klein-sleeve/15min",
    tagline: "Open intelligence through decentralized infrastructure",
    thesis: "Gradient is an AI R&D lab building open intelligence through fully decentralized infrastructure — distributed training, serving, verification, simulation, and multi-agent systems. Commonstack.ai is the primary product: a low-cost unified inference API aggregator.",
    icp: {
        primary: "SMBs spending $200-$15K/month on inference tokens, AI developers, Web3 startups needing compute",
        persona: "Technical founder or dev lead at a startup using multiple LLM providers. Juggling separate accounts for OpenAI, Anthropic, Google, open-source models. Getting rate-limited, overpaying on small volumes, and manually managing billing across providers.",
        pain: "Fragmented billing across model providers. Rate limits killing production reliability. No volume discounts because usage is split. Managing 4-5 separate API accounts and keys. No easy way to load balance or failover between providers.",
        budget: "$200-$15K/month in inference spend — currently spread across multiple providers",
        trigger: "Hit rate limits in production. Got a surprise bill from one provider. Need to add a new model but do not want another API account. Team growing and needs unified access management.",
    },
    offer: {
        core: "One account, every model, lower cost. Commonstack aggregates SOTA models into a unified API with streamlined billing, load balancing, and volume discounts.",
        wedge: "GTM Teardown — $1,500 diagnostic analyzing current developer acquisition, positioning vs DePIN competitors, and 90-day growth roadmap.",
        mechanism: "Company Sleeve (context) -> AI Agents (execute GTM) -> Attribution (track to revenue) -> Dashboard (approve + see ROI)",
    },
    positioning: {
        vs_centralized_cloud: "AWS/Azure/GCP lock you in with proprietary APIs and opaque pricing. Gradient is open, decentralized, and gives you volume discounts as usage grows.",
        vs_depin_competitors: "Akash and Render focus on raw compute. Bittensor focuses on intelligence. Gradient combines edge compute, inference serving, and a developer-ready API layer (Commonstack).",
        vs_direct_providers: "Using OpenAI + Anthropic + Google directly means 3 bills, 3 rate limits, 3 dashboards. Commonstack gives you one account with automatic load balancing.",
        vs_other_aggregators: "Other API aggregators are just proxies. Commonstack is backed by 400K+ node decentralized infrastructure with real cost advantages at scale.",
    },
};

// ========================================
// MASTER PROMPT CONTEXT -- prepended to all AI prompts
// Single source of truth. Update here, flows everywhere.
// ========================================

export const PROMPT_CONTEXT = `CONTEXT FOR ALL OUTPUTS:

COMPANY: Gradient Network — AI R&D lab building open intelligence through decentralized infrastructure.
Backed by Pantera Capital, Multicoin Capital, and HongShan (Sequoia China). $10M Seed (June 2025).
Website: gradient.network | Product: commonstack.ai | Booking: cal.com/mike-klein-sleeve/15min

PRODUCT: Commonstack.ai — low-cost unified inference API aggregator.
One account, every SOTA model. Streamlined billing, load balancing across providers, automatic failover to avoid rate limits, volume discounts as usage increases.

BUYER: Technical founders and dev leads at SMBs spending $200-$15K/month on inference tokens.
They are using multiple LLM providers (OpenAI, Anthropic, Google, open-source) with separate accounts.
They are getting rate-limited, overpaying on small volumes, manually managing billing across 3-5 providers.
They want one API, one bill, reliable uptime, and lower costs.

WHAT TRIGGERED THEM TO LOOK: Hit production rate limits. Got surprised by a bill. Need a new model but do not want another account. Team scaling and needs unified access. Exploring open-source models but do not want to manage infrastructure.

COMPETITIVE LANDSCAPE (use to differentiate):
- Direct providers — OpenAI, Anthropic, Google ($0.25-$60/M tokens): Separate accounts, separate rate limits, no cross-provider failover. Commonstack unifies them.
- DePIN protocols — Akash, Render, Bittensor: Raw compute or intelligence. Not developer-ready API aggregation. Gradient has both infra AND the developer layer.
- Centralized cloud — AWS Bedrock, Azure AI, GCP Vertex ($$$): Enterprise pricing, vendor lock-in, complex setup. Commonstack is simple and open.
- Other aggregators — OpenRouter, PortKey: Just proxies. No decentralized infrastructure backing. No real cost advantages at volume.

UNIQUE ASSETS:
- 400,000+ Sentry Node operators (Chrome extension) — massive decentralized network
- Solana-based protocol for verifiable compute
- Lattica (data protocol) and Parallax (compute protocol) launching
- World-class research team, Singapore-based

LANGUAGE RULES:
- Write like you are talking to a developer, not an enterprise buyer
- Say "one API key" not "unified inference orchestration layer"
- Say "stop juggling providers" not "consolidate your multi-cloud AI strategy"
- Say "cheaper at scale" not "volume-optimized pricing tiers"
- No enterprise fluff. No Web3 hype. Technical and direct.
- They should feel like this is built by devs, for devs.`;
