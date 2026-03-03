// ========================================
// FRAMEWORKS -- 47 GTM Frameworks (Hormozi, Brunson, Killan)
// Tasks reference these frameworks. Click a framework # to learn more.
// ========================================

export const FRAMEWORKS = [
    {
        n: 1, name: "Irresistible Offer", cat: "offer",
        rule: "Value = (Dream Outcome x Likelihood) / (Time x Effort)",
        source: "Hormozi * $100M Offers",
        when: "Creating or revising any offer, pricing page, or pitch",
        detail: "People don't buy products -- they buy the gap between where they are and where they want to be. Increase perceived value by raising the dream outcome and perceived likelihood of success while lowering the time delay and effort/sacrifice required.",
        sleeve: "Sleeve's offer: 'Every AI already knows you' -- in 2 minutes.' Dream outcome = personalized AI everywhere (high). Likelihood = it works on their first try (demo proves it). Time = 2 minutes (ultra-low). Effort = answer questions, not learn a tool (low). The scan makes likelihood tangible -- it SHOWS the gap.",
        action: "Score your current offer on each variable 1-10. If any variable scores below 6, that's your bottleneck. Fix the weakest variable first."
    },
    {
        n: 2, name: "Stack Slide", cat: "offer",
        rule: "Never sell a product -- sell a bundled offer. Layer value until saying no feels irrational.",
        source: "Hormozi * $100M Offers",
        when: "Structuring tier pricing, Pro vs Free, upsell pages",
        detail: "List every component of your offer as a separate line item with its own value. The total perceived value should be 10x+ the price. Include bonuses, guarantees, and speed/convenience elements. Each layer makes the gap between price and value more absurd.",
        sleeve: "Free: Scan + Score + Basic Profile. Pro ($12/mo): Chrome extension auto-inject + unlimited platforms + score tracking + priority support. Stack it: '$12/mo for what would take you 15 min of re-explaining per AI session = 30 sessions/mo = $900/mo of time saved.'",
        action: "List every component of Pro tier as a separate bullet with its own dollar value. Total should exceed $200/mo in perceived value for a $12/mo price."
    },
    {
        n: 3, name: "Currency Concept", cat: "offer",
        rule: "Tie your offer to a single number that goes up. The number IS the product.",
        source: "Killan",
        when: "Naming outcomes, writing copy, designing the scan results page",
        detail: "People engage with things they can measure. A credit score, a follower count, a Sleeve Score. If you give someone a number, they want to make it go up. The number creates return visits, creates shareability, and creates a natural upsell ('want to improve your score?').",
        sleeve: "Sleeve Score is the currency. Users score 2.8/10 on first scan. After filling gaps: 7.4/10. The score drives: return visits (improve it), sharing ('I scored X, try it'), and conversion ('Pro unlocks full score potential'). Every gap filled = score goes up = dopamine.",
        action: "Make sure the score is prominent on every screen. Show +/- changes. Add 'your score improved by X since last visit' to the dashboard."
    },
    {
        n: 4, name: "Need-to-Believes", cat: "offer",
        rule: "Every belief the customer must hold = friction. Minimize required beliefs to ONE.",
        source: "Killan",
        when: "Simplifying messaging, reducing landing page length, onboarding copy",
        detail: "If your product requires someone to believe 5 things before they buy, you'll lose most people by belief #2. The fewer beliefs required, the wider your funnel. Ideal: they need to believe ONE thing -- 'AI works better when it knows me.' Everything else should be self-evident or provable.",
        sleeve: "One belief: 'AI that knows you gives better answers than AI that doesn't.' The scan proves it. The demo proves it. The before/after proves it. Don't also ask them to believe in cross-platform profiles, interpretation layers, or portable context. Those are features, not beliefs.",
        action: "Audit your landing page. Every sentence that introduces a NEW concept the user must accept is friction. Cut until there's one core belief."
    },
    {
        n: 5, name: "Info Product Bulking", cat: "offer",
        rule: "9 methods to create content: crowdsource, compile, interview, record, repurpose, curate, template, challenge, case study.",
        source: "Hormozi * $100M Offers",
        when: "Creating lead magnets, bonus content, newsletter content, proof library",
        detail: "You don't need to create everything from scratch. Compile what exists (other people's data + your analysis). Interview users. Record your process. Turn one long piece into 10 short ones. Template your workflows. Document case studies.",
        sleeve: "Lead magnet: 'The AI Personalization Report' -- compile scan data across 500 users (anonymized), show average scores, biggest gaps, most impactful fields. Zero original research needed, just aggregated product data.",
        action: "Pick the lowest-effort method (compile or repurpose) and create one lead magnet this week."
    },
    {
        n: 6, name: "Affiliate Architecture", cat: "offer",
        rule: "Give away a component product. Let affiliates keep 100% of its revenue. You acquire the lead for free.",
        source: "Hormozi * $100M Leads",
        when: "Wrapper tool strategy, partnership deals, distribution scaling",
        detail: "Instead of paying for ads, create a standalone product that's valuable on its own but funnels users into your ecosystem. Let operators/affiliates run the product and keep all revenue. You get the user for zero acquisition cost. The component product IS the ad.",
        sleeve: "Newsletter Digest AI, Meeting Prep AI, Article Summary AI -- each is a standalone tool. Operators keep 100% of tool revenue ($5-10/mo). Every user creates a Sleeve profile --s part of onboarding. Sleeve acquires users at infrastructure cost only.",
        action: "Spec out the first wrapper tool (Newsletter Digest AI). Define: what it does, how it uses Sleeve profile, what the operator gets."
    },
    {
        n: 24, name: "LTV Arms Race", cat: "offer",
        rule: "If you can't afford leads, you don't have a lead cost problem -- you have a revenue-per-customer problem.",
        source: "Hormozi * $100M Leads",
        when: "CAC feels too high, paid acquisition isn't working, scaling decisions",
        detail: "Every channel has a going rate for leads. If competitors can afford it and you can't, your LTV is too low. Fix: increase price, add tiers, improve retention, add expansion revenue, or reduce churn. The company that can pay the most for a customer wins.",
        sleeve: "Free -> $12/mo -> $99/yr -> $49/mo teams -> Enterprise. Each tier increases LTV. If scan-to-Pro is 5% and average retention is 8 months, LTV = $96. That means you can spend ~$32 per acquired user (3:1 ratio). If that's not enough, add the annual tier first.",
        action: "Calculate current LTV. If < $100, focus on retention and annual conversion before scaling paid acquisition."
    },
    {
        n: 7, name: "Hook > Everything", cat: "copy",
        rule: "Proof + Promise + Plan. The first 3 seconds determine whether ANYTHING else matters.",
        source: "Hormozi * $100M Leads",
        when: "Every headline, email subject, ad creative, social post opening, video intro",
        detail: "The hook is the most important 3 seconds of any piece of content. It needs 2 of 3 elements: Proof (evidence it works), Promise (what they'll get), Plan (how it works). A bad hook kills a great offer. A great hook saves a mediocre one. This is where 80% of creative effort should go.",
        sleeve: "'Your AI scores you 2.8/10' = Proof + Promise. 'Make every AI know you in 2 minutes' = Promise + Plan. 'Same AI, same question, completely different answer' = Proof. Test 10 hooks before putting money behind any of them.",
        action: "Write 10 hook variants for your current highest-priority asset. Label each P+P, P+Plan, or Pr+P. Test the top 3 organically before any spend."
    },
    {
        n: 8, name: "Hook-Story-Offer (HSO)", cat: "copy",
        rule: "Everything that converts follows this structure. If it's not converting, the problem is in one of the three.",
        source: "Brunson * Dotcom Secrets",
        when: "Diagnosing ANY underperforming content, email, ad, or landing page",
        detail: "Hook grabs attention. Story builds connection and belief. Offer tells them what to do. When conversion is low: Is the hook getting attention? (Check CTR.) Is the story building belief? (Check time on page.) Is the offer clear? (Check CTA click rate.) Diagnose in that order.",
        sleeve: "Landing page: Hook = 'Make AI personal. Everywhere.' Story = before/after demo showing generic vs. Sleeved output. Offer = 'Create your Sleeve -- free.' If scans are low: change the hook. If scans start but don't complete: fix the story (the scan itself). If profiles don't convert to Pro: fix the offer.",
        action: "Pick your worst-performing asset. Identify which of H/S/O is the weakest link. Fix that one element only."
    },
    {
        n: 9, name: "Clear Not Clever", cat: "copy",
        rule: "5th grade reading level. If your mom can't understand it in one read, rewrite.",
        source: "Hormozi * $100M Leads",
        when: "Editing ALL customer-facing copy -- landing pages, emails, ads, social, in-product",
        detail: "Clever copy is a vanity project. Clear copy converts. Use short sentences. Use simple words. Name the outcome, not the brand. 'Portable context profile' = clever. 'AI that already knows you' = clear. Test with Hemingway App -- if it's above grade 5, simplify.",
        sleeve: "'Interpretation infrastructure' -- 'AI that knows you.' 'Cross-platform context injection' -- 'Works on ChatGPT, Claude, and Gemini.' 'Portable user ontology' -- 'Your AI profile.' Every piece of copy should pass the bar test: could you explain this to a stranger in a noisy bar?",
        action: "Run your landing page through Hemingway App. Rewrite everything above grade 5."
    },
    {
        n: 10, name: "Test Like a Comedian", cat: "copy",
        rule: "Write 10 versions. Test small. Keep the one winner. Repeat.",
        source: "Hormozi * $100M Leads",
        when: "Before putting any money behind creative -- hooks, ads, emails, video intros",
        detail: "Comedians don't write one joke and go on Netflix. They test 100 jokes in small clubs, keep the 5 that kill, and THOSE go on the special. Same with hooks: write 10, post organically to small audiences, measure engagement, keep the winner, scale that one.",
        sleeve: "Write 10 hook variants for the scan CTA. Post each as a standalone tweet over 2 weeks. Measure: impressions, engagement rate, link clicks. The top 2 become your ad creative and email subjects. Never pay to promote an untested hook.",
        action: "Queue 10 hook variants in Typefully. Post one per day. Track which gets the most link clicks."
    },
    {
        n: 11, name: "Epiphany Bridge", cat: "copy",
        rule: "Before state -> Epiphany moment -> Journey -> After state. Change their emotional state, not just their information.",
        source: "Brunson * Dotcom Secrets",
        when: "Founder origin story, long-form content, video scripts, 'About' page",
        detail: "People don't buy logically -- they buy emotionally and justify logically. The Epiphany Bridge is a story structure: you were in State A (frustrated), you had a moment of clarity (epiphany), you went through a journey (building the solution), and now you're in State B (transformed). The listener maps their own frustration onto your Before state.",
        sleeve: "Before: 'I was using 5 AI tools and re-explaining myself to each one. Every new tool meant starting from zero. I spent more time giving context than getting value.' Epiphany: 'I realized the problem wasn't the AI -- it was that no AI knew ME.' Journey: 'So I built a single profile that works everywhere.' After: 'Now I open any AI and it already knows my role, my style, my projects.'",
        action: "Write your Epiphany Bridge story in 200 words. Record it as a 60-second video. Use it as your founder story on the About page and as content."
    },
    {
        n: 12, name: "3 False Beliefs", cat: "copy",
        rule: "Vehicle belief -> Internal belief -> External belief. Break one per email/touchpoint.",
        source: "Brunson * Expert Secrets",
        when: "Email sequences, objection handling, sales conversations, FAQ pages",
        detail: "Three beliefs prevent every purchase: Vehicle ('This type of solution won't work'), Internal ('I can't make it work'), External ('Something outside my control will prevent it'). Each touchpoint should break ONE belief. Don't try to break all three at once.",
        sleeve: "Vehicle: 'A profile can't actually make AI better' -- Break with before/after demo. Internal: 'I don't have time to set this up' -- Break with '2 minutes' proof. External: 'AI tools won't use a third-party profile' -- Break with Chrome extension demo showing it just works.",
        action: "Map your 5-email sequence to beliefs: Email 1 = Vehicle (demo), Email 3 = Internal (speed), Email 4 = External (compatibility). Each email breaks exactly one."
    },
    {
        n: 13, name: "Damaging Admissions", cat: "copy",
        rule: "Bad + Bad + Bad + BUT + Good = amplified trust. Claim your flaws before anyone else does.",
        source: "Hormozi * $100M Offers",
        when: "About page, sales calls, positioning against bigger competitors, landing page copy",
        detail: "When you admit real weaknesses upfront, everything else you say becomes more credible. The admission must be REAL -- not fake humility. Then pivot to your core strength. The audience thinks: 'If they're honest about the bad stuff, the good stuff must be true too.'",
        sleeve: "'Sleeve can't make AI smarter. It can't improve the models. It can't fix hallucinations. BUT it can make sure every AI tool you use already knows who you are and what matters to you -- so you never start from zero again.' This is more believable than 'Sleeve makes AI perfect for you.'",
        action: "Write your damaging admission. List 3 real things Sleeve CAN'T do. Pivot to the one thing it does better than anything."
    },
    {
        n: 25, name: "3.5:1 Give-to-Ask", cat: "copy",
        rule: "70% give value, 30% ask. Non-negotiable ratio across all content and communication.",
        source: "Hormozi * $100M Leads",
        when: "Planning content calendar, email sequences, social strategy, newsletter",
        detail: "For every piece that asks (buy, sign up, share, upgrade), you need 3aa4 pieces that give (teach, entertain, help, inspire). This ratio builds trust so that when you DO ask, people say yes. Track it. If you're at 50/50, you're burning trust. Below 70/30 = short-term thinking.",
        sleeve: "Weekly: 5 Twitter posts (3aa4 value: AI tips, comparisons, insights. 1 ask: take the scan). Newsletter: 3 value issues, then 1 with CTA. Email sequence: 3 educational, 1 upgrade ask, 1 feature highlight. Track the ratio explicitly.",
        action: "Audit last 2 weeks of content. Count value vs. ask posts. If below 70/30, create 5 pure-value posts this week with zero CTA."
    },
    {
        n: 14, name: "Proof Over Promise", cat: "funnel",
        rule: "11,382 reviews at 4.7a beats 5.0a with 1 review. Volume of proof > perfection of promise.",
        source: "Hormozi * $100M Leads",
        when: "Deciding what to build next, before ANY paid acquisition, landing page design",
        detail: "Proof is the most underleveraged asset in early-stage companies. Founders invest in features when they should invest in testimonials. One screenshot of a real user's reaction is worth more than a thousand words of copy. Proof compounds: 5 testimonials are 10x more convincing than 1.",
        sleeve: "Before Phase 3 (paid): need 20+ proof assets. Types: before/after screenshots, score journeys, user quotes, video reactions, specific metrics ('saved 12 min/session'). Display proof everywhere: landing page, emails, scan results page, social proof bar.",
        action: "Count your current proof assets. If < 20, make proof collection your #1 priority this week. Ask every scan completer for feedback."
    },
    {
        n: 15, name: "Surfboard Funnel", cat: "funnel",
        rule: "3 pages maximum: opt-in, offer, upsell. Make the offer immediately after opt-in.",
        source: "Brunson * Dotcom Secrets",
        when: "Designing any conversion flow, simplifying existing funnels",
        detail: "Every additional page/step loses 20aa50% of users. The ideal funnel is brutally short: Page 1 captures interest (scan), Page 2 delivers value AND makes the offer (results + create profile), Page 3 upsells (Pro). Don't add education pages, feature tours, or pricing comparison pages in between.",
        sleeve: "Page 1: Landing -> Start Scan (one CTA). Page 2: Scan results -> Score + gaps -> Create profile (email gate here). Page 3: Profile dashboard -> Install extension -> Upgrade to Pro. Three pages. No feature tour. No pricing table. No FAQ page in the middle.",
        action: "Map your current user flow. Count every page/step between landing and Pro. If > 5 steps, cut until it's 3."
    },
    {
        n: 16, name: "Brunson 7-Step", cat: "funnel",
        rule: "Dream customer -> Dream 100 -> Hook-Story-Offer -> Land the plane -> Present -> Get Yes -> Upsell",
        source: "Brunson * Traffic Secrets",
        when: "Full acquisition strategy design, quarterly planning",
        detail: "Step 1: Define your dream customer precisely. Step 2: Find the 100 people/places where they congregate. Step 3: Create Hook-Story-Offer content for those channels. Step 4: Drive them to your funnel. Step 5: Present your offer. Step 6: Convert. Step 7: Upsell. Most founders skip steps 1aa2 and wonder why 3aa7 don't work.",
        sleeve: "Dream customer: AI power user, 3+ tools, frustrated by re-explaining. Dream 100: AI Twitter accounts, r/ChatGPT mods, AI newsletter authors, YouTube AI reviewers. HSO: 'Your AI scores you 2.8/10' content. Land: Discovery Scan. Present: Sleeve profile + extension. Yes: Free account. Upsell: Pro $12/mo.",
        action: "Build your Dream 100 list. 50 Twitter accounts, 20 Reddit communities, 15 newsletters, 15 YouTube channels. Start engaging with 5/day."
    },
    {
        n: 17, name: "5 Awareness Levels", cat: "funnel",
        rule: "Unaware -> Problem-aware -> Solution-aware -> Product-aware -> Most-aware. Match your message to their level.",
        source: "Eugene Schwartz / Brunson",
        when: "Writing ANY marketing copy -- the awareness level determines the hook style",
        detail: "Unaware: don't know they have a problem -- use curiosity ('How well does AI actually know you?'). Problem-aware: know the pain but not the solution -- name the pain ('Tired of re-explaining yourself?'). Solution-aware: know solutions exist -- differentiate ('Unlike ChatGPT Memory, works everywhere'). Product-aware: know Sleeve -- overcome objections. Most-aware: ready to buy -- just give them the deal.",
        sleeve: "Most of your audience is Problem-aware (they know re-explaining is annoying) or Unaware (they don't realize how generic their AI output is). The scan converts Unaware -> Problem-aware instantly ('Your AI only knows 5 things about you'). Cold outreach should target Problem-aware. Retargeting targets Product-aware.",
        action: "Label your top 5 content pieces by awareness level. If they're all Product-aware, you're only talking to people who already know you. Create 3 Unaware/Problem-aware pieces."
    },
    {
        n: 18, name: "Split Test Priority", cat: "funnel",
        rule: "Test in this order: 1. Offers -> 2. Headlines -> 3. Images -> 4. Page structure. Never reverse.",
        source: "Hormozi * $100M Leads",
        when: "Optimizing any conversion point -- landing page, email, ad",
        detail: "A mediocre page with a great offer beats a beautiful page with a bad offer. Always test the offer first (what they get), then the headline (how you describe it), then the creative (how it looks), then the structure (where things are placed). Most people test colors and button text -- that's step 47, not step 1.",
        sleeve: "Step 1: Is 'free scan' the right offer? Test vs. 'free AI audit' or 'free personalization report.' Step 2: Test 3 headlines -- 'Make AI personal' vs 'Your AI scores 2.8/10' vs 'Stop re-explaining yourself.' Step 3: Test the before/after visual. Step 4: Test single page vs. multi-step.",
        action: "If conversion is below target, ask: 'Have I tested the OFFER yet?' If no, don't touch anything else."
    },
    {
        n: 19, name: "Core Four", cat: "growth",
        rule: "Warm outreach, cold outreach, content creation, paid ads. Pick ONE primary channel. 4 hours/day on it.",
        source: "Hormozi * $100M Leads",
        when: "Deciding where to spend your time, fighting the urge to be everywhere",
        detail: "There are only 4 ways to get customers. Warm (your network), Cold (reaching strangers), Content (attracting inbound), Paid (buying attention). Most founders spread across all 4 and get mediocre results from each. Pick ONE as your primary. Spend 4 focused hours/day on it. Add a second channel only after the first is working.",
        sleeve: "Phase 1: Warm outreach is primary (Cofounder, 4 hrs/day). Phase 2: Add cold outreach. Phase 3: Add content engine. Phase 4: Add paid. Never all at once. The cofounder's ENTIRE job in Phase 1 is warm outreach + content. Mike's entire job is product.",
        action: "Which of the Core Four is your PRIMARY channel this week? Block 4 hours/day for it. Everything else is secondary."
    },
    {
        n: 20, name: "MORE > Better > New", cat: "growth",
        rule: "Triple volume of what's working before optimizing it. Optimize before trying something new.",
        source: "Hormozi * $100M Leads",
        when: "Tempted to try a new channel, tool, or tactic before maxing the current one",
        detail: "If warm outreach is getting 20% response rate from 10 messages/day, don't switch to cold email. Send 30 messages/day first. If that scales, try 50. Only optimize (better targeting, better script) after you've tripled volume. Only try something new after you've optimized. Most founders do the opposite: try 10 channels, give each 20% effort, get 0% results.",
        sleeve: "If warm outreach is working: don't set up Phantombuster. Send more warm messages first. If you're sending 10/day with 20% response, you haven't maxed the channel -- go to 20/day. Only add cold outreach after warm is producing consistent daily scans.",
        action: "What's your highest-performing channel RIGHT NOW? Can you 3x the volume before adding anything new?"
    },
    {
        n: 21, name: "70/20/10 Creative Allocation", cat: "growth",
        rule: "70% copy proven winners. 20% make variations. 10% try wild experiments.",
        source: "Hormozi * $100M Leads",
        when: "Content creation, ad creative, email subjects, hook testing",
        detail: "Most of your creative output should be near-copies of what already works. Your best tweet? Post a version of it again next week. Your best email subject? Use the same structure. Only 20% should be variations (same structure, different angle). Only 10% should be genuinely new. This feels boring. It converts.",
        sleeve: "If 'Your AI scores you 2.8/10' is your best hook: 70% = 'Your AI scores you [X]/10' variations. 20% = 'How well does AI know you? Take the test.' 10% = Something completely different. Don't get creative until you've exhausted what works.",
        action: "Identify your top 3 performing content pieces. Create 7 near-copies this week."
    },
    {
        n: 22, name: "Self-Reinforcing Loop", cat: "growth",
        rule: "User -> Results -> Tells someone -> New user -> Results -> Tells someone. Build the loop, not the funnel.",
        source: "Hormozi / Viral coefficient theory",
        when: "Product design decisions, building viral mechanics, referral systems",
        detail: "A funnel is linear: get customer, get next customer. A loop is exponential: each customer brings the next. The trigger for sharing must be BUILT INTO the product experience, not bolted on. The share moment is when the user feels the strongest positive emotion -- that's where you add the share mechanic.",
        sleeve: "The share moment: user sees their first Sleeved AI output and thinks 'holy shit, that's actually personalized.' THAT is when you show: 'Share your Sleeve Score' with a pre-formatted card. The card itself is the hook for the next user -- it shows a score and invites them to take the scan.",
        action: "Identify the exact moment in the user journey where emotion peaks. Add a one-click share mechanic at that exact point."
    },
    {
        n: 23, name: "Content as Lubricant", cat: "growth",
        rule: "Content doesn't replace other channels -- it makes all of them work better.",
        source: "Hormozi * $100M Leads",
        when: "Content feels 'useless' because you can't tie it to direct conversions",
        detail: "Content warms up cold outreach (they've seen your name before). Content makes ads convert higher (social proof). Content makes warm outreach easier ('hey, saw your post about X'). Content is not a standalone acquisition channel for most startups -- it's the lubricant that makes every other channel work 2x better.",
        sleeve: "When a cold lead gets your email and checks your Twitter and sees 30 posts about AI personalization with 50+ likes each -- they click the scan. Without the content, the same email gets ignored. Content is not the engine. Content is the oil in the engine.",
        action: "Don't measure content by direct conversions. Measure: does it increase cold outreach response rate? Does it increase scan completion rate? Does it reduce time-to-Pro?"
    },
    {
        n: 26, name: "High-Information Buyers", cat: "growth",
        rule: "Most buyers need education before they'll buy. Free content converts the 'not yet ready' into 'ready.'",
        source: "Hormozi / Content marketing theory",
        when: "Direct response ads plateau, organic pipeline feels slow",
        detail: "Only 3% of any market is ready to buy right now. Another 7% is open to it. The other 90% needs education. Free content (YouTube, newsletter, blog) moves people from 'I don't know I have this problem' to 'I need to solve this now.' This is why content companies have lower CAC long-term -- they're converting the 90%, not fighting over the 3%.",
        sleeve: "Most AI users don't know their output is generic. They need to LEARN that AI personalization exists and matters. Content that shows the gap (before/after comparisons, score reveals) creates the problem awareness that makes the scan compelling. Without this education, you're selling to the 3% who already know.",
        action: "Create 3 educational content pieces that teach people they have a problem they didn't know they had."
    },
    {
        n: 27, name: "Proof-First Launch", cat: "growth",
        rule: "Beta -> Free -> Testimonials -> Iterate -> THEN charge -> THEN advertise. This order. Always.",
        source: "Hormozi * $100M Leads",
        when: "Launch sequencing, deciding when to monetize, when to start paid",
        detail: "Charging too early kills word-of-mouth. Advertising too early amplifies a broken product. The sequence: give it away to 50 people, collect proof that it works, iterate on feedback, THEN turn on pricing, THEN (with proof + working funnel) turn on paid. Each step funds the next.",
        sleeve: "Phase 1: Free scans to warm network. Collect 20+ proof assets. Phase 2: Keep it free but add Pro tier. Iterate on conversion. Phase 3: Once scan-to-Pro is > 5% with 200+ data points, THEN start paid. Paying to acquire users into a broken funnel = lighting money on fire.",
        action: "Do NOT start paid acquisition until you have: (a) 20+ proof assets, (b) scan-to-Pro > 5% after 200+ scans, (c) positive unit economics."
    },
    {
        n: 28, name: "Negative WOM (37x)", cat: "growth",
        rule: "It takes 37 positive experiences to recover from 1 negative. Keep early failures free.",
        source: "Hormozi * $100M Offers",
        when: "Deciding when to start charging, handling bugs and broken experiences",
        detail: "A free user who has a bad experience tells 1aa2 people. A paying user who has a bad experience tells 10+ and leaves a review. Early-stage products WILL have bad experiences. Keep them free so the cost of failure is low. Only charge when the experience is consistently good.",
        sleeve: "If the scan breaks, the extension fails, or the profile doesn't inject properly -- that's fine if they're not paying. They'll give you feedback. If they paid $12 and it breaks, they'll tell everyone it's broken. Free tier = safety net for early-stage bugs.",
        action: "List the top 3 things that could go wrong in the user experience. Are all 3 resolved? If not, keep it free until they are."
    },

    // ========================================
    // KENT SUMMERS -- MIT/Harvard B2B Sales Frameworks
    // ========================================

    {
        n: 29, name: "Revenue & Everything Else", cat: "growth",
        rule: "There's only two things: revenue and everything else. If you can't get revenue flowing, everything else doesn't matter.",
        source: "Kent Summers MIT/Harvard B2B Sales",
        when: "Prioritizing founder time, deciding what to work on, feeling overwhelmed",
        detail: "Once cash is in the door, everything else becomes manageable. But if you're unable to figure out how to acquire customers cost-effectively, game over. Revenue unlocks everything.",
        sleeve: "Before building more features, before hiring, before optimizing a close the first 3 pilots. $7,500 in revenue changes everything about how problems feel.",
        action: "Ask: 'What is the ONE thing I could do today that moves me closer to the next dollar of revenue?' Do that first."
    },
    {
        n: 30, name: "SW/N Attitude", cat: "growth",
        rule: "Some Will, Some Won't, So What, Next. Sales is 90%+ failure a this is your attitude for a failure-driven profession.",
        source: "Kent Summers MIT/Harvard B2B Sales",
        when: "After rejection, when pipeline feels stuck, maintaining morale",
        detail: "If you only fail 10% in sales, you'll be extremely successful and the exception. Reality is closer to 97-98% failure. It's not about failure avoidance a it's about failure recovery. Unlike baseball, you can lose 90% and still keep your job.",
        sleeve: "10 discovery calls -> 3 teardowns -> 1 pilot. That's 70% rejection on calls, 67% rejection on teardowns. Normal. Next.",
        action: "Put 'SW/N' somewhere visible. After every rejection, say it out loud and move to the next prospect within 5 minutes."
    },
    {
        n: 31, name: "3-Ring Customer Profile", cat: "funnel",
        rule: "Company Profile -> Buyer Profile -> DMU. Three nested rings that focus all sales activity.",
        source: "Kent Summers MIT/Harvard B2B Sales",
        when: "Defining ICP, building prospect lists, qualifying leads",
        detail: "Outer ring: Company Profile (industry, type, size, geography a specific enough to get addresses). Middle ring: Buyer Profile (job title, responsibilities, unmet needs as use case). Center: Decision Making Unit (who decides, influences, writes checks). Not from your business plan a learned after 100+ conversations.",
        sleeve: "Company: B2B SaaS, Series A-B, 20-100 employees, US. Buyer: Technical founder/CEO responsible for pipeline, frustrated with marketing ROI. DMU: Founder (decision), Head of Sales (influence), Finance (check).",
        action: "Write your 3-ring profile. Acid test: can you get a list of company addresses from it? If not, tighten criteria."
    },
    {
        n: 32, name: "Facts Not Opinions", cat: "funnel",
        rule: "Don't ask 'would you do X?' a ask 'do you do X?' Gather facts about behavior, not opinions about hypotheticals.",
        source: "Kent Summers MIT/Harvard B2B Sales",
        when: "Customer discovery, qualification calls, validating problem",
        detail: "People love sharing opinions and theory, but that's not helpful. Facts against what you're selling into. Facts related to pain and cost, not theoretical gains. Facts related to a single use case right now.",
        sleeve: "Wrong: 'Would you pay for AI-generated content?' Right: 'How many hours did you spend on content last month? What did that cost you? How many leads did it generate?'",
        action: "Rewrite your discovery questions. Replace every 'would you' with 'do you' or 'did you' or 'how many times have you.'"
    },
    {
        n: 33, name: "MQL vs SQL Reality", cat: "funnel",
        rule: "MQLs want to know what cookies you have. SQLs have a budget and are deciding between thin mints and oreos.",
        source: "Kent Summers MIT/Harvard B2B Sales",
        when: "Qualifying leads, deciding where to spend time, handoff criteria",
        detail: "MQL = meets company profile criteria. SQL = you've verified buyer profile exists AND they have genuine interest AND the problem is a priority. The difference is enormous. Don't treat MQLs like SQLs.",
        sleeve: "MQL: Founder at Series A SaaS downloaded your teardown template. SQL: Same founder, on a call, said 'we need to fix pipeline this quarter, what would working with you look like?'",
        action: "Define your SQL criteria in one sentence. Only count SQLs in your forecast, not MQLs."
    },
    {
        n: 34, name: "4 Pillars Sequence", cat: "copy",
        rule: "Empathy -> Trust -> Value (their terms) -> Competence. Most salespeople go backwards and fail.",
        source: "Kent Summers MIT/Harvard B2B Sales",
        when: "Discovery calls, proposals, any buyer conversation",
        detail: "Start by convincing them you truly understand their pain (empathy). Then show you have their best interest in mind, even if it means pointing them elsewhere (trust). Then express value in THEIR terms, not your value prop (value). Only then talk about your product and capabilities (competence). Jumping to competence first is viewed as dismissive.",
        sleeve: "Call structure: 10 min understanding their GTM pain -> 'If we can't help, I'll tell you and point you elsewhere' -> 'So you need X pipeline by Y date, here's what that would take' -> 'Here's how we'd do it.'",
        action: "Record your next discovery call. Timestamp when you discuss: their pain, their best interest, value in their terms, your capabilities. Are they in order?"
    },
    {
        n: 35, name: "Perishable Food Timing", cat: "funnel",
        rule: "Table (2-3 touches/week), Fridge (1-2/month), Freezer (every 3-6 months). Treat opportunities like perishable food.",
        source: "Kent Summers MIT/Harvard B2B Sales",
        when: "Managing pipeline, prioritizing outreach, deciding touch frequency",
        detail: "Table = deciding in days/weeks, meal will be eaten by someone. Fridge = deciding in months, check regularly. Freezer = not actively deciding, stay warm for next year's budget. All are qualified opportunities a difference is timing and frequency.",
        sleeve: "Table: 'We need this fixed by end of quarter' a 2-3 touches/week. Fridge: 'Probably Q3 initiative' a monthly check-in. Freezer: 'Maybe next year' a quarterly nurture.",
        action: "Label every opportunity in your pipeline: Table, Fridge, or Freezer. Adjust your touch frequency accordingly."
    },
    {
        n: 36, name: "Balanced Pipeline 50/50", cat: "funnel",
        rule: "50% time on top deals, 50% distributed across pipeline stages. Unbalanced = Groundhog Day revenue.",
        source: "Kent Summers MIT/Harvard B2B Sales",
        when: "Weekly planning, avoiding revenue rollercoaster, sustainable growth",
        detail: "Top-opportunity-focused (90-100% on likely closes) = Groundhog Day. You close, then realize you've ignored everything else, start over. Balanced activity = smaller peaks but sustainable growth. What you give up in first 6 months of peaks, you gain in consistent performance.",
        sleeve: "Monday-Tuesday: Active opportunities (teardowns in progress, pilots to close). Wednesday-Thursday: New outreach, discovery calls, nurturing. Friday: Content, proof collection, pipeline review.",
        action: "Block your calendar: 50% for active deals, 50% for pipeline development. Protect both blocks equally."
    },
    {
        n: 37, name: "Facilitator Not Pusher", cat: "copy",
        rule: "Master helping prospects sell themselves or opt out. You're a facilitator, not a closer.",
        source: "Kent Summers MIT/Harvard B2B Sales",
        when: "Sales conversations, handling objections, qualification",
        detail: "Pusher = drives aggressively to yes/no, very efficient, terrible performance. Hoper = bloated pipeline, afraid to disqualify. Mechanic = comfortable moving on when signals absent. Facilitator = asks right questions, people sell themselves or opt out. Different sales animal entirely.",
        sleeve: "Instead of 'Here's why you should buy' -- 'Based on what you've told me, does this seem like a priority for this quarter, or is the timing off?'",
        action: "End your next 3 calls with: 'Based on everything we discussed, what do you think makes sense as a next step, if any?' See what happens."
    },
    {
        n: 38, name: "Evangelism -> Sales", cat: "funnel",
        rule: "Don't invest time educating the ill-informed or convincing skeptics. Convert knowledgeable people into customers.",
        source: "Kent Summers MIT/Harvard B2B Sales",
        when: "Qualifying prospects, deciding who gets your time, avoiding tire-kickers",
        detail: "If you're explaining basics of what you do -- not qualified. If business case isn't obvious from their workflow -- not qualified. If scale of problem doesn't support your price -- not qualified. If it's not a priority -- not qualified. Don't attempt to change people's priorities. Move up or move on.",
        sleeve: "If they don't already believe AI can help with GTM, you're evangelizing. Find founders who already tried agencies, freelancers, or doing it themselves and failed. They're educated by pain.",
        action: "List your last 5 prospects who went nowhere. How many were you trying to educate vs. convert? Tighten qualification."
    },
    {
        n: 39, name: "First Salesperson Rule", cat: "growth",
        rule: "Hire your first salesperson when you can say 'get me 100 more like these 12' a not 'figure out who our customer is.'",
        source: "Kent Summers MIT/Harvard B2B Sales",
        when: "Deciding when to hire sales, scaling GTM, founder time allocation",
        detail: "If you want your company to fail, hire a professional salesperson to solve the sales dilemma. This is usually an accelerant to failure. Founders must understand firsthand all blocking issues. Only hire when you have a repeatable profile and can hand over a playbook, not a puzzle.",
        sleeve: "Don't hire until: 5+ pilots from similar companies, clear 3-ring profile, documented sales process, known conversion metrics. Then hire to replicate, not discover.",
        action: "Count how many customers fit identical profile. If <10, you're not ready to hire sales. Keep selling yourself."
    },
    {
        n: 40, name: "30-Second Website Rule", cat: "copy",
        rule: "Diminishing returns on attention occur at 30 seconds. Get clear or get ignored.",
        source: "Kent Summers MIT/Harvard B2B Sales",
        when: "Website copy, landing pages, pitch decks, any first impression",
        detail: "You have 30 seconds to make it really clear what you sell and how it fits into their world. Don't over-engineer with more information a you'll never talk to them. Show the person visiting that they're exactly who you serve. Show how it benefits them within 10 seconds. Make them come back to you for detail.",
        sleeve: "Homepage: 'We run GTM for B2B SaaS founders. You review. You approve. You close.' Visitor knows in 5 seconds: who it's for, what they do, what's required of them.",
        action: "Show your website to 3 strangers. Ask: 'What do we sell? Who is it for?' If they can't answer in 10 seconds, rewrite."
    },
    {
        n: 41, name: "We Not I", cat: "copy",
        rule: "Always say 'we' instead of 'I' a appear bigger and more professional than you are.",
        source: "Kent Summers MIT/Harvard B2B Sales",
        when: "All external communication, especially when small",
        detail: "Very subtle but powerful. You want people to perceive they're working with a company, not an individual. 'We' creates that perception. This is especially important when you're small a appear bigger and more professional than you actually are.",
        sleeve: "Wrong: 'I'll send you the proposal.' Right: 'We'll send you the proposal.' Wrong: 'I think we can help.' Right: 'We've helped companies like yours with exactly this.'",
        action: "Search your last 10 emails for 'I' statements. Replace with 'we' where possible."
    },

    // ========================================
    // HORMOZI -- Landing Pages & Growth (via CRO breakdown + growth levers)
    // ========================================

    {
        n: 42, name: "Above The Fold 60/99", cat: "funnel",
        rule: "60% of visitors never scroll past the fold. Spend 99% of your optimization effort there first.",
        source: "Hormozi CRO Breakdown",
        when: "Building or optimizing any landing page, diagnosing low conversion",
        detail: "The above-the-fold section is the only part 100% of visitors will see. 60% won't scroll past it. Most founders obsess over bottom-of-page elements when the real leverage is the first screen. Two forms of social proof, one clear headline, one sub-headline, one CTA, one image/video. Cut everything else.",
        sleeve: "Landing page audit: Is the dream outcome clear in the headline? Is there proof visible without scrolling? Is there exactly ONE action to take? If any answer is no, fix that before touching anything below the fold.",
        action: "Screenshot your landing page on mobile. If someone sees ONLY that screenshot, do they know: what you do, who it's for, and what to do next? If not, rewrite."
    },
    {
        n: 43, name: "Visualize The Proof", cat: "copy",
        rule: "Someone saying 'I lost 20 lbs' < picture of them losing 20 lbs < video of them weighing in and out.",
        source: "Hormozi CRO Breakdown",
        when: "Building testimonial sections, case studies, landing page proof elements",
        detail: "Written testimonials create rational belief. Visual proof creates emotional resonance. Video of transformation creates visceral conviction. Each step up the visualization ladder compounds believability. Show the before/after, don't just quote it.",
        sleeve: "Before: 'Helped us 3x pipeline.' After: Screenshot of their CRM showing pipeline growth + video of founder explaining what changed. Before: Client quote. After: Loom of client walking through their dashboard.",
        action: "Audit your current proof. For each testimonial, ask: can I add a screenshot? A before/after image? A video? Upgrade at least 3 testimonials this week."
    },
    {
        n: 44, name: "High-Info Buyer Continuum", cat: "funnel",
        rule: "Not 'emotional vs logical' buyers a it's information REQUIRED information RECEIVED. The high-info pool is 10x larger.",
        source: "Hormozi Growth Levers",
        when: "Scaling beyond early adopters, deciding brand vs direct response allocation, content strategy",
        detail: "Low-info buyers (buy immediately) are a tiny pool that everyone fights over. High-info buyers require education before purchase but are 10x the market size. Direct response only captures the small pool. Brand/content/education moves people down the continuum until they're ready. This is why 70% brand / 30% direct response outperforms the inverse long-term.",
        sleeve: "Your teardown buyers right now = low-info (they already know they have a GTM problem). To scale: create content that teaches founders they HAVE a problem they didn't know about. Move them from unaware a problem-aware a solution-aware a ready to buy.",
        action: "Categorize your last 10 leads: did they already know they had the problem, or did you educate them? If 90%+ already knew, you're only fishing in the small pool. Create 3 problem-awareness content pieces."
    },
    {
        n: 45, name: "Best In A Puddle", cat: "growth",
        rule: "More important to BE the best than WHAT you're the best at. Narrow until you can truthfully claim #1.",
        source: "Hormozi Growth Levers",
        when: "Positioning, differentiation, feeling like a commodity",
        detail: "You don't need to be the best in the world. You need to be the best in a puddle. Rockefeller overpaid to buy the #1 refinery specifically to claim 'biggest' a then used that story to strong-arm 20 acquisitions in 30 days. The premium for being #1 in anything is massive. Slice your market until you can claim it.",
        sleeve: "Not: 'AI-powered GTM agency' (commodity). Yes: 'The only AI GTM partner exclusively for B2B SaaS founders doing $1-5M ARR who've already tried and failed with traditional agencies.' Narrow until no one else can claim your exact puddle.",
        action: "Complete this sentence with the narrowest true claim: 'We are the only ___ that ___.' If competitors can also claim it, narrow further."
    },
    {
        n: 46, name: "Masters Have More Metrics", cat: "growth",
        rule: "Beginners see binary outcomes (sold/didn't sell). Masters have 10+ leading indicators between start and finish.",
        source: "Hormozi Growth Levers",
        when: "Debugging a funnel, feeling stuck, can't figure out why something isn't working",
        detail: "Heart surgery looks like murder to someone who doesn't understand the milestones. When Hormozi's team wanted to kill outbound after 4 months and 1 sale, he saw 15 intermediate wins they didn't: list quality improved, enrichment working, calls connecting, hooks landing, second calls booking. Masters identify the micro-steps so they can fix the actual bottleneck.",
        sleeve: "Your pipeline: Impression -> Click -> Landing -> Scroll -> CTA click -> Form start -> Form complete -> Call book -> Call show -> Teardown pitch -> Teardown close -> Pilot pitch -> Pilot close. Which step has the biggest drop? That's your bottleneck.",
        action: "Map every step between 'stranger' and 'paying customer.' Add a conversion rate to each step. Find the biggest drop-off. That's your only focus this week."
    },
    {
        n: 47, name: "Landing Page Razor", cat: "funnel",
        rule: "If it doesn't increase opt-in % of qualified leads, cut it.",
        source: "Hormozi Landing Page Breakdown",
        when: "Editing any landing page, deciding what to include/exclude",
        detail: "Single decision filter for every element on the page. Not 'does this look good?' Not 'do competitors have this?' Not 'does this explain more?' Only one question: does this specific element increase the percentage of qualified people who take action? If you can't prove yes, delete it. Longer pages typically convert worse.",
        sleeve: "Audit every element: Logo? Keep (trust). Navigation menu? Cut (distraction). 'About us' section? Cut unless it's proof. Third testimonial carousel? Cut (no one clicks). Animated background? Cut (slows load time). Apply the razor ruthlessly.",
        action: "List every element on your landing page. For each, write 'KEEP' or 'CUT' based solely on: does this increase qualified opt-ins? Remove all CUTs today."
    },
];
