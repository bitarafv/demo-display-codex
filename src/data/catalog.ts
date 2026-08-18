import type { Archetype, Demo, Industry, Market } from "@/lib/types";

const sharedQuestions = [
  "Where does the relevant data reside today?",
  "How many people would use this experience concurrently?",
  "What security, governance, or compliance requirements apply?",
  "Which outcome would justify a focused proof of concept?",
];

const profiles: Record<Archetype, Pick<Demo, "prompts" | "painPoints" | "objections">> = {
  copilot: {
    prompts: ["Summarize the latest case", "Draft a recommended next action", "Surface missing information"],
    painPoints: ["High administrative burden", "Fragmented context", "Inconsistent handoffs"],
    objections: [{ objection: "Can we trust the response?", response: "Ground the experience in approved sources, expose citations, and keep a person in the decision loop." }],
  },
  documents: {
    prompts: ["Analyze the selected document", "Extract critical entities", "Flag items requiring review"],
    painPoints: ["Manual document review", "Long processing queues", "Inconsistent extraction"],
    objections: [{ objection: "What about sensitive documents?", response: "A locally controlled architecture can keep governed data within the customer’s chosen environment." }],
  },
  vision: {
    prompts: ["Inspect the current frame", "Review detected anomalies", "Compare with the reference sample"],
    painPoints: ["Visual inspection bottlenecks", "Variable detection quality", "Late issue discovery"],
    objections: [{ objection: "Will this replace inspectors?", response: "Position it as consistent decision support that helps experts focus on ambiguous cases." }],
  },
  research: {
    prompts: ["Synthesize the evidence", "Compare the selected sources", "Create a cited briefing"],
    painPoints: ["Scattered knowledge", "Slow synthesis", "Duplicated research effort"],
    objections: [{ objection: "How do we prevent hallucinations?", response: "Use retrieval from approved collections, citations, confidence indicators, and human review." }],
  },
  workflow: {
    prompts: ["Launch the review workflow", "Inspect agent handoffs", "Resolve the blocked step"],
    painPoints: ["Manual coordination", "Opaque handoffs", "Long cycle times"],
    objections: [{ objection: "Are autonomous agents safe?", response: "Start with bounded actions, explicit approvals, audit trails, and narrow permissions." }],
  },
  developer: {
    prompts: ["Generate a test plan", "Explain the selected code", "Prepare a local experiment"],
    painPoints: ["Slow experimentation", "Environment setup overhead", "Limited access to shared tooling"],
    objections: [{ objection: "Does this expose source code?", response: "Local workflows can keep proprietary code and context inside the organization’s control boundary." }],
  },
  analytics: {
    prompts: ["Explain the risk trend", "Compare this period", "Identify the highest-priority record"],
    painPoints: ["Slow signal detection", "Dashboard overload", "Reactive decisions"],
    objections: [{ objection: "Is this a system of record?", response: "Treat it as a decision-support layer over governed source systems, with traceable inputs." }],
  },
};

