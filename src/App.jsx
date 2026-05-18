import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#09090B",
  bgCard: "#111115",
  bgElevated: "#1A1A1F",
  red: "#FF5F57",
  maroon: "#8B1E2D",
  redHover: "#FF3B30",
  neonGreen: "#28C840",
  neonGlow: "rgba(40,200,64,0.6)",
  indigo: "#6366F1",
  cyan: "#06B6D4",
  textPrimary: "#FFFFFF",
  textSecondary: "#A1A1AA",
  textMuted: "#71717A",
  border: "rgba(255,255,255,0.07)",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #09090B; color: #fff; font-family: 'JetBrains Mono', monospace; overflow-x: hidden; }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #FF5F57; border-radius: 2px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; } 50% { opacity: 0; }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.85); }
  }
  @keyframes pulseRing {
    0% { transform: scale(1); opacity: 0.6; }
    70% { transform: scale(1.4); opacity: 0; }
    100% { transform: scale(1.4); opacity: 0; }
  }
  @keyframes scrollBob {
    0%, 100% { transform: scaleY(1); }
    50% { transform: scaleY(0.5); }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .fade-up { animation: fadeUp 0.55s ease both; }
  .delay-1 { animation-delay: 0.1s; }
  .delay-2 { animation-delay: 0.2s; }
  .delay-3 { animation-delay: 0.25s; }
  .delay-4 { animation-delay: 0.3s; }
  .delay-5 { animation-delay: 0.35s; }
  .delay-6 { animation-delay: 0.4s; }
  .delay-7 { animation-delay: 0.45s; }

  .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.55s ease, transform 0.55s ease; }
  .reveal.visible { opacity: 1; transform: none; }

  .cards-row { display: flex; gap: 20px; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; cursor: grab; align-items: stretch; padding-bottom: 4px; }
  .cards-row::-webkit-scrollbar { display: none; }
  .cards-row:active { cursor: grabbing; }

  .nav-btn-item { background: none; border: none; cursor: pointer; padding: 6px 14px; border-radius: 8px; font-size: 13px; font-weight: 500; color: #A1A1AA; transition: all 0.15s; font-family: 'JetBrains Mono', monospace; }
  .nav-btn-item:hover { color: #fff; }
  .nav-btn-item.active { background: rgba(255,95,87,0.1); color: #FF5F57; font-weight: 600; }

  .view-btn { width: 100%; padding: 9px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.07); background: rgba(255,255,255,0.03); cursor: pointer; font-size: 12px; color: #71717A; font-family: 'JetBrains Mono', monospace; transition: all 0.15s; flex-shrink: 0; }
  .view-btn:hover { color: #A1A1AA; border-color: #FF5F57; }

  .cert-verify-btn { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; color: #FF5F57; text-decoration: none; padding: 5px 12px; border-radius: 6px; border: 1px solid rgba(255,95,87,0.2); background: rgba(255,95,87,0.05); transition: all 0.15s; font-family: 'JetBrains Mono', monospace; cursor: pointer; }
  .cert-verify-btn:hover { background: rgba(255,95,87,0.12); border-color: rgba(255,95,87,0.4); color: #FF3B30; }

  .skill-card-wrap:hover { transform: translateY(-2px); }
  .proj-card-wrap:hover { transform: translateY(-2px); }
  .exp-card-wrap:hover { border-color: rgba(255,95,87,0.2) !important; }
  .tcard-wrap:hover { border-color: rgba(255,95,87,0.3) !important; }

  /* ── NEW CERT CARDS ── */
  .cert-flip-card {
    background: #111115;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 18px;
    padding: 0 28px 26px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
    margin-top: 42px;
    cursor: pointer;
    transition: border-color 0.22s, transform 0.22s;
    text-decoration: none;
  }
  .cert-flip-card:hover {
    border-color: rgba(255,95,87,0.45);
    transform: translateY(-6px);
  }
  .cert-logo-ring {
    width: 78px;
    height: 78px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -39px;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid #09090B;
    flex-shrink: 0;
    overflow: hidden;
  }
  .cert-issuer-badge {
    font-size: 10px;
    font-weight: 700;
    padding: 3px 11px;
    border-radius: 100px;
    letter-spacing: 0.05em;
    margin-top: 50px;
    margin-bottom: 10px;
    font-family: 'JetBrains Mono', monospace;
  }
  .cert-card-title {
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    line-height: 1.5;
    letter-spacing: -0.01em;
    margin-bottom: 6px;
    flex: 1;
  }
  .cert-platform-txt {
    font-size: 11px;
    color: #52525B;
    margin-bottom: 20px;
  }
  .cert-verify-new-btn {
    width: 100%;
    padding: 10px 0;
    border-radius: 10px;
    border: 1px solid;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.04em;
    cursor: pointer;
    font-family: 'JetBrains Mono', monospace;
    background: transparent;
    transition: background 0.15s, border-color 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
  }
  .cert-verify-new-btn:hover { background: rgba(255,255,255,0.04); }

  @media (max-width: 640px) {
    .certs-grid-wrap { grid-template-columns: 1fr !important; }
  }

  .social-btn-item { width: 36px; height: 36px; border-radius: 8px; background: rgb(26,26,31); border: 1px solid rgba(255,255,255,0.07); display: flex; align-items: center; justify-content: center; color: #52525B; text-decoration: none; transition: all 0.2s; }
  .social-btn-item:hover { color: #28C840; border-color: rgba(40,200,64,0.4); box-shadow: 0 0 10px rgba(40,200,64,0.2); }

  .btn-primary-item { padding: 12px 26px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; background: #FF5F57; border: 1px solid #FF5F57; color: #fff; display: flex; align-items: center; gap: 8px; transition: all 0.2s; font-family: 'JetBrains Mono', monospace; text-decoration: none; }
  .btn-primary-item:hover { background: #FF3B30; border-color: #FF3B30; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(255,95,87,0.3); }

  .btn-secondary-item { padding: 12px 26px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; background: rgb(26,26,31); border: 1px solid rgba(255,255,255,0.1); color: #A1A1AA; display: flex; align-items: center; gap: 8px; transition: all 0.2s; font-family: 'JetBrains Mono', monospace; text-decoration: none; }
  .btn-secondary-item:hover { border-color: #28C840; color: #fff; box-shadow: 0 0 10px rgba(40,200,64,0.15); }

  .btn-ghost-item { padding: 12px 26px; border-radius: 10px; font-size: 13px; font-weight: 700; background: transparent; border: 1px solid rgba(255,255,255,0.07); color: #71717A; display: flex; align-items: center; gap: 8px; text-decoration: none; transition: all 0.2s; font-family: 'JetBrains Mono', monospace; }
  .btn-ghost-item:hover { border-color: rgba(255,255,255,0.15); color: #A1A1AA; }

  .arrow-btn-item { width: 38px; height: 38px; border-radius: 9px; border: 1px solid rgba(255,95,87,0.35); background: #111115; color: #A1A1AA; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.15s; }
  .arrow-btn-item:disabled { background: rgba(255,255,255,0.03); color: #3f3f46; cursor: default; border-color: rgba(255,255,255,0.07); }
  .arrow-btn-item:not(:disabled):hover { background: rgba(255,95,87,0.1); color: #FF5F57; }

  .mobile-btn-item { background: none; border: none; cursor: pointer; padding: 10px 14px; border-radius: 8px; font-size: 14px; font-weight: 500; color: #A1A1AA; transition: all 0.15s; text-align: left; font-family: 'JetBrains Mono', monospace; width: 100%; display: block; }
  .mobile-btn-item:hover { background: rgba(255,255,255,0.04); color: #fff; }

  @media (max-width: 768px) {
    .nav-links-desktop { display: none !important; }
    .hamburger-btn { display: block !important; }
    .hero-stats-wrap { width: 100%; }
    .stat-item-wrap { flex: 1; min-width: 40%; }
    .hero-ctas-wrap { flex-direction: column; }
    .btn-primary-item, .btn-secondary-item, .btn-ghost-item { justify-content: center; }
    .about-grid-wrap { grid-template-columns: 1fr !important; }
    .entry-wrap { padding-left: 44px !important; }
    .certs-grid-wrap { grid-template-columns: 1fr !important; }
    .test-grid-wrap { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 1024px) {
    .test-grid-wrap { grid-template-columns: repeat(2, 1fr) !important; }
  }

  /* ── HERO PHOTO ── */
  .hero-photo-col { flex-shrink: 0; width: 300px; display: flex; flex-direction: column; align-items: center; gap: 20px; margin-top: -80px; animation: 0.8s ease 0.5s 1 normal both running fadeUp; }
  @media (max-width: 900px) { .hero-photo-col { display: none !important; } }

  @keyframes photoSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .photo-ring-spin {
    position: absolute; inset: -3px; border-radius: 50%;
    background: conic-gradient(#FF5F57, #8B1E2D, #FF5F57 40%, transparent 60%, transparent 80%, #FF5F57);
    animation: photoSpin 6s linear infinite;
    padding: 3px;
  }
  .photo-ring-spin::after {
    content: ''; position: absolute; inset: 3px; border-radius: 50%; background: #09090B;
  }
  .photo-glow { position: absolute; inset: 0px; border-radius: 50%; overflow: hidden; border: 3px solid transparent; background-clip: padding-box; }
  .photo-img { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; transition: transform 0.6s; border-radius: 50%; }
  .photo-img:hover { transform: scale(1.04); }
`;

// ─── DATA ───
const twStrings = [
  "Building intelligent AI automation systems",
  "NLP & LLM Engineer — LangChain + RAG",
  "Multimodal AI for real-world applications",
  "Turning data into decisions with ML",
];

const skillCards = [
  {
    color: COLORS.red, colorRaw: "255,95,87", icon: "🤖", title: "Machine Learning",
    skills: [
      { name: "Scikit-learn", dots: 3 }, { name: "TensorFlow / Keras", dots: 3 },
      { name: "PyTorch", dots: 2 }, { name: "Model Evaluation", dots: 3 },
      { name: "Feature Engineering", dots: 2 }, { name: "Deep Learning", dots: 2 },
    ],
  },
  {
    color: "#C084FC", colorRaw: "192,132,252", icon: "🧠", title: "NLP & LLMs",
    skills: [
      { name: "LangChain", dots: 3 }, { name: "DistilBERT / Whisper", dots: 2 },
      { name: "RAG Pipelines", dots: 3 }, { name: "ChromaDB", dots: 2 },
      { name: "Wav2Vec2", dots: 2 }, { name: "Prompt Engineering", dots: 3 },
    ],
  },
  {
    color: COLORS.cyan, colorRaw: "6,182,212", icon: "📊", title: "Data Science",
    skills: [
      { name: "Python", dots: 3 }, { name: "Pandas / NumPy", dots: 3 },
      { name: "Matplotlib / Seaborn", dots: 3 }, { name: "SQL", dots: 2 },
      { name: "Excel / Sheets", dots: 2 }, { name: "EDA & Preprocessing", dots: 3 },
    ],
  },
  {
    color: COLORS.neonGreen, colorRaw: "40,200,64", icon: "⚡", title: "AI Agents & Automation",
    skills: [
      { name: "AI Agent Design", dots: 3 }, { name: "Make.com", dots: 3 },
      { name: "Vapi AI", dots: 2 }, { name: "API Integration", dots: 3 },
      { name: "Workflow Design", dots: 3 }, { name: "Synthflow / Blend AI", dots: 2 },
    ],
  },
  {
    color: COLORS.indigo, colorRaw: "99,102,241", icon: "🛠️", title: "Tools & Frameworks",
    skills: [
      { name: "FastAPI", dots: 3 }, { name: "React Native", dots: 2 },
      { name: "Jupyter / Colab", dots: 3 }, { name: "Git / GitHub", dots: 3 },
      { name: "Streamlit", dots: 2 }, { name: "VS Code / Anaconda", dots: 3 },
    ],
  },
];

const projects = [
  {
    icon: "🧠", color: "#C084FC", colorRaw: "192,132,252",
    title: "MentiMotive", subtitle: "AI Mental Health Companion · FYP",
    date: "Jun 2025 – Jun 2026",
    badges: ["Capstone", "Multimodal"],
    desc: "A multimodal AI system for emotion detection from text and voice. Integrated DistilBERT, Whisper, and Wav2Vec2 with RAG (LangChain + ChromaDB) for context-aware therapy responses. Built on FastAPI microservices with a React Native app featuring session memory and emotion tracking.",
    tags: ["LangChain", "DistilBERT", "FastAPI", "React Native", "+4 more"],
  },
  {
    icon: "🎬", color: COLORS.cyan, colorRaw: "6,182,212",
    title: "Movie Recommender", subtitle: "Content-Based Filtering System",
    date: "Jun 2025",
    badges: ["5K+ Movies", "Streamlit"],
    desc: "A Python & Streamlit app that recommends movies using content-based filtering. Applied TF-IDF and cosine similarity to generate top-10 suggestions. Integrated TMDB API for real-time movie posters. Processes 5,000+ movies with optimized vector operations for instant similarity matching.",
    tags: ["Python", "Streamlit", "TF-IDF", "TMDB API", "+2 more"],
  },
  {
    icon: "📞", color: COLORS.neonGreen, colorRaw: "40,200,64",
    title: "Voxa AI", subtitle: "Automated Call Handling Agent",
    date: "Mar 2025",
    badges: ["Voice AI", "Production"],
    desc: "An AI voice agent that handles inbound calls, answers queries, and automates workflows end-to-end. Integrated Vapi AI, Synthflow/Blend AI, and Make.com for dynamic task execution. Automated appointment booking and deployed a modern landing page showcasing full functionality.",
    tags: ["Vapi AI", "Make.com", "Synthflow", "Vercel", "+2 more"],
  },
  {
    icon: "📝", color: COLORS.red, colorRaw: "255,95,87",
    title: "NLP Automation Suite", subtitle: "Text Processing Pipelines",
    date: "Feb 2026 – Present",
    badges: ["Freelance", "Upwork"],
    desc: "Production-ready NLP pipelines built for freelance clients — including text classification, named entity recognition, sentiment analysis, and recommendation engines. Each solution delivered with full documentation and Upwork-verified delivery.",
    tags: ["Python", "Transformers", "FastAPI", "spaCy", "+3 more"],
  },
];

const experiences = [
  {
    color: COLORS.red, colorRaw: "255,95,87",
    title: "AI & Workflow Automation Engineer",
    company: "Upwork (Freelance)", type: "Freelance",
    date: "Feb 2026 – Present", loc: "Remote",
    bullets: [
      "Designed AI-powered workflow automation systems, reducing manual effort and improving operational efficiency",
      "Built machine learning models and NLP pipelines for prediction, recommendation, and text processing",
      "Developed autonomous AI agents and integrated APIs for end-to-end workflow execution",
      "Delivered scalable, production-ready AI solutions and MVPs with full supporting documentation",
    ],
  },
  {
    color: COLORS.cyan, colorRaw: "6,182,212",
    title: "AI Automation Engineer",
    company: "Software Productivity Strategists (SPS), NSTP NUST", type: "Remote Job",
    date: "Jul 2025 – Sep 2025", loc: "Islamabad, Pakistan",
    bullets: [
      "Assisted in developing and implementing AI/ML solutions for real-world applications",
      "Performed data preprocessing and analysis to support model development workflows",
      "Contributed to model evaluation and performance improvement initiatives",
      "Prepared technical documentation and reports to support project delivery",
    ],
  },
  {
    color: COLORS.neonGreen, colorRaw: "40,200,64",
    title: "Machine Learning Engineer",
    company: "Singularity AI Labs", type: "Remote Job",
    date: "Jun 2025 – Aug 2025", loc: "Pakistan",
    bullets: [
      "Collected, cleaned, and preprocessed data for machine learning pipelines",
      "Collaborated with team members on code reviews and project development",
      "Applied problem-solving skills while maintaining professionalism and teamwork standards",
      "Prepared technical documentation and progress reports throughout project lifecycle",
    ],
  },
];

// ─── CERTIFICATIONS DATA — with links and brand logos ───
const certifications = [
  {
    title: "Google Prompting Essentials",
    issuer: "Google",
    platform: "Coursera",
    link: "https://www.coursera.org/account/accomplishments/verify/5Q477BVCO26C",
    badgeColor: "#60A5FA",
    badgeColorRaw: "96,165,250",
    logoBg: "#ffffff",
    logo: "google",
  },
  {
    title: "Google AI Essentials",
    issuer: "Google",
    platform: "Coursera",
    link: "https://www.coursera.org/account/accomplishments/verify/THTPNFRXUVA4",
    badgeColor: "#4ADE80",
    badgeColorRaw: "74,222,128",
    logoBg: "#ffffff",
    logo: "google",
  },
  {
    title: "Python for Data Science, AI & Development",
    issuer: "IBM",
    platform: "Coursera",
    link: "https://www.coursera.org/account/accomplishments/verify/CJJJXR3GOSMG",
    badgeColor: "#818CF8",
    badgeColorRaw: "129,140,248",
    logoBg: "#1F1F23",
    logo: "ibm",
  },
  {
    title: "Python 101 for Data Science",
    issuer: "IBM",
    platform: "CognitiveClass",
    link: "https://courses.cognitiveclass.ai/certificates/e89183de87a446808e5b756d1c55cb20",
    badgeColor: "#67E8F9",
    badgeColorRaw: "103,232,249",
    logoBg: "#1F1F23",
    logo: "ibm",
  },
];

const testimonials = [
  { quote: "Attique built an NLP classification pipeline for us that was clean, well-documented, and hit accuracy targets on the first delivery. Rare to find someone this solid on Upwork.", name: "Daniel Moore", role: "CTO, AutomateHQ", initials: "DM" },
  { quote: "His RAG-based chatbot for our internal knowledge base was exactly what we needed. Attique understood the architecture immediately and delivered faster than expected.", name: "Sara Malik", role: "AI Product Lead, DataNest", initials: "SM" },
  { quote: "We hired Attique for a voice agent automation project. The Vapi integration and Make.com workflows he designed saved our team hours of manual work every single day.", name: "James Okafor", role: "Founder, CallFlow AI", initials: "JO" },
  { quote: "Attique's ML model for our recommendation engine was thoughtfully engineered. He asked the right questions upfront and delivered a robust, production-ready solution.", name: "Priya Nair", role: "ML Engineer, RecoStack", initials: "PN" },
  { quote: "Attique was proactive, took ownership of tasks, and consistently delivered clean, well-commented code. A genuine asset to the team.", name: "Dr. Usman Tariq", role: "AI Research Lead, SPS NUST", initials: "UT" },
  { quote: "The movie recommendation app Attique built is fast, visually clean, and the cosine similarity matching is surprisingly accurate. Great work for a solo developer.", name: "Bilal Chaudhry", role: "Senior Engineer, TechPak", initials: "BC" },
];

// ─── HOOKS ───
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("visible"); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function useTypewriter(strings) {
  const [text, setText] = useState("");
  const state = useRef({ idx: 0, char: 0, deleting: false });
  useEffect(() => {
    let t;
    function tick() {
      const s = state.current;
      const str = strings[s.idx];
      if (!s.deleting) {
        setText(str.slice(0, ++s.char));
        if (s.char === str.length) { s.deleting = true; t = setTimeout(tick, 1800); return; }
      } else {
        setText(str.slice(0, --s.char));
        if (s.char === 0) { s.deleting = false; s.idx = (s.idx + 1) % strings.length; }
      }
      t = setTimeout(tick, s.deleting ? 40 : 65);
    }
    t = setTimeout(tick, 500);
    return () => clearTimeout(t);
  }, []);
  return text;
}

function useScrollCards(rowRef) {
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [progress, setProgress] = useState(20);

  function update() {
    const el = rowRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const pct = max > 0 ? el.scrollLeft / max : 0;
    setProgress(20 + pct * 80);
    setCanPrev(el.scrollLeft > 10);
    setCanNext(el.scrollLeft < max - 10);
  }

  function scroll(dir, w) {
    rowRef.current?.scrollBy({ left: dir * w, behavior: "smooth" });
  }

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    el.addEventListener("scroll", update);
    update();
    return () => el.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!rowRef.current) return;
    let isDown = false, sx = 0, sl = 0;
    const el = rowRef.current;
    const md = (e) => { isDown = true; sx = e.pageX - el.offsetLeft; sl = el.scrollLeft; el.style.cursor = "grabbing"; };
    const ml = () => { isDown = false; el.style.cursor = "grab"; };
    const mu = () => { isDown = false; el.style.cursor = "grab"; };
    const mm = (e) => { if (!isDown) return; e.preventDefault(); el.scrollLeft = sl - (e.pageX - el.offsetLeft - sx) * 1.2; };
    el.addEventListener("mousedown", md);
    el.addEventListener("mouseleave", ml);
    el.addEventListener("mouseup", mu);
    el.addEventListener("mousemove", mm);
    return () => { el.removeEventListener("mousedown", md); el.removeEventListener("mouseleave", ml); el.removeEventListener("mouseup", mu); el.removeEventListener("mousemove", mm); };
  }, []);

  return { canPrev, canNext, progress, scroll };
}

// ─── SVG ICONS ───
const IconArrowRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
const IconGlobe = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>;
const IconMail = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>;
const IconGithub = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>;
const IconLinkedin = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;
const IconChevLeft = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>;
const IconChevRight = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>;
const IconPhone = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>;
const IconPin = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>;
const IconLang = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>;
const IconCal = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>;
const IconLoc = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>;
const IconMsg = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;

// ─── BRAND LOGOS ───
const GoogleLogo = () => (
  <svg width="40" height="40" viewBox="0 0 48 48">
    <path fill="#4285F4" d="M44.5 20H24v8h11.7C34.2 33.4 29.6 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C33.8 6.5 29.2 4.5 24 4.5 12.7 4.5 3.5 13.7 3.5 25S12.7 45.5 24 45.5c11 0 20.5-8 20.5-20.5 0-1.2-.1-2.4-.5-5z"/>
    <path fill="#34A853" d="M6.3 14.7l6.6 4.8C14.6 15.1 18.9 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C33.8 6.5 29.2 4.5 24 4.5c-7.5 0-14 4.3-17.7 10.2z"/>
    <path fill="#FBBC05" d="M24 45.5c5.1 0 9.8-1.7 13.4-4.6l-6.2-5.2C29.2 37.4 26.7 38 24 38c-5.5 0-10.2-3.5-11.9-8.4l-6.6 5.1C9.8 41.1 16.4 45.5 24 45.5z"/>
    <path fill="#EA4335" d="M44.5 20H24v8h11.7c-.8 2.3-2.3 4.3-4.3 5.8l6.2 5.2c3.6-3.3 5.9-8.2 5.9-14 0-1.2-.1-2.4-.5-5z"/>
  </svg>
);

const IBMLogo = () => (
  <svg width="52" height="22" viewBox="0 0 52 22">
    <text x="50%" y="17" textAnchor="middle" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="20" fill="#1F70C1" letterSpacing="1">IBM</text>
  </svg>
);

// ─── DOTS COMPONENT ───
function Dots({ count, color }) {
  return (
    <div style={{ display: "flex", gap: 5 }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: i <= count ? color : "rgba(255,255,255,0.08)" }} />
      ))}
    </div>
  );
}

// ─── SCROLL CARDS SECTION ───
function ScrollSection({ title, eyebrow, type, cards, renderCard, cardWidth }) {
  const rowRef = useRef(null);
  const { canPrev, canNext, progress, scroll } = useScrollCards(rowRef);
  const revRef = useReveal();

  return (
    <div>
      <div ref={revRef} className="reveal" style={{ marginBottom: 48 }}>
        <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, color: COLORS.red }}>{eyebrow}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginTop: 8 }}>
          <h2 style={{ fontSize: "clamp(28px,4.5vw,46px)", fontWeight: 800, letterSpacing: "-0.02em" }}>{title}</h2>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="arrow-btn-item" disabled={!canPrev} onClick={() => scroll(-1, cardWidth)}><IconChevLeft /></button>
            <button className="arrow-btn-item" disabled={!canNext} onClick={() => scroll(1, cardWidth)}><IconChevRight /></button>
          </div>
        </div>
        <div style={{ marginTop: 16, height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 2, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${progress}%`, background: `linear-gradient(90deg, ${COLORS.red}, #FF3B30)`, borderRadius: 2, transition: "width 0.3s" }} />
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 40, zIndex: 2, pointerEvents: "none", background: `linear-gradient(to right, ${COLORS.bg}, transparent)` }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: 40, zIndex: 2, pointerEvents: "none", background: `linear-gradient(to left, ${COLORS.bg}, transparent)` }} />
        <div ref={rowRef} className="cards-row">{cards.map((c, i) => renderCard(c, i))}</div>
      </div>
    </div>
  );
}

// ─── CERT CARD COMPONENT ───
function CertCard({ cert }) {
  return (
    <a
      href={cert.link}
      target="_blank"
      rel="noreferrer"
      className="cert-flip-card"
      style={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none" }}
    >
      {/* Floating logo ring */}
      <div className="cert-logo-ring" style={{ background: cert.logoBg }}>
        {cert.logo === "google" ? <GoogleLogo /> : <IBMLogo />}
      </div>

      {/* Issuer badge */}
      <span
        className="cert-issuer-badge"
        style={{
          background: `rgba(${cert.badgeColorRaw},0.1)`,
          border: `1px solid rgba(${cert.badgeColorRaw},0.25)`,
          color: cert.badgeColor,
        }}
      >
        {cert.issuer}
      </span>

      {/* Title */}
      <div className="cert-card-title">{cert.title}</div>

      {/* Platform */}
      <div className="cert-platform-txt">via {cert.platform}</div>

      {/* Verify button */}
      <button
        className="cert-verify-new-btn"
        style={{ borderColor: `rgba(${cert.badgeColorRaw},0.35)`, color: cert.badgeColor }}
        onClick={e => { e.preventDefault(); window.open(cert.link, "_blank"); }}
      >
        ✓ &nbsp;Verify Certificate →
      </button>
    </a>
  );
}

// ─── MAIN COMPONENT ───
export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const twText = useTypewriter(twStrings);

  const navSections = ["home", "about", "skills", "projects", "experience", "certifications", "testimonials"];

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.3 });
    navSections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  function smoothTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  const navItems = ["home", "skills", "projects", "experience", "certifications", "testimonials"];

  return (
    <>
      <style>{styles}</style>

      {/* ─── NAV ─── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 64, borderBottom: `1px solid ${COLORS.border}`, background: "rgba(9,9,11,0.88)", backdropFilter: "blur(20px)", display: "flex", alignItems: "center", animation: "slideDown 0.4s ease both" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#home" onClick={e => { e.preventDefault(); smoothTo("home"); }} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${COLORS.red}, ${COLORS.maroon})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 12L8 3.5L13 12" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M5.2 9H10.8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>attique<span style={{ color: COLORS.red }}>.dev</span></span>
          </a>
          <div className="nav-links-desktop" style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {navItems.map(id => (
              <button key={id} className={`nav-btn-item${activeSection === id ? " active" : ""}`} onClick={() => smoothTo(id)} data-section={id}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </div>
          <button className="hamburger-btn" style={{ display: "none", background: "none", border: "none", color: "#A1A1AA", cursor: "pointer", padding: 4 }} onClick={() => setMenuOpen(o => !o)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 5h16M4 12h16M4 19h16"/></svg>
          </button>
        </div>
        {menuOpen && (
          <div style={{ position: "absolute", top: 64, left: 0, right: 0, background: "rgba(9,9,11,0.97)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${COLORS.border}`, padding: 16, display: "flex", flexDirection: "column", gap: 4 }}>
            {navItems.map(id => (
              <button key={id} className="mobile-btn-item" onClick={() => smoothTo(id)}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px)", backgroundSize: "52px 52px", WebkitMaskImage: "radial-gradient(80% 60% at 50% 0%,black 40%,transparent 100%)", maskImage: "radial-gradient(80% 60% at 50% 0%,black 40%,transparent 100%)" }} />
        <div style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: 700, height: 500, borderRadius: "50%", pointerEvents: "none", background: "radial-gradient(rgba(255,95,87,0.08) 0%,transparent 70%)" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "96px 32px 0", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="fade-up delay-1" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 100, border: `1px solid rgba(255,95,87,0.25)`, background: "rgba(255,95,87,0.08)", marginBottom: 28 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: COLORS.neonGreen, display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
              <span style={{ fontSize: 12, color: "#FCA5A5", fontWeight: 500, letterSpacing: "0.02em" }}>Available for new opportunities</span>
            </div>

            <h1 className="fade-up delay-2" style={{ fontSize: "clamp(44px,6vw,80px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 18, letterSpacing: "-0.03em" }}>
              <span style={{ color: "#fff" }}>Attique</span><br />
              <span style={{ background: `linear-gradient(135deg, ${COLORS.red}, ${COLORS.maroon})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Ur Rehman</span>
            </h1>

            <p className="fade-up delay-3" style={{ fontSize: "clamp(15px,2vw,20px)", fontWeight: 500, color: COLORS.textSecondary, marginBottom: 14, letterSpacing: "-0.01em" }}>
              AI &amp; ML Engineer · Workflow Automation Specialist
            </p>

            <div className="fade-up delay-4" style={{ marginBottom: 44, height: 32, display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: "clamp(12px,1.4vw,15px)", color: "#FCA5A5" }}>
                ▸ {twText}<span style={{ borderRight: `2px solid ${COLORS.red}`, marginLeft: 2, animation: "blink 1.1s step-end infinite" }}>&nbsp;</span>
              </span>
            </div>

            <div className="fade-up delay-5 hero-stats-wrap" style={{ display: "inline-flex", flexWrap: "wrap", marginBottom: 48, background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: "hidden" }}>
              {[["2+", "Years Experience"], ["10+", "Projects Built"], ["5+", "Models Deployed"], ["4", "Certifications"]].map(([num, lbl]) => (
                <div key={lbl} className="stat-item-wrap" style={{ padding: "18px 24px", display: "flex", flexDirection: "column", gap: 4, borderRight: `1px solid ${COLORS.border}` }}>
                  <span style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1, background: `linear-gradient(135deg, ${COLORS.red}, ${COLORS.maroon})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{num}</span>
                  <span style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 500, letterSpacing: "0.02em" }}>{lbl}</span>
                </div>
              ))}
            </div>

            <div className="fade-up delay-6 hero-ctas-wrap" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              <a href="#projects" className="btn-primary-item" onClick={e => { e.preventDefault(); smoothTo("projects"); }}>
                View My Work <IconArrowRight />
              </a>
            </div>
          </div>

          <div className="hero-photo-col fade-up delay-5">
            <div style={{ position: "relative", width: 280, height: 280 }}>
              <div className="photo-ring-spin" />
              <div style={{ position: "absolute", inset: -8, borderRadius: "50%", border: "1px solid rgba(255,95,87,0.12)", zIndex: 0 }} />
              <div style={{ position: "absolute", inset: -16, borderRadius: "50%", border: "1px solid rgba(255,95,87,0.06)", zIndex: 0 }} />
              <div className="photo-glow" style={{ position: "absolute", inset: 0, borderRadius: "50%", overflow: "hidden", zIndex: 1 }}>
                <img
                  src="/ali.png"
                  alt="Attique Ur Rehman"
                  className="photo-img"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", borderRadius: "50%", transition: "transform 0.6s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                />
              </div>
              <div style={{ position: "absolute", bottom: -18, left: "50%", transform: "translateX(-50%)", background: COLORS.bgCard, border: `1px solid rgba(255,95,87,0.2)`, borderRadius: 100, padding: "4px 16px", whiteSpace: "nowrap", zIndex: 2 }}>
                <span style={{ fontSize: 11, color: COLORS.red, fontWeight: 600, letterSpacing: "0.05em" }}>AI &amp; ML Engineer</span>
              </div>
            </div>
          </div>
        </div>

        <div onClick={() => smoothTo("about")} style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", zIndex: 1 }}>
          <span style={{ fontSize: 10, color: COLORS.textMuted, letterSpacing: "0.15em", textTransform: "uppercase" }}>scroll</span>
          <div style={{ width: 1, height: 28, background: `linear-gradient(${COLORS.red},transparent)`, animation: "scrollBob 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" style={{ padding: "108px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <RevealHeading eyebrow="Get to know me" title={<>About <GradText>Me</GradText></>} />
          <div className="about-grid-wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,460px),1fr))", gap: 48, alignItems: "start" }}>
            <RevealDiv>
              <p style={{ fontSize: 16, lineHeight: 1.85, color: COLORS.textSecondary, marginBottom: 36 }}>
                AI &amp; Machine Learning Engineer specializing in building intelligent automation systems, NLP pipelines, and production-ready ML models. BS in Computer Science from National University of Technology (NUTECH) Islamabad with hands-on industry experience across AI and freelance automation work on Upwork. Passionate about turning complex data problems into scalable AI-driven solutions — from multimodal emotion detection to autonomous AI voice agents.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
                {[
                  
                  { icon: <IconPin />, content: <span style={{ color: COLORS.textSecondary, fontSize: 14 }}>Islamabad, Pakistan</span> },
                  { icon: <IconLang />, content: <span style={{ color: COLORS.textSecondary, fontSize: 14 }}>English &amp; Urdu — Fluent</span> },
                ].map((row, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, flexShrink: 0, background: "rgba(255,95,87,0.08)", border: "1px solid rgba(255,95,87,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>{row.icon}</div>
                    {row.content}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Analytical Thinking", "Problem-Solving", "Communication", "Team Management", "Debugging", "Adaptability"].map(s => (
                  <span key={s} style={{ padding: "5px 13px", borderRadius: 100, fontSize: 12, fontWeight: 500, background: "rgba(255,95,87,0.07)", border: `1px solid rgba(255,95,87,0.18)`, color: "#FCA5A5" }}>{s}</span>
                ))}
              </div>
            </RevealDiv>
            <RevealDiv>
              <div style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 14, overflow: "hidden" }}>
                <div style={{ padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.02)" }}>
                  <div style={{ width: 11, height: 11, borderRadius: "50%", background: "rgb(255,95,87)" }} />
                  <div style={{ width: 11, height: 11, borderRadius: "50%", background: "rgb(254,188,46)" }} />
                  <div style={{ width: 11, height: 11, borderRadius: "50%", background: "rgb(40,200,64)" }} />
                  <span style={{ fontSize: 12, color: COLORS.textMuted, marginLeft: 10 }}>attique.json</span>
                </div>
                <div style={{ padding: "22px 24px", fontSize: 13, lineHeight: 2 }}>
                  {[
                    ['name', '"Attique Ur Rehman"'],
                    ['role', '"AI & ML Engineer"'],
                    ['education', '"BS CS — NUTECH"'],
                    ['specialties', '["Python", "TensorFlow",'],
                    [null, ' "LangChain", "FastAPI"],'],
                    ['focus', '"AI Agents & NLP"'],
                    ['location', '"Islamabad, Pakistan"'],
                    ['openTo', 'true', true],
                  ].map((row, i) => (
                    <div key={i} style={{ paddingLeft: 20 }}>
                      {row[0] && <><span style={{ color: "#71717a" }}>"{row[0]}"</span><span style={{ color: "#3f3f46" }}>: </span></>}
                      <span style={{ color: row[2] ? "#93c5fd" : row[0] ? "#ddd6fe" : "#ddd6fe" }}>{row[1]}</span>
                      {i < 7 && <span style={{ color: "#3f3f46" }}>,</span>}
                    </div>
                  ))}
                </div>
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ─── SKILLS ─── */}
      <section id="skills" style={{ padding: "108px 0", background: "rgba(17,17,21,0.5)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <ScrollSection
            eyebrow="Technical Arsenal" title={<>Skills &amp; <GradText>Expertise</GradText></>}
            cards={skillCards} cardWidth={330}
            renderCard={(c, i) => (
              <div key={i} className="skill-card-wrap" style={{ width: 310, minWidth: 310, height: 400, flexShrink: 0, scrollSnapAlign: "start", display: "flex", flexDirection: "column", background: COLORS.bgCard, border: `1px solid rgba(${c.colorRaw},0.18)`, borderRadius: 14, padding: 26, transition: "transform 0.2s", boxSizing: "border-box" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22, flexShrink: 0 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0, background: `rgba(${c.colorRaw},0.08)`, border: `1px solid rgba(${c.colorRaw},0.18)` }}>{c.icon}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em", margin: 0, color: c.color }}>{c.title}</h3>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 11 }}>
                  {c.skills.map(s => (
                    <div key={s.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                      <span style={{ fontSize: 13, color: COLORS.textSecondary, fontWeight: 500 }}>{s.name}</span>
                      <Dots count={s.dots} color={c.color} />
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 16, fontSize: 11, flexShrink: 0 }}>
                  <span style={{ color: c.color }}>●●● Adv</span>
                  <span style={{ color: COLORS.textMuted }}>●● Mid</span>
                  <span style={{ color: "#3f3f46" }}>● Beg</span>
                </div>
              </div>
            )}
          />
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section id="projects" style={{ padding: "108px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ marginBottom: 56 }}>
            <ScrollSection
              eyebrow="What I've Built"
              title={<>Featured <span style={{ background: "linear-gradient(135deg,#f59e0b,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Projects</span></>}
              cards={projects} cardWidth={380}
              renderCard={(p, i) => (
                <div key={i} className="proj-card-wrap" style={{ width: 360, minWidth: 360, height: 420, flexShrink: 0, scrollSnapAlign: "start", display: "flex", flexDirection: "column", background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 26, transition: "transform 0.2s", boxSizing: "border-box" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14, gap: 8, flexShrink: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 10, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, background: `rgba(${p.colorRaw},0.08)`, border: `1px solid rgba(${p.colorRaw},0.22)` }}>{p.icon}</div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: 2 }}>{p.title}</div>
                        <div style={{ fontSize: 12, fontWeight: 500, color: p.color }}>{p.subtitle}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 10.5, color: COLORS.textMuted, flexShrink: 0, paddingTop: 2 }}>{p.date}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12, flexShrink: 0 }}>
                    {p.badges.map(b => <span key={b} style={{ padding: "3px 9px", borderRadius: 100, fontSize: 11, fontWeight: 700, background: `rgba(${p.colorRaw},0.08)`, border: `1px solid rgba(${p.colorRaw},0.22)`, color: p.color }}>{b}</span>)}
                  </div>
                  <p style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.7, flex: 1, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical" }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14, flexShrink: 0 }}>
                    {p.tags.map(t => <span key={t} style={{ padding: "3px 9px", borderRadius: 6, fontSize: 11, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: COLORS.textMuted }}>{t}</span>)}
                  </div>
                  <button className="view-btn" style={{ marginTop: 14 }}>▼ view details</button>
                </div>
              )}
            />
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section id="experience" style={{ padding: "108px 0", background: "rgba(17,17,21,0.5)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <RevealHeading eyebrow="Career Path" title={<>Work <GradText>Experience</GradText></>} />
          <div style={{ position: "relative", maxWidth: 800, margin: "0 auto" }}>
            <div style={{ position: "absolute", left: 22, top: 8, bottom: 8, width: 1, background: `linear-gradient(${COLORS.red},${COLORS.maroon})`, opacity: 0.25 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
              {experiences.map((exp, i) => {
                const ref = useReveal();
                return (
                  <div key={i} ref={ref} className="reveal entry-wrap" style={{ paddingLeft: 56, position: "relative" }}>
                    <div style={{ position: "absolute", left: 12, top: 22, width: 20, height: 20, borderRadius: "50%", background: `rgba(${exp.colorRaw},0.08)`, border: `2px solid ${exp.color}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: exp.color }} />
                    </div>
                    <div className="exp-card-wrap" style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 28, transition: "border-color 0.25s" }}>
                      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
                        <div>
                          <div style={{ fontSize: 19, fontWeight: 700, color: "#fff", marginBottom: 5, letterSpacing: "-0.02em" }}>{exp.title}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={exp.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>
                            <span style={{ fontSize: 14, fontWeight: 600, color: exp.color }}>{exp.company}</span>
                          </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-end" }}>
                          <span style={{ padding: "3px 11px", borderRadius: 100, fontSize: 11, fontWeight: 600, background: `rgba(${exp.colorRaw},0.08)`, border: `1px solid rgba(${exp.colorRaw},0.18)`, color: exp.color }}>{exp.type}</span>
                          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: COLORS.textMuted }}><IconCal /><span>{exp.date}</span></div>
                          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: COLORS.textMuted }}><IconLoc /><span>{exp.loc}</span></div>
                        </div>
                      </div>
                      <ul style={{ display: "flex", flexDirection: "column", gap: 9, listStyle: "none", marginTop: 14 }}>
                        {exp.bullets.map((b, j) => (
                          <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.65 }}>
                            <span style={{ fontSize: 12, flexShrink: 0, marginTop: 2, color: exp.color }}>▸</span>{b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATIONS — NEW DESIGN ─── */}
      <section id="certifications" style={{ padding: "108px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <RevealHeading eyebrow="Credentials" title={<>My <GradText>Certifications</GradText></>} />
          <RevealDiv>
            {/* paddingTop gives space for the floating logo rings that overflow above each card */}
            <div
              className="certs-grid-wrap"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "20px 28px",
                maxWidth: 820,
                margin: "0 auto",
                paddingTop: 48,
              }}
            >
              {certifications.map((cert, i) => (
                <CertCard key={i} cert={cert} />
              ))}
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section id="testimonials" style={{ padding: "108px 0", background: "rgba(17,17,21,0.5)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <RevealHeading
            eyebrow="Kind Words"
            eyebrowColor="#C084FC"
            title={<>What People <span style={{ background: "linear-gradient(135deg,#f43f5e,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Say</span></>}
          />
          <p style={{ textAlign: "center", color: COLORS.textMuted, fontSize: 14, marginTop: -40, marginBottom: 64 }}>Feedback from clients, mentors, and collaborators in the AI space.</p>
          <RevealDiv>
            <div className="test-grid-wrap" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
              {testimonials.map((t, i) => (
                <div key={i} className="tcard-wrap" style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 28, transition: "border-color 0.3s, transform 0.3s", cursor: "default" }}>
                  <div style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.8, marginBottom: 24, position: "relative" }}>
                    <span style={{ position: "absolute", top: -8, left: -4, fontSize: 48, color: "rgba(255,95,87,0.12)", lineHeight: 1, fontWeight: 900, fontFamily: "Georgia,serif" }}>"</span>
                    {t.quote}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0, fontWeight: 700, background: `linear-gradient(135deg,${COLORS.red},${COLORS.maroon})`, color: "#fff" }}>{t.initials}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: COLORS.textMuted }}>{t.role}</div>
                      <div style={{ display: "flex", gap: 3, marginTop: 6 }}>{"★★★★★".split("").map((s, j) => <span key={j} style={{ color: "#f59e0b", fontSize: 12 }}>{s}</span>)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ marginTop: 0, textAlign: "center", padding: "36px 0 48px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ fontSize: 12, color: COLORS.textMuted }}>
            Designed &amp; Built by <span style={{ background: `linear-gradient(135deg,${COLORS.red},${COLORS.maroon})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontWeight: 700 }}>Attique Ur Rehman</span> · 2025
          </span>
        </div>
      </div>

      {/* ─── FLOAT BUTTON ─── */}
      <button onClick={() => smoothTo("about")} style={{ position: "fixed", bottom: 32, right: 32, zIndex: 200, width: 56, height: 56, borderRadius: "50%", cursor: "pointer", background: COLORS.red, border: "none", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "rgba(255,95,87,0.4) 0 4px 24px", transition: "all 0.2s" }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.08)"; e.currentTarget.style.background = COLORS.redHover; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.background = COLORS.red; }}>
        <span style={{ position: "absolute", inset: -5, borderRadius: "50%", border: "2px solid rgba(255,95,87,0.35)", animation: "pulseRing 2s ease-out infinite" }} />
        <IconMsg />
      </button>
    </>
  );
}

// ─── HELPERS ───
function GradText({ children }) {
  return <span style={{ background: "linear-gradient(135deg,#FF5F57,#8B1E2D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{children}</span>;
}

function RevealDiv({ children }) {
  const ref = useReveal();
  return <div ref={ref} className="reveal">{children}</div>;
}

function RevealHeading({ eyebrow, title, eyebrowColor }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal" style={{ marginBottom: 72, textAlign: "center" }}>
      <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, color: eyebrowColor || COLORS.red }}>{eyebrow}</p>
      <h2 style={{ fontSize: "clamp(30px,5vw,50px)", fontWeight: 800, marginTop: 10, letterSpacing: "-0.02em" }}>{title}</h2>
    </div>
  );
}