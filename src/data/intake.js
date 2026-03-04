// ========================================
// INTAKE QUESTIONS -- 56 questions for client onboarding
// ========================================
// Tags:
//   priority: "core" = required for teardown, "enhanced" = makes it richer
//   youOnly: true = founder must answer personally, LLM cannot extract
//   required: true = must be filled

export const INTAKE_QUESTIONS = [
    // ── SECTION 1: COMPANY SNAPSHOT (CORE) ──
    { section: "Company Snapshot", id: 1, q: "What does your product do in one sentence?", type: "long", required: true, priority: "core", example: "We help boutique hotels increase ancillary revenue through AI-powered guest concierge." },
    { section: "Company Snapshot", id: 2, q: "What is your company stage?", type: "select", required: true, priority: "core", options: ["Pre-seed", "Seed", "Series A", "Series B+", "Bootstrapped", "Pivoting"], example: "Bootstrapped, pivoting from guest app to AI concierge." },
    { section: "Company Snapshot", id: 3, q: "What industry or vertical do you primarily serve?", type: "short", required: true, priority: "core", example: "Hospitality — boutique hotels, 50-500 rooms." },
    { section: "Company Snapshot", id: 4, q: "What is your current ARR?", type: "select", required: true, priority: "core", options: ["Pre-revenue", "<$100K", "$100K-500K", "$500K-$1M", "$1M-$5M", "$5M+"], example: "If pre-revenue on the new product but have revenue from an older product, note both." },
    { section: "Company Snapshot", id: 5, q: "Where is your product right now?", type: "select", required: true, priority: "core", options: ["Concept only", "Mockups", "Partial build ~50%", "Working MVP", "Beta with users", "Live in production"], example: "About 50% built. Core messaging works. AI concierge features in development. Can demo the working parts." },

    // ── SECTION 2: TEAM & CAPACITY (CORE) ──
    { section: "Team & Capacity", id: 6, q: "Who is on your team? For each person list: name, role, and whether they are full-time committed, part-time, or provisional/uncommitted.", type: "long", required: true, priority: "core", youOnly: true, example: "Me (CEO, full-time). Josh (CTO, actively working but has not formally signed on). No one else." },
    { section: "Team & Capacity", id: 7, q: "How many hours per week can YOU personally commit to active selling? (Calls, emails, outreach, closing — not reviewing content or building product.)", type: "short", required: true, priority: "core", youOnly: true, example: "If you are also building product 30 hrs/week, you might only have 5-10 hrs for selling. That is fine — we plan around it." },
    { section: "Team & Capacity", id: 8, q: "How much time can you dedicate to reviewing outputs (content drafts, email sequences, reports) weekly?", type: "select", required: true, priority: "core", youOnly: true, options: ["<1 hour", "1-2 hours", "2-4 hours", "4+ hours"], example: "This is separate from selling. This is approving what we produce for you." },
    { section: "Team & Capacity", id: 9, q: "How long can you operate without new revenue? Are you raising, bootstrapping, or have other income?", type: "long", required: true, priority: "core", youOnly: true, example: "About 6 months of runway from savings. Not raising right now. Considering it if we get 3+ partners." },

    // ── SECTION 3: CURRENT GTM (CORE) ──
    { section: "Current GTM", id: 10, q: "What is your current marketing setup?", type: "select", required: true, priority: "core", options: ["No dedicated marketing person", "1 marketer", "Small team 2-3", "Marketing team 4+", "Mostly founder-led"], example: "Mostly founder-led. I do everything — LinkedIn posts, emails, demos." },
    { section: "Current GTM", id: 11, q: "What GTM approaches have you tried? What happened with each?", type: "long", required: true, priority: "core", example: "Tried a content agency for 6 months — expensive, generic output. Did cold email myself for a month — got some opens but no meetings." },
    { section: "Current GTM", id: 12, q: "What is currently generating leads for you?", type: "long", required: true, priority: "core", example: "Mostly word of mouth and founder network. A few inbound from LinkedIn posts." },
    { section: "Current GTM", id: 13, q: "What is broken or frustrating about your current GTM?", type: "long", required: true, priority: "core", example: "Never had a fully cohesive sales and marketing journey. I do one thing at a time and nothing connects." },
    { section: "Current GTM", id: 14, q: "How much are you currently spending on marketing/GTM monthly?", type: "select", required: false, priority: "core", options: ["$0", "<$2K", "$2-5K", "$5-10K", "$10-25K", "$25K+"], example: "Include tools, agencies, freelancers, ad spend — everything." },

    // ── SECTION 4: YOUR CUSTOMERS & BUYERS (CORE) ──
    { section: "Customers & Buyers", id: 15, q: "Describe your ideal customer. (Company type, size, situation, what makes them perfect.)", type: "long", required: true, priority: "core", example: "4-star boutique hotel, 100-300 rooms, has a restaurant and spa, GM is tech-forward, currently using manual concierge." },
    { section: "Customers & Buyers", id: 16, q: "Who is the buyer? Title and role.", type: "short", required: true, priority: "core", example: "General Manager. Sometimes the Revenue Manager or Director of Operations." },
    { section: "Customers & Buyers", id: 17, q: "What trigger event makes them start looking for a solution like yours?", type: "long", required: true, priority: "core", example: "Negative guest reviews about concierge. Seeing a competitor hotel offer better digital experience. New GM wanting to modernize." },
    { section: "Customers & Buyers", id: 18, q: "Who are the decision-makers involved in a purchase? For each, note if they are a champion, budget holder, evaluator, or potential blocker.", type: "long", required: true, priority: "core", example: "GM = champion. Revenue Manager = evaluator (wants ROI proof). Ownership Group = budget holder (final sign-off on >$5K)." },
    { section: "Customers & Buyers", id: 19, q: "What does the buyer's approval process look like? Are there budget thresholds, committees, or annual budget cycles?", type: "long", required: true, priority: "core", example: "Under $5K/year, GM can sign off same day. Over that needs owner approval and only happens during Oct-Dec budget cycle." },
    { section: "Customers & Buyers", id: 20, q: "What alternatives do they consider instead of your product?", type: "long", required: true, priority: "core", example: "Hiring a concierge staff member, using a competitor platform, building something in-house, or doing nothing." },
    { section: "Customers & Buyers", id: 21, q: "Why do they choose you over alternatives?", type: "long", required: true, priority: "core", example: "Lower cost than hiring staff. More customizable than competitors. We actually understand their property." },
    { section: "Customers & Buyers", id: 22, q: "Name 3-5 companies that are your perfect customers. (Real names.)", type: "long", required: true, priority: "core", youOnly: true, example: "The Langham Chicago, Hotel Drisco SF, The Line Austin." },

    // ── SECTION 5: PRICING & REVENUE (CORE) ──
    { section: "Pricing & Revenue", id: 23, q: "What do you charge (or plan to charge) for your product? How did you arrive at that number?", type: "long", required: true, priority: "core", example: "$500/month per hotel. Based on what competitors charge. Have not tested higher yet." },
    { section: "Pricing & Revenue", id: 24, q: "What pricing model does your industry typically use? (Per seat, per location, per room, flat fee, usage-based, revenue share, etc.)", type: "long", required: true, priority: "core", example: "Most hotel tech charges per-room-per-month. $3.50/room/month for a 200-room hotel = about $700/mo." },
    { section: "Pricing & Revenue", id: 25, q: "What ROI does your product deliver? Split into: (A) What you THINK the ROI is. (B) What any customer has CONFIRMED.", type: "long", required: true, priority: "core", example: "(A) I think 5% guest conversion on $100 upsells = $X/mo per hotel. (B) Nobody has confirmed this — all theoretical." },
    { section: "Pricing & Revenue", id: 26, q: "Have you ever asked a customer to pay or quoted a specific price? What happened? Be specific.", type: "long", required: true, priority: "core", youOnly: true, example: "Quoted $1K/mo to two hotels. One said 'reasonable.' Other said 'need to see ROI first.' Never asked for more than $1K." },

    // ── SECTION 6: CUSTOMER SIGNALS (CORE) ──
    { section: "Customer Signals", id: 27, q: "What have customers or prospects actually TOLD you about the problem you solve? Use their exact words where possible.", type: "long", required: true, priority: "core", youOnly: true, example: "One GM said 'We have been looking for something like this for years.' Another said 'Interesting, but not a priority right now.'" },
    { section: "Customer Signals", id: 28, q: "Has any customer signaled this is a MUST-HAVE ('I need this, when can I start?') or is feedback more NICE-TO-HAVE ('Interesting, keep me posted')?", type: "long", required: true, priority: "core", youOnly: true, example: "Be brutally honest. 'Interesting' and 'I need this' are completely different signals." },
    { section: "Customer Signals", id: 29, q: "What is the strongest buying signal you have received? What is the most discouraging signal?", type: "long", required: true, priority: "core", youOnly: true, example: "Strongest — Hotel X said they would be a beta partner this month. Most discouraging — Two prospects ghosted after demo." },

    // ── SECTION 7: PIPELINE & GO-TO-MARKET (CORE) ──
    { section: "Pipeline & GTM", id: 30, q: "How many active sales conversations do you have RIGHT NOW? List the top 3-5: name, warmth (hot/warm/cold), and next step.", type: "long", required: true, priority: "core", youOnly: true, example: "Hotel Lux — HOT, demo Thursday. Coastal Inn — WARM, used our old product, need to re-engage. Beach Resort — COLD, met at conference." },
    { section: "Pipeline & GTM", id: 31, q: "Do you have existing customers on a current or older product who could convert to the new offering? How many? What is the relationship like?", type: "long", required: true, priority: "core", youOnly: true, example: "12 hotels on Guest App. 4-5 have asked about AI features. Relationships strong with most." },
    { section: "Pipeline & GTM", id: 32, q: "Are you selling a finished product, recruiting design/beta partners to co-build, or pre-selling before it is built? What does the offer look like?", type: "long", required: true, priority: "core", youOnly: true, example: "Recruiting 3-5 design partners. Discounted rate + direct input on features in exchange for real usage data." },

    // ── SECTION 8: COMPETITORS (CORE) ──
    { section: "Competitors", id: 33, q: "Who are your top 3 direct competitors? (Name and URL if possible.)", type: "long", required: true, priority: "core", example: "CompetitorA.com, CompetitorB.io, CompetitorC.com" },
    { section: "Competitors", id: 34, q: "What do competitors do well that you respect?", type: "long", required: false, priority: "core", example: "CompetitorA has great onboarding. CompetitorB has strong brand recognition." },
    { section: "Competitors", id: 35, q: "What do competitors get wrong?", type: "long", required: true, priority: "core", example: "They are all generic. None understand individual hotel context. Cookie-cutter approach." },
    { section: "Competitors", id: 36, q: "Why do customers switch from competitors to you?", type: "long", required: false, priority: "core", example: "They get tired of the enterprise sales process and want a more personal relationship." },
    { section: "Competitors", id: 37, q: "What would a competitor say is your weakness?", type: "long", required: false, priority: "core", example: "We are newer, less proven at scale, smaller team." },

    // ── SECTION 9: VOICE & POSITIONING (ENHANCED) ──
    { section: "Voice & Positioning", id: 38, q: "If your company was a person, how would they talk?", type: "long", required: true, priority: "enhanced", example: "Direct, no BS, backs up claims with data. Like a trusted friend who happens to know the industry." },
    { section: "Voice & Positioning", id: 39, q: "What 3 words describe your brand voice?", type: "short", required: true, priority: "enhanced", example: "Direct, Practical, Expert." },
    { section: "Voice & Positioning", id: 40, q: "Any words or phrases we should NEVER use in your content or outreach?", type: "long", required: false, priority: "enhanced", youOnly: true, example: "Never say 'leverage,' 'synergy,' or 'best-in-class.' No corporate jargon." },
    { section: "Voice & Positioning", id: 41, q: "Share 2-3 examples of content you have created that you love.", type: "long", required: false, priority: "enhanced", example: "Our founder's LinkedIn post about why AI concierge is not about replacing humans." },
    { section: "Voice & Positioning", id: 42, q: "Share 2-3 examples of content from others that you admire.", type: "long", required: false, priority: "enhanced", youOnly: true, example: "Basecamp's blog. Lenny's Newsletter. How [competitor] explains their product." },
    { section: "Voice & Positioning", id: 43, q: "What is your unique point of view on your market? The thing you believe that most people in your industry do not.", type: "long", required: true, priority: "enhanced", example: "Hotels do not need more software. They need fewer tools that actually understand their guests." },

    // ── SECTION 10: CONTENT & OUTREACH (ENHANCED) ──
    { section: "Content & Outreach", id: 44, q: "Which content formats do you want to focus on?", type: "multi", required: true, priority: "enhanced", youOnly: true, options: ["LinkedIn posts", "Blog", "Twitter/X", "Email sequences", "Case studies", "Webinars", "Short video"], example: "Pick your top 2-3. We will prioritize those." },
    { section: "Content & Outreach", id: 45, q: "What topics should we create content about?", type: "long", required: true, priority: "enhanced", example: "Problems hotels face with guest experience. How AI is changing hospitality. Before/after stories." },
    { section: "Content & Outreach", id: 46, q: "What topics, claims, or approaches should we AVOID in content and outreach?", type: "long", required: false, priority: "enhanced", youOnly: true, example: "Do not make ROI claims we cannot prove. No generic 'AI will change everything' posts. No aggressive follow-ups." },
    { section: "Content & Outreach", id: 47, q: "How often do you want to publish?", type: "select", required: true, priority: "enhanced", youOnly: true, options: ["Daily", "3-4x/week", "2x/week", "Weekly", "2x/month"] },
    { section: "Content & Outreach", id: 48, q: "Who from your team can be featured as content author?", type: "short", required: true, priority: "enhanced", youOnly: true, example: "Just me (founder). Also our CTO occasionally." },
    { section: "Content & Outreach", id: 49, q: "Which outreach channels should we use?", type: "multi", required: true, priority: "enhanced", youOnly: true, options: ["Cold email", "LinkedIn DMs", "LinkedIn connections", "Twitter DMs", "Phone", "Events"] },
    { section: "Content & Outreach", id: 50, q: "What is your typical sales cycle length?", type: "select", required: true, priority: "enhanced", options: ["< 2 weeks", "2-4 weeks", "1-2 months", "2-3 months", "3-6 months", "6+ months"], example: "From first touch to signed contract. If you do not know yet, give your best estimate." },
    { section: "Content & Outreach", id: 51, q: "Any outreach approaches to avoid?", type: "long", required: false, priority: "enhanced", youOnly: true, example: "No bait-and-switch. No mass generic emails. Our industry is small — everyone talks." },

    // ── SECTION 11: GOALS & CONSTRAINTS (CORE) ──
    { section: "Goals & Constraints", id: 52, q: "What is your primary goal for the next 90 days?", type: "long", required: true, priority: "core", youOnly: true, example: "Get 3-5 design partners paying $1K+/month. Prove the AI concierge drives measurable upsell revenue." },
    { section: "Goals & Constraints", id: 53, q: "What does success look like at month 3 of working together?", type: "long", required: true, priority: "core", youOnly: true, example: "Consistent pipeline of hotel leads. Landing page converting. Spending less time on marketing personally." },
    { section: "Goals & Constraints", id: 54, q: "What is your biggest constraint right now?", type: "long", required: true, priority: "core", youOnly: true, example: "Time — I am doing sales, product, and everything else. Also waiting on CTO to formally commit." },

    // ── SECTION 12: THE REAL TALK (CORE) ──
    { section: "The Real Talk", id: 55, q: "If someone could snap their fingers and solve ONE thing in your business tomorrow, what would it be? How much would that change things?", type: "long", required: true, priority: "core", youOnly: true, example: "Do not say what sounds good. Say what actually keeps you up at night." },
    { section: "The Real Talk", id: 56, q: "What have you been AVOIDING doing that you know you probably should? Why?", type: "long", required: true, priority: "core", youOnly: true, example: "I have been avoiding asking hotels to pay $5-10K because I am afraid they will say no and I will lose the relationship." },
];

