import { PROMPT_CONTEXT } from './context.js';
import { DEFAULT_CONTEXT } from './context.js';

// Mutable CONTEXT - workflows reference this at definition time
let CONTEXT = DEFAULT_CONTEXT;

// Update context (called when user edits in Context tab)
export function updateWorkflowContext(newContext) {
    CONTEXT = newContext;
}

// ========================================
// WORKFLOWS -- Step-by-step execution with framework references
// Each step has: framework, context, templates, and LLM prompt
// Click any task with a workflow to see instructions
// ========================================

export const WORKFLOWS = {
    // ========================================
    // LANDING PAGE WORKFLOW
    // ========================================
    landing: {
        title: "Create Landing Page",
        time: "2-3 hours",
        output: "Live page at sleeve.cloud",
        steps: [
            {
                id: 1,
                name: "Headline",
                framework: "Hook = Proof + Promise + Plan (need 2 of 3)",
                context: `Your ICP: ${CONTEXT.icp.persona}
Their pain: ${CONTEXT.icp.pain}
Your offer: ${CONTEXT.offer.core}`,
                templates: [
                    "See exactly which GTM activities drive revenue.",
                    "Your marketing finally tied to pipeline.",
                    "Stop guessing. Start attributing.",
                    "We run your GTM AND prove the ROI.",
                    "Pipeline you can trace. Not vanity metrics.",
                    "The GTM system that shows what is working.",
                ],
                prompt: `${PROMPT_CONTEXT}\n\nWrite 10 headlines for a B2B landing page.

Product: ${CONTEXT.name} -- ${CONTEXT.tagline}
ICP: ${CONTEXT.icp.persona}
Pain: ${CONTEXT.icp.pain}
Offer: ${CONTEXT.offer.core}

Rules:
- Each headline needs 2 of 3: Proof, Promise, Plan
- 5th grade reading level
- Under 12 words
- 7 variations of the best concept, 2 pivots, 1 wild card

BEFORE DELIVERING: Run an internal expert panel review.
PANEL:
- ICP Expert: Does this speak to the specific buyer and pain described above -- not generic B2B advice anyone could use?
- Copy Expert: Cut any sentence you could delete without losing meaning. Flag any phrase that could appear in a competitor's marketing unchanged.
- Differentiation Expert: Would this make sense coming from a fractional CMO or agency? If yes, it is not differentiated enough.
- Conversion Expert: After reading this, would the buyer do something (click, reply, book) or just think "interesting"? If the latter, it fails.
PROCESS:
1. Each expert scores 1-10 with one-line justification
2. Any score below 9: revise that dimension, re-score
3. Repeat until all 9+ or 3 rounds -- if stuck below 8 after 3 rounds, flag what is structurally wrong
4. Deliver final output with: "Panel: ICP X | Copy X | Diff X | Conv X"
`,
            },
            {
                id: 2,
                name: "Subheadline",
                framework: "Value = (Dream Outcome Likelihood) / (Time Effort)",
                context: `Dream outcome: Pipeline without hiring
Likelihood signal: AI + proven frameworks
Time to value: Weekly delivery
Effort required: 30 min/week to review`,
                templates: [
                    "Content, outreach, and competitive intel -- delivered weekly with full pipeline attribution. You spend 30 minutes reviewing.",
                    "We run email, content, and outbound. You see exactly what generated pipeline. Not impressions. Revenue.",
                    "Less than a fractional CMO. More than an agency. With attribution they will never give you.",
                ],
                prompt: `${PROMPT_CONTEXT}\n\nWrite 5 subheadlines for this landing page.

Headline: [INSERT CHOSEN HEADLINE]
Product: ${CONTEXT.name}

The subheadline should:
- Explain what they get (deliverables)
- Signal low effort (30 min/week)
- Feel concrete, not vague

Keep under 20 words.

BEFORE DELIVERING: Run an internal expert panel review.
PANEL:
- ICP Expert: Does this speak to the specific buyer and pain described above -- not generic B2B advice anyone could use?
- Copy Expert: Cut any sentence you could delete without losing meaning. Flag any phrase that could appear in a competitor's marketing unchanged.
- Differentiation Expert: Would this make sense coming from a fractional CMO or agency? If yes, it is not differentiated enough.
- Conversion Expert: After reading this, would the buyer do something (click, reply, book) or just think "interesting"? If the latter, it fails.
PROCESS:
1. Each expert scores 1-10 with one-line justification
2. Any score below 9: revise that dimension, re-score
3. Repeat until all 9+ or 3 rounds -- if stuck below 8 after 3 rounds, flag what is structurally wrong
4. Deliver final output with: "Panel: ICP X | Copy X | Diff X | Conv X"
`,
            },
            {
                id: 3,
                name: "Hero CTA",
                framework: "Single clear action. Match awareness level.",
                context: `Awareness level: Problem-aware (they know GTM is broken)
Goal: Get them on a call
Secondary: Waitlist if not ready`,
                templates: [
                    "Book a call",
                    "See how it works a",
                    "Get your GTM teardown a",
                    "Join the waitlist a",
                ],
                prompt: null, // Simple enough to pick from templates
            },
            {
                id: 4,
                name: "Problem Section",
                framework: "Name the pain. Be specific. Use their words.",
                context: `ICP pain points:
- ${CONTEXT.icp.pain}
- ${CONTEXT.icp.trigger}
- Tried email outreach tools -- got opens, not pipeline
- Tried social management -- got followers, not revenue
- Tried an agency -- got a report, not attribution`,
                templates: [
                    `You are doing marketing.\nBut can you tell what is working?\n\nYou tried email outreach. Got open rates. No idea if it drove a single deal.\nYou tried content. Got some traffic. Cannot connect it to pipeline.\nYou tried an agency. Got a nice report. Zero revenue attribution.\n\nMeanwhile, your board asks: "What is our CAC? What channel is working?"\n\nYou cannot answer. That is the problem.`,
                ],
                prompt: `${PROMPT_CONTEXT}\n\nWrite a "problem" section for this landing page.

ICP: ${CONTEXT.icp.persona}
Their situation: ${CONTEXT.icp.pain}
Trigger: ${CONTEXT.icp.trigger}

Rules:
- 3-5 short paragraphs
- Use "you" language
- Be specific about their failed attempts
- End on the tension (investors asking)
- No jargon

BEFORE DELIVERING: Run an internal expert panel review.
PANEL:
- ICP Expert: Does this speak to the specific buyer and pain described above -- not generic B2B advice anyone could use?
- Copy Expert: Cut any sentence you could delete without losing meaning. Flag any phrase that could appear in a competitor's marketing unchanged.
- Differentiation Expert: Would this make sense coming from a fractional CMO or agency? If yes, it is not differentiated enough.
- Conversion Expert: After reading this, would the buyer do something (click, reply, book) or just think "interesting"? If the latter, it fails.
PROCESS:
1. Each expert scores 1-10 with one-line justification
2. Any score below 9: revise that dimension, re-score
3. Repeat until all 9+ or 3 rounds -- if stuck below 8 after 3 rounds, flag what is structurally wrong
4. Deliver final output with: "Panel: ICP X | Copy X | Diff X | Conv X"
`,
            },
            {
                id: 5,
                name: "Solution Section",
                framework: "Mechanism + Deliverables + Proof",
                context: `Mechanism: ${CONTEXT.offer.mechanism}
Deliverables:
- Competitive intel -- weekly
- Content -- 8 pieces/month
- Outreach -- 200 contacts/month
- You review in dashboard -- 30 min/week`,
                templates: [
                    `Sleeve Cloud runs your entire GTM.\n\nEvery week, you open your dashboard:\na This week's competitive intel\na 2 LinkedIn posts ready to publish\na 50 personalized outreach messages\n\nYour job: review and approve. Takes 30 minutes.\n\nOur job: make sure it sounds like you and actually works.`,
                ],
                prompt: `${PROMPT_CONTEXT}\n\nWrite a "solution" section for this landing page.

Product: ${CONTEXT.name}
How it works: ${CONTEXT.offer.mechanism}

Deliverables they get:
- Competitive intel (weekly report)
- Content (8 pieces/month)
- Outreach (200 personalized contacts/month)

Their effort: 30 min/week reviewing in dashboard

Rules:
- Show the weekly experience
- Make the deliverables tangible
- Emphasize low effort on their part
- Sound confident, not salesy

BEFORE DELIVERING: Run an internal expert panel review.
PANEL:
- ICP Expert: Does this speak to the specific buyer and pain described above -- not generic B2B advice anyone could use?
- Copy Expert: Cut any sentence you could delete without losing meaning. Flag any phrase that could appear in a competitor's marketing unchanged.
- Differentiation Expert: Would this make sense coming from a fractional CMO or agency? If yes, it is not differentiated enough.
- Conversion Expert: After reading this, would the buyer do something (click, reply, book) or just think "interesting"? If the latter, it fails.
PROCESS:
1. Each expert scores 1-10 with one-line justification
2. Any score below 9: revise that dimension, re-score
3. Repeat until all 9+ or 3 rounds -- if stuck below 8 after 3 rounds, flag what is structurally wrong
4. Deliver final output with: "Panel: ICP X | Copy X | Diff X | Conv X"
`,
            },
            {
                id: 6,
                name: "How It Works",
                framework: "3 steps maximum. Icon + Title + Description.",
                context: `The process:
1. You fill out a context form (your "Company Sleeve") -- 30 min
2. We run AI agents weekly against your context
3. You review and approve in dashboard -- 30 min/week`,
                templates: [
                    "1. Share your context -- Fill out your Company Sleeve (30 min, once)\n2. We run your GTM -- AI agents create intel, content, outreach weekly\n3. You approve -- Review in your dashboard, 30 min/week",
                ],
                prompt: null, // Template is sufficient
            },
            {
                id: 7,
                name: "Pricing Section",
                framework: "Anchor high, show value, make it obvious.",
                context: `Tiers:
- Pilot: $2,500/mo (first 3 clients only)
- Builder: $3,500/mo
- Growth: $6,000/mo

Compare to:
- Marketing hire: $8-15K/mo + management time
- Agency: $10-20K/mo + slow + generic
- Freelancers: $5-10K/mo + you manage 5 people`,
                templates: [
                    `Simple pricing:\n\n**Pilot** -- $2,500/mo\nFor the first 3 companies. Full service, case study rights.\n\n**Builder** -- $3,500/mo\n8 content pieces + 200 outreach + weekly intel\n\n**Growth** -- $6,000/mo\n16 content + 400 outreach + bi-weekly strategy calls`,
                ],
                prompt: `${PROMPT_CONTEXT}\n\nWrite the pricing section for this landing page.

Tiers:
- Pilot: $2,500/mo (first 3 only, case study rights)
- Builder: $3,500/mo (8 content, 200 outreach, weekly intel)
- Growth: $6,000/mo (16 content, 400 outreach, strategy calls)

Positioning:
vs. Marketing hire ($8-15K + management)
vs. Agency ($10-20K + slow)
vs. Freelancers ($5-10K + you manage them)

Rules:
- Lead with pilot (scarcity)
- Show what's included in each
- Don't over-explain
- One line on the alternative cost

BEFORE DELIVERING: Run an internal expert panel review.
PANEL:
- ICP Expert: Does this speak to the specific buyer and pain described above -- not generic B2B advice anyone could use?
- Copy Expert: Cut any sentence you could delete without losing meaning. Flag any phrase that could appear in a competitor's marketing unchanged.
- Differentiation Expert: Would this make sense coming from a fractional CMO or agency? If yes, it is not differentiated enough.
- Conversion Expert: After reading this, would the buyer do something (click, reply, book) or just think "interesting"? If the latter, it fails.
PROCESS:
1. Each expert scores 1-10 with one-line justification
2. Any score below 9: revise that dimension, re-score
3. Repeat until all 9+ or 3 rounds -- if stuck below 8 after 3 rounds, flag what is structurally wrong
4. Deliver final output with: "Panel: ICP X | Copy X | Diff X | Conv X"
`,
            },
            {
                id: 8,
                name: "FAQ Section",
                framework: "Answer objections. 3-5 questions max.",
                context: `Common objections:
-- "Will it sound like me?" -- Yes, we learn your voice from context
-- "What if I don't like the output?" -- Revisions included
a "How is this different from an agency?" -- Faster, cheaper, AI-powered
-- "What's the commitment?" -- Pilot is month-to-month
-- "How fast do I see results?" -- First delivery in 7 days`,
                templates: [
                    "Q: Will the content sound like me?\nA: Yes. We build a detailed context profile ('Company Sleeve') that captures your voice, positioning, and preferences.\n\nQ: What if I don't like something?\nA: Two rounds of revisions included on every piece. We iterate until it's right.\n\nQ: How is this different from an agency?\nA: Faster (AI runs 24/7), cheaper (no account managers), and personalized (trained on your context, not templates).\n\nQ: What's the commitment?\nA: Pilot is month-to-month. Standard tiers are 3-month minimum.",
                ],
                prompt: null, // Template is sufficient
            },
            {
                id: 9,
                name: "Final CTA",
                framework: "Repeat the value prop. Single action. Reduce risk.",
                context: `Value prop: GTM that runs itself
Risk reducers: 
- Pilot is month-to-month
- First delivery in 7 days
- You approve everything`,
                templates: [
                    `Ready to stop doing marketing?\n\n[Book a call ->]\n\nFirst delivery in 7 days. Cancel anytime.`,
                    `Your GTM engine is ready.\n\n[Book a call ->]\n\n$2,500/mo First 3 spots Case study pricing`,
                ],
                prompt: null,
            },
            {
                id: 10,
                name: "Expert Review",
                framework: "10x Expert Panel Review -> Iterate until 90+",
                context: `Review dimensions:
- Design: visual hierarchy, whitespace, trust signals
- Copywriting: headlines, clarity, persuasion
- Psychology: objection handling, risk reversal, urgency
- CRO: friction points, CTA placement, social proof
- UX: flow, mobile, load time

Expert archetypes:
- David Ogilvy (direct response)
- Joanna Wiebe (conversion copy)
- Peep Laja (CRO)
- Aarron Walter (emotional design)
- Cialdini (persuasion psychology)
- Steve Krug (usability)
- Claude Hopkins (scientific advertising)
- Eugene Schwartz (awareness levels)
- Gary Halbert (sales letters)
- Drayton Bird (direct marketing)`,
                templates: [
                    "Expert review areas: Hook strength, value clarity, risk reversal, CTA prominence, trust signals, mobile experience, load time, objection handling, social proof placement",
                ],
                prompt: `You are reviewing a B2B landing page for ${CONTEXT.name}.

Product: ${CONTEXT.name} -- ${CONTEXT.tagline}
ICP: ${CONTEXT.icp.persona}
Offer: ${CONTEXT.offer.core}

TASK:
Before you return a final version to me, have 10 of the world's greatest advertorial experts on subjects like design, copywriting, psychology and CRO review the page, provide detailed feedback and rank it on a scale from 0-100.

THE 10 EXPERTS:
1. David Ogilvy -- Direct response advertising legend
2. Joanna Wiebe -- Conversion copywriting (Copyhackers)
3. Peep Laja -- CRO and experimentation (CXL)
4. Aarron Walter -- Emotional design (Mailchimp)
5. Robert Cialdini -- Persuasion psychology (Influence)
6. Steve Krug -- Usability ("Don't Make Me Think")
7. Claude Hopkins -- Scientific advertising pioneer
8. Eugene Schwartz -- Market awareness levels
9. Gary Halbert -- Sales letters and hooks
10. Drayton Bird -- Direct marketing strategy

FOR EACH EXPERT:
- Review from their specific expertise lens
- Provide 3-5 specific pieces of feedback
- Give a ranking from 0-100
- Include specific areas for improvement that reflect their ranking

SCORING:
- Calculate the average of all 10 expert scores
- If the average is NOT over 90/100, go back and improve the page using the experts' specific recommendations
- Iterate and re-review until the average score exceeds 90/100
- Show each iteration's scores

OUTPUT FORMAT:
## Round 1 Review

### [Expert Name] -- Score: XX/100
**Expertise lens:** [their specialty]
**Feedback:**
1. [Specific observation]
2. [Specific observation]
3. [Specific observation]
**Improvements needed:** [specific actionable changes]

[Repeat for all 10 experts]

### Round 1 Average: XX/100
[If under 90, explain what will be improved]

## Round 2 (if needed)
[Show changes made, re-review, new scores]

## Final Version
[Only when average exceeds 90/100]`,
            },
            {
                id: 11,
                name: "Deploy to Netlify",
                framework: "Ship > Perfect. Live in 15 minutes.",
                context: `MANUAL DEPLOY (now):
1. Have Claude build the HTML from your reviewed copy
2. Download the HTML file
3. Rename it to index.html
4. Create a folder, put index.html inside
5. Go to app.netlify.com/drop -- drag the folder
6. Sign up / log in to keep it live permanently
7. Domain management -- add your custom domain
8. Update DNS at your registrar (Namecheap, GoDaddy, etc.):
   - A record: @ -> 75.2.60.5
   - CNAME: www -> your-site.netlify.app
9. Enable HTTPS (Domain management -- HTTPS -- Provision certificate)
10. Remove password protection (Web security)

UPDATES: Change the HTML, drag the folder to Deploys -- "Drag and drop" area

AGENT DEPLOY (Phase 2 -- after client #3):
- Netlify REST API: POST /api/v1/sites/{site_id}/deploys with zip
- Or Netlify CLI: netlify deploy --prod --dir=./site
- State needed: site_id, auth_token, domain, last_deploy_hash
- Small edits: agent patches HTML directly, redeploys
- Rollback: POST /api/v1/sites/{site_id}/rollback

CURRENT SITE:
- Netlify site: graceful-faun-f44ce2
- Domain: sleeve.cloud (Namecheap DNS)
- Deploy method: manual drag-drop for now
- Booking: cal.com/mike-klein-sleeve/15min`,
                templates: [
                    "Deploy checklist:\n1. HTML file renamed to index.html\n2. index.html inside a folder\n3. Folder dragged to Netlify Drop\n4. Custom domain added in Netlify\n5. DNS records updated at registrar\n6. HTTPS enabled\n7. Password protection removed\n8. Test: visit sleeve.cloud on phone + desktop",
                ],
                prompt: null,
                action: "Download HTML, rename to index.html, folder it, drag to Netlify.",
            },
            {
                id: 12,
                name: "Post-Launch Review",
                framework: "Fix blockers, then track enhancements for later.",
                context: `BLOCKERS (fix before outreach):
- [x] "Book a Call" buttons (4x) -- FIXED. Linked to cal.com/mike-klein-sleeve/15min
- [ ] "Free GTM teardown checklist" link points to # -- DEAD. Replace with real link or remove.
- [ ] HTTPS certificate -- verify provisioned (was failing, may need retry in Netlify).
- [ ] Test on mobile -- confirm responsive layout works.

COUNCIL REVIEW FINDINGS (from expert panel):
- CRO (5/10): 4 dead CTAs = actively losing visitors. Fix booking link first.
- Copy (7/10): Good tone. Pricing inconsistency: FAQ says $1,500 intel package, elsewhere says $2,500 pilot. Pick one.
- UX (6/10): Sticky CTA broken. No favicon. Browser tab may show raw HTML.
- ICP (7/10): "Most clients see a clear picture within 4 weeks" -- you have zero clients. Remove "most clients."
- Diff (7/10): "We test what works" is generic. Lead with attribution: "we track which activity led to a deal."

ENHANCEMENTS (after outreach is flowing):
- [ ] GTM Flywheel Visualization -- interactive diagram showing full funnel:
      Traffic Generation (Content, Ads, Outbound, Partnerships)
      -> Lead Capturing (Social, Engagement, Magnets, Forms)
      -> Lead Nurturing (SDR, Retargeting, Newsletter, Community, Events)
      -> Conversion (Website, Demo, Testimonials, Case Studies, Free Tools)
      -> Qualification (Free Trial, Meeting Booked -> Sales Process)
      -> Closed Won -> Retention & Expansion
      Reference: Fivos Aresti / workflows.io 2026 GTM Flywheel Playbook
      Build as: React SVG component or interactive diagram showing where Sleeve operates
      Use for: client onboarding ("here's the full picture, here's where we're focusing")
- [ ] Add analytics (PostHog or Plausible -- free tier)
- [ ] Add favicon + OG meta tags for social sharing
- [ ] A/B test headline variants
- [ ] Add founder video or Loom walkthrough`,
                templates: [
                    "Post-launch blockers:\n1. Replace all #book links with Cal.com URL\n2. Replace or remove teardown checklist link\n3. Verify HTTPS works\n4. Test on mobile\n5. Fix pricing inconsistency ($1,500 vs $2,500)\n6. Remove 'most clients' claim (zero clients)\n7. Strengthen 'we test what works' -> lead with attribution",
                ],
                prompt: null,
                action: "Fix all blockers. Enhancements wait until outreach is flowing.",
            },
        ],
    },

    // ========================================
    // WARM OUTREACH WORKFLOW
    // ========================================
    warmList: {
        title: "Build Warm Contact List",
        time: "1-2 hours",
        output: "Spreadsheet with 20 founders",
        steps: [
            {
                id: 1,
                name: "Define criteria",
                framework: "ICP match + reachable + honest feedback likely",
                context: `Good candidates:
- Founders you know personally
- B2B SaaS, Series A-B
- Technical founder (hates marketing)
- Would give honest feedback
- Reachable via text/LinkedIn/email`,
                templates: [],
                prompt: null,
            },
            {
                id: 2,
                name: "Create spreadsheet",
                framework: "Minimum viable tracking",
                context: `Columns needed:
- Name
- Company
- Stage (Seed/A/B)
- How you know them
- Contact method (text/LinkedIn/email)
- Why they'd be a fit
- Status (blank -> sent -> replied -> call -> closed)
- Notes`,
                templates: [],
                prompt: null,
                action: "Create Google Sheet with these columns.",
            },
            {
                id: 3,
                name: "Brain dump contacts",
                framework: "Quantity first, qualify later",
                context: `Sources to mine:
- Your phone contacts
- LinkedIn connections (filter: Founder, CEO)
- Twitter mutuals
- Past coworkers who started companies
- Investors you know (for intros)
- Accelerator batchmates
- Friends who know founders`,
                templates: [],
                prompt: `${PROMPT_CONTEXT}\n\nI need to build a list of 20 founders to reach out to about my new B2B service.

My service: ${CONTEXT.name} -- ${CONTEXT.offer.core}
Target: ${CONTEXT.icp.primary}

Help me brainstorm categories of people I should reach out to. For each category, give me prompts to jog my memory about specific people.

BEFORE DELIVERING: Run an internal expert panel review.
PANEL:
- ICP Expert: Does this speak to the specific buyer and pain described above -- not generic B2B advice anyone could use?
- Copy Expert: Cut any sentence you could delete without losing meaning. Flag any phrase that could appear in a competitor's marketing unchanged.
- Differentiation Expert: Would this make sense coming from a fractional CMO or agency? If yes, it is not differentiated enough.
- Conversion Expert: After reading this, would the buyer do something (click, reply, book) or just think "interesting"? If the latter, it fails.
PROCESS:
1. Each expert scores 1-10 with one-line justification
2. Any score below 9: revise that dimension, re-score
3. Repeat until all 9+ or 3 rounds -- if stuck below 8 after 3 rounds, flag what is structurally wrong
4. Deliver final output with: "Panel: ICP X | Copy X | Diff X | Conv X"
`,
            },
            {
                id: 4,
                name: "Qualify and prioritize",
                framework: "Best fits first",
                context: `Prioritization:
Tier 1: Perfect ICP match + you know them well + will give honest feedback
Tier 2: Good ICP match + you know them
Tier 3: Okay ICP match OR don't know them well`,
                templates: [],
                prompt: null,
                action: "Sort list by tier. You'll start with Tier 1.",
            },
        ],
    },

    // ========================================
    // FIRST OUTREACH WORKFLOW
    // ========================================
    firstOutreach: {
        title: "Send First 5 Outreach",
        time: "1 hour",
        output: "5 personalized messages sent",
        steps: [
            {
                id: 1,
                name: "Select first 5",
                framework: "Best relationships + best fit",
                context: `Pick from your Tier 1 list:
- People who will definitely respond
- People who match ICP closely
- People who give honest feedback`,
                templates: [],
                prompt: null,
            },
            {
                id: 2,
                name: "Personalize each message",
                framework: "Reference something specific + small ask",
                context: `Structure:
1. Personal opener (reference them specifically)
2. What you're building (one sentence)
3. Why you thought of them
4. The ask (20 min call for feedback)`,
                templates: [
                    `Hey [name], I know you're in the thick of it at [company] -- saw you just [recent thing].

I'm building something and you came to mind. It's called Sleeve Cloud a basically AI that runs GTM for B2B companies. Content, outreach, intel, delivered weekly.

Given what you're doing at [company], I'd love 20 min to show you and get your honest take. Would that be useful for you?`,

                    `[name]! Been a minute.

Quick one: I'm launching a new thing and want your brain on it before I go wider.

It's a GTM service for SaaS founders -- AI does the work, you just approve. Basically solves the "I have no marketing team" problem.

Can I get 20 min to walk you through it? Genuinely want your feedback, not pitching you.`,
                ],
                prompt: `${PROMPT_CONTEXT}\n\nWrite a warm outreach message to a founder I know.

My product: ${CONTEXT.name} -- ${CONTEXT.offer.core}
My ask: 20 min call for feedback

Their details:
Name: [NAME]
Company: [COMPANY]
How I know them: [RELATIONSHIP]
Recent thing they did: [RECENT]

Rules:
- Personal opener (reference them)
- One sentence on what I'm building
- Why I thought of them
- Small ask (20 min, feedback not sales)
- Under 80 words

BEFORE DELIVERING: Run an internal expert panel review.
PANEL:
- ICP Expert: Does this speak to the specific buyer and pain described above -- not generic B2B advice anyone could use?
- Copy Expert: Cut any sentence you could delete without losing meaning. Flag any phrase that could appear in a competitor's marketing unchanged.
- Differentiation Expert: Would this make sense coming from a fractional CMO or agency? If yes, it is not differentiated enough.
- Conversion Expert: After reading this, would the buyer do something (click, reply, book) or just think "interesting"? If the latter, it fails.
PROCESS:
1. Each expert scores 1-10 with one-line justification
2. Any score below 9: revise that dimension, re-score
3. Repeat until all 9+ or 3 rounds -- if stuck below 8 after 3 rounds, flag what is structurally wrong
4. Deliver final output with: "Panel: ICP X | Copy X | Diff X | Conv X"
`,
            },
            {
                id: 3,
                name: "Send messages",
                framework: "Best channel for each person",
                context: `Channel selection:
- Text: If you have their number and text occasionally
- LinkedIn DM: If connected but don't have number
- Email: If more formal relationship
- Twitter DM: If that's where you interact`,
                templates: [],
                prompt: null,
                action: "Send all 5. Track in your spreadsheet (Status = 'Sent').",
            },
            {
                id: 4,
                name: "Set follow-up reminders",
                framework: "Follow up Day 3 and Day 7",
                context: `Most responses come from follow-up, not first message.

Day 3: "Hey, bumping this -- any thoughts?"
Day 7: "Last ping a if timing's not right, no worries at all."`,
                templates: [
                    "Hey, bumping this -- any thoughts?",
                    "Last ping on this -- if the timing's not right, totally understand. Just wanted to make sure it didn't get buried.",
                ],
                prompt: null,
                action: "Set calendar reminders for Day 3 and Day 7 follow-ups.",
            },
        ],
    },

    // ========================================
    // INTAKE FORM WORKFLOW
    // ========================================
    intake: {
        title: "Build Intake Form",
        time: "2 hours",
        output: "Typeform capturing Company Sleeve",
        steps: [
            {
                id: 1,
                name: "Choose platform",
                framework: "Simple > Feature-rich",
                context: `Options:
- Typeform: Best UX, $30/mo
- Tally: Free, good enough
- Google Forms: Free, uglier
- Notion form: Free if using Notion`,
                templates: [],
                prompt: null,
                action: "Pick Typeform or Tally. Create account.",
            },
            {
                id: 2,
                name: "Define sections",
                framework: "Company Sleeve structure",
                context: `Sections needed:
1. Company basics (what, who, stage)
2. Current GTM (what's working, what's not)
3. ICP (who they sell to)
4. Voice & positioning (how they sound)
5. Goals & constraints (what success looks like)
6. Competitors (who they're up against)
7. Content preferences (formats, topics)`,
                templates: [],
                prompt: null,
            },
            {
                id: 3,
                name: "Write questions",
                framework: "Specific > Vague. Examples help.",
                context: `Question design:
- Ask for specifics, not generalities
- Include examples of good answers
- Mix short answer + long answer
- Required vs optional thoughtfully`,
                templates: [],
                prompt: `${PROMPT_CONTEXT}\n\nCreate intake form questions for a GTM service.

Sections:
1. Company basics
2. Current GTM situation
3. ICP definition
4. Voice & positioning
5. Goals & constraints
6. Competitors
7. Content preferences

For each section, write 3-5 questions that will give me everything I need to run their GTM.

Rules:
- Be specific (not "describe your company" but "what does your product do in one sentence?")
- Include example answers where helpful
- Mark which are required vs optional
- Total form should take 30-40 min to complete thoughtfully

BEFORE DELIVERING: Run an internal expert panel review.
PANEL:
- ICP Expert: Does this speak to the specific buyer and pain described above -- not generic B2B advice anyone could use?
- Copy Expert: Cut any sentence you could delete without losing meaning. Flag any phrase that could appear in a competitor's marketing unchanged.
- Differentiation Expert: Would this make sense coming from a fractional CMO or agency? If yes, it is not differentiated enough.
- Conversion Expert: After reading this, would the buyer do something (click, reply, book) or just think "interesting"? If the latter, it fails.
PROCESS:
1. Each expert scores 1-10 with one-line justification
2. Any score below 9: revise that dimension, re-score
3. Repeat until all 9+ or 3 rounds -- if stuck below 8 after 3 rounds, flag what is structurally wrong
4. Deliver final output with: "Panel: ICP X | Copy X | Diff X | Conv X"
`,
            },
            {
                id: 4,
                name: "Build form",
                framework: "Logic jumps for efficiency",
                context: `UX tips:
- One question per screen (Typeform style)
- Progress bar visible
- Estimate time at start ("Takes 30 min")
- Thank you screen with next steps`,
                templates: [],
                prompt: null,
                action: "Build the form. Test it yourself (time it).",
            },
            {
                id: 5,
                name: "Create response template",
                framework: "Structured for agent input",
                context: `When someone submits, you need their answers in a format you can paste into Claude.

Create a template that pulls responses into a clean "Company Sleeve" document.`,
                templates: [],
                prompt: `${PROMPT_CONTEXT}\n\nCreate a template for organizing intake form responses into a "Company Sleeve" document.

The document should be structured so I can paste it into Claude as context for generating content, outreach, and intel.

Sections:
- Company overview
- ICP profile
- Current GTM state
- Voice & tone guidelines
- Goals & success metrics
- Competitive landscape
- Content parameters

Format it as a clean markdown document with clear headers.

BEFORE DELIVERING: Run an internal expert panel review.
PANEL:
- ICP Expert: Does this speak to the specific buyer and pain described above -- not generic B2B advice anyone could use?
- Copy Expert: Cut any sentence you could delete without losing meaning. Flag any phrase that could appear in a competitor's marketing unchanged.
- Differentiation Expert: Would this make sense coming from a fractional CMO or agency? If yes, it is not differentiated enough.
- Conversion Expert: After reading this, would the buyer do something (click, reply, book) or just think "interesting"? If the latter, it fails.
PROCESS:
1. Each expert scores 1-10 with one-line justification
2. Any score below 9: revise that dimension, re-score
3. Repeat until all 9+ or 3 rounds -- if stuck below 8 after 3 rounds, flag what is structurally wrong
4. Deliver final output with: "Panel: ICP X | Copy X | Diff X | Conv X"
`,
            },
        ],
    },

    // ========================================
    // AGENT PROMPTS WORKFLOW
    // ========================================
    prompts: {
        title: "Document Agent Prompts",
        time: "2-3 hours",
        output: "3 working agents: Intel, Content, Outreach",
        steps: [
            {
                id: 1,
                name: "Competitive Intel Agent",
                framework: "Context + Task + Output format",
                context: `This agent produces weekly competitive intelligence for clients.`,
                templates: [
                    `You are a competitive intelligence analyst for a B2B SaaS company.

COMPANY CONTEXT:
{paste Company Sleeve here}

TASK:
Analyze the competitive landscape. For the top 3-5 competitors:

1. Recent moves (funding, launches, pricing changes, messaging shifts)
2. Content themes (what are they publishing about?)
3. Positioning (how do they describe themselves vs. us?)
4. Strengths to learn from
5. Weaknesses to exploit
6. "So what" -- what should we do differently based on this?

OUTPUT FORMAT:
- Executive summary (3 bullets, what matters this week)
- Competitor-by-competitor breakdown
- Recommended actions (prioritized)

Keep it to 1 page. Focus on actionable insights, not comprehensive reporting.`,
                ],
                prompt: null,
                action: "Test this prompt with a sample Company Sleeve. Refine until output is good.",
            },
            {
                id: 2,
                name: "Content Agent",
                framework: "Context + Parameters + Quality criteria",
                context: `This agent produces LinkedIn posts, blog drafts, email copy.`,
                templates: [
                    `You are a B2B content writer for a SaaS company.

COMPANY CONTEXT:
{paste Company Sleeve here}

CONTENT REQUEST:
Type: LinkedIn post
Topic: {topic}
Goal: {awareness / engagement / conversion}

VOICE GUIDELINES:
{from Company Sleeve}

TASK:
Write a LinkedIn post that:
1. Opens with a hook (first line must stop the scroll)
2. Delivers genuine insight (not generic advice)
3. Sounds human, not AI
4. Matches the company's voice
5. Ends with engagement prompt or soft CTA

OUTPUT:
- The post (ready to publish)
- 2 alternate hooks to test

QUALITY CHECK:
- Don't use: "In today's fast-paced world", "Let me tell you", "Here's the thing"
- Don't be generic -- reference specific details from their context
- Be opinionated
- Use short paragraphs
- Sound like a person, not a brand`,
                ],
                prompt: null,
                action: "Test with sample context. Generate 3 posts. Refine prompt until quality is consistent.",
            },
            {
                id: 3,
                name: "Outreach Agent",
                framework: "Context + Prospect data + Personalization rules",
                context: `This agent produces personalized cold outreach.`,
                templates: [
                    `You are writing cold outreach for a B2B company.

COMPANY CONTEXT:
{paste Company Sleeve here}

PROSPECT:
Name: {name}
Title: {title}
Company: {company}
Company description: {what they do}
Recent trigger: {funding, hire, post, launch a if available}

TASK:
Write a cold email that:
1. Opens with something specific to THEM (not "I noticed you work at...")
2. Connects their situation to a relevant problem we solve
3. Makes a low-commitment ask
4. Is under 75 words total

OUTPUT:
- Subject line (under 6 words, lowercase)
- Email body

QUALITY CHECK:
- No "I hope this email finds you well"
- No feature lists
- No "I'd love to pick your brain"
- Specific to their situation
- Clear ask
- Sounds like a human sent it`,
                ],
                prompt: null,
                action: "Test with 5 sample prospects. Refine until you'd reply to these emails.",
            },
            {
                id: 4,
                name: "QA Agent",
                framework: "Checklist-based review",
                context: `This agent reviews output from other agents before delivery.`,
                templates: [
                    `You are a QA reviewer for B2B marketing content.

CONTENT TO REVIEW:
{paste content here}

CONTENT TYPE: {LinkedIn post / email / outreach / intel report}

REVIEW AGAINST:
1. Hook quality (1-10): Does the first line grab attention?
2. Clarity (1-10): Is the message clear without jargon?
3. Voice match (1-10): Does it sound like the company?
4. Human-ness (1-10): Does it sound like a person or AI?
5. CTA clarity (1-10): Is there a clear next step?
6. Cringe check: Would you be embarrassed to send this?

OUTPUT:
- Overall score (average)
- Pass/Fail (Pass = 7+ average, no cringe)
- Specific edits to make it pass (if failing)`,
                ],
                prompt: null,
                action: "Test by running it on content from Content Agent. Calibrate scoring.",
            },
        ],
    },

    // ========================================
    // PRICING WORKFLOW
    // ========================================
    pricing: {
        title: "Finalize Pricing",
        time: "30 min",
        output: "Clear pricing tiers",
        steps: [
            {
                id: 1,
                name: "Review proposed tiers",
                framework: "Value-based, not cost-based",
                context: `Proposed tiers:

PILOT -- $2,500/mo
- First 3 clients only
- Full service (intel, content, outreach)
- Case study rights required
- Month-to-month
- Purpose: Get proof, not profit

BUILDER -- $3,500/mo
- Standard offering
a 8 content pieces/month
a 200 outreach contacts/month
- Weekly intel
a 3-month commitment

GROWTH -- $6,000/mo
- Everything in Builder
a 16 content pieces/month
a 400 outreach contacts/month
- Bi-weekly strategy calls
a 3-month commitment`,
                templates: [],
                prompt: null,
            },
            {
                id: 2,
                name: "Validate against alternatives",
                framework: "Must be better value than alternatives",
                context: `What they'd pay otherwise:

Marketing hire:
- Salary: $80-120K/year = $7-10K/mo
- Plus: benefits, management, ramp time
- Risk: might not work out

Agency:
- Retainer: $10-25K/mo
- Plus: slow, generic, account manager overhead
- Risk: they don't understand your product

Freelancers:
- Content: $500-1,500/piece
- Outreach: $2-5K/mo
- Intel: DIY
- Plus: you manage 3-5 people
- Risk: inconsistent, no integration`,
                templates: [],
                prompt: null,
                action: "Confirm your pricing is obviously better than alternatives.",
            },
            {
                id: 3,
                name: "Decide your starting price",
                framework: "Start with Pilot, raise with proof",
                context: `Recommendation:

First 3 clients: $2,500/mo (Pilot)
- You need proof more than margin
- Discount is earned with case study rights

Clients 4-8: $3,500/mo (Builder)
- You have proof now
- Standard pricing

Clients 9+: Consider raising to $5,000/mo
- If demand exceeds capacity, price up`,
                templates: [],
                prompt: null,
                action: "Commit to Pilot pricing for first 3. Write it down.",
            },
        ],
    },

    // ========================================
    // DELIVERY WORKSPACE WORKFLOW
    // ========================================
    delivery: {
        title: "Create Delivery Workspace",
        time: "1-2 hours",
        output: "Notion template for client delivery",
        steps: [
            {
                id: 1,
                name: "Choose platform",
                framework: "Client-friendly > Your preference",
                context: `Options:
- Notion: Best for async, clients can comment
- Google Drive: More familiar to some
- Custom dashboard: Way overkill for now`,
                templates: [],
                prompt: null,
                action: "Use Notion. Create a workspace.",
            },
            {
                id: 2,
                name: "Design structure",
                framework: "Client sees what they need, nothing more",
                context: `Pages needed:

HOME
- This week's deliverables (status: draft/ready/approved)
- Quick stats (content published, outreach sent)

WEEKLY INTEL
- Current week
- Archive

CONTENT
- Ready for review
- Approved
- Published

OUTREACH
- This week's batch
- Approved sequences

FEEDBACK
- Place for them to leave notes`,
                templates: [],
                prompt: null,
                action: "Create this structure in Notion.",
            },
            {
                id: 3,
                name: "Build templates",
                framework: "Consistent format, easy to scan",
                context: `For each content type, create a template:

Intel Report:
- Date
- Executive summary (3 bullets)
- Full breakdown
- Recommended actions

Content Piece:
- Type (LinkedIn/blog/email)
- Status (draft/ready/approved)
- The content
- Revision notes

Outreach Batch:
- Number of contacts
- Sample messages
- Status (draft/approved/sent)`,
                templates: [],
                prompt: `${PROMPT_CONTEXT}\n\nCreate Notion templates for a GTM delivery workspace.

Templates needed:
1. Weekly Intel Report
2. Content Piece (for review)
3. Outreach Batch

For each, define:
- Required fields
- Status options
- How client provides feedback

BEFORE DELIVERING: Run an internal expert panel review.
PANEL:
- ICP Expert: Does this speak to the specific buyer and pain described above -- not generic B2B advice anyone could use?
- Copy Expert: Cut any sentence you could delete without losing meaning. Flag any phrase that could appear in a competitor's marketing unchanged.
- Differentiation Expert: Would this make sense coming from a fractional CMO or agency? If yes, it is not differentiated enough.
- Conversion Expert: After reading this, would the buyer do something (click, reply, book) or just think "interesting"? If the latter, it fails.
PROCESS:
1. Each expert scores 1-10 with one-line justification
2. Any score below 9: revise that dimension, re-score
3. Repeat until all 9+ or 3 rounds -- if stuck below 8 after 3 rounds, flag what is structurally wrong
4. Deliver final output with: "Panel: ICP X | Copy X | Diff X | Conv X"
`,
            },
            {
                id: 4,
                name: "Test the flow",
                framework: "Do it yourself before client sees it",
                context: `Simulate a week:
1. Add sample intel report
2. Add 2 sample content pieces
3. Add sample outreach batch
4. Pretend you're the client reviewing`,
                templates: [],
                prompt: null,
                action: "Walk through as if you're the client. Is it clear?",
            },
        ],
    },

    // ========================================
    // DISCOVERY CALL WORKFLOW
    // ========================================
    calls5: {
        title: "Run Discovery Calls",
        time: "30 min per call",
        output: "Qualified prospects + next steps",
        steps: [
            {
                id: 1,
                name: "Prepare",
                framework: "Know them before you talk to them",
                context: `Before each call (5 min):
- Check their LinkedIn
- Look at their website
- Note one specific observation to mention`,
                templates: [],
                prompt: null,
            },
            {
                id: 2,
                name: "Open (2 min)",
                framework: "Build rapport, set agenda",
                context: `Script:
"Thanks for taking the time. I'd love to understand what's going on with GTM at [company] and see if there's a fit. Cool if I ask some questions first?"`,
                templates: [
                    "Thanks for taking the time. I want to understand your GTM situation and see if what I'm building could help. Mind if I ask a few questions first?",
                ],
                prompt: null,
            },
            {
                id: 3,
                name: "Diagnose (10 min)",
                framework: "Understand before you pitch",
                context: `Questions to ask:

SITUATION:
- "What does marketing look like at [company] right now?"
- "Who's doing it? How much of your time does it take?"
- "What's working? What's not?"

PAIN:
- "What happens if nothing changes in the next 6 months?"
- "What have you tried that didn't work?"

GOAL:
- "What does success look like for GTM this year?"
- "What's the board/investors asking about?"`,
                templates: [
                    "What does marketing look like at [company] right now?",
                    "Who's doing it? How much of your time does it take?",
                    "What's working? What's not?",
                    "What happens if nothing changes in the next 6 months?",
                    "What have you tried before?",
                    "What does success look like this year?",
                ],
                prompt: null,
            },
            {
                id: 4,
                name: "Share insight (5 min)",
                framework: "Demonstrate you understand",
                context: `Based on what they said, share 1-2 observations:

"Based on what you're describing, it sounds like [observation]. A lot of the companies I talk to at your stage hit the same wall -- great product, but GTM is a black hole."`,
                templates: [
                    "Based on what you're describing, it sounds like [observation]. That's really common at your stage.",
                    "The pattern I see with technical founders is [pattern]. Sound familiar?",
                ],
                prompt: null,
            },
            {
                id: 5,
                name: "Present (5 min)",
                framework: "Sell the teardown, not the vision. Match pitch to buyer.",
                context: `RULES (from council review of Jake call, Feb 27):
- DO NOT pitch all 4 layers. Pitch ONE: the teardown.
- DO NOT describe future agent automation. Sell what exists TODAY.
- DO NOT talk for 7 minutes straight. Present for 2 min max, then ask questions.
- DO match pitch to buyer type: done-for-you buyers don't want to see the tool.
- DO anchor price against what they're already spending.

ONE-SENTENCE POSITIONING:
"Sleeve Cloud is a fractional GTM team powered by AI. We audit your funnel, build what's missing, and show you what's driving revenue."

PRESENT THE TEARDOWN (your only product right now):
"Based on what you just described, here's what I'd do. I take your entire GTM, score it against 47 frameworks from people like Hormozi and Brunson, and show you exactly where revenue is leaking and what to fix first. It takes me about a week. You get a full report with specific recommendations, not generic advice."

GIVE ONE FREE INSIGHT ON THE CALL:
"Actually, from what you just told me, [specific observation]. That's a pattern I see a lot at your stage. The framework says [specific recommendation]. That alone would probably [specific impact]."

This proves competence before asking for money.

WHAT NOT TO SAY:
- "Eventually the agents will do this" (buyers don't pay for eventually)
- "I spent 80-100 hours building this" (they don't care how hard it was)
- "Think of it as a layered cake" (internal roadmap, not sales pitch)
- "We have a database of thousands of hours" (oversells what exists)

LAYER CAKE IS INTERNAL ONLY:
Layer 1: Intelligence/Teardown ($1,500) -- THIS IS WHAT YOU SELL
Layer 2: Execution/Pilot ($2,500/mo) -- upsell after teardown delivered
Layer 3: Growth ($5,000/mo) -- multi-channel + attribution
Layer 4: Dashboard (future) -- live analytics, upsell from Growth
Don't mention layers 3-4 until client has been on layer 2 for a month.`,
                templates: [
                    "Based on what you described, I'd audit your full GTM against 47 proven frameworks and show you exactly where revenue is leaking. Takes a week, you get a specific action plan.",
                    "Here's what I'd do for [company]: [one specific insight from what they said]. That's just the surface. The full teardown goes way deeper.",
                ],
                prompt: null,
            },
            {
                id: 6,
                name: "Close (5 min)",
                framework: "When buyer says yes, say yes back. Don't deflect into more explanation.",
                context: `CRITICAL LESSON (Jake call): Jake said "can we start Monday?" THREE times. You deflected each time into more explanation. When a buyer is hot, CLOSE.

HOT (they say "can we start?" or "what's next?"):
"Yes. Fill out the intake form tonight [send link]. I'll have your teardown by [date, 5 business days]. $1,500, and it credits to your first month if you go ongoing."
Then STOP TALKING. Send the Cal.com link right there.

WARM (interested but hesitant):
"Want to see what this looks like? I'll do a 15-minute mini-audit right now on this call. If it's valuable, we go deeper."
Then give one real insight. Then: "The full teardown is $1,500, delivered in a week."

WARM + PRICE OBJECTION:
Anchor against their current spend: "You mentioned you're paying [$X] for [current solution]. This gives you [specific comparison] for [less/similar]."
Jake example: "You paid $7,800 to your lead gen guy for one contract. I'll build you a system that finds better leads for $2,500/month."

COLD (not a fit):
"Sounds like timing's not right. Totally get it. Can I send you a teardown example so you can see what it looks like? No commitment."

AFTER EVERY CALL:
- Send next step within 1 hour (link, intake, or example)
- Never end with "I'll give you an update next week" -- that's a dead lead
- Always leave with a scheduled next action, not a vague follow-up`,
                templates: [
                    "Yes, let's do it. Fill out this intake form tonight: [link]. I'll have your teardown by [date]. $1,500, credits to first month ongoing.",
                    "You're paying [$X] for [current thing]. I can do [better outcome] for [$price]. Want to test it for 30 days?",
                    "Let me do a quick mini-audit right now. [Give one insight.] The full teardown goes way deeper. $1,500, one week.",
                ],
                prompt: null,
            },
            {
                id: 7,
                name: "After the call",
                framework: "Document everything, move fast",
                context: `WITHIN 1 HOUR:
- Send a thank you message (text/LinkedIn/email, whatever you used to reach them)
- Include one specific thing they said that you can help with
- If WARM: "I'll have the teardown scope to you by [date]"
- If HOT: Send the intake form link

DOCUMENT IN YOUR SPREADSHEET:
- Temperature (hot/warm/cold)
- Key pain points they mentioned (exact words)
- What they've tried
- What they'd pay for
- Next step + date

THIS IS YOUR MOST VALUABLE DATA. First 5 calls shape the entire offer.`,
                templates: [
                    "Hey [name], great talking. The thing you said about [specific pain] really resonated. I see that pattern a lot. I'll [next step] by [date]. Talk soon.",
                ],
                prompt: null,
            },
            {
                id: 8,
                name: "Call readiness checklist",
                framework: "Pre-flight check before your first call",
                context: `BEFORE YOUR FIRST CALL, CONFIRM:

READY (you have these):
- [x] Discovery call script (steps 1-6 above)
- [x] Cal.com with qualifying questions (company URL, ARR, attribution question)
- [x] Landing page live at sleeve.cloud
- [x] Warm outreach template

NEED BEFORE SOMEONE SAYS YES:
- [ ] Payment method: Stripe link, invoice, or even Venmo for first client. Pick one. Stripe.com > create payment link > $1,500 > done in 5 min.
- [ ] Teardown deliverable format: what do they get? Options:
      Option A: Loom video walking through their GTM with a scorecard (fastest, most personal)
      Option B: Google Doc with framework scores, gaps, recommendations (more "professional")
      Option C: Both. Loom + summary doc.
      DECIDE AFTER CALL #1 based on what feels right.
- [ ] Timeline promise: "I'll have it in 5 business days" is safe.
- [ ] Intake form: use the one in the hub (Operate > Intake) or a simple Google Form for v1.

DON'T NEED YET (figure out after client #3):
- Formal contract (handshake is fine for first 3)
- Onboarding sequence
- Client portal
- Invoicing system

NOTE: First 5 outreach are to people you know. They expect rough edges. They'll give honest feedback. You don't need everything figured out.

IF CLIENT ALREADY HAS:
- Email/domain: skip setup, just use theirs
- CRM: ask for access or export
- Analytics: ask for read-only access
- Content: audit what exists before creating new`,
                templates: [
                    "Pre-call checklist:\n1. Researched their company (5 min)\n2. Checked their LinkedIn\n3. Noted one specific observation\n4. Stripe payment link ready\n5. Know your close options (hot/warm/cold)\n6. Spreadsheet open to log notes",
                ],
                prompt: null,
            },
        ],
    },
};