const defs: Array<[string, string, Archetype, string, string, string]> = [
  ["healthcare", "Clinical Scribe", "copilot", "Clinical documentation consumes valuable care time.", "Turn a patient conversation into a structured draft note in seconds.", "Speech"],
  ["healthcare", "Radiology Assistant", "vision", "Imaging teams must rapidly prioritize growing study volumes.", "Surface relevant findings and organize review without replacing clinical judgment.", "Multimodal analysis"],
  ["financial-services", "Risk Analyst Copilot", "analytics", "Analysts reconcile signals across fragmented risk systems.", "Convert complex signals into a traceable, decision-ready risk briefing.", "Retrieval and knowledge"],
  ["financial-services", "Claims Assistant", "documents", "Claims review depends on repetitive document validation.", "Extract evidence and guide reviewers through a consistent adjudication workflow.", "Document intelligence"],
  ["manufacturing", "Defect Detection", "vision", "Manual quality inspection can miss subtle or fast-moving defects.", "Flag visual anomalies earlier and focus experts on uncertain cases.", "Computer vision"],
  ["manufacturing", "Engineering Copilot", "copilot", "Engineers spend time searching standards, notes, and prior designs.", "Bring governed engineering knowledge into a contextual design assistant.", "Retrieval and knowledge"],
  ["enterprise-ai", "Internal Knowledge Assistant", "research", "Employees struggle to find trustworthy internal answers.", "Deliver cited answers from approved enterprise knowledge.", "Retrieval and knowledge"],
  ["enterprise-ai", "AI Developer Workspace", "developer", "AI experimentation is slowed by setup and tool fragmentation.", "Give developers a repeatable local workspace for prototyping and evaluation.", "Developer tools"],
  ["enterprise-ai", "Agentic Workflow Orchestrator", "workflow", "Multi-step work crosses teams, tools, and approval boundaries.", "Coordinate specialized agents with visible controls, handoffs, and auditability.", "Multi-agent workflow"],
  ["enterprise-ai", "Enterprise Research Assistant", "research", "Strategic research requires time-consuming source synthesis.", "Create evidence-backed briefings from curated internal and public sources.", "Retrieval and knowledge"],
  ["federal-defense", "Intelligence Analyst", "analytics", "Analysts must connect high-volume, multi-source signals quickly.", "Prioritize entities, relationships, and evidence for analyst review.", "Multimodal analysis"],
  ["federal-defense", "Document Exploitation", "documents", "Unstructured documents slow time-sensitive analysis.", "Extract entities and relationships into a reviewable intelligence workspace.", "Document intelligence"],
  ["state-local", "Citizen Services Assistant", "copilot", "Residents face complex information and inconsistent service pathways.", "Guide residents to clear, accessible answers and next steps.", "Conversational AI"],
  ["state-local", "Permit Review Assistant", "documents", "Permit intake involves repetitive completeness and policy checks.", "Triage submissions and highlight missing or conflicting information.", "Document intelligence"],
  ["higher-education", "AI Lab", "developer", "Researchers need accessible environments for governed AI exploration.", "Provide a shared, repeatable workspace for teaching and experimentation.", "Developer tools"],
  ["higher-education", "Research Assistant", "research", "Academic synthesis spans large and disconnected source collections.", "Organize literature, compare evidence, and draft cited research briefs.", "Retrieval and knowledge"],
  ["k12", "Teacher Assistant", "copilot", "Teachers spend significant time adapting and organizing instructional materials.", "Create classroom-ready drafts while keeping educators in control.", "Conversational AI"],
  ["k12", "Student Learning Assistant", "copilot", "Students need timely, differentiated support without answer substitution.", "Offer guided practice and explanations aligned to learning objectives.", "Conversational AI"],
];

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const industryMeta: Array<[string, string, Market, string, string, string]> = [
  ["healthcare", "Healthcare", "Commercial", "✚", "Improve care-team capacity with governed clinical AI experiences.", "#33d6b8"],
  ["financial-services", "Financial Services & Insurance", "Commercial", "◇", "Turn complex risk and claims information into clear action.", "#84a8ff"],
  ["manufacturing", "Manufacturing & Engineering", "Commercial", "⬡", "Connect visual quality and engineering knowledge to operations.", "#ffae68"],
  ["enterprise-ai", "Enterprise AI", "Commercial", "✦", "Activate trusted organizational knowledge and intelligent workflows.", "#a992ff"],
  ["federal-defense", "Federal & Defense", "Public Sector", "⌾", "Support mission-focused analysis with controlled AI experiences.", "#71b7ff"],
  ["state-local", "State & Local Government", "Public Sector", "▦", "Simplify resident services and document-heavy public workflows.", "#55d0ef"],
  ["higher-education", "Higher Education", "Public Sector", "△", "Accelerate research, teaching, and responsible AI exploration.", "#c0df72"],
  ["k12", "K–12 Education", "Public Sector", "○", "Give educators practical tools for personalized learning support.", "#ff8ca0"],
];

export const industries: Industry[] = industryMeta.map(([slug, name, market, icon, description, accent]) => ({
  slug, name, market, icon, description, accent,
  demos: defs.filter(([industry]) => industry === slug).map(([, demoName, archetype, problem, value, workload], index) => ({
    slug: slugify(demoName), name: demoName, industry: name, archetype, problem, value, workload,
    concurrency: index % 3 === 0 ? "Small team" : "Department",
    dataSize: archetype === "vision" || archetype === "research" ? "Large" : "Medium",
    outcomes: ["Faster decision-making", "Increased productivity", "More consistent service", "Stronger information governance"],
    personas: market === "Commercial" ? ["CIO", "Chief Data Officer", "Operations Leader"] : ["CIO", "Program Leader", "Security Leader"],
    questions: ["Do you have concerns about sending sensitive data to public cloud providers?", "What AI initiatives are currently being explored?", ...sharedQuestions],
    ...profiles[archetype],
  })),
}));

export const getIndustry = (slug: string) => industries.find((item) => item.slug === slug);
export const getDemo = (slug: string) => industries.flatMap((item) => item.demos).find((item) => item.slug === slug);
export const markets: Market[] = ["Commercial", "Public Sector"];