// ========================================
// EXTRACTION PROMPT -- Copy and paste into LLM with company materials
// ========================================

export const INTAKE_EXTRACTOR = `You are an intake extractor for Sleeve Cloud, a B2B GTM consulting service.

I am going to give you my company materials (pitch decks, website copy, investor memos, customer emails, meeting notes, product docs, etc.). Read everything and draft the best possible answers to all 56 intake questions below.

RULES:
- Answer as if you ARE me (the founder). Use first person.
- Be specific. Real names, real numbers, real examples from my materials.
- For each answer, mark status:
  EXTRACTED = confident answer from the materials
  PARTIAL = partially answered, I need to verify or add detail
  GAP = cannot answer from materials, I must fill in manually
- Do NOT guess. If the materials do not say it, mark GAP.
- Use my own language and tone. Pull my exact phrases.
- After all questions, list BONUS INSIGHTS and FOLLOW-UP QUESTIONS.

FORMAT each answer:
Q[number]. [Question]
Status: EXTRACTED / PARTIAL / GAP
Answer: [drafted answer]
Source: [which document]
I need to: [Nothing / Verify / Add detail / Answer manually]


--- COMPANY SNAPSHOT ---
Q1. What does your product do in one sentence?
Q2. What is your company stage? (Pre-seed / Seed / Series A / Series B+ / Bootstrapped / Pivoting)
Q3. What industry or vertical do you primarily serve?
Q4. What is your current ARR? (Pre-revenue / <$100K / $100K-500K / $500K-$1M / $1M-$5M / $5M+)
Q5. Where is your product right now? (Concept only / Mockups / Partial build ~50% / Working MVP / Beta with users / Live in production)

--- TEAM & CAPACITY ---
Q6. Who is on your team? For each person list: name, role, and whether they are full-time committed, part-time, or provisional/uncommitted.
Q7. How many hours per week can YOU personally commit to active selling? (Calls, emails, outreach, closing — not reviewing content or building product.)
Q8. How much time can you dedicate to reviewing outputs (content drafts, email sequences, reports) weekly? (<1 hour / 1-2 hours / 2-4 hours / 4+ hours)
Q9. How long can you operate without new revenue? Are you raising, bootstrapping, or have other income?

--- CURRENT GTM ---
Q10. What is your current marketing setup? (No dedicated marketing person / 1 marketer / Small team 2-3 / Marketing team 4+ / Mostly founder-led)
Q11. What GTM approaches have you tried? What happened with each?
Q12. What is currently generating leads for you?
Q13. What is broken or frustrating about your current GTM?
Q14. How much are you currently spending on marketing/GTM monthly? ($0 / <$2K / $2-5K / $5-10K / $10-25K / $25K+)

--- YOUR CUSTOMERS & BUYERS ---
Q15. Describe your ideal customer. (Company type, size, situation, what makes them perfect.)
Q16. Who is the buyer? Title and role.
Q17. What trigger event makes them start looking for a solution like yours?
Q18. Who are the decision-makers involved in a purchase? For each, note if they are a champion, budget holder, evaluator, or potential blocker.
Q19. What does the buyer's approval process look like? Are there budget thresholds, committees, or annual budget cycles?
Q20. What alternatives do they consider instead of your product?
Q21. Why do they choose you over alternatives?
Q22. Name 3-5 companies that are your perfect customers. (Real names.)

--- PRICING & REVENUE ---
Q23. What do you charge (or plan to charge) for your product? How did you arrive at that number?
Q24. What pricing model does your industry typically use? (Per seat, per location, per room, flat fee, usage-based, revenue share, etc.)
Q25. What ROI does your product deliver? Split into: (A) What you THINK the ROI is. (B) What any customer has CONFIRMED.
Q26. Have you ever asked a customer to pay or quoted a specific price? What happened? Be specific.

--- CUSTOMER SIGNALS ---
Q27. What have customers or prospects actually TOLD you about the problem you solve? Use their exact words where possible.
Q28. Has any customer signaled this is a MUST-HAVE ('I need this, when can I start?') or is feedback more NICE-TO-HAVE ('Interesting, keep me posted')?
Q29. What is the strongest buying signal you have received? What is the most discouraging signal?

--- PIPELINE & GO-TO-MARKET ---
Q30. How many active sales conversations do you have RIGHT NOW? List the top 3-5: name, warmth (hot/warm/cold), and next step.
Q31. Do you have existing customers on a current or older product who could convert to the new offering? How many? What is the relationship like?
Q32. Are you selling a finished product, recruiting design/beta partners to co-build, or pre-selling before it is built? What does the offer look like?

--- COMPETITORS ---
Q33. Who are your top 3 direct competitors? (Name and URL if possible.)
Q34. What do competitors do well that you respect?
Q35. What do competitors get wrong?
Q36. Why do customers switch from competitors to you?
Q37. What would a competitor say is your weakness?

--- VOICE & POSITIONING ---
Q38. If your company was a person, how would they talk?
Q39. What 3 words describe your brand voice?
Q40. Any words or phrases we should NEVER use in your content or outreach?
Q41. Share 2-3 examples of content you have created that you love.
Q42. Share 2-3 examples of content from others that you admire.
Q43. What is your unique point of view on your market? The thing you believe that most people in your industry do not.

--- CONTENT & OUTREACH ---
Q44. Which content formats do you want to focus on? (LinkedIn posts / Blog / Twitter-X / Email sequences / Case studies / Webinars / Short video)
Q45. What topics should we create content about?
Q46. What topics, claims, or approaches should we AVOID in content and outreach?
Q47. How often do you want to publish? (Daily / 3-4x week / 2x week / Weekly / 2x month)
Q48. Who from your team can be featured as content author?
Q49. Which outreach channels should we use? (Cold email / LinkedIn DMs / LinkedIn connections / Twitter DMs / Phone / Events)
Q50. What is your typical sales cycle length? (< 2 weeks / 2-4 weeks / 1-2 months / 2-3 months / 3-6 months / 6+ months)
Q51. Any outreach approaches to avoid?

--- GOALS & CONSTRAINTS ---
Q52. What is your primary goal for the next 90 days?
Q53. What does success look like at month 3 of working together?
Q54. What is your biggest constraint right now?

--- THE REAL TALK ---
Q55. If someone could snap their fingers and solve ONE thing in your business tomorrow, what would it be? How much would that change things?
Q56. What have you been AVOIDING doing that you know you probably should? Why?

--- END OF QUESTIONS ---

After all answers, provide:

COMPLETION SUMMARY
- EXTRACTED: [count]
- PARTIAL: [count]
- GAP: [count] (I must answer these manually)

BONUS INSIGHTS
Anything you noticed: contradictions, positioning gaps, signals, surprises.

FOLLOW-UP QUESTIONS
2-3 questions these materials raised but did not answer.

NOW READ MY MATERIALS AND EXTRACT:

[PASTE YOUR MATERIALS HERE]
`;

