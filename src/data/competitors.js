// ========================================
// COMPETITIVE LANDSCAPE -- Gradient Network / Commonstack.ai (Mar 2026)
// ========================================

export const COMPETITORS = [
    {
        category: "Direct LLM Providers",
        threat: "HIGH",
        color: "#ef4444",
        examples: "OpenAI, Anthropic, Google DeepMind, Meta (Llama)",
        pricing: "$0.25-$60/M tokens depending on model",
        strengths: "Best models. Direct relationship. Strong docs and SDKs. OpenAI has mindshare. Anthropic leads on safety. Google has Gemini ecosystem.",
        weaknesses: "Each requires separate account. Rate limits per provider. No cross-provider failover. Volume discounts only at enterprise scale. Managing multiple API keys and billing.",
        sleeve_advantage: "Commonstack gives you ALL of them through one API, one bill. Automatic load balancing avoids rate limits. Volume discounts kick in across your total usage, not per-provider.",
    },
    {
        category: "DePIN Compute Protocols",
        threat: "MEDIUM",
        color: "#f59e0b",
        examples: "Akash Network, Render Network, Bittensor, io.net",
        pricing: "Variable — token-incentive models + compute pricing",
        strengths: "Akash has strong GPU marketplace. Render has Hollywood/creative base. Bittensor has novel intelligence-mining approach. io.net aggregates GPUs.",
        weaknesses: "Raw compute, not developer-ready APIs. Complex setup. Unreliable for production workloads. No unified model access. Most focused on supply side, not demand side.",
        sleeve_advantage: "Gradient has both the infrastructure (400K+ nodes, Solana-based) AND the developer-ready product (Commonstack API). We solve the demand side, not just supply.",
    },
    {
        category: "Centralized Cloud AI",
        threat: "MEDIUM",
        color: "#6366f1",
        examples: "AWS Bedrock, Azure AI, GCP Vertex AI",
        pricing: "$$$$ — enterprise pricing, complex tiers",
        strengths: "Reliable. Enterprise features. Compliance certifications. Integrated with existing cloud infrastructure.",
        weaknesses: "Expensive. Vendor lock-in. Complex setup and billing. Overkill for SMBs. Opaque pricing. Slow to add new models.",
        sleeve_advantage: "Commonstack is simple, open, and built for SMBs spending $200-$15K/mo. No lock-in. All models available day one. Pricing is transparent and gets cheaper as you grow.",
    },
    {
        category: "API Aggregators / Routers",
        threat: "HIGH",
        color: "#10b981",
        examples: "OpenRouter, PortKey, LiteLLM, Martian",
        pricing: "Markup on underlying API costs (5-20%)",
        strengths: "OpenRouter has developer community. PortKey has observability. LiteLLM is open-source. Easy to switch between models.",
        weaknesses: "Just proxies — no infrastructure backing. No real cost advantage at volume. Dependent on underlying provider pricing. No decentralized compute layer.",
        sleeve_advantage: "Commonstack is backed by Gradient's 400K+ node decentralized network. Real cost advantages at scale, not just a markup proxy. Plus: load balancing, failover, and volume discounts built in.",
    },
];

export const MARKET_INTEL = {
    trends: [
        "LLM inference market projected to exceed $50B by 2027 — inference costs are the #1 concern for AI-native startups",
        "Multi-model strategies becoming standard — 73% of AI teams use 3+ model providers in production (Latent Space 2025 survey)",
        "DePIN sector TVL grew 340% in 2025 — Solana is the leading chain for DePIN protocols",
        "Rate limiting is the #1 production complaint across OpenAI, Anthropic, and Google developer forums",
        "Open-source models (Llama, Mistral, DeepSeek) gaining share — developers want flexibility without managing infra",
        "API aggregation/routing is an emerging category — OpenRouter, PortKey, and others raising significant rounds",
        "Decentralized compute still has reliability/latency gap vs centralized — Gradient's Parallax protocol aims to close this",
    ],
    gap: "Nobody combines decentralized infrastructure (real cost advantages) with a developer-ready unified API. DePIN protocols sell raw compute. Aggregators are just proxies. Cloud providers lock you in. Commonstack is the only product backed by 400K+ nodes that works like a simple API.",
    nemke_insight: "The 400K Sentry Node user base is a massive untapped asset. Most are crypto-native but not developers. The demand-side GTM (getting developers to use Commonstack) is the real growth challenge. Supply side is solved. Demand side is where the revenue comes from.",
};
