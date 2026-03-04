import { useState, useEffect, useCallback, useRef } from "react";
import { DEFAULT_CONTEXT, PROMPT_CONTEXT } from "./src/data/context.js";
import { COMPETITORS, MARKET_INTEL } from "./src/data/competitors.js";
import { INTAKE_QUESTIONS, INTAKE_EXTRACTOR, CLIENT_INTAKE_PROMPT } from "./src/data/intake.js";
import { WORKFLOWS } from "./src/data/workflows.js";
import { FRAMEWORKS } from "./src/data/frameworks.js";
import { RESEARCH_AGENT_PROMPT, RESEARCH_AGENTS, AUTOMATION_AGENTS, HUMAN_VS_AGENT, WEEKLY_BRIEF, AGENT_PROMPTS } from "./src/data/prompts.js";
import { TOOLS, CAT_LABELS, CUSTOMER_JOURNEY, EXECUTION_PHASES_MAP, FUNNEL_NUMBERS, PHASES, OFFER, FUNNEL, PLAYBOOKS, METRICS, WEEKLY_RHYTHM, CORE_RULES } from "./src/data/business.js";
import { QUEST_NODES, QUEST_MILESTONES, QUEST_FUNNEL, QUEST_CORE_TOOLS, QUEST_TOOL_SLOTS, QUEST_CHANNELS, QUEST_JOURNEY_STAGES } from "./src/data/quest.js";
import { STORAGE_KEY, defaultState, MODES, EXEC_NAV, BUILD_NAV, HUB_WEEKS, HUB_THIS_WEEK, HUB_KILL_CRITERIA, HUB_TABLES, HUB_DB_STEPS, HUB_AGENT_CONTRACTS, HUB_TRANSCRIPTS } from "./src/data/hub.js";

// Mutable CONTEXT - updated when user edits in Context tab
let CONTEXT = DEFAULT_CONTEXT;