// ========================================
// CLIENT-FACING INTAKE PROMPT
// ========================================

export const CLIENT_INTAKE_PROMPT = `Hi! I'm about to do a deep analysis of your go-to-market strategy. To give you the most valuable results, I need to understand your business thoroughly.

Please paste this prompt into Claude or ChatGPT along with any of the following documents you have:
- Your pitch deck or investor memo
- Your website URL or homepage copy
- Any marketing materials you've created
- Sales call notes or recordings
- Your LinkedIn company page content
- Budget or spending breakdowns for marketing/sales

Then answer these questions based on your documents AND your own knowledge. Be as specific and honest as possible — the more detail, the better the analysis.

=======================================
ABOUT YOUR BUSINESS
=======================================

1. What does your product/service do? (One sentence, then explain in detail)
2. What stage are you at and what's your current revenue?
3. Who is your ideal customer? Be specific — company type, size, title of buyer, what situation makes them ready to buy.
4. What makes you different from alternatives? Why do customers pick you?

=======================================
YOUR CURRENT GO-TO-MARKET
=======================================

5. What marketing and sales activities are you currently doing? What's working? What isn't?
6. How much are you spending on marketing/sales monthly, and on what?
7. How do you currently measure what's working? (Be honest if the answer is "we don't")
8. What's the most frustrating thing about your current GTM?

=======================================
YOUR GOALS
=======================================

9. What does success look like for you in 90 days? Be specific with numbers if possible.
10. What's your biggest constraint? (Time, money, expertise, something else?)

=======================================
YOUR MARKET
=======================================

11. Who are your top 3 competitors? What do they do well? What do they get wrong?
12. What's your unique point of view on your market that competitors miss?

=======================================
ANYTHING ELSE
=======================================

13. Is there anything specific about your industry, business model, or situation that you think is important for a GTM analysis? Things that are unique to how your business works?

(This last question is critical — it catches the industry-specific context that standard questions miss.)

=======================================

Please be thorough. The quality of my analysis is directly proportional to the detail you provide here. If a question doesn't apply, say so and explain why — that's useful information too.
`;

// ========================================
// INDUSTRY ADD-ON QUESTIONS
// ========================================

export const INDUSTRY_ADDONS = {
    "depin_ai_infra": {
        label: "DePIN / AI Infrastructure",
        questions: [
            { id: "depin_1", q: "What is your current network size (nodes, users, compute capacity)?", type: "short", why: "Supply-side health determines what demand-side GTM is possible" },
            { id: "depin_2", q: "What percentage of your users are supply-side (node operators) vs demand-side (paying for compute/inference)?", type: "short", why: "Most DePIN protocols are supply-heavy. The demand ratio reveals the real GTM challenge." },
            { id: "depin_3", q: "How are you incentivizing early users? (Token rewards, points, airdrops, usage credits)", type: "long", why: "Incentive design affects whether early users convert to paying customers or churn post-airdrop" },
            { id: "depin_4", q: "What chain are you built on and how does that affect your go-to-market?", type: "long", why: "Chain ecosystem (Solana, ETH, etc.) determines community, partnerships, and developer audience" },
            { id: "depin_5", q: "How do you convert crypto-native community members into developer/enterprise customers?", type: "long", why: "The supply-to-demand conversion is THE GTM challenge for DePIN protocols" },
            { id: "depin_6", q: "What is your latency/reliability compared to centralized alternatives (AWS, etc.)?", type: "long", why: "Performance gap vs centralized cloud is the #1 objection from developers" },
        ],
        learned_from: "Gradient Network engagement, March 2026",
    },

    "b2b_saas": {
        label: "B2B SaaS",
        questions: [
            { id: "saas_1", q: "What's your current MRR/ARR and growth rate?", type: "short", why: "Growth rate determines urgency and GTM approach" },
            { id: "saas_2", q: "What's your average deal size and sales cycle length?", type: "short", why: "Determines whether inbound or outbound is primary motion" },
            { id: "saas_3", q: "What's your current CAC and do you know your LTV?", type: "short", why: "Unit economics determine which channels are viable" },
            { id: "saas_4", q: "Where are you seeing the most churn and why?", type: "long", why: "Churn often indicates positioning or ICP problem, not just product" },
            { id: "saas_5", q: "Are you product-led, sales-led, or hybrid?", type: "select", why: "Fundamentally changes the GTM motion" },
        ],
        learned_from: "General B2B SaaS knowledge — refine with actual client data",
    },
};