const YourPick = ({ outputKey, savedValue, onSave, colors }) => {
    const [localVal, setLocalVal] = useState(savedValue);
    const hasValue = localVal.trim().length > 0;
    const timerRef = useRef(null);

    const handleChange = (e) => {
        setLocalVal(e.target.value);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => { onSave(e.target.value); }, 1500);
    };

    const handleBlur = (e) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (e.target.value !== savedValue) onSave(e.target.value);
    };

    return (
        <div style={{ marginTop: 14, padding: "12px 14px", background: hasValue ? "rgba(16,185,129,0.08)" : "rgba(255,255,255,0.02)", border: hasValue ? "1px solid rgba(16,185,129,0.25)" : "1px dashed rgba(255,255,255,0.15)", borderRadius: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: hasValue ? colors.success : colors.textFaint }}>{hasValue ? "YOUR PICK (saved)" : "YOUR PICK"}</div>
                {hasValue && <div onClick={() => { setLocalVal(""); onSave(""); }} style={{ fontSize: 10, color: colors.textFaint, cursor: "pointer" }}>Clear</div>}
            </div>
            <textarea
                value={localVal}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Paste your winning output here..."
                rows={hasValue ? 3 : 2}
                style={{ width: "100%", padding: "8px 10px", background: "rgba(0,0,0,0.2)", border: "1px solid " + (hasValue ? "rgba(16,185,129,0.2)" : colors.border), borderRadius: 6, color: colors.text, fontSize: 13, fontWeight: hasValue ? 500 : 400, lineHeight: 1.5, resize: "vertical", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
            />
        </div>
    );
};

export default function SleeveCloudOS() {
    const [mode, setMode] = useState("operate");
    const [tab, setTab] = useState("now");
    const [state, setState] = useState(defaultState());
    const [loaded, setLoaded] = useState(false);
    const [hubChecks, setHubChecks] = useState({});
    const [hubExpanded, setHubExpanded] = useState(null);
    const hubToggle = (k) => setHubChecks(p => ({ ...p, [k]: !p[k] }));
    const [expandedPlaybook, setExpandedPlaybook] = useState(null);
    const [researchCopied, setResearchCopied] = useState(false);
    const [expandedDay, setExpandedDay] = useState(null);
    const [expandedTask, setExpandedTask] = useState(null);
    const [copied, setCopied] = useState(null);

    // Editable context state - syncs with global CONTEXT
    const [context, setContext] = useState(DEFAULT_CONTEXT);
    const [intakeSection, setIntakeSection] = useState("all");

    // Update global CONTEXT when state changes (so prompts use new values)
    useEffect(() => {
        CONTEXT = context;
    }, [context]);

    // Helper to update nested context values
    const updateContext = (path, value) => {
        setContext(prev => {
            const newCtx = JSON.parse(JSON.stringify(prev));
            const parts = path.split('.');
            let obj = newCtx;
            for (let i = 0; i < parts.length - 1; i++) {
                obj = obj[parts[i]];
            }
            obj[parts[parts.length - 1]] = value;
            return newCtx;
        });
    };

    // Frameworks tab state
    const [fwFilter, setFwFilter] = useState("");
    const [fwCat, setFwCat] = useState("all");
    const [expandedFw, setExpandedFw] = useState(null);

    // Journey tab state
    const [activeStage, setActiveStage] = useState(0);
    const [animationPhase, setAnimationPhase] = useState(0);
    const [isAnimating, setIsAnimating] = useState(true);

    // Tools tab state (from Quest Map)
    const [questOwnedTools, setQuestOwnedTools] = useState(new Set());
    const [questActiveChannels, setQuestActiveChannels] = useState(new Set(["cold_email", "linkedin_dm", "twitter", "linkedin"]));
    const [questSelectedTools, setQuestSelectedTools] = useState(() => {
        const defaults = {};
        QUEST_TOOL_SLOTS.forEach(slot => { defaults[slot.id] = slot.options[0].id; });
        return defaults;
    });

    useEffect(() => {
        // Load persisted state from window.storage
        const loadState = async () => {
            try {
                const result = await window.storage.get("sleeve-cloud-os-state");
                if (result && result.value) {
                    const parsed = JSON.parse(result.value);
                    setState(prev => ({ ...defaultState(), ...parsed }));
                }
            } catch (e) {
                // No saved state or storage unavailable
            }
            setLoaded(true);
        };
        loadState();
    }, []);

    // Journey animation effects
    useEffect(() => {
        if (!isAnimating || tab !== "journey") return;
        const interval = setInterval(() => {
            setAnimationPhase(prev => (prev + 1) % 12);
        }, 800);
        return () => clearInterval(interval);
    }, [isAnimating, tab]);

    useEffect(() => {
        const stageIndex = Math.floor(animationPhase / 2) % CUSTOMER_JOURNEY.length;
        setActiveStage(stageIndex);
    }, [animationPhase]);

    const save = useCallback((newState) => {
        setState(newState);
        try {
            window.storage.set("sleeve-cloud-os-state", JSON.stringify(newState));
        } catch (e) { }
    }, []);

    const toggle = (key) => {
        save({ ...state, checks: { ...state.checks, [key]: !state.checks[key] } });
    };

    const copyToClipboard = (text, id) => {
        try {
            const ta = document.createElement("textarea");
            ta.value = text;
            ta.style.position = "fixed";
            ta.style.left = "-9999px";
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
        } catch (e) { }
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    // Tools tab helpers
    const questToggleTool = (id) => {
        const newSet = new Set(questOwnedTools);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setQuestOwnedTools(newSet);
    };

    const questSelectTool = (slotId, toolId) => {
        setQuestSelectedTools(prev => ({ ...prev, [slotId]: toolId }));
    };

    const questGetSelectedToolForSlot = (slotId) => {
        const slot = QUEST_TOOL_SLOTS.find(s => s.id === slotId);
        if (!slot) return null;
        return slot.options.find(o => o.id === questSelectedTools[slotId]);
    };

    const phaseProgress = PHASES.map((p) => {
        const done = p.items.filter((i) => state.checks[`${p.id}_${i.key}`]).length;
        return { done, total: p.items.length, pct: p.items.length > 0 ? Math.round((done / p.items.length) * 100) : 0 };
    });

    const activePhase = PHASES.findIndex((_, i) => phaseProgress[i].pct < 100);
    const currentPhase = activePhase === -1 ? PHASES.length - 1 : activePhase;

    if (!loaded) {
        return (
            <div style={{ background: "#0a0f0d", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#14b8a6", fontFamily: "system-ui" }}>
                Loading...
            </div>
        );
    }

    // Color palette - teal/emerald theme for Sleeve Cloud
    const C = {
        bg: "#0a0f0d",
        sidebar: "#0d1210",
        card: "#111916",
        border: "rgba(20, 184, 166, 0.15)",
        borderHover: "rgba(20, 184, 166, 0.3)",
        text: "#e7eeec",
        textMuted: "rgba(255, 255, 255, 0.5)",
        textFaint: "rgba(255, 255, 255, 0.25)",
        primary: "#14b8a6",
        primaryLight: "#5eead4",
        primaryBg: "rgba(20, 184, 166, 0.1)",
        primaryBorder: "rgba(20, 184, 166, 0.3)",
        success: "#10b981",
        successBg: "rgba(16, 185, 129, 0.1)",
        successBorder: "rgba(16, 185, 129, 0.3)",
        warning: "#f59e0b",
        warningBg: "rgba(245, 158, 11, 0.1)",
        danger: "#ef4444",
        dangerBg: "rgba(239, 68, 68, 0.1)",
        dangerBorder: "rgba(239, 68, 68, 0.3)",
    };

    const navItems = [
        { id: "now", icon: "*", label: "NOW" },
        { id: "context", icon: "*", label: "CONTEXT" },
        { id: "intel", icon: "*", label: "INTEL" },
        { id: "research", icon: "*", label: "RESEARCH AGENT" },
        { id: "intake", icon: "*", label: "INTAKE" },
        { id: "offer", icon: "*", label: "OFFER" },
        { id: "funnel", icon: "*", label: "FUNNEL" },
        { id: "phases", icon: "*", label: "PHASES" },
        { id: "playbooks", icon: "*", label: "PLAYBOOKS" },
        { id: "metrics", icon: "*", label: "METRICS" },
        { id: "rhythm", icon: "*", label: "RHYTHM" },
        { id: "agents", icon: "*", label: "AGENTS" },
        { id: "tools", icon: "*", label: "TOOLS" },
        { id: "frameworks", icon: "*", label: "FRAMEWORKS" },
        { id: "journey", icon: "*", label: "JOURNEY" },
    ];

    const Card = ({ children, style = {} }) => (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, marginBottom: 16, ...style }}>
            {children}
        </div>
    );

    const Badge = ({ text, color = C.primary, bg = C.primaryBg }) => (
        <span style={{ display: "inline-block", padding: "4px 10px", background: bg, borderRadius: 6, fontSize: 11, fontWeight: 600, color, letterSpacing: "0.02em" }}>
            {text}
        </span>
    );


    const HubBadge = ({ text, color = C.primary }) => (
        <span style={{ fontSize: 10, fontWeight: 700, color, background: `${color}20`, padding: "3px 8px", borderRadius: 4, letterSpacing: "0.05em" }}>{text}</span>
    );
    const CheckItem = ({ label, checked, onToggle, color = C.primary }) => (
        <div onClick={onToggle} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "6px 0", cursor: "pointer" }}>
            <div style={{ width: 18, height: 18, borderRadius: 3, flexShrink: 0, marginTop: 1, border: `2px solid ${checked ? color : C.textFaint}`, background: checked ? color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", fontWeight: 700 }}>{checked ? "+" : ""}</div>
            <span style={{ fontSize: 12, color: checked ? C.textFaint : C.text, textDecoration: checked ? "line-through" : "none", lineHeight: 1.5 }}>{label}</span>
        </div>
    );

    const ProgressBar = ({ pct, color = C.primary }) => (
        <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 3, transition: "width 0.3s" }} />
        </div>
    );

    const CopyButton = ({ text, id }) => (
        <button
            onClick={(e) => { e.stopPropagation(); copyToClipboard(text, id); }}
            style={{ padding: "4px 10px", background: copied === id ? C.successBg : "rgba(255,255,255,0.05)", border: `1px solid ${copied === id ? C.successBorder : C.border}`, borderRadius: 6, fontSize: 11, color: copied === id ? C.success : C.textMuted, cursor: "pointer" }}
        >
            {copied === id ? "Copied!" : "Copy"}
        </button>
    );

    // ========================================
    // TAB RENDERS
    // ========================================

    const renderNow = () => {
        const phase = PHASES[currentPhase];
        const progress = phaseProgress[currentPhase];
        const nextUnchecked = phase.items.find((item) => !state.checks[`${phase.id}_${item.key}`]);

        return (
            <div>
                {/* Current Phase Header */}
                <Card style={{ borderColor: C.primaryBorder, background: `linear-gradient(135deg, ${C.card} 0%, rgba(20, 184, 166, 0.05) 100%)` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                        <div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: C.primary, letterSpacing: "0.1em", marginBottom: 4 }}>CURRENT PHASE</div>
                            <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Phase {currentPhase}: {phase.name}</div>
                            <div style={{ fontSize: 13, color: C.textMuted }}>{phase.tag} {progress.done}/{progress.total} complete</div>
                        </div>
                        <div style={{ fontSize: 36, fontWeight: 700, color: C.primary }}>{progress.pct}%</div>
                    </div>
                    <ProgressBar pct={progress.pct} />
                </Card>

                {/* Next Action */}
                {nextUnchecked && (
                    <Card>
                        <div style={{ fontSize: 12, fontWeight: 600, color: C.warning, letterSpacing: "0.05em", marginBottom: 12 }}>→ NEXT ACTION</div>
                        <div
                            onClick={() => toggle(`${phase.id}_${nextUnchecked.key}`)}
                            style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }}
                        >
                            <div style={{ width: 24, height: 24, borderRadius: 6, border: `2px solid ${C.primary}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }} />
                            <div>
                                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{nextUnchecked.label}</div>
                                <div style={{ fontSize: 13, color: C.textMuted }}>{nextUnchecked.note}</div>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Objective & Kill */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <Card style={{ background: C.successBg, borderColor: C.successBorder }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: C.success, marginBottom: 6 }}>OBJECTIVE</div>
                        <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6 }}>{phase.objective}</div>
                    </Card>
                    <Card style={{ background: C.dangerBg, borderColor: C.dangerBorder }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: C.danger, marginBottom: 6 }}>KILL IF</div>
                        <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6 }}>{phase.kill}</div>
                    </Card>
                </div>

                {/* Core Rules */}
                <Card>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, marginBottom: 12 }}>CORE RULES</div>
                    {CORE_RULES.map((rule, i) => (
                        <div key={i} style={{ padding: "8px 0", borderBottom: i < CORE_RULES.length - 1 ? `1px solid ${C.border}` : "none" }}>
                            <span style={{ fontWeight: 600, color: C.primaryLight }}>{rule.rule}</span>
                            <span style={{ color: C.textMuted }}> a {rule.detail}</span>
                        </div>
                    ))}
                </Card>

                {/* Notes */}
                <Card>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, marginBottom: 8 }}>QUICK NOTES</div>
                    <textarea
                        defaultValue={state.notes || ""}
                        onBlur={(e) => { if (e.target.value !== (state.notes || "")) save({ ...state, notes: e.target.value }); }}
                        placeholder="What's on your mind..."
                        style={{ width: "100%", minHeight: 80, background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`, borderRadius: 8, padding: 12, color: C.text, fontSize: 14, resize: "vertical", outline: "none", fontFamily: "inherit" }}
                    />
                </Card>
            </div>
        );
    };

    const renderContext = () => {
        const inputStyle = {
            width: "100%",
            padding: "10px 12px",
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            color: C.text,
            fontSize: 14,
            outline: "none",
            fontFamily: "inherit"
        };
        const textareaStyle = { ...inputStyle, minHeight: 80, resize: "vertical" };
        const labelStyle = { fontSize: 12, fontWeight: 600, color: C.primary, marginBottom: 6, display: "block", textTransform: "capitalize" };

        return (
            <div>
                <Card style={{ borderColor: C.primaryBorder }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <div style={{ width: 48, height: 48, borderRadius: 12, background: `linear-gradient(135deg, ${C.primary}, #0d9488)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700 }}>S</div>
                        <div style={{ flex: 1 }}>
                            <Badge text="EDITABLE -- Changes update all prompts" color={C.success} bg={C.successBg} />
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                        <div>
                            <label style={labelStyle}>Company Name</label>
                            <input style={inputStyle} value={context.name} onChange={(e) => updateContext('name', e.target.value)} />
                        </div>
                        <div>
                            <label style={labelStyle}>Domain</label>
                            <input style={inputStyle} value={context.domain} onChange={(e) => updateContext('domain', e.target.value)} />
                        </div>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle}>Tagline</label>
                        <input style={inputStyle} value={context.tagline} onChange={(e) => updateContext('tagline', e.target.value)} />
                    </div>

                    <div>
                        <label style={labelStyle}>Thesis</label>
                        <textarea style={textareaStyle} value={context.thesis} onChange={(e) => updateContext('thesis', e.target.value)} />
                    </div>
                </Card>

                <Card>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>IDEAL CUSTOMER PROFILE</div>
                    {Object.entries(context.icp).map(([key, value]) => (
                        <div key={key} style={{ marginBottom: 16 }}>
                            <label style={labelStyle}>{key.replace("_", " ")}</label>
                            <textarea style={textareaStyle} value={value} onChange={(e) => updateContext(`icp.${key}`, e.target.value)} />
                        </div>
                    ))}
                </Card>

                <Card>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>OFFER</div>
                    {Object.entries(context.offer).map(([key, value]) => (
                        <div key={key} style={{ marginBottom: 16 }}>
                            <label style={labelStyle}>{key.replace("_", " ")}</label>
                            <textarea style={textareaStyle} value={value} onChange={(e) => updateContext(`offer.${key}`, e.target.value)} />
                        </div>
                    ))}
                </Card>

                <Card>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>POSITIONING</div>
                    {Object.entries(context.positioning).map(([key, value]) => (
                        <div key={key} style={{ marginBottom: 16 }}>
                            <label style={labelStyle}>{key.replace("vs_", "vs ").replace("_", " ")}</label>
                            <textarea style={textareaStyle} value={value} onChange={(e) => updateContext(`positioning.${key}`, e.target.value)} />
                        </div>
                    ))}
                </Card>

                <Card style={{ background: C.successBg, borderColor: C.successBorder }}>
                    <div style={{ fontSize: 13, color: C.success, lineHeight: 1.6 }}>
                        <strong>How it works:</strong> Edit any field above. All prompts in the Playbooks and Phases tabs automatically use your updated values. Change "Sleeve Cloud" to your company name, and every prompt updates instantly.
                    </div>
                </Card>
            </div>
        )
    };

    // ================================================================
    // INTEL TAB - Competitive Landscape + Market Intelligence
    // ================================================================

    const renderIntel = () => (
        <div>
            <Card style={{ borderColor: "rgba(239,68,68,0.2)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#ef4444", letterSpacing: "0.1em", marginBottom: 6 }}>RESEARCH STATUS</div>
                <div style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>Last updated: Feb 2026. Sources: Web research (fractional CMO pricing, AI GTM tools, agency landscape), Nemke conversation, ICONIQ 2025 B2B SaaS Report (205 GTM execs), GTMfund 2026 predictions. Confidence: MEDIUM -- needs validation through real client conversations.</div>
            </Card>

            <div style={{ fontSize: 11, fontWeight: 700, color: C.textFaint, letterSpacing: "0.1em", marginBottom: 8, marginTop: 20 }}>THE GAP WE EXPLOIT</div>
            <Card style={{ borderColor: "rgba(16,185,129,0.2)" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.primary, marginBottom: 8 }}>{MARKET_INTEL.gap}</div>
            </Card>

            <div style={{ fontSize: 11, fontWeight: 700, color: C.textFaint, letterSpacing: "0.1em", marginBottom: 8, marginTop: 20 }}>COMPETITIVE LANDSCAPE</div>
            {COMPETITORS.map((c, i) => (
                <Card key={i} onClick={() => setHubExpanded(hubExpanded === `comp-${i}` ? null : `comp-${i}`)} style={{ cursor: "pointer", borderColor: hubExpanded === `comp-${i}` ? `${c.color}40` : C.border }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: hubExpanded === `comp-${i}` ? c.color : C.text }}>{c.category}</span>
                        <HubBadge text={c.threat} color={c.color} />
                        <span style={{ marginLeft: "auto", fontSize: 11, color: C.textMuted }}>{c.pricing}</span>
                    </div>
                    <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4 }}>{c.examples}</div>
                    {hubExpanded === `comp-${i}` && (
                        <div style={{ marginTop: 12 }} onClick={e => e.stopPropagation()}>
                            <div style={{ marginBottom: 10 }}>
                                <div style={{ fontSize: 10, fontWeight: 700, color: C.textFaint, marginBottom: 3 }}>STRENGTHS</div>
                                <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>{c.strengths}</div>
                            </div>
                            <div style={{ marginBottom: 10 }}>
                                <div style={{ fontSize: 10, fontWeight: 700, color: "#ef4444", marginBottom: 3 }}>WEAKNESSES</div>
                                <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>{c.weaknesses}</div>
                            </div>
                            <div style={{ padding: "10px 14px", background: `${C.primary}10`, border: `1px solid rgba(16,185,129,0.2)`, borderRadius: 8 }}>
                                <div style={{ fontSize: 10, fontWeight: 700, color: C.primary, marginBottom: 3 }}>SLEEVE CLOUD ADVANTAGE</div>
                                <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>{c.sleeve_advantage}</div>
                            </div>
                        </div>
                    )}
                </Card>
            ))}

            <div style={{ fontSize: 11, fontWeight: 700, color: C.textFaint, letterSpacing: "0.1em", marginBottom: 8, marginTop: 20 }}>MARKET TRENDS</div>
            <Card>
                {MARKET_INTEL.trends.map((t, i) => (
                    <div key={i} style={{ padding: "8px 0", borderBottom: i < MARKET_INTEL.trends.length - 1 ? `1px solid ${C.border}` : "none", fontSize: 12, color: C.text, lineHeight: 1.6 }}>
                        <span style={{ color: C.primary, fontWeight: 700, marginRight: 6 }}>{i + 1}.</span>{t}
                    </div>
                ))}
            </Card>

            <div style={{ fontSize: 11, fontWeight: 700, color: C.textFaint, letterSpacing: "0.1em", marginBottom: 8, marginTop: 20 }}>NEMKE CONVERSATION INSIGHTS</div>
            <Card style={{ borderColor: "rgba(245,158,11,0.25)" }}>
                <div style={{ fontSize: 12, color: C.text, lineHeight: 1.8, whiteSpace: "pre-line" }}>{MARKET_INTEL.nemke_insight}</div>
            </Card>
        </div>
    );

    // ================================================================
    // RESEARCH AGENT TAB - Reusable methodology + prompt
    // ================================================================

    const renderResearch = () => (
        <div>
            <Card style={{ borderColor: "rgba(16,185,129,0.2)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.primary, letterSpacing: "0.1em", marginBottom: 6 }}>RESEARCH AGENT v0.1</div>
                <div style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>This is your reusable ICP and competitive research methodology. Copy the prompt below, paste it into Claude.ai, and run it. Re-run monthly or when kill criteria trigger.</div>
                <div style={{ fontSize: 11, color: C.textMuted, marginTop: 6 }}>As you get real client data (Week 3+), feed it back into this agent. It gets better with every client conversation.</div>
            </Card>

            <div style={{ fontSize: 11, fontWeight: 700, color: C.textFaint, letterSpacing: "0.1em", marginBottom: 8, marginTop: 20 }}>THE 5-STEP METHODOLOGY</div>
            {[
                { step: "1", title: "Competitive Landscape Scan", desc: "Search for done-for-you GTM services, AI GTM agencies, fractional CMO pricing. For each competitor: name, pricing, target customer, what they deliver, how they measure results, visible weaknesses.", color: "#ef4444" },
                { step: "2", title: "ICP Validation", desc: "Search for B2B SaaS founder GTM challenges at your target ARR range. Extract: common pain points, what they tried and failed, budget range, decision triggers.", color: "#f59e0b" },
                { step: "3", title: "Pricing Intelligence", desc: "Map the pricing landscape. What exists at each price point? Where are the gaps? What does your pricing compete against directly?", color: "#6366f1" },
                { step: "4", title: "Positioning Gaps", desc: "Cross-reference competitors against ICP pain points. What is unaddressed? Where do competitors over-promise? What language do ICPs actually use?", color: "#8b5cf6" },
                { step: "5", title: "Output + Update", desc: "Update context, competitors, and positioning in the hub. Flag any kill criteria triggers. Every claim needs a source URL.", color: "#10b981" },
            ].map((s, i) => (
                <Card key={i}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 6, background: `${s.color}20`, color: s.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, flexShrink: 0 }}>{s.step}</div>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{s.title}</div>
                            <div style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.6, marginTop: 2 }}>{s.desc}</div>
                        </div>
                    </div>
                </Card>
            ))}

            <div style={{ fontSize: 11, fontWeight: 700, color: C.textFaint, letterSpacing: "0.1em", marginBottom: 8, marginTop: 20 }}>COPY THE FULL PROMPT</div>
            <Card style={{ borderColor: "rgba(16,185,129,0.2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.primary }}>RESEARCH AGENT PROMPT</div>
                    <button onClick={() => { try { const ta = document.createElement("textarea"); ta.value = RESEARCH_AGENT_PROMPT; ta.style.position = "fixed"; ta.style.left = "-9999px"; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); } catch (e) { } setResearchCopied(true); setTimeout(() => setResearchCopied(false), 2000); }} style={{ padding: "6px 14px", background: researchCopied ? C.primary : "transparent", border: "1px solid " + C.primary, borderRadius: 6, color: researchCopied ? "#fff" : C.primary, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                        {researchCopied ? "Copied!" : "Copy Prompt"}
                    </button>
                </div>
                <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 8, padding: 14, fontSize: 11, color: C.textMuted, lineHeight: 1.7, whiteSpace: "pre-wrap", maxHeight: 400, overflow: "auto", fontFamily: "monospace" }}>{RESEARCH_AGENT_PROMPT}</div>
            </Card>

            <div style={{ fontSize: 11, fontWeight: 700, color: C.textFaint, letterSpacing: "0.1em", marginBottom: 8, marginTop: 20 }}>EVOLUTION ROADMAP</div>
            {[
                { phase: "v0.1 (NOW)", desc: "Manual -- copy prompt into Claude.ai, review output, update hub manually.", status: "ACTIVE" },
                { phase: "v0.2 (Week 4)", desc: "Feed real client data from first teardown. Agent improves with actual signals.", status: "NEXT" },
                { phase: "v0.3 (Week 6+)", desc: "Agent writes to Supabase. Research runs stored, confidence scored, freshness tracked.", status: "PLANNED" },
                { phase: "v1.0 (Month 3+)", desc: "Scheduled runs. Signal-based triggers. Auto-flagging when market shifts.", status: "FUTURE" },
            ].map((p, i) => (
                <Card key={i} style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{p.phase}</div>
                        <HubBadge text={p.status} color={p.status === "ACTIVE" ? "#10b981" : p.status === "NEXT" ? "#f59e0b" : "#6366f1"} />
                    </div>
                    <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4 }}>{p.desc}</div>
                </Card>
            ))}

            <div style={{ fontSize: 11, fontWeight: 700, color: C.textFaint, letterSpacing: "0.1em", marginBottom: 8, marginTop: 20 }}>DATABASE INTEGRATION TRIGGERS</div>
            {[
                { trigger: "First teardown sold", action: "Run Supabase migration (15 min). Store client in companies table. Manual entry.", status: "WAITING" },
                { trigger: "Client #2", action: "Start storing research_runs so agent outputs don't disappear between sessions.", status: "WAITING" },
                { trigger: "Client #3", action: "framework_applications table becomes critical (reusing frameworks across clients).", status: "WAITING" },
                { trigger: "Client #5", action: "Build basic dashboard reading from Supabase. Now multi-tenant is justified.", status: "FUTURE" },
            ].map((d, i) => (
                <Card key={`db-${i}`} style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{d.trigger}</div>
                        <HubBadge text={d.status} color={d.status === "WAITING" ? "#f59e0b" : "#6366f1"} />
                    </div>
                    <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4 }}>{d.action}</div>
                </Card>
            ))}
        </div>
    );

    const renderIntake = () => {
        const sections = [...new Set(INTAKE_QUESTIONS.map(q => q.section))];
        const filtered = intakeSection === "all" ? INTAKE_QUESTIONS : INTAKE_QUESTIONS.filter(q => q.section === intakeSection);

        const copyAllQuestions = () => {
            const text = sections.map(section => {
                const qs = INTAKE_QUESTIONS.filter(q => q.section === section);
                return `## ${section}\n\n${qs.map(q => `${q.id}. ${q.q}${q.required ? ' *' : ''}\n${q.type === 'select' || q.type === 'multi' ? ` Options: ${q.options.join(', ')}\n` : ''}${q.example ? ` Example: ${q.example}\n` : ''}`).join('\n')}`;
            }).join('\n\n');
            copyToClipboard(text, 'all_questions');
        };

        const copyExtractionPrompt = () => {
            copyToClipboard(INTAKE_EXTRACTOR, 'extraction_prompt');
        };

        const copyClientPrompt = () => {
            copyToClipboard(CLIENT_INTAKE_PROMPT, 'client_prompt');
        };

        return (
            <div>
                <Card style={{ borderColor: C.primaryBorder }}>
                    <div style={{ marginBottom: 16 }}>
                        <div style={{ fontSize: 18, fontWeight: 700 }}>Client Intake Questions</div>
                        <div style={{ fontSize: 13, color: C.textMuted }}>56 questions across 12 sections — copy for Tally/Typeform or use the extraction prompt</div>
                    </div>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        <button onClick={copyAllQuestions} style={{ padding: "12px 20px", background: C.primaryBg, border: `1px solid ${C.primaryBorder}`, borderRadius: 8, color: C.primary, fontSize: 14, fontWeight: 600, cursor: "pointer", flex: 1, minWidth: 200 }}>
                            {copied === 'all_questions' ? 'Copied!' : 'Copy All 56 Questions (Formatted)'}
                        </button>
                        <button onClick={copyExtractionPrompt} style={{ padding: "12px 20px", background: "rgba(245, 158, 11, 0.1)", border: "1px solid rgba(245, 158, 11, 0.3)", borderRadius: 8, color: "#f59e0b", fontSize: 14, fontWeight: 600, cursor: "pointer", flex: 1, minWidth: 200 }}>
                            {copied === 'extraction_prompt' ? 'Copied!' : 'Copy Extraction Prompt (You Run)'}
                        </button>
                        <button onClick={copyClientPrompt} style={{ padding: "12px 20px", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: 8, color: "#10b981", fontSize: 14, fontWeight: 600, cursor: "pointer", flex: 1, minWidth: 200 }}>
                            {copied === 'client_prompt' ? 'Copied!' : 'Copy Client Prompt (Send to Client)'}
                        </button>
                    </div>
                    <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(245, 158, 11, 0.05)", borderRadius: 8, border: "1px solid rgba(245, 158, 11, 0.15)" }}>
                        <div style={{ fontSize: 12, color: C.textMuted }}>
                            <strong style={{ color: "#f59e0b" }}>AI-Assisted Flow:</strong> Copy the extraction prompt, paste into your LLM, then paste your company materials after it. Review the output, correct what it gets wrong, then fill in the form. Questions marked <strong style={{ color: C.primary }}>YOU</strong> need your personal answer — the LLM cannot extract these from documents.
                        </div>
                    </div>
                </Card>

                {/* Section Filter */}
                <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                    <button
                        onClick={() => setIntakeSection("all")}
                        style={{ padding: "6px 14px", background: intakeSection === "all" ? C.primaryBg : "rgba(255,255,255,0.03)", border: `1px solid ${intakeSection === "all" ? C.primaryBorder : C.border}`, borderRadius: 6, color: intakeSection === "all" ? C.primary : C.textMuted, fontSize: 12, cursor: "pointer" }}
                    >
                        All ({INTAKE_QUESTIONS.length})
                    </button>
                    {sections.map(section => (
                        <button
                            key={section}
                            onClick={() => setIntakeSection(section)}
                            style={{ padding: "6px 14px", background: intakeSection === section ? C.primaryBg : "rgba(255,255,255,0.03)", border: `1px solid ${intakeSection === section ? C.primaryBorder : C.border}`, borderRadius: 6, color: intakeSection === section ? C.primary : C.textMuted, fontSize: 12, cursor: "pointer" }}
                        >
                            {section} ({INTAKE_QUESTIONS.filter(q => q.section === section).length})
                        </button>
                    ))}
                </div>

                {/* Questions */}
                {filtered.map((q, i) => (
                    <Card key={q.id} style={{ padding: 16 }}>
                        <div style={{ display: "flex", gap: 12 }}>
                            <div style={{ width: 28, height: 28, borderRadius: 8, background: C.primaryBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: C.primary, flexShrink: 0 }}>{q.id}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>
                                    {q.q} {q.required && <span style={{ color: C.danger }}>*</span>}
                                </div>
                                <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 8, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                                    <Badge text={q.section} color={C.textMuted} bg="rgba(255,255,255,0.05)" />
                                    {q.priority === "core" && <Badge text="CORE" color={C.success} bg={C.successBg} />}
                                    {q.priority === "enhanced" && <Badge text="ENHANCED" color="#a78bfa" bg="rgba(167,139,250,0.1)" />}
                                    {q.youOnly && <Badge text="YOU" color={C.primary} bg={C.primaryBg} />}
                                    <span>{q.type === 'short' ? 'Short text' : q.type === 'long' ? 'Long text' : q.type === 'select' ? 'Select one' : 'Select multiple'}</span>
                                </div>
                                {(q.type === 'select' || q.type === 'multi') && (
                                    <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 6 }}>
                                        <strong>Options:</strong> {q.options.join(' ')}
                                    </div>
                                )}
                                {q.example && (
                                    <div style={{ fontSize: 12, color: C.textMuted, fontStyle: "italic" }}>
                                        <strong>Example:</strong> {q.example}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        )
    };

    const renderOffer = () => (
        <div>
            {/* Wedge Offer */}
            <Card style={{ borderColor: C.warningBg, background: `linear-gradient(135deg, ${C.card} 0%, rgba(245, 158, 11, 0.05) 100%)` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div>
                        <Badge text="WEDGE OFFER" color={C.warning} bg={C.warningBg} />
                        <div style={{ fontSize: 22, fontWeight: 700, marginTop: 8 }}>{OFFER.wedge.name}</div>
                    </div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: C.warning }}>{OFFER.wedge.price}</div>
                </div>
                <div style={{ fontSize: 14, color: C.textMuted, marginBottom: 16 }}>{OFFER.wedge.description}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, marginBottom: 8 }}>INCLUDES:</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                    {OFFER.wedge.includes.map((item, i) => (
                        <div key={i} style={{ fontSize: 13, color: C.text, padding: "6px 0" }}>• {item}</div>
                    ))}
                </div>
                <div style={{ marginTop: 16, padding: "12px", background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
                    <div style={{ fontSize: 12, color: C.textMuted }}><strong>Timeline:</strong> {OFFER.wedge.timeline}</div>
                    <div style={{ fontSize: 12, color: C.textMuted }}><strong>Conversion:</strong> {OFFER.wedge.conversion}</div>
                </div>
            </Card>

            {/* Pilot Offer */}
            <Card style={{ borderColor: C.successBorder, background: C.successBg }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div>
                        <Badge text={`FIRST ${OFFER.pilotOffer.slots} ONLY`} color={C.success} bg="rgba(16, 185, 129, 0.2)" />
                        <div style={{ fontSize: 18, fontWeight: 700, marginTop: 8 }}>{OFFER.pilotOffer.name}</div>
                    </div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: C.success }}>{OFFER.pilotOffer.price}<span style={{ fontSize: 14, fontWeight: 400 }}>/mo</span></div>
                </div>
                <div style={{ fontSize: 13, color: C.text, marginBottom: 8 }}>{OFFER.pilotOffer.description}</div>
                <div style={{ fontSize: 12, color: C.textMuted }}><strong>Requirement:</strong> {OFFER.pilotOffer.requirement}</div>
            </Card>

            {/* Tiers */}
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, marginTop: 24 }}>PRICING TIERS</div>
            {OFFER.tiers.map((tier, i) => (
                <Card key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <div>
                            <div style={{ fontSize: 18, fontWeight: 700 }}>{tier.name}</div>
                            <div style={{ fontSize: 12, color: C.textMuted }}>{tier.commitment}</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 24, fontWeight: 700, color: C.primary }}>{tier.price}</div>
                        </div>
                    </div>
                    <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 12 }}>{tier.description}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.textMuted, marginBottom: 8 }}>INCLUDES:</div>
                    {tier.includes.map((item, j) => (
                        <div key={j} style={{ fontSize: 13, color: C.text, padding: "4px 0" }}>• {item}</div>
                    ))}
                    <div style={{ marginTop: 12, padding: "8px 12px", background: C.primaryBg, borderRadius: 6, fontSize: 12 }}>
                        <strong style={{ color: C.primary }}>Best for:</strong> <span style={{ color: C.text }}>{tier.bestFor}</span>
                    </div>
                </Card>
            ))}
        </div>
    );

    const renderFunnel = () => (
        <div>
            <Card style={{ borderColor: C.primaryBorder }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 20 }}>THE FUNNEL</div>
                {FUNNEL.map((stage, i) => (
                    <div key={i} style={{ marginBottom: 16 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                            <div style={{ width: `${stage.pct * 0.5 + 20}%`, minWidth: 100, maxWidth: "50%", height: 40, borderRadius: 8, background: `${stage.color}30`, border: `1px solid ${stage.color}50`, display: "flex", alignItems: "center", padding: "0 12px" }}>
                                <span style={{ fontSize: 13, fontWeight: 700, color: stage.color }}>{stage.name}</span>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 12, color: C.text }}>{stage.desc}</div>
                                <div style={{ fontSize: 11, color: C.textMuted }}>
                                    {stage.metric}: <span style={{ color: C.success, fontWeight: 600 }}>{stage.target}</span> <span style={{ color: C.primary }}>{stage.people} people</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Card>

            <Card>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>CONVERSION MATH</div>
                <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.8 }}>
                    <div>{"1,000 impressions → 50 calls (5%) → 15 teardowns (30%) → 8 pilots (50%) → 6 retained (75%)"}</div>
                    <div style={{ marginTop: 12, padding: "12px", background: C.primaryBg, borderRadius: 8 }}>
                        <strong style={{ color: C.primary }}>At $4K average MRR per client:</strong><br />
                        6 retained clients = <span style={{ color: C.success, fontWeight: 700 }}>$24K MRR</span>
                    </div>
                </div>
            </Card>
        </div>
    );

    const renderPhases = () => (
        <div>
            {PHASES.map((phase, i) => {
                const progress = phaseProgress[i];
                const isActive = i === currentPhase;

                return (
                    <Card key={i} style={{ borderColor: isActive ? C.primaryBorder : C.border }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ fontSize: 18, fontWeight: 700, color: isActive ? C.primary : C.text }}>P{i}: {phase.name}</span>
                                {isActive && <Badge text="CURRENT" />}
                                {progress.pct === 100 && <Badge text="DONE" color={C.success} bg={C.successBg} />}
                            </div>
                            <span style={{ fontSize: 20, fontWeight: 700, color: progress.pct === 100 ? C.success : C.text }}>{progress.pct}%</span>
                        </div>

                        <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 8 }}>{phase.tag} {progress.done}/{progress.total}</div>
                        <ProgressBar pct={progress.pct} color={progress.pct === 100 ? C.success : C.primary} />

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12, marginBottom: 12 }}>
                            <div style={{ padding: "8px 10px", background: C.successBg, borderRadius: 6, fontSize: 11 }}>
                                <span style={{ color: C.success, fontWeight: 600 }}>OBJ: </span>
                                <span style={{ color: C.text }}>{phase.objective}</span>
                            </div>
                            <div style={{ padding: "8px 10px", background: C.dangerBg, borderRadius: 6, fontSize: 11 }}>
                                <span style={{ color: C.danger, fontWeight: 600 }}>KILL: </span>
                                <span style={{ color: C.text }}>{phase.kill}</span>
                            </div>
                        </div>

                        {phase.items.map((item) => {
                            const key = `${i}_${item.key}`;
                            const checked = !!state.checks[key];
                            const hasWorkflow = item.workflow && WORKFLOWS[item.workflow];
                            const isExpanded = expandedTask === key;

                            return (
                                <div key={item.key}>
                                    <div
                                        style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0", borderBottom: `1px solid ${C.border}`, cursor: "pointer" }}
                                    >
                                        <div
                                            onClick={() => toggle(key)}
                                            style={{ width: 20, height: 20, borderRadius: 5, border: `2px solid ${checked ? C.success : "rgba(255,255,255,0.2)"}`, background: checked ? C.successBg : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: C.success, flexShrink: 0, marginTop: 2 }}
                                        >
                                            {checked ? "a" : ""}
                                        </div>
                                        <div
                                            style={{ flex: 1 }}
                                            onClick={() => hasWorkflow && setExpandedTask(isExpanded ? null : key)}
                                        >
                                            <div style={{ fontSize: 14, color: checked ? C.textMuted : C.text, textDecoration: checked ? "line-through" : "none" }}>{item.label}</div>
                                            <div style={{ fontSize: 12, color: C.textFaint }}>{item.owner} {item.note}</div>
                                            {hasWorkflow && (
                                                <div style={{ fontSize: 10, color: C.primary, marginTop: 4 }}>
                                                    {isExpanded ? "▾ Hide instructions" : "▸ Show instructions"}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {isExpanded && hasWorkflow && renderWorkflowSteps(item.workflow)}
                                </div>
                            );
                        })}
                    </Card>
                );
            })}
        </div>
    );

    const renderPlaybooks = () => (
        <div>
            {PLAYBOOKS.map((pb) => {
                const isOpen = expandedPlaybook === pb.id;

                return (
                    <Card key={pb.id} style={{ cursor: "pointer", borderColor: isOpen ? C.primaryBorder : C.border }}>
                        <div onClick={() => setExpandedPlaybook(isOpen ? null : pb.id)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <div style={{ fontSize: 16, fontWeight: 600 }}>
                                    <span style={{ marginRight: 8 }}>{pb.icon}</span>
                                    {pb.title}
                                </div>
                                <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>{pb.when}</div>
                            </div>
                            <span style={{ color: C.textMuted, transform: isOpen ? "rotate(180deg)" : "none", transition: "0.2s" }}>v</span>
                        </div>

                        {isOpen && (
                            <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
                                <div style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, letterSpacing: "0.05em", marginBottom: 8 }}>STEPS</div>
                                {pb.steps.map((step, i) => (
                                    <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
                                        <span style={{ width: 24, height: 24, borderRadius: 6, background: C.primaryBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: C.primary, flexShrink: 0 }}>{i + 1}</span>
                                        <span style={{ fontSize: 13, color: C.text, lineHeight: 1.6 }}>{step}</span>
                                    </div>
                                ))}

                                {pb.templates && pb.templates.length > 0 && (
                                    <div style={{ marginTop: 16 }}>
                                        <div style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, letterSpacing: "0.05em", marginBottom: 8 }}>TEMPLATES</div>
                                        {pb.templates.map((template, i) => (
                                            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "10px 12px", background: "rgba(255,255,255,0.02)", borderRadius: 8, marginBottom: 6 }}>
                                                <span style={{ fontSize: 12, color: C.text, lineHeight: 1.6, flex: 1, marginRight: 8 }}>{template}</span>
                                                <CopyButton text={template} id={`${pb.id}_${i}`} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </Card>
                );
            })}
        </div>
    );

    const renderMetrics = () => (
        <div>
            <Card>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>7 METRICS -- CHECK WEEKLY</div>
                <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 16 }}>Green = on target. Yellow = below target. Red = below kill threshold.</div>
            </Card>

            {METRICS.map((metric) => {
                const value = state.metrics[metric.key];
                const status = !value && value !== 0 ? "none" : value >= metric.target ? "good" : value >= metric.kill ? "warn" : "kill";
                const statusColor = status === "good" ? C.success : status === "warn" ? C.warning : status === "kill" ? C.danger : C.textFaint;

                return (
                    <Card key={metric.key}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, fontWeight: 500 }}>{metric.label}</div>
                                <div style={{ fontSize: 11, color: C.textFaint }}>Target: {metric.target}{metric.unit} Kill: {metric.kill}{metric.unit}</div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <input
                                    type="number"
                                    value={value || ""}
                                    onChange={(e) => save({ ...state, metrics: { ...state.metrics, [metric.key]: e.target.value ? parseFloat(e.target.value) : null } })}
                                    placeholder="--"
                                    style={{ width: 70, padding: "6px 8px", background: "rgba(255,255,255,0.05)", border: `1px solid ${statusColor === C.textFaint ? C.border : statusColor}30`, borderRadius: 6, color: C.text, fontSize: 16, fontWeight: 700, textAlign: "center", outline: "none" }}
                                />
                                <span style={{ fontSize: 12, color: C.textMuted }}>{metric.unit}</span>
                            </div>
                        </div>

                        {status === "kill" && (
                            <div style={{ marginTop: 10, padding: "8px 10px", background: C.dangerBg, borderRadius: 6, fontSize: 12, color: C.danger }}>
                                BELOW KILL -- {metric.fix}
                            </div>
                        )}
                        {status === "warn" && (
                            <div style={{ marginTop: 10, padding: "8px 10px", background: C.warningBg, borderRadius: 6, fontSize: 12, color: C.warning }}>
                                Below target -- {metric.fix}
                            </div>
                        )}
                    </Card>
                );
            })}
        </div>
    );

    const renderRhythm = () => {
        const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
        const dayNames = { monday: "Monday", tuesday: "Tuesday", wednesday: "Wednesday", thursday: "Thursday", friday: "Friday" };
        const today = new Date().getDay();
        const todayKey = today >= 1 && today <= 5 ? days[today - 1] : null;

        return (
            <div>
                <Card style={{ borderColor: C.primaryBorder }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: C.primary, letterSpacing: "0.1em" }}>TODAY</div>
                    <div style={{ fontSize: 24, fontWeight: 700 }}>{todayKey ? dayNames[todayKey] : "Weekend"}</div>
                    {!todayKey && <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>Rest or prep for next week.</div>}
                </Card>

                {days.map((day) => {
                    const isToday = day === todayKey;
                    const isOpen = expandedDay === day;
                    const schedule = WEEKLY_RHYTHM[day];

                    return (
                        <Card key={day} style={{ borderColor: isToday ? C.primaryBorder : C.border }}>
                            <div
                                onClick={() => setExpandedDay(isOpen ? null : day)}
                                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <span style={{ fontSize: 16, fontWeight: 600, color: isToday ? C.primary : C.text }}>{dayNames[day]}</span>
                                    {isToday && <Badge text="TODAY" />}
                                </div>
                                <span style={{ color: C.textMuted, transform: isOpen ? "rotate(180deg)" : "none", transition: "0.2s" }}>v</span>
                            </div>

                            {isOpen && (
                                <div style={{ marginTop: 12 }}>
                                    {schedule.map((block, i) => (
                                        <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < schedule.length - 1 ? `1px solid ${C.border}` : "none" }}>
                                            <div style={{ width: 90, flexShrink: 0, fontSize: 12, fontWeight: 600, color: C.primary }}>{block.time}</div>
                                            <div>
                                                <div style={{ fontSize: 13, color: C.text }}>{block.task}</div>
                                                <div style={{ fontSize: 11, color: C.textFaint }}>{block.note}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card>
                    );
                })}
            </div>
        );
    };

    const renderAgents = () => (
        <div>
            <Card style={{ borderColor: C.primaryBorder }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>AGENT ARCHITECTURE</div>
                <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.7 }}>
                    These prompts power your delivery. Paste client context (Company Sleeve) into the {"{company_sleeve}"} placeholder.
                    Run in Claude. QA the output. Deliver to client.
                </div>
            </Card>

            {Object.entries(AGENT_PROMPTS).map(([key, prompt]) => {
                const names = {
                    competitiveIntel: "Competitive Intel Agent",
                    contentGenerator: "Content Generator Agent",
                    outreachPersonalizer: "Outreach Personalizer Agent",
                    qaReview: "QA Review Agent",
                };
                const icons = {
                    competitiveIntel: "",
                    contentGenerator: "a",
                    outreachPersonalizer: "",
                    qaReview: "a",
                };

                return (
                    <Card key={key}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                            <div style={{ fontSize: 16, fontWeight: 600 }}>
                                <span style={{ marginRight: 8 }}>{icons[key]}</span>
                                {names[key]}
                            </div>
                            <CopyButton text={prompt} id={`agent_${key}`} />
                        </div>
                        <pre style={{ padding: 12, background: "rgba(0,0,0,0.3)", borderRadius: 8, fontSize: 12, color: C.text, lineHeight: 1.6, whiteSpace: "pre-wrap", wordBreak: "break-word", maxHeight: 200, overflow: "auto", border: `1px solid ${C.border}` }}>
                            {prompt}
                        </pre>
                    </Card>
                );
            })}
        </div>
    );

    const renderTools = () => {
        // Calculate costs
        const baseCost = QUEST_CORE_TOOLS.filter(t => t.required).reduce((sum, t) => sum + t.cost, 0);
        const optCost = QUEST_CORE_TOOLS.filter(t => !t.required && questOwnedTools.has(t.id)).reduce((sum, t) => sum + t.cost, 0);
        const slotCost = QUEST_TOOL_SLOTS.reduce((sum, slot) => {
            const selected = questGetSelectedToolForSlot(slot.id);
            return sum + (selected?.cost || 0);
        }, 0);
        const totalCost = baseCost + optCost + slotCost;

        return (
            <div>
                {/* Header with total cost */}
                <Card style={{ borderColor: C.warning + "40" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <div style={{ fontSize: 16, fontWeight: 700 }}>Tool Stack Calculator</div>
                            <div style={{ fontSize: 12, color: C.textMuted }}>Configure your tools & see total monthly cost</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 28, fontWeight: 700, color: C.warning }}>${totalCost}<span style={{ fontSize: 14, color: C.textMuted }}>/mo</span></div>
                            <div style={{ fontSize: 11, color: C.success }}>
                                1 pilot covers {totalCost > 0 ? `${Math.floor(2500 / totalCost)} months` : "a"} of tools
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Channel Tools - pick one per slot */}
                <Card>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.primary, marginBottom: 14, letterSpacing: "0.03em" }}>
                        CHANNEL TOOLS <span style={{ fontSize: 11, fontWeight: 400, color: C.textMuted }}>(pick one each)</span>
                    </div>

                    {QUEST_TOOL_SLOTS.map(slot => {
                        const selectedId = questSelectedTools[slot.id];
                        const relatedChannel = QUEST_CHANNELS.find(c => c.slot === slot.id);
                        const isChannelActive = relatedChannel ? questActiveChannels.has(relatedChannel.id) : true;

                        return (
                            <div
                                key={slot.id}
                                style={{
                                    padding: 14,
                                    background: "rgba(255,255,255,0.02)",
                                    border: `1px solid ${C.border}`,
                                    borderRadius: 10,
                                    marginBottom: 10,
                                    opacity: isChannelActive ? 1 : 0.5,
                                }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                                    <div style={{ fontSize: 13, fontWeight: 600 }}>{slot.name}</div>
                                    <div style={{
                                        fontSize: 10,
                                        padding: "3px 8px",
                                        background: slot.channelType === "outbound" ? "rgba(99,102,241,0.15)" : C.successBg,
                                        color: slot.channelType === "outbound" ? "#818cf8" : C.success,
                                        borderRadius: 4,
                                        fontWeight: 600,
                                    }}>
                                        {slot.channelType}
                                    </div>
                                </div>

                                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                    {slot.options.map(option => {
                                        const isSelected = selectedId === option.id;
                                        return (
                                            <button
                                                key={option.id}
                                                onClick={() => questSelectTool(slot.id, option.id)}
                                                style={{
                                                    padding: "8px 12px",
                                                    background: isSelected ? C.primaryBg : "rgba(255,255,255,0.03)",
                                                    border: `1px solid ${isSelected ? C.primaryBorder : C.border}`,
                                                    borderRadius: 8,
                                                    color: isSelected ? C.primary : C.textMuted,
                                                    fontSize: 12,
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 6,
                                                    transition: "all 0.15s ease",
                                                }}
                                            >
                                                <span>{option.icon}</span>
                                                <span>{option.name}</span>
                                                <span style={{
                                                    marginLeft: 4,
                                                    color: option.cost > 0 ? C.warning : C.success,
                                                    fontWeight: 600,
                                                }}>
                                                    {option.cost > 0 ? `$${option.cost}` : "Free"}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </Card>

                {/* Core Tools - required */}
                <Card>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.success, marginBottom: 14, letterSpacing: "0.03em" }}>
                        CORE TOOLS <span style={{ fontSize: 11, fontWeight: 400, color: C.textMuted }}>(required)</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        {QUEST_CORE_TOOLS.filter(t => t.required).map(tool => (
                            <div
                                key={tool.id}
                                style={{
                                    padding: 12,
                                    background: "rgba(255,255,255,0.02)",
                                    border: `1px solid ${C.border}`,
                                    borderRadius: 10,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                }}
                            >
                                <span style={{ fontSize: 18 }}>{tool.icon}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 13, fontWeight: 600 }}>{tool.name}</div>
                                    <div style={{ fontSize: 10, color: C.textMuted }}>{tool.note}</div>
                                </div>
                                <div style={{ fontSize: 12, color: tool.cost > 0 ? C.warning : C.success, fontWeight: 600 }}>
                                    {tool.cost > 0 ? `$${tool.cost}` : "Free"}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Optional Tools - toggleable */}
                <Card>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.textMuted, marginBottom: 14, letterSpacing: "0.03em" }}>
                        + OPTIONAL TOOLS <span style={{ fontSize: 11, fontWeight: 400 }}>(click to toggle)</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        {QUEST_CORE_TOOLS.filter(t => !t.required).map(tool => {
                            const owned = questOwnedTools.has(tool.id);
                            return (
                                <div
                                    key={tool.id}
                                    onClick={() => questToggleTool(tool.id)}
                                    style={{
                                        padding: 12,
                                        background: owned ? C.primaryBg : "rgba(255,255,255,0.02)",
                                        border: `1px solid ${owned ? C.primaryBorder : C.border}`,
                                        borderRadius: 10,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        cursor: "pointer",
                                        opacity: owned ? 1 : 0.6,
                                        transition: "all 0.15s ease",
                                    }}
                                >
                                    <span style={{ fontSize: 18 }}>{tool.icon}</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 13, fontWeight: 600 }}>{tool.name}</div>
                                        <div style={{ fontSize: 10, color: C.textMuted }}>{tool.note}</div>
                                    </div>
                                    <div style={{ fontSize: 12, color: tool.cost > 0 ? C.warning : C.success, fontWeight: 600 }}>
                                        {tool.cost > 0 ? `$${tool.cost}` : "Free"}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>

                {/* Cost Summary */}
                <Card style={{ background: "rgba(245, 158, 11, 0.05)", borderColor: C.warning + "30" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.warning, marginBottom: 14 }}> COST BREAKDOWN</div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 13, color: C.textMuted }}>Core tools (required)</span>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>${baseCost}/mo</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 13, color: C.textMuted }}>Channel tools (selected)</span>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>${slotCost}/mo</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                        <span style={{ fontSize: 13, color: C.textMuted }}>Optional tools (enabled)</span>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>${optCost}/mo</span>
                    </div>
                    <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: 15, fontWeight: 700 }}>Total Monthly Burn</span>
                            <span style={{ fontSize: 24, fontWeight: 700, color: C.warning }}>${totalCost}/mo</span>
                        </div>
                    </div>

                    {/* ROI calculation */}
                    <div style={{ marginTop: 16, padding: 14, background: C.successBg, borderRadius: 10, border: `1px solid ${C.successBorder}` }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: C.success, marginBottom: 8 }}> ROI MATH</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                            <div>
                                <div style={{ fontSize: 10, color: C.textMuted }}>1 Teardown</div>
                                <div style={{ fontSize: 14, fontWeight: 700 }}>= {totalCost > 0 ? Math.floor(1500 / totalCost) : "a"} months</div>
                            </div>
                            <div>
                                <div style={{ fontSize: 10, color: C.textMuted }}>1 Pilot</div>
                                <div style={{ fontSize: 14, fontWeight: 700 }}>= {totalCost > 0 ? Math.floor(2500 / totalCost) : "a"} months</div>
                            </div>
                            <div>
                                <div style={{ fontSize: 10, color: C.textMuted }}>Break-even</div>
                                <div style={{ fontSize: 14, fontWeight: 700, color: C.success }}>{totalCost > 0 ? `$${totalCost * 12}/yr` : "$0"}</div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        );
    };


    // ========================================
    // RENDER WORKFLOW STEPS -- Shows instructions when you click a task
    // ========================================

    const renderWorkflowSteps = (workflowId) => {
        const workflow = WORKFLOWS[workflowId];
        if (!workflow) return null;

        const copyText = (text, copyId) => {
            try {
                const ta = document.createElement("textarea");
                ta.value = text;
                ta.style.position = "fixed";
                ta.style.left = "-9999px";
                document.body.appendChild(ta);
                ta.select();
                document.execCommand("copy");
                document.body.removeChild(ta);
            } catch (e) { }
            setCopied(copyId);
            setTimeout(() => setCopied(null), 2000);
        };

        return (
            <div style={{ marginTop: 16, padding: 16, background: "rgba(20, 184, 166, 0.05)", borderRadius: 12, border: "1px solid rgba(20, 184, 166, 0.15)" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.primary, marginBottom: 4 }}>{workflow.title}</div>
                <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 16 }}>{workflow.time} -- Output: {workflow.output}</div>

                {workflow.steps.map((step) => {
                    const promptId = "p_" + workflowId + "_" + step.id;

                    return (
                        <div key={step.id} style={{ marginBottom: 16, padding: 16, background: C.card, borderRadius: 10, border: "1px solid " + C.border }}>

                            {/* Step header */}
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                                <div style={{ width: 28, height: 28, borderRadius: 8, background: C.primaryBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: C.primary, flexShrink: 0 }}>{step.id}</div>
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 600 }}>{step.name}</div>
                                    {step.framework && <div style={{ fontSize: 11, color: C.primary, marginTop: 4 }}>{step.framework}</div>}
                                </div>
                            </div>

                            {/* EXAMPLES - click any row to copy */}
                            {step.templates && step.templates.length > 0 && (
                                <div style={{ marginBottom: 14 }}>
                                    <div style={{ fontSize: 10, fontWeight: 700, color: C.textFaint, letterSpacing: "0.08em", marginBottom: 8 }}>EXAMPLES -- click to copy, then edit to fit</div>
                                    {(Array.isArray(step.templates) ? step.templates : []).map((t, j) => {
                                        const tId = "t_" + workflowId + "_" + step.id + "_" + j;
                                        const tText = typeof t === "string" ? t : JSON.stringify(t);
                                        const isCopied = copied === tId;
                                        return (
                                            <div key={j} onClick={() => copyText(tText, tId)} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, padding: "10px 14px", background: isCopied ? "rgba(20,184,166,0.12)" : "rgba(255,255,255,0.03)", borderRadius: 8, marginBottom: 6, cursor: "pointer", border: isCopied ? "1px solid rgba(20,184,166,0.3)" : "1px solid transparent", transition: "all 0.15s" }}>
                                                <div style={{ flex: 1, fontSize: 13, color: C.text, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{tText}</div>
                                                <span style={{ fontSize: 10, fontWeight: 600, color: isCopied ? C.primary : C.textFaint, flexShrink: 0, padding: "2px 0" }}>{isCopied ? "Copied!" : "Click to copy"}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* AI PROMPT - copy bar + preview */}
                            {step.prompt && (
                                <div>
                                    <div
                                        onClick={() => copyText(step.prompt, promptId)}
                                        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: copied === promptId ? "rgba(20,184,166,0.15)" : "rgba(245,158,11,0.08)", border: copied === promptId ? "1px solid rgba(20,184,166,0.3)" : "1px solid rgba(245,158,11,0.25)", borderRadius: 8, cursor: "pointer", transition: "all 0.15s", marginBottom: 8 }}
                                    >
                                        <div>
                                            <div style={{ fontSize: 11, fontWeight: 700, color: copied === promptId ? C.primary : "#f59e0b", letterSpacing: "0.03em" }}>{copied === promptId ? "COPIED -- now paste into Claude" : "WANT MORE OPTIONS?"}</div>
                                            <div style={{ fontSize: 10, color: C.textMuted, marginTop: 2 }}>{copied === promptId ? "Open a new Claude chat and paste." : "AI prompt generates custom versions for your ICP."}</div>
                                        </div>
                                        <div style={{ padding: "6px 14px", background: copied === promptId ? C.primary : "#f59e0b", borderRadius: 6, fontSize: 11, fontWeight: 700, color: copied === promptId ? "#fff" : "#000", flexShrink: 0, whiteSpace: "nowrap" }}>{copied === promptId ? "Copied!" : "Copy Prompt"}</div>
                                    </div>
                                    <details>
                                        <summary style={{ fontSize: 10, color: C.textFaint, cursor: "pointer" }}>Preview prompt</summary>
                                        <pre style={{ fontSize: 10, color: C.textMuted, whiteSpace: "pre-wrap", lineHeight: 1.5, padding: "10px", background: "rgba(0,0,0,0.2)", borderRadius: 6, marginTop: 6, maxHeight: 150, overflow: "auto" }}>{step.prompt}</pre>
                                    </details>
                                </div>
                            )}

                            {/* Context - hidden by default */}
                            {step.context && (
                                <details style={{ marginTop: 10 }}>
                                    <summary style={{ fontSize: 10, color: C.textFaint, cursor: "pointer" }}>View context data</summary>
                                    <div style={{ fontSize: 11, color: C.textMuted, whiteSpace: "pre-wrap", lineHeight: 1.6, padding: "10px", background: "rgba(0,0,0,0.2)", borderRadius: 6, marginTop: 6 }}>{step.context}</div>
                                </details>
                            )}

                            {/* YOUR PICK - save the winner */}
                            <YourPick
                                outputKey={workflowId + "_" + step.id}
                                savedValue={(state.outputs && state.outputs[workflowId + "_" + step.id]) || ""}
                                onSave={(val) => save({ ...state, outputs: { ...state.outputs, [workflowId + "_" + step.id]: val } })}
                                colors={C}
                            />
                        </div>
                    );
                })}

                {/* COMPILE -- linear flow: your work → review → build */}
                {(() => {
                    const contentSteps = workflow.steps.filter(s => s.name !== "Expert Review");
                    const drafts = contentSteps.map(s => ({
                        name: s.name,
                        value: (state.outputs && state.outputs[workflowId + "_" + s.id]) || ""
                    }));
                    const filledDrafts = drafts.filter(p => p.value.trim().length > 0);
                    if (filledDrafts.length === 0) return null;

                    const draftCompiled = filledDrafts.map(p => "## " + p.name + "\n" + p.value).join("\n\n");
                    const reviewedKey = workflowId + "_reviewed";
                    const reviewedValue = (state.outputs && state.outputs[reviewedKey]) || "";
                    const hasReviewed = reviewedValue.trim().length > 0;
                    const finalCopy = hasReviewed ? reviewedValue : draftCompiled;

                    const reviewPrompt = PROMPT_CONTEXT + "\n\nI have drafted the following landing page sections. Review the COMPLETE page as a whole -- not individual sections.\n\n" + draftCompiled + "\n\nREVIEW AS A PANEL:\n- ICP Expert: Does every section speak to our specific buyer? Any section feel generic?\n- Copy Expert: Cut anything you could delete without losing meaning. Flag any line a competitor could use unchanged.\n- Differentiation Expert: Would any section make sense from a fractional CMO or agency? If yes, rewrite it.\n- Conversion Expert: Does the full page create momentum from headline to CTA? Where does energy drop?\n- Flow Expert: Do sections connect naturally? Any jarring transitions or repetition?\n\nFor each section, score 1-10. Rewrite any section scoring below 9. Deliver the complete revised page.\nEnd with: Panel: ICP X | Copy X | Diff X | Conv X | Flow X";

                    const buildPrompt = PROMPT_CONTEXT + "\n\nBuild a single-page landing page using the following approved copy. Make it a clean, modern, high-converting page.\n\n" + finalCopy + "\n\nREQUIREMENTS:\n- Single HTML file with inline CSS, no external dependencies\n- Mobile-responsive\n- Dark theme (background #0a0f1a, text white/gray, accent teal #14b8a6)\n- Sections in order as provided\n- Sticky CTA button\n- Clean typography, generous whitespace\n- No stock photos, use simple icons or none\n- Include a simple footer with copyright";

                    const reviewBtnId = "review_" + workflowId;
                    const buildBtnId = "build_" + workflowId;

                    return (
                        <div style={{ marginTop: 8 }}>

                            {/* STEP A: YOUR WORK */}
                            <div style={{ padding: 16, background: "rgba(16,185,129,0.06)", borderRadius: "12px 12px 0 0", border: "1px solid rgba(16,185,129,0.2)", borderBottom: "none" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: C.success }}>A. YOUR WORK</div>
                                        <div style={{ fontSize: 11, color: C.textMuted }}>{filledDrafts.length} of {drafts.length} sections</div>
                                    </div>
                                </div>
                                {filledDrafts.map((p, i) => (
                                    <div key={i} style={{ marginBottom: 8, padding: "8px 12px", background: "rgba(0,0,0,0.2)", borderRadius: 6 }}>
                                        <div style={{ fontSize: 10, fontWeight: 700, color: C.success, letterSpacing: "0.05em", marginBottom: 3 }}>{p.name.toUpperCase()}</div>
                                        <div style={{ fontSize: 12, color: C.text, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{p.value}</div>
                                    </div>
                                ))}
                                <div onClick={() => copyText(reviewPrompt, reviewBtnId)} style={{ marginTop: 12, padding: "12px 14px", background: copied === reviewBtnId ? C.primary : "rgba(245,158,11,0.08)", borderRadius: 8, cursor: "pointer", border: "1px solid " + (copied === reviewBtnId ? C.primary : "rgba(245,158,11,0.25)"), textAlign: "center" }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: copied === reviewBtnId ? "#fff" : "#f59e0b" }}>{copied === reviewBtnId ? "Copied! Paste into Claude." : "Copy Review Prompt"}</div>
                                    <div style={{ fontSize: 10, color: copied === reviewBtnId ? "rgba(255,255,255,0.7)" : C.textMuted, marginTop: 2 }}>Includes all your sections + expert panel instructions</div>
                                </div>
                            </div>

                            {/* STEP B: PASTE REVIEWED COPY */}
                            <div style={{ padding: 16, background: "rgba(245,158,11,0.04)", border: "1px solid rgba(245,158,11,0.15)", borderBottom: "none" }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: "#f59e0b", marginBottom: 4 }}>B. PASTE REVIEWED COPY</div>
                                <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 10 }}>Run the review prompt above, then paste Claude's revised output here.</div>
                                <YourPick
                                    outputKey={reviewedKey}
                                    savedValue={reviewedValue}
                                    onSave={(val) => save({ ...state, outputs: { ...state.outputs, [reviewedKey]: val } })}
                                    colors={C}
                                />
                            </div>

                            {/* STEP C: BUILD */}
                            <div style={{ padding: 16, background: hasReviewed ? "rgba(20,184,166,0.06)" : "rgba(255,255,255,0.02)", borderRadius: "0 0 12px 12px", border: "1px solid " + (hasReviewed ? "rgba(20,184,166,0.2)" : "rgba(255,255,255,0.08)") }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: hasReviewed ? C.primary : C.textFaint, marginBottom: 4 }}>C. BUILD THE PAGE</div>
                                <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 10 }}>{hasReviewed ? "Reviewed copy ready. Copy the build prompt and paste into a new Claude chat." : "Paste your reviewed copy above first. Or build from drafts if you want to skip review."}</div>
                                <div onClick={() => copyText(buildPrompt, buildBtnId)} style={{ padding: "12px 14px", background: copied === buildBtnId ? C.primary : (hasReviewed ? "rgba(20,184,166,0.08)" : "rgba(255,255,255,0.03)"), borderRadius: 8, cursor: "pointer", border: "1px solid " + (copied === buildBtnId ? C.primary : (hasReviewed ? "rgba(20,184,166,0.25)" : "rgba(255,255,255,0.1)")), textAlign: "center" }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: copied === buildBtnId ? "#fff" : (hasReviewed ? C.primary : C.textFaint) }}>{copied === buildBtnId ? "Copied! Paste into a new Claude chat." : "Copy Build Prompt"}</div>
                                    <div style={{ fontSize: 10, color: copied === buildBtnId ? "rgba(255,255,255,0.7)" : C.textMuted, marginTop: 2 }}>{hasReviewed ? "Uses your reviewed copy" : "Uses draft sections (no review)"}</div>
                                </div>
                            </div>

                        </div>
                    );
                })()}
            </div>
        );
    };

    // ========================================
    // RENDER FRAMEWORKS -- 47 GTM Frameworks searchable reference
    // ========================================

    const renderFrameworks = () => {
        const filtered = FRAMEWORKS.filter(fw => {
            const matchSearch = !fwFilter ||
                fw.name.toLowerCase().includes(fwFilter.toLowerCase()) ||
                fw.rule.toLowerCase().includes(fwFilter.toLowerCase()) ||
                String(fw.n).includes(fwFilter);
            const matchCat = fwCat === "all" || fw.cat === fwCat;
            return matchSearch && matchCat;
        });

        return (
            <div>
                <Card style={{ borderColor: C.primaryBorder }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.primary, marginBottom: 8 }}>47 GTM FRAMEWORKS</div>
                    <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6 }}>
                        Hormozi, Brunson, Killan -- battle-tested frameworks. Each task in the OS references these.
                        Click any framework to see its rule, when to use it, and action steps.
                    </div>
                </Card>

                <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                    <input
                        value={fwFilter}
                        onChange={e => setFwFilter(e.target.value)}
                        placeholder="Search by name, number, or keyword..."
                        style={{ flex: 1, minWidth: 180, padding: "10px 14px", background: "rgba(255,255,255,0.03)", border: "1px solid " + C.border, borderRadius: 8, color: C.text, fontSize: 13, outline: "none" }}
                    />
                    {["all", "offer", "copy", "funnel", "growth"].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFwCat(cat)}
                            style={{
                                padding: "8px 14px",
                                background: fwCat === cat ? C.primaryBg : "rgba(255,255,255,0.02)",
                                border: "1px solid " + (fwCat === cat ? C.primaryBorder : C.border),
                                borderRadius: 8,
                                color: fwCat === cat ? C.primary : C.textMuted,
                                fontSize: 12,
                                fontWeight: 500,
                                cursor: "pointer"
                            }}
                        >
                            {cat === "all" ? "All (" + FRAMEWORKS.length + ")" : (CAT_LABELS[cat]?.split(" ")[0] || cat) + " (" + FRAMEWORKS.filter(f => f.cat === cat).length + ")"}
                        </button>
                    ))}
                </div>

                {filtered.map(fw => {
                    const isOpen = expandedFw === fw.n;
                    return (
                        <div
                            key={fw.n}
                            onClick={() => setExpandedFw(isOpen ? null : fw.n)}
                            style={{
                                padding: "14px 16px",
                                marginBottom: 8,
                                background: isOpen ? C.primaryBg : "rgba(255,255,255,0.02)",
                                border: "1px solid " + (isOpen ? C.primaryBorder : C.border),
                                borderRadius: 10,
                                cursor: "pointer"
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                                <span style={{ width: 28, height: 24, borderRadius: 6, background: C.primaryBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: C.primary, flexShrink: 0 }}>{fw.n}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span style={{ fontSize: 14, fontWeight: 600 }}>{fw.name}</span>
                                        <span style={{ fontSize: 10, padding: "3px 8px", background: "rgba(255,255,255,0.04)", borderRadius: 4, color: C.textMuted }}>{CAT_LABELS[fw.cat]?.split(" ")[0] || fw.cat}</span>
                                    </div>
                                    <div style={{ fontSize: 12, color: isOpen ? C.text : C.textMuted, lineHeight: 1.5, marginTop: 4 }}>{fw.rule}</div>
                                    {!isOpen && <div style={{ fontSize: 11, color: C.textFaint, marginTop: 4 }}>📌 {fw.when}</div>}
                                </div>
                            </div>

                            {isOpen && (
                                <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid " + C.border }}>
                                    {fw.source && <div style={{ fontSize: 11, color: C.textFaint, marginBottom: 10 }}>Source: {fw.source}</div>}
                                    <div style={{ fontSize: 12, color: C.text, lineHeight: 1.7, marginBottom: 12 }}>{fw.detail}</div>

                                    {fw.sleeve && (
                                        <div style={{ padding: "12px 14px", background: C.primaryBg, borderRadius: 8, marginBottom: 10 }}>
                                            <div style={{ fontSize: 10, fontWeight: 600, color: C.primary, marginBottom: 4 }}>SLEEVE CLOUD APPLICATION</div>
                                            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>{fw.sleeve}</div>
                                        </div>
                                    )}

                                    {fw.action && (
                                        <div style={{ padding: "12px 14px", background: C.successBg, borderRadius: 8 }}>
                                            <div style={{ fontSize: 10, fontWeight: 600, color: C.success, marginBottom: 4 }}>ACTION</div>
                                            <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>{fw.action}</div>
                                        </div>
                                    )}

                                    <div style={{ fontSize: 12, marginTop: 10 }}>
                                        <span style={{ color: C.primary, fontWeight: 600 }}>Use when:</span>{" "}
                                        <span style={{ color: C.text }}>{fw.when}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}

                <div style={{ fontSize: 11, color: C.textFaint, marginTop: 12, textAlign: "center" }}>
                    Showing {filtered.length} of {FRAMEWORKS.length} frameworks
                </div>
            </div>
        );
    };

    // ========================================
    // RENDER JOURNEY -- Customer journey visualization
    // ========================================
    // RENDER JOURNEY -- Customer Journey & Execution Map
    // ========================================

    const renderJourney = () => {
        return (
            <div>
                <style>{`
 @keyframes pulse {
 0%, 100% { opacity: 1; transform: scale(1); }
 50% { opacity: 0.7; transform: scale(1.05); }
 }
 @keyframes flowRight {
 0% { transform: translateX(-100%); opacity: 0; }
 50% { opacity: 1; }
 100% { transform: translateX(100%); opacity: 0; }
 }
 @keyframes flowDown {
 0% { transform: translateY(-100%); opacity: 0; }
 50% { opacity: 1; }
 100% { transform: translateY(100%); opacity: 0; }
 }
 `}</style>

                <Card style={{ borderColor: C.primaryBorder }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: C.primary, marginBottom: 8 }}>CUSTOMER JOURNEY MAP</div>
                            <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6 }}>
                                How prospects become retained clients. Click each stage to see channels, metrics, and your tasks.
                            </div>
                        </div>
                        <button
                            onClick={() => setIsAnimating(!isAnimating)}
                            style={{ padding: "8px 16px", background: isAnimating ? C.primaryBg : "rgba(255,255,255,0.03)", border: "1px solid " + (isAnimating ? C.primaryBorder : C.border), borderRadius: 6, fontSize: 12, color: isAnimating ? C.primary : C.textMuted, cursor: "pointer" }}
                        >
                            {isAnimating ? "⏸ Pause Animation" : "▶ Play Animation"}
                        </button>
                    </div>
                </Card>

                {/* Journey Flow with Animated Stages */}
                <Card>
                    <div style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, letterSpacing: "0.1em", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                        <span></span> CUSTOMER JOURNEY
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                        {CUSTOMER_JOURNEY.map((stage, i) => {
                            const isActive = activeStage === i;
                            const isPast = activeStage > i;
                            const number = FUNNEL_NUMBERS[i];

                            return (
                                <div key={stage.id} style={{ display: "contents" }}>
                                    {/* Stage Card */}
                                    <div
                                        onClick={() => { setActiveStage(i); setIsAnimating(false); }}
                                        style={{
                                            flex: 1,
                                            padding: 16,
                                            background: isActive ? stage.color + "20" : isPast ? "rgba(16, 185, 129, 0.1)" : "rgba(255,255,255,0.02)",
                                            borderRadius: 12,
                                            border: "2px solid " + (isActive ? stage.color : isPast ? C.success : "transparent"),
                                            cursor: "pointer",
                                            position: "relative",
                                            animation: isActive && isAnimating ? "pulse 1.5s ease-in-out infinite" : "none",
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        {/* Number Badge */}
                                        <div style={{
                                            position: "absolute",
                                            top: -10,
                                            right: 10,
                                            padding: "4px 10px",
                                            background: isActive ? stage.color : isPast ? C.success : "rgba(255,255,255,0.1)",
                                            borderRadius: 12,
                                            fontSize: 11,
                                            fontWeight: 700,
                                            color: "#fff",
                                        }}>
                                            {number.toLocaleString()}
                                        </div>

                                        <div style={{ fontSize: 24, marginBottom: 8 }}>{stage.icon}</div>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: isActive ? stage.color : C.text, marginBottom: 4 }}>{stage.name}</div>
                                        <div style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.4 }}>{stage.description}</div>
                                        {stage.conversion && (
                                            <div style={{ fontSize: 10, color: C.success, marginTop: 6, fontWeight: 600 }}>↳ {stage.conversion}</div>
                                        )}
                                    </div>

                                    {/* Connector Arrow */}
                                    {i < CUSTOMER_JOURNEY.length - 1 && (
                                        <div style={{ width: 32, height: 2, background: isPast ? C.success : isActive ? stage.color : "rgba(255,255,255,0.1)", position: "relative", overflow: "hidden" }}>
                                            {isActive && isAnimating && (
                                                <div style={{ position: "absolute", width: 16, height: "100%", background: "linear-gradient(90deg, transparent, " + stage.color + ", transparent)", animation: "flowRight 1s ease-in-out infinite" }} />
                                            )}
                                            <div style={{ position: "absolute", right: -4, top: -3, width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: "6px solid " + (isPast ? C.success : isActive ? stage.color : "rgba(255,255,255,0.1)") }} />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </Card>

                {/* Vertical Connectors to Execution */}
                <div style={{ display: "flex", justifyContent: "space-around", padding: "0 40px", marginBottom: -8, marginTop: -8 }}>
                    {EXECUTION_PHASES_MAP.map((phase, i) => (
                        <div key={phase.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                            <div style={{ width: 2, height: 24, background: "linear-gradient(180deg, " + C.primary + "40, " + C.primary + ")", position: "relative", overflow: "hidden" }}>
                                {isAnimating && (
                                    <div style={{ position: "absolute", width: "100%", height: 10, background: C.primary, animation: "flowDown 1.5s ease-in-out infinite", animationDelay: (i * 0.3) + "s" }} />
                                )}
                            </div>
                            <div style={{ width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "8px solid " + C.primary }} />
                        </div>
                    ))}
                </div>

                {/* Execution Phases */}
                <Card>
                    <div style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, letterSpacing: "0.1em", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                        <span>v</span> YOUR EXECUTION
                    </div>
                    <div style={{ display: "flex", gap: 16 }}>
                        {EXECUTION_PHASES_MAP.map((phase) => {
                            const isRelated = phase.feeds.includes(CUSTOMER_JOURNEY[activeStage]?.id);
                            return (
                                <div
                                    key={phase.id}
                                    style={{
                                        flex: 1,
                                        padding: 20,
                                        background: isRelated ? C.primaryBg : "rgba(255,255,255,0.02)",
                                        borderRadius: 12,
                                        border: "2px solid " + (isRelated ? C.primary : "transparent"),
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    <div style={{ fontSize: 11, fontWeight: 700, color: C.primary, marginBottom: 8, letterSpacing: "0.05em" }}>PHASE {phase.id}</div>
                                    <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: isRelated ? C.primaryLight : C.text }}>{phase.name}</div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                        {phase.tasks.map((task, j) => (
                                            <div key={j} style={{ padding: "8px 12px", background: "rgba(255,255,255,0.03)", borderRadius: 6, fontSize: 12, color: C.textMuted, display: "flex", alignItems: "center", gap: 8 }}>
                                                <span style={{ width: 6, height: 6, borderRadius: "50%", background: isRelated ? C.primary : "rgba(255,255,255,0.2)" }} />
                                                {task}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>

                {/* Funnel Math */}
                <Card>
                    <div style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, letterSpacing: "0.08em", marginBottom: 12 }}> THE MATH -- MONTHLY TARGETS</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        {CUSTOMER_JOURNEY.map((stage, i) => {
                            const num = FUNNEL_NUMBERS[i];
                            const prev = FUNNEL_NUMBERS[i - 1];
                            const conv = prev ? Math.round((num / prev) * 100) : 100;
                            return (
                                <div key={stage.id} style={{ display: "contents" }}>
                                    <div style={{ textAlign: "center", flex: 1 }}>
                                        <div style={{ fontSize: 28, fontWeight: 700, color: stage.color, marginBottom: 4 }}>{num.toLocaleString()}</div>
                                        <div style={{ fontSize: 11, color: C.textMuted }}>{stage.name}</div>
                                        {i > 0 && <div style={{ fontSize: 10, color: C.success, marginTop: 4 }}>{conv}% conv.</div>}
                                    </div>
                                    {i < CUSTOMER_JOURNEY.length - 1 && <div style={{ color: C.textFaint, fontSize: 20 }}>a</div>}
                                </div>
                            );
                        })}
                    </div>
                    <div style={{ marginTop: 20, padding: 16, background: "rgba(16,185,129,0.1)", borderRadius: 8, border: "1px solid rgba(16,185,129,0.2)", textAlign: "center" }}>
                        <span style={{ fontSize: 14, color: C.text }}>
                            1,000 impressions a <strong style={{ color: C.success }}>2-3 retained clients</strong> a <strong style={{ color: C.warning }}>$7-15K MRR</strong>
                        </span>
                    </div>
                </Card>

                {/* Stage Detail Panel */}
                <Card style={{ borderColor: CUSTOMER_JOURNEY[activeStage].color + "40" }}>
                    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                        {/* Left: Stage Info */}
                        <div style={{ flex: 1, minWidth: 280 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                                <div style={{ width: 48, height: 48, borderRadius: 12, background: CUSTOMER_JOURNEY[activeStage].color + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
                                    {CUSTOMER_JOURNEY[activeStage].icon}
                                </div>
                                <div>
                                    <div style={{ fontSize: 20, fontWeight: 700, color: CUSTOMER_JOURNEY[activeStage].color }}>{CUSTOMER_JOURNEY[activeStage].name}</div>
                                    <div style={{ fontSize: 13, color: C.textMuted }}>{CUSTOMER_JOURNEY[activeStage].description}</div>
                                </div>
                            </div>

                            <div style={{ marginBottom: 16 }}>
                                <div style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, marginBottom: 8 }}>CHANNELS</div>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                    {CUSTOMER_JOURNEY[activeStage].channels.map((channel, i) => (
                                        <span key={i} style={{ padding: "6px 12px", background: "rgba(255,255,255,0.05)", borderRadius: 6, fontSize: 12, color: C.text }}>{channel}</span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, marginBottom: 8 }}>KEY METRIC</div>
                                <div style={{ padding: 12, background: CUSTOMER_JOURNEY[activeStage].color + "15", borderRadius: 8, fontSize: 14, fontWeight: 600, color: CUSTOMER_JOURNEY[activeStage].color }}>
                                    {CUSTOMER_JOURNEY[activeStage].metric}
                                    {CUSTOMER_JOURNEY[activeStage].conversion && (
                                        <span style={{ fontWeight: 400, marginLeft: 8, color: C.textMuted }}>(Target: {CUSTOMER_JOURNEY[activeStage].conversion})</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right: Related Tasks */}
                        <div style={{ flex: 1, minWidth: 280, borderLeft: "1px solid " + C.border, paddingLeft: 24 }}>
                            <div style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, marginBottom: 12 }}>YOUR TASKS FOR THIS STAGE</div>
                            {EXECUTION_PHASES_MAP.filter(phase => phase.feeds.includes(CUSTOMER_JOURNEY[activeStage].id)).map(phase => (
                                <div key={phase.id} style={{ marginBottom: 16 }}>
                                    <div style={{ fontSize: 12, fontWeight: 600, color: C.primary, marginBottom: 8 }}>Phase {phase.id}: {phase.name}</div>
                                    {phase.tasks.map((task, i) => (
                                        <div key={i} style={{ padding: "10px 14px", background: C.primaryBg, borderRadius: 8, marginBottom: 6, fontSize: 13, color: C.text, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <span>{task}</span>
                                            <span style={{ fontSize: 10, color: C.primary, background: "rgba(20,184,166,0.2)", padding: "3px 8px", borderRadius: 4 }}>Execute a</span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        );
    };


    // ================================================================
    // HUB RENDER FUNCTIONS - EXECUTE MODE
    // ================================================================

    const renderExecThisWeek = () => (
        <div>
            <Card style={{ borderColor: "rgba(239,68,68,0.2)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#ef4444", letterSpacing: "0.1em", marginBottom: 6 }}>WEEK 1 RULE</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4 }}>If the landing page is not live by Friday, nothing else matters.</div>
                <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.7 }}>Outreach without a landing page = nowhere to point. Ship ugly, fix live.</div>
            </Card>
            {HUB_THIS_WEEK.map((t, i) => (
                <div key={i} onClick={() => hubToggle(`tw-${i}`)} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 18px", marginBottom: 6, background: hubChecks[`tw-${i}`] ? `${C.primary}08` : C.card, border: `1px solid ${hubChecks[`tw-${i}`] ? "rgba(16,185,129,0.2)" : C.border}`, borderRadius: 10, cursor: "pointer" }}>
                    <div style={{ width: 20, height: 20, borderRadius: 3, flexShrink: 0, marginTop: 2, border: `2px solid ${hubChecks[`tw-${i}`] ? C.primary : C.textFaint}`, background: hubChecks[`tw-${i}`] ? C.primary : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", fontWeight: 700 }}>{hubChecks[`tw-${i}`] ? "+" : ""}</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                            <HubBadge text={`TRACK ${t.track}`} color={t.track === "A" ? "#f59e0b" : "#6366f1"} />
                            <HubBadge text={t.p} color={t.color} />
                            <span style={{ fontSize: 10, color: C.textFaint }}>{t.time}</span>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: hubChecks[`tw-${i}`] ? C.textMuted : C.text }}>{t.task}</div>
                        <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{t.detail}</div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderExecTimeline = () => (
        <div>
            <Card>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.textFaint, letterSpacing: "0.1em", marginBottom: 12 }}>TIME ALLOCATION OVER 8 WEEKS</div>
                {HUB_WEEKS.map((w, i) => {
                    const r = parseInt(w.split);
                    return (<div key={i} style={{ marginBottom: 6 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.textFaint, marginBottom: 2 }}><span>W{w.week}: {w.label}</span><span>{w.cash}</span></div>
                        <div style={{ display: "flex", height: 14, borderRadius: 3, overflow: "hidden" }}>
                            <div style={{ width: `${r}%`, background: "rgba(245,158,11,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 8, fontWeight: 700, color: "#000" }}>{r}% Rev</span></div>
                            <div style={{ width: `${100 - r}%`, background: "rgba(99,102,241,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 8, fontWeight: 700, color: "#fff" }}>{100 - r}% Infra</span></div>
                        </div>
                    </div>);
                })}
            </Card>
            {HUB_WEEKS.map((w, i) => {
                const isOpen = hubExpanded === `w-${i}`;
                return (<Card key={i} onClick={() => setHubExpanded(isOpen ? null : `w-${i}`)} style={{ cursor: "pointer", borderColor: isOpen ? "rgba(16,185,129,0.2)" : C.border }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 38, height: 38, borderRadius: 8, background: i === 0 ? C.primary : `${C.primary}15`, color: i === 0 ? "#fff" : C.primary, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <span style={{ fontSize: 8, fontWeight: 700 }}>W</span><span style={{ fontSize: 16, fontWeight: 800, lineHeight: 1 }}>{w.week}</span>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 14, fontWeight: 700 }}>{w.label}</span>{w.cash !== "$0" && <HubBadge text={w.cash} color={C.primary} />}</div>
                            {!isOpen && <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>Rev: {w.rev.milestone} | Infra: {w.inf.milestone}</div>}
                        </div>
                        <span style={{ color: C.textFaint, transform: isOpen ? "rotate(180deg)" : "none", transition: "0.2s" }}>v</span>
                    </div>
                    {isOpen && (
                        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }} onClick={e => e.stopPropagation()}>
                            {[{ data: w.rev, color: "#f59e0b", label: "REVENUE", key: "r" }, { data: w.inf, color: "#6366f1", label: "INFRA", key: "i" }].map(track => (
                                <div key={track.key} style={{ padding: "12px 14px", background: `${track.color}08`, border: `1px solid ${track.color}20`, borderRadius: 8 }}>
                                    <div style={{ fontSize: 10, fontWeight: 700, color: track.color, letterSpacing: "0.08em", marginBottom: 6 }}>{track.label}</div>
                                    <div style={{ fontSize: 11, fontWeight: 600, color: C.text, marginBottom: 6 }}>{track.data.focus}</div>
                                    {track.data.tasks.map((t, j) => <CheckItem key={j} label={t} checked={hubChecks[`w${i}-${track.key}-${j}`]} onToggle={() => hubToggle(`w${i}-${track.key}-${j}`)} color={track.color} />)}
                                    <div style={{ marginTop: 8, padding: "6px 8px", background: "rgba(0,0,0,0.2)", borderRadius: 4, fontSize: 10, color: C.text }}><span style={{ fontWeight: 700, color: track.color }}>MILESTONE:</span> {track.data.milestone}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>);
            })}
        </div>
    );

    const renderExecRevenue = () => (
        <div>
            <Card style={{ borderColor: "rgba(245,158,11,0.25)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#f59e0b", letterSpacing: "0.1em", marginBottom: 6 }}>THE FUNNEL</div>
                <div style={{ fontSize: 13, color: C.text, lineHeight: 1.8 }}>{"Warm List (20) → Outreach (50% respond) → Calls (40% → teardown) → Teardowns ($1,500) → Pilots ($2,500/mo) → Retained ($3.5-6K/mo)"}</div>
            </Card>
            <Card><div style={{ fontSize: 11, fontWeight: 700, color: "#ef4444", marginBottom: 6 }}>ONLY BLOCKER</div><div style={{ fontSize: 13, color: C.text }}>Landing page needs to be deployed live. Everything else is ready in the OS.</div></Card>
        </div>
    );

    const renderExecInfra = () => (
        <div>
            <Card style={{ borderColor: "rgba(99,102,241,0.25)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#6366f1", letterSpacing: "0.1em", marginBottom: 8 }}>INFRA SEQUENCE</div>
                {[{ w: "W1", t: "Create Supabase + run SQL", time: "~1hr" }, { w: "W2", t: "Upload transcripts (manual)", time: "~2hr" }, { w: "W3", t: "Store real client data (copy-paste)", time: "~30min/client" }, { w: "W4", t: "Claude Code + first agent on DB", time: "~3hr" }, { w: "W5-6", t: "Remaining agents on DB", time: "~2hr/agent" }, { w: "W7-8", t: "Wire frontend to Supabase", time: "~5hr" }].map((s, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 5 ? `1px solid ${C.border}` : "none" }}>
                        <HubBadge text={s.w} color="#6366f1" /><div style={{ flex: 1 }}><div style={{ fontSize: 12, color: C.text }}>{s.t}</div><div style={{ fontSize: 10, color: C.textFaint }}>{s.time}</div></div>
                    </div>
                ))}
            </Card>
        </div>
    );

    const renderExecKill = () => (
        <div>
            <Card style={{ borderColor: "rgba(239,68,68,0.2)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#ef4444", letterSpacing: "0.1em", marginBottom: 4 }}>PRE-COMMITTED DECISIONS</div>
                <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.7 }}>Write these down now so you do not rationalize past them later.</div>
            </Card>
            {HUB_KILL_CRITERIA.map((k, i) => (
                <Card key={i} style={{ borderColor: k.sev === "crit" ? "rgba(239,68,68,0.2)" : "rgba(245,158,11,0.25)" }}>
                    <div style={{ display: "flex", gap: 6, marginBottom: 6 }}><HubBadge text={k.week} /><HubBadge text={k.sev === "crit" ? "CRITICAL" : "WARNING"} color={k.sev === "crit" ? "#ef4444" : "#f59e0b"} /></div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{k.metric}</div>
                    <div style={{ fontSize: 12, color: k.sev === "crit" ? "#ef4444" : "#f59e0b", margin: "4px 0" }}>Threshold: {k.threshold}</div>
                    <div style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.6 }}><b>Action:</b> {k.action}</div>
                </Card>
            ))}
        </div>
    );

    // ================================================================
    // HUB RENDER FUNCTIONS - BUILD MODE
    // ================================================================

    const renderBuildMap = () => (
        <div>
            <Card style={{ borderColor: "rgba(16,185,129,0.2)" }}>
                {[{ l: "FOUNDATION", n: "Database", w: "Week 1", c: C.primary, a: "Stores everything - profiles, research, frameworks, assets, delivery tracking." },
                { l: "WORKERS", n: "Agents", w: "Week 2", c: "#f59e0b", a: "Read from DB, do analysis, write output back. Research stops evaporating." },
                { l: "CONTROL ROOM", n: "Frontend", w: "Week 3", c: "#8b5cf6", a: "Dashboard shows live data. Select client > see everything." },
                ].map((layer, i) => (
                    <div key={i} style={{ padding: "12px 0", borderBottom: i < 2 ? `1px solid ${C.border}` : "none" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div><div style={{ display: "flex", gap: 6 }}><HubBadge text={layer.l} color={layer.c} /><HubBadge text={layer.w} /></div>
                                <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginTop: 2 }}>{layer.n}</div></div>
                        </div>
                        <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4, lineHeight: 1.6 }}>{layer.a}</div>
                    </div>
                ))}
            </Card>
        </div>
    );

    const renderBuildTables = () => (
        <div>
            {HUB_TABLES.map((t, i) => (
                <Card key={i} onClick={() => setHubExpanded(hubExpanded === t.name ? null : t.name)} style={{ cursor: "pointer", borderColor: hubExpanded === t.name ? `${t.color}40` : C.border }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: hubExpanded === t.name ? t.color : C.text }}>{t.name}</span>
                        {t.isKey && <HubBadge text="KEY" color={t.color} />}
                        <span style={{ marginLeft: "auto", color: C.textFaint, transform: hubExpanded === t.name ? "rotate(180deg)" : "none", transition: "0.2s" }}>v</span>
                    </div>
                    {hubExpanded === t.name && (
                        <div style={{ marginTop: 10 }} onClick={e => e.stopPropagation()}>
                            <div style={{ marginBottom: 8 }}><div style={{ fontSize: 10, fontWeight: 700, color: C.textFaint, marginBottom: 3 }}>WHAT IT STORES</div><div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>{t.what}</div></div>
                            <div style={{ padding: "10px 14px", background: `${t.color}10`, border: `1px solid ${t.color}20`, borderRadius: 8 }}>
                                <div style={{ fontSize: 10, fontWeight: 700, color: t.color, marginBottom: 3 }}>WHY IT EXISTS</div>
                                <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>{t.why}</div>
                            </div>
                        </div>
                    )}
                </Card>
            ))}
        </div>
    );

    const renderBuildSteps = () => (
        <div>
            {HUB_DB_STEPS.map((s, i) => (
                <Card key={i} onClick={() => setHubExpanded(hubExpanded === `step-${i}` ? null : `step-${i}`)} style={{ cursor: "pointer" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{s.n}. {s.title}</span>
                        <span style={{ fontSize: 10, color: C.textFaint, marginLeft: "auto" }}>{s.time}</span>
                    </div>
                    {hubExpanded === `step-${i}` && (
                        <div style={{ marginTop: 10 }} onClick={e => e.stopPropagation()}>
                            {s.actions.map((a, j) => <div key={j} style={{ padding: "8px 0", borderBottom: j < s.actions.length - 1 ? `1px solid ${C.border}` : "none", fontSize: 12, color: C.text }}><span style={{ color: C.primary, fontWeight: 700, marginRight: 6 }}>{j + 1}.</span>{a}</div>)}
                        </div>
                    )}
                </Card>
            ))}
        </div>
    );

    const renderBuildAgents = () => (
        <div>
            {HUB_AGENT_CONTRACTS.map((a, i) => (
                <Card key={i}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: a.color, marginBottom: 8 }}>{a.name}</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <div style={{ padding: "8px 12px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 6 }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: C.textFaint }}>READS</div><div style={{ fontSize: 12, color: C.text }}>{a.reads}</div>
                        </div>
                        <div style={{ padding: "8px 12px", background: `${C.primary}08`, border: `1px solid rgba(16,185,129,0.2)`, borderRadius: 6 }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: C.primary }}>WRITES</div><div style={{ fontSize: 12, color: C.text }}>{a.writes}</div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );

    const renderBuildKnowledge = () => (
        <div>
            {HUB_TRANSCRIPTS.map((t, i) => (
                <Card key={i} style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div><div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{t.speaker}</div><div style={{ fontSize: 11, color: C.textMuted }}>{t.topic}</div></div>
                        <HubBadge text="TO FIND" color="#f59e0b" />
                    </div>
                    <div style={{ fontSize: 11, color: C.textFaint, marginTop: 4 }}>Frameworks: {t.fws}</div>
                </Card>
            ))}
        </div>
    );

    const renderBuildClaude = () => (
        <div>
            {[
                { t: "Run /init in project root", d: "Creates CLAUDE.md with codebase analysis." },
                { t: "Add architecture to CLAUDE.md", d: "3-layer system, 6 tables, 6 agents, current phase. Under 300 lines." },
                { t: "Add validation commands", d: "DB: test query. Agents: run > check Supabase. Frontend: npm run dev." },
                { t: "Create workstream .md files", d: "db-context.md, agent-context.md, frontend-context.md. Lazy-load when switching." },
                { t: "Set up terminal tabs", d: "Label: DB-Migration, Agent-Dev, Frontend, Research. Keyboard-switch between them." },
                { t: "Always start in Plan Mode", d: "Shift+Tab. Verify approach. Challenge assumptions. THEN execute." },
            ].map((s, i) => (
                <div key={i} style={{ padding: "12px 0", borderBottom: i < 5 ? `1px solid ${C.border}` : "none" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}><span style={{ color: "#6366f1", marginRight: 6 }}>{i + 1}.</span>{s.t}</div>
                    <div style={{ fontSize: 11, color: C.textMuted, marginLeft: 18, marginTop: 2 }}>{s.d}</div>
                </div>
            ))}
        </div>
    );

    // Hub tab routing
    const hubExecTabs = {
        thisweek: renderExecThisWeek,
        timeline: renderExecTimeline,
        revenue: renderExecRevenue,
        infra: renderExecInfra,
        kill: renderExecKill,
    };

    const hubBuildTabs = {
        bmap: renderBuildMap,
        btables: renderBuildTables,
        bsteps: renderBuildSteps,
        bagents: renderBuildAgents,
        bknowledge: renderBuildKnowledge,
        bclaude: renderBuildClaude,
    };


    const tabs = {
        now: renderNow,
        context: renderContext,
        intel: renderIntel,
        research: renderResearch,
        intake: renderIntake,
        offer: renderOffer,
        funnel: renderFunnel,
        phases: renderPhases,
        playbooks: renderPlaybooks,
        metrics: renderMetrics,
        rhythm: renderRhythm,
        agents: renderAgents,
        tools: renderTools,
        frameworks: renderFrameworks,
        journey: renderJourney,
    };

    return (
        <div style={{ display: "flex", height: "100vh", background: C.bg, fontFamily: "'DM Sans', -apple-system, system-ui, sans-serif", color: C.text }}>
            <style>{`
 @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
 * { box-sizing: border-box; margin: 0; padding: 0; }
 ::-webkit-scrollbar { width: 6px; }
 ::-webkit-scrollbar-track { background: transparent; }
 ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
 input[type=number]::-webkit-inner-spin-button { opacity: 0; }
 `}</style>

            {/* Sidebar */}
            <div style={{ width: 200, background: C.sidebar, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", flexShrink: 0 }}>
                <div style={{ padding: "14px", borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg, #f59e0b, ${C.primary})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#fff" }}>S</div>
                        <div><div style={{ fontSize: 13, fontWeight: 800 }}>SLEEVE CLOUD</div><div style={{ fontSize: 9, color: C.textFaint, letterSpacing: "0.08em" }}>CENTRAL HUB</div></div>
                    </div>
                </div>

                {/* Mode Switcher */}
                <div style={{ padding: "8px", borderBottom: `1px solid ${C.border}` }}>
                    {MODES.map(m => (
                        <button key={m.id} onClick={() => { setMode(m.id); if (m.id === "execute") setTab("thisweek"); else if (m.id === "operate") setTab("now"); else setTab("bmap"); setHubExpanded(null); }} style={{
                            display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 10px",
                            background: mode === m.id ? `${m.color}15` : "transparent",
                            border: mode === m.id ? `1px solid ${m.color}30` : "1px solid transparent",
                            borderRadius: 8, cursor: "pointer", marginBottom: 3, textAlign: "left",
                            color: mode === m.id ? m.color : C.textMuted, fontSize: 11, fontWeight: mode === m.id ? 700 : 400,
                        }}>
                            <span style={{ fontSize: 11, fontWeight: 800, width: 18, height: 18, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", background: mode === m.id ? `${m.color}30` : "transparent" }}>{m.icon}</span>
                            <div><div>{m.label}</div>{mode === m.id && <div style={{ fontSize: 9, color: C.textFaint, marginTop: 1 }}>{m.desc}</div>}</div>
                        </button>
                    ))}
                </div>

                <div style={{ flex: 1, padding: "8px", overflow: "auto" }}>
                    {(mode === "execute" ? EXEC_NAV : mode === "build" ? BUILD_NAV : navItems).map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setTab(item.id)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                width: "100%",
                                padding: "10px 12px",
                                background: tab === item.id ? C.primaryBg : "transparent",
                                border: "none",
                                borderRadius: 8,
                                color: tab === item.id ? C.primaryLight : C.textMuted,
                                fontSize: 12,
                                fontWeight: tab === item.id ? 600 : 400,
                                cursor: "pointer",
                                marginBottom: 2,
                                textAlign: "left",
                                letterSpacing: "0.03em",
                            }}
                        >
                            <span style={{ fontSize: 14, width: 18, textAlign: "center" }}>{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Phase Progress */}
                <div style={{ padding: "12px", borderTop: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 9, color: C.textFaint, letterSpacing: "0.08em", marginBottom: 4 }}>8-WEEK TARGET</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: C.primary }}>$7,500</div>
                    <div style={{ fontSize: 9, color: C.textFaint, marginBottom: 8 }}>MRR by Week 8</div>
                    <div style={{ fontSize: 10, color: C.textFaint, letterSpacing: "0.05em", marginBottom: 8 }}>PHASES</div>
                    {PHASES.map((p, i) => (
                        <div key={i} style={{ marginBottom: 6 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: i === currentPhase ? C.primary : C.textFaint, marginBottom: 2 }}>
                                <span>P{i}</span>
                                <span>{phaseProgress[i].pct}%</span>
                            </div>
                            <ProgressBar pct={phaseProgress[i].pct} color={phaseProgress[i].pct === 100 ? C.success : i === currentPhase ? C.primary : "rgba(255,255,255,0.1)"} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, overflow: "auto", padding: "24px 32px" }}>
                <div style={{ maxWidth: 800 }}>
                    <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{(mode === "execute" ? EXEC_NAV : mode === "build" ? BUILD_NAV : navItems).find((n) => n.id === tab)?.label}</div>
                    <div style={{ fontSize: 13, color: C.textFaint, marginBottom: 20 }}>
                        {mode !== "operate" && <span>{MODES.find(m => m.id === mode)?.label} MODE</span>}
                        {mode === "operate" && tab === "now" && "What to do right now"}
                        {tab === "context" && "Who you are and who you serve"}
                        {tab === "intel" && "Competitive landscape and market intelligence"}
                        {tab === "research" && "Reusable ICP research methodology"}
                        {tab === "offer" && "What you sell and at what price"}
                        {tab === "funnel" && "How customers find and buy"}
                        {tab === "phases" && "Execution checklist by phase"}
                        {tab === "playbooks" && "Step-by-step execution guides"}
                        {tab === "metrics" && "What to track and when to kill"}
                        {tab === "rhythm" && "Weekly operating schedule"}
                        {tab === "agents" && "AI prompts that power delivery"}
                        {tab === "tools" && "Interactive tool calculator -- pick alternatives, see total cost"}
                        {tab === "frameworks" && "47 GTM frameworks -- searchable reference"}
                        {tab === "journey" && "Customer journey visualization"}
                    </div>
                    {mode === "operate" && tabs[tab]?.()}
                    {mode === "execute" && hubExecTabs[tab]?.()}
                    {mode === "build" && hubBuildTabs[tab]?.()}
                </div>
            </div>
        </div>
    );
}