// ========================================
// DOCUMENT UPLOAD CHECKLIST
// ========================================

export const DOC_UPLOAD_CHECKLIST = {
    priority_1_must_have: [
        { doc: "Website URL", why: "Current positioning, messaging, offer — what the market sees today", format: "URL" },
        { doc: "Pitch deck or one-pager", why: "How they describe themselves, their market, their traction", format: "PDF/slides" },
    ],
    priority_2_high_value: [
        { doc: "Budget or spend breakdown", why: "Where money is going — reveals what they think is working", format: "Spreadsheet, screenshot, or description" },
        { doc: "Sales call recording or notes", why: "How they actually sell — reveals real positioning vs. aspirational", format: "Audio, transcript, or notes" },
        { doc: "LinkedIn profiles (founder + company)", why: "How they show up publicly, their network, their voice", format: "URLs" },
    ],
    priority_3_nice_to_have: [
        { doc: "Marketing content they've created", why: "Voice, quality bar, what they think resonates", format: "Links or files" },
        { doc: "Competitor list or analysis", why: "How they see their market — often reveals blind spots", format: "Any format" },
        { doc: "Investor memo or board deck", why: "Unfiltered view of goals, metrics, constraints", format: "PDF" },
        { doc: "CRM export or pipeline snapshot", why: "Real data on what's in the pipeline — grounds the analysis", format: "CSV or screenshot" },
        { doc: "Previous agency/consultant work", why: "What's been tried, what quality bar was set", format: "Any format" },
    ],
};
