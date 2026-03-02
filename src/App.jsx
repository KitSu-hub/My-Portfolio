import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

/* ═══════════════════════════════════════════════════════════
    DATA
═══════════════════════════════════════════════════════════ */
const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = `/sai_Krishna_Reddy_Bollampally_Resume.docx`;
    link.download = 'sai_Krishna_Reddy_Bollampally_Resume.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

const EDUCATION = [
  {
    degree: 'Master of Science in Computer Science',
    school: 'University of Texas at Arlington',
    short: 'Arlington, Texas',
    period: '2023 — 2025',
    grade: 'Graduated',
    desc: 'Specialized in Artificial Intelligence and Data Mining. Thesis on neural network-based anomaly detection in time-series data. Active member of the AI research club.',
    tags: ['Machine Learning', 'Data Structures', 'Algorithms', 'DBMS', 'Neural Networks'],
  },
  {
    degree: 'B.Tech in Computer Science & Engineering',
    school: 'Vidya Jyothi Institute if Technology',
    short: 'Hyderabad, India',
    period: '2019-2023',
    grade: 'Graduated',
    desc: '5-course specialization covering neural networks, hyperparameter tuning, CNNs, sequence models, and structuring ML projects. Taught by Andrew Ng.',
    tags: ['Neural Networks', 'CNNs', 'RNNs', 'Backpropagation', 'TensorFlow'],
  },
];


const CERTIFICATIONS = [
  // Job Simulations
  { id: 'c01', title: 'Deloitte Data Analytics Job Simulation', issuer: 'Deloitte', category: 'Job Simulations', link: `pdf/Deloitte_Data_Analytics_Job_Simulation.pdf` },

  // AI / ML
  { id: 'c02', title: 'Prompt Design in Vertex AI', issuer: 'Google Cloud', category: 'AI/ML', link: `pdf/prompt-design-in-vertex-ai.png` },
  { id: 'c03', title: 'AI for All From Basics to Gen AI Practice', issuer: 'NVIDIA', category: 'AI/ML', link: `pdf/AI for All From Basics to Gen AI Practice.pdf` },
  { id: 'c04', title: 'Finetuning Large Language Models', issuer: 'Deeplearning.ai', category: 'AI/ML', link: 'https://learn.deeplearning.ai/accomplishments/804d859c-fc43-46b0-a6f4-9e582ed724bc?usp=sharing' },
  { id: 'c05', title: 'Introduction to generative AI concepts', issuer: 'Microsoft', category: 'AI/ML', link: 'https://learn.microsoft.com/en-us/users/saikrishnareddybollampally-8498/achievements/8zqne6fw' },
  { id: 'c06', title: 'Develop applications with Azure OpenAI in Foundry Models', issuer: 'Microsoft', category: 'AI/ML', link: `pdf/Develop applications with Azure OpenAI in Foundry Models.pdf` },
  { id: 'c07', title: 'Inroduction to Generative AI- Art of the Possible', issuer: 'Amazon Web Services', category: 'AI/ML', link: `pdf/Introduction to Generative AI - Art of the Possible.pdf` },
  { id: 'c08', title: 'Create Your Own ChatGPT-like Website with Open Source LLMs', issuer: 'Cognitive Class', category: 'AI/ML', link: `pdf/Create Your Own ChatGPT-like Website with Open.pdf` },

  // Data Analysis
  { id: 'c09', title: 'Get started building with Power BI', issuer: 'Microsoft', category: 'Data Analysis', link: `pdf/Get started building with Power BI.pdf` },

  // DevOps & Cloud
  { id: 'c10', title: 'Getting Started with DevOps', issuer: 'Amazon Web Services', category: 'DevOps & Cloud', year: '2023', credential: 'AWS-CPF-2023', link: `pdf/Getting Started with DevOps on AWS.pdf` },
  { id: 'c11', title: 'AWS Cloud Practitioner Essentials', issuer: 'Amazon Web Services', category: 'DevOps & Cloud', link: `pdf/AWS Cloud Practitioner Essentials.pdf` },
  { id: 'c12', title: 'Docker Essentials: A Developer Introduction', issuer: 'Cognitive Class', category: 'DevOps & Cloud', link: `pdf/Docker Essentials.pdf` },

  // WEB DEV
  { id: 'c13', title: 'Full Stack Web Development with MERN STACK & GenAI 2025', issuer: 'Udemy', category: 'Web Development', year: '2023', credential: 'AWS-CPF-2023', link: `pdf/Full Stack Web Development with MERN STACK & Gen AI 2025.pdf` },
  { id: 'c14', title: 'Spring Boot Course: Certified Course for Essential Skills', issuer: 'Scaler', category: 'Web Development', link: `pdf/SpringBoot.png` },

  // Other
  { id: 'c15', title: 'Step into Robotic Process Automation', issuer: 'GUVI', category: 'Other',  link: `pdf/Step into Robotic Process Automation.png` },
  { id: 'c16', title: 'Game Development using PyGame', issuer: 'GUVI', category: 'Other', link: `pdf/Game Development using PyGame.png` },
  { id: 'c17', title: 'Programming Essentials in C', issuer: 'Cisco', category: 'Other', link: `pdf/Programming Essentials in C.pdf` },
  { id: 'c18', title: 'Programming Essentials in Python', issuer: 'Cisco', category: 'Other', link: `pdf/Programming Essentials in Python.pdf` },
  { id: 'c19', title: 'Algorithms, Data Collection, and Starting to Code', issuer: 'Coursera', category: 'Other', link: `pdf/Algorithms, Data Collection, and Starting to Code.pdf` },
  { id: 'c20', title: 'Build a Face Recognition Application Using Python', issuer: 'Guvi', category: 'Other', link: `pdf/Build a Face Recognition Application Using Python.png` },
];

const CERT_TABS = ['All', 'Job Simulations', 'AI/ML', 'Data Analysis', 'DevOps & Cloud', 'Web Development','Other'];

const PROJECTS = [
  {
    id: '01', title: 'NeuroRAG Pipeline', category: 'Retrieval-Augmented Generation',
    description: 'Production-grade RAG system processing 10M+ documents with hybrid semantic + keyword search, re-ranking, and sub-200ms response times. Reduced hallucinations by 73% over baseline GPT-4.',
    tech: ['LangChain', 'Pinecone', 'OpenAI', 'FastAPI', 'Redis'],
    metrics: [{ val: '10M+', label: 'Docs indexed' }, { val: '73%', label: 'Less hallucination' }, { val: '<200ms', label: 'Response time' }],
    year: '2025', link: '#', featured: true,
  },
  {
    id: '02', title: 'AgentForge', category: 'Multi-Agent Orchestration',
    description: 'Autonomous multi-agent framework built on LangGraph for complex task decomposition. Agents collaborate, self-correct, and use 15+ tools to complete research, code, and analysis workflows.',
    tech: ['LangGraph', 'OpenAI', 'Python', 'Docker', 'Celery'],
    metrics: [{ val: '15+', label: 'Integrated tools' }, { val: '4x', label: 'Task throughput' }, { val: '92%', label: 'Completion rate' }],
    year: '2025', link: '#', featured: true,
  },
  {
    id: '03', title: 'PredictIQ', category: 'Predictive Analytics',
    description: 'End-to-end ML platform for customer churn prediction. XGBoost ensemble with SHAP explainability, automated retraining pipelines, and a real-time scoring API serving 500K requests/day.',
    tech: ['XGBoost', 'SHAP', 'MLflow', 'FastAPI', 'PostgreSQL'],
    metrics: [{ val: '500K', label: 'Daily predictions' }, { val: '94.2%', label: 'AUC score' }, { val: '$2M', label: 'Revenue saved' }],
    year: '2024', link: '#', featured: false,
  },
  {
    id: '04', title: 'VisionStack', category: 'Computer Vision',
    description: 'Real-time object detection and segmentation pipeline for manufacturing QA. Fine-tuned YOLOv8 on proprietary dataset, deployed on edge devices with TensorRT optimization.',
    tech: ['YOLOv8', 'PyTorch', 'TensorRT', 'OpenCV', 'Triton'],
    metrics: [{ val: '99.1%', label: 'Detection accuracy' }, { val: '60fps', label: 'Inference speed' }, { val: '40%', label: 'Defect reduction' }],
    year: '2024', link: '#', featured: false,
  },
  {
    id: '05', title: 'SynthLLM Evaluator', category: 'LLM Evaluation Framework',
    description: 'Automated LLM benchmark suite generating synthetic adversarial test cases. Measures faithfulness, toxicity, and capability across 20+ dimensions with detailed reporting dashboards.',
    tech: ['Python', 'Hugging Face', 'LangSmith', 'Streamlit', 'Pandas'],
    metrics: [{ val: '20+', label: 'Eval dimensions' }, { val: '10K', label: 'Test cases/run' }, { val: '5hrs', label: 'Saved per eval' }],
    year: '2024', link: '#', featured: false,
  },
  {
    id: '06', title: 'DataWeave', category: 'Data Engineering',
    description: 'Scalable ETL orchestration platform unifying 30+ data sources into a lakehouse. Built with Apache Airflow, dbt transformations, and real-time CDC with Debezium.',
    tech: ['Airflow', 'dbt', 'Debezium', 'Spark', 'Snowflake'],
    metrics: [{ val: '30+', label: 'Data sources' }, { val: '5TB', label: 'Daily processed' }, { val: '99.9%', label: 'Pipeline uptime' }],
    year: '2023', link: '#', featured: false,
  },
];

const EXPERIENCE = [
  {
    role: 'Generative AI Engineer', company: 'Wells Fargo.', period: 'August 2024 — Present',
    desc: 'Designed GenAI-powered risk and compliance systems using LangChain, RAG, and CrewAI. Built multi-agent pipelines and fine-tuned GPT-4o and LLaMA 3 for fraud detection and financial modeling. Reduced document review time by 75% and improved fraud detection by 50%.',
    tags: ['LLMs', 'RAG', 'LangChain', 'CrewAI', 'AWS', 'Team Lead'],
  },
  {
    role: 'ML Engineer', company: 'Vision Tree.', period: 'May 2021 — July 2023',
    desc: 'Built ML models for fraud detection, cost prediction, and anomaly detection using XGBoost and LightGBM. Deployed models on AWS SageMaker with explainability through SHAP. Designed HIPAA-compliant dashboards to track clinical outcomes, reducing fraudulent claims by 60% and boosting process efficiency by 35%.',
    tags: ['PyTorch', 'Kafka', 'MLflow', 'GCP', 'Real-time ML'],
  },
];

const SKILL_CATS = [
  { label: 'AI / LLMs',      items: ['OpenAI GPT-4','Claude API','Llama 3','Gemini','Mistral','LangChain','LangGraph','LlamaIndex'] },
  { label: 'ML / Deep Learning', items: ['PyTorch','TensorFlow','Scikit-learn','XGBoost','HuggingFace','ONNX','TensorRT','MLflow'] },
  { label: 'Data & Storage', items: ['Spark','Airflow','dbt','Snowflake','PostgreSQL','Redis','Kafka','Pinecone'] },
  { label: 'Engineering',    items: ['Python','FastAPI','Docker','Kubernetes','AWS','GCP','Terraform','CI/CD'] },
];

const TICKER_ITEMS = [
  'Gen AI','AI Agents','LangChain','LangGraph','RAG Systems','Data Science','MLOps',
  'OpenAI','Hugging Face','PyTorch','Vector Databases','Python','FastAPI','Docker',
  'Cursor AI','Data Analyst','LLM Fine-tuning','Prompt Engineering',
];

/* ═══════════════════════════════════════════════════════════
    HOOK — Intersection Observer
═══════════════════════════════════════════════════════════ */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ═══════════════════════════════════════════════════════════
    ICONS
═══════════════════════════════════════════════════════════ */
const LI   = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const GH   = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>;
const ARR  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>;
const MAIL = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const XX   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;

/* ═══════════════════════════════════════════════════════════
    CURSOR
═══════════════════════════════════════════════════════════ */
function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: -200, y: -200 });
  const smooth  = useRef({ x: -200, y: -200 });
  const hover   = useRef(false);

  useEffect(() => {
    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const onOver = (e) => { hover.current = !!e.target.closest('a,button,[data-hover]'); };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);

    let raf;
    const tick = () => {
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.11;
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.11;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${pos.current.x}px,${pos.current.y}px)`;
      if (ringRef.current) {
        const s = hover.current ? 52 : 34;
        ringRef.current.style.transform  = `translate(${smooth.current.x}px,${smooth.current.y}px)`;
        ringRef.current.style.width      = `${s}px`;
        ringRef.current.style.height     = `${s}px`;
        ringRef.current.style.marginLeft = `${-s/2}px`;
        ringRef.current.style.marginTop  = `${-s/2}px`;
        ringRef.current.style.borderColor = hover.current ? 'rgba(232,213,163,.65)' : 'rgba(232,213,163,.28)';
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseover', onOver); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="c-dot"  />
      <div ref={ringRef} className="c-ring" />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
    INTRO
═══════════════════════════════════════════════════════════ */
function Intro({ onDone }) {
  const [out, setOut] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => { setOut(true); setTimeout(onDone, 1100); }, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className={`intro${out ? ' intro--out' : ''}`}>
      <p className="intro__label">Initializing portfolio</p>
      <h1 className="intro__name">
        <span className="intro__word"><span>Sai</span></span>
        <span className="intro__word intro__word--ghost"><span>Bollampally</span></span>
      </h1>
      <p className="intro__sub">AI/ML Engineer &amp; Data Scientist</p>
      <div className="intro__bar"><div className="intro__fill" /></div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
    NAVBAR
═══════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setOpen(false); };
  const NAV = ['about','projects','skills','experience', 'education','contact'];
  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <button className="nav__logo" onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>SK</button>
      <div className={`nav__links${open ? ' nav__links--open' : ''}`}>
        {NAV.map(id => <button key={id} className="nav__link" onClick={() => go(id)}>{id}</button>)}
      </div>
      <div className="nav__right">
        <a href="https://www.linkedin.com/in/sai-krishnab202/" target="_blank" rel="noopener noreferrer" className="nav__icon"><LI /></a>
        {/* <a href="#" className="nav__icon"><GH /></a> */}
        <button onClick={handleResumeDownload} className="nav__resume"> Resume ↗</button>
        <button className="nav__burger" onClick={() => setOpen(o => !o)}>
          <span style={{ transform: open ? 'rotate(45deg) translate(4px,4px)' : 'none' }} />
          <span style={{ opacity: open ? 0 : 1 }} />
          <span style={{ transform: open ? 'rotate(-45deg) translate(4px,-4px)' : 'none' }} />
        </button>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════
    HERO CANVAS
═══════════════════════════════════════════════════════════ */
function HeroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const mouse = { x: 0, y: 0 };
    let t = 0, raf;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas);
    const onM = (e) => { mouse.x = e.clientX/canvas.offsetWidth - .5; mouse.y = e.clientY/canvas.offsetHeight - .5; };
    window.addEventListener('mousemove', onM);

    const ring = (cx,cy,r,lw,a,blur) => {
      ctx.save(); ctx.shadowBlur=blur; ctx.shadowColor=`rgba(232,213,163,${a*.5})`;
      const g=ctx.createRadialGradient(cx,cy,r-lw*3,cx,cy,r+lw*3);
      g.addColorStop(0,'rgba(240,237,230,0)'); g.addColorStop(.42,`rgba(200,195,180,${a*.6})`);
      g.addColorStop(.5,`rgba(240,237,230,${a})`); g.addColorStop(.58,`rgba(200,195,180,${a*.6})`);
      g.addColorStop(1,'rgba(240,237,230,0)');
      ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.strokeStyle=g; ctx.lineWidth=lw; ctx.stroke(); ctx.restore();
    };
    const arc = (cx,cy,r,s,len,a,lw) => {
      ctx.save(); ctx.shadowBlur=24; ctx.shadowColor=`rgba(232,213,163,${a*.9})`;
      ctx.beginPath(); ctx.arc(cx,cy,r,s,s+len);
      const ag=ctx.createLinearGradient(cx+Math.cos(s)*r,cy+Math.sin(s)*r,cx+Math.cos(s+len)*r,cy+Math.sin(s+len)*r);
      ag.addColorStop(0,'rgba(240,237,230,0)'); ag.addColorStop(.35,`rgba(232,213,163,${a})`);
      ag.addColorStop(.65,`rgba(255,248,220,${a})`); ag.addColorStop(1,'rgba(240,237,230,0)');
      ctx.strokeStyle=ag; ctx.lineWidth=lw; ctx.stroke(); ctx.restore();
    };
    const pt = (cx,cy,r,angle,sz,a) => {
      const x=cx+Math.cos(angle)*r, y=cy+Math.sin(angle)*r;
      ctx.save(); ctx.shadowBlur=14; ctx.shadowColor=`rgba(232,213,163,${a})`;
      ctx.beginPath(); ctx.arc(x,y,sz,0,Math.PI*2); ctx.fillStyle=`rgba(240,237,230,${a})`; ctx.fill(); ctx.restore();
    };
    const loop = () => {
      const W=canvas.width, H=canvas.height;
      const cx=W/2+mouse.x*20, cy=H/2+mouse.y*20, b=Math.min(W,H)*.33;
      ctx.clearRect(0,0,W,H);
      const halo=ctx.createRadialGradient(cx,cy,b*.4,cx,cy,b*1.7);
      halo.addColorStop(0,'rgba(232,213,163,.04)'); halo.addColorStop(.5,'rgba(232,213,163,.015)'); halo.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=halo; ctx.fillRect(0,0,W,H);
      ring(cx,cy,b*1.38,1,.05,0); ring(cx,cy,b,2.5,.22,14); ring(cx,cy,b*.63,1.2,.09,0); ring(cx,cy,b*.38,.8,.05,0);
      arc(cx,cy,b,t*.5,1.3+Math.sin(t*.3)*.28,.9,2.2);
      arc(cx,cy,b,t*.5+Math.PI+.5,.75,.32,1.5);
      arc(cx,cy,b*1.38,-t*.26,1.1,.18,1);
      arc(cx,cy,b*.63,t*.7+1,.8,.15,1);
      pt(cx,cy,b,t*.5,3,1); pt(cx,cy,b,t*.5+.07,1.5,.45);
      pt(cx,cy,b,t*.5+Math.PI*.72,2.5,.55); pt(cx,cy,b*1.38,-t*.26+.15,2,.38);
      const gr=ctx.createRadialGradient(cx,cy+b,0,cx,cy+b,b*.6);
      gr.addColorStop(0,'rgba(232,213,163,.13)'); gr.addColorStop(1,'rgba(232,213,163,0)');
      ctx.save(); ctx.beginPath(); ctx.ellipse(cx,cy+b,b*.58,b*.1,0,0,Math.PI*2); ctx.fillStyle=gr; ctx.fill(); ctx.restore();
      t+=.009; raf=requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); window.removeEventListener('mousemove',onM); };
  }, []);
  return <canvas ref={ref} className="hero__canvas" />;
}

/* ═══════════════════════════════════════════════════════════
    HERO
═══════════════════════════════════════════════════════════ */
function Hero() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });
  return (
    <section className="hero" id="hero">
      <HeroCanvas />
      <div className="hero__grid" />
      {['tl','tr','bl','br'].map(p => <span key={p} className={`hero__corner hero__corner--${p}`} />)}
      <div className="hero__center">
        <div className="hero__badge"><span className="hero__dot" />Available for opportunities</div>
        <div className="hero__name">Sai Krishna</div>
        <div className="hero__name hero__name--ghost">Bollampally</div>
        <p className="hero__desc">Building <strong>AI/ML systems</strong> that work in production - from RAG pipelines &amp; LLM agents to data science at scale.</p>
        <div className="hero__ctas">
          <button className="btn btn--solid" onClick={() => go('projects')}>View Projects <ARR /></button>
          <button className="btn btn--ghost" onClick={() => go('contact')}>Let's talk</button>
        </div>
      </div>
      <div className="hero__meta">
        <div className="hero__scroll" onClick={() => go('about')}>
          <div className="hero__scroll-line" /><span>Scroll</span>
        </div>
        <div className="hero__coord">33.0146° N, 97.0970° W<br />Flower Mound, Texas</div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
    TICKER
═══════════════════════════════════════════════════════════ */
function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="ticker">
      <div className="ticker__track">
        {items.map((s,i) => <div key={i} className="ticker__item">{s}<span className="ticker__dot" /></div>)}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
    ABOUT
═══════════════════════════════════════════════════════════ */
function About() {
  const [ref, inView] = useInView();
  return (
    <section className={`about section${inView?' in-view':''}`} id="about" ref={ref}>
      <div className="section__label"><span>01</span>About</div>
      <div className="about__grid">
        <div className="about__left">
          <h2 className="about__title">Turning raw data into<br /><em>intelligent</em> systems</h2>
          <p className="about__body">I'm an AI/ML Engineer passionate about the full lifecycle — from research prototypes to battle-hardened production systems. I've spent 3+ years building things that matter: RAG pipelines, autonomous agents, computer vision systems, and real-time ML infrastructure.</p>
          <p className="about__body mt">I care deeply about systems that are not just accurate, but fast, explainable, and maintainable. I don't just build models — I build platforms.</p>
          <div className="about__ctas">
            <a href="#" onClick={handleResumeDownload} className="btn btn--solid btn--sm">Download CV ↓</a>
            <a href="https://www.linkedin.com/in/sai-krishnab202/" target="_blank" rel="noopener noreferrer" className="about__link"><LI /> Connect on LinkedIn</a>
          </div>
        </div>
        <div className="about__right">
          <div className="stats">
            {[{n:'20+',l:'Projects shipped'},{n:'3+',l:'Years experience'},{n:'10M+',l:'Data points processed'},{n:'∞',l:'Coffee consumed'}].map((s,i) => (
              <div key={i} className="stat">
                <div className="stat__n">{s.n}</div>
                <div className="stat__l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
    PROJECTS
═══════════════════════════════════════════════════════════ */
function PCard({ p, index }) {
  const [ref, inView] = useInView(0.08);
  return (
    <div ref={ref} className={`pcard${inView?' pcard--in':''}${p.featured?' pcard--feat':''}`} style={{ transitionDelay:`${index*70}ms` }}>
      <div className="pcard__head">
        <span className="pcard__num">{p.id}</span>
        <span className="pcard__year">{p.year}</span>
        {p.featured && <span className="pcard__badge">Featured</span>}
      </div>
      <div className="pcard__cat">{p.category}</div>
      <h3 className="pcard__title">{p.title}</h3>
      <p className="pcard__desc">{p.description}</p>
      <div className="pcard__metrics">
        {p.metrics.map((m,i) => (
          <div key={i} className="pcard__metric">
            <span className="pcard__mval">{m.val}</span>
            <span className="pcard__mlabel">{m.label}</span>
          </div>
        ))}
      </div>
      <div className="pcard__foot">
        <div className="pcard__tech">{p.tech.map(t => <span key={t} className="pcard__tag">{t}</span>)}</div>
        <a href={p.link} className="pcard__cta" aria-label="View"><ARR /></a>
      </div>
    </div>
  );
}

function Projects() {
  const [ref, inView] = useInView();
  return (
    <section className={`projects section${inView?' in-view':''}`} id="projects" ref={ref}>
      <div className="section__label"><span>02</span>Projects</div>
      <div className="projects__head">
        <h2 className="section__title">Selected Work</h2>
        <p className="section__sub">Production systems, research tools, and everything in between.</p>
      </div>
      <div className="projects__grid">
        {PROJECTS.map((p,i) => <PCard key={p.id} p={p} index={i} />)}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
    SKILLS
═══════════════════════════════════════════════════════════ */
function Skills() {
  const [ref, inView] = useInView();
  return (
    <section className={`skills section${inView?' in-view':''}`} id="skills" ref={ref}>
      <div className="section__label"><span>03</span>Skills</div>
      <div className="skills__head">
        <h2 className="section__title">Tech Stack</h2>
        <p className="section__sub">The tools I reach for when building intelligent systems.</p>
      </div>
      <div className="skills__grid">
        {SKILL_CATS.map((cat,ci) => (
          <div key={ci} className="scat" style={{ animationDelay:`${ci*100}ms` }}>
            <div className="scat__label">{cat.label}</div>
            <div className="scat__items">
              {cat.items.map((item,ii) => (
                <span key={ii} className="sitem" style={{ animationDelay:`${ci*80+ii*30}ms` }}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
    EXPERIENCE
═══════════════════════════════════════════════════════════ */
function Experience() {
  const [ref, inView] = useInView();
  const [active, setActive] = useState(0);
  return (
    <section className={`exp section${inView?' in-view':''}`} id="experience" ref={ref}>
      <div className="section__label"><span>04</span>Experience</div>
      <h2 className="section__title">Work History</h2>
      <div className="exp__layout">
        <div className="exp__tabs">
          {EXPERIENCE.map((e,i) => (
            <button key={i} className={`exp__tab${active===i?' exp__tab--on':''}`} onClick={() => setActive(i)}>
              <span className="exp__tab-role">{e.role}</span>
              <span className="exp__tab-co">{e.company}</span>
              <span className="exp__tab-period">{e.period}</span>
            </button>
          ))}
        </div>
        <div className="exp__panel">
          {EXPERIENCE.map((e,i) => (
            <div key={i} className={`exp__entry${active===i?' exp__entry--on':''}`}>
              <h3 className="exp__role">{e.role}</h3>
              <div className="exp__meta"><span className="exp__co">{e.company}</span><span className="exp__period">{e.period}</span></div>
              <p className="exp__desc">{e.desc}</p>
              <div className="exp__tags">{e.tags.map(t => <span key={t} className="exp__tag">{t}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
    Education
═══════════════════════════════════════════════════════════ */

function Education() {
  const [ref, inView] = useInView();
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All'
    ? CERTIFICATIONS
    : CERTIFICATIONS.filter(c => c.category === activeTab);

  return (
    <section className={`edu section${inView ? ' in-view' : ''}`} id="education" ref={ref}>
      <div className="section__label"><span>05</span>Education</div>

      {/* ── Degrees ── */}
      <h2 className="section__title">Background</h2>
      <div className="edu__grid">
        {EDUCATION.map((e, i) => (
          <div key={i} className="edu__card" style={{ transitionDelay: `${i * 100}ms` }}>
            <div className="edu__card-top">
              <div className="edu__left">
                <div className="edu__period">{e.period}</div>
                <div className="edu__short">{e.short}</div>
              </div>
              <div className="edu__grade">{e.grade}</div>
            </div>
            <h3 className="edu__degree">{e.degree}</h3>
            <div className="edu__school">{e.school}</div>
            <p className="edu__desc">{e.desc}</p>
            <div className="edu__tags">
              {e.tags.map(t => <span key={t} className="edu__tag">{t}</span>)}
            </div>
          </div>
        ))}
      </div>

      {/* ── Certifications ── */}
      <div className="certs">
        <div className="certs__header">
          <h3 className="certs__title">Certifications</h3>
          <span className="certs__count">{filtered.length} certificates</span>
        </div>

        {/* Filter tabs */}
        <div className="certs__tabs">
          {CERT_TABS.map(tab => (
            <button
              key={tab}
              className={`certs__tab${activeTab === tab ? ' certs__tab--on' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              <span className="certs__tab-count">
                {tab === 'All' ? CERTIFICATIONS.length : CERTIFICATIONS.filter(c => c.category === tab).length}
              </span>
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="certs__grid">
          {filtered.map((c, i) => (
            <div
              key={c.id}
              className="cert"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="cert__top">
                <span className="cert__cat">{c.category}</span>
                <span className="cert__year">{c.year}</span>
              </div>
              <h4 className="cert__title">{c.title}</h4>
              <div className="cert__issuer">{c.issuer}</div>
              <div className="cert__footer">
                <span className="cert__id">#{c.credential}</span>
                <a href={c.link} target='_blank' rel="noreferrer" className="cert__link" aria-label="View certificate">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Verify
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════════════
    CONTACT
═══════════════════════════════════════════════════════════ */
function Contact() {
  const [ref, inView] = useInView();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <section className={`contact section${inView?' in-view':''}`} id="contact" ref={ref}>
      <div className="section__label"><span>05</span>Contact</div>
      <div className="contact__grid">
        <div className="contact__left">
          <h2 className="contact__title">Let's build something<br /><em>extraordinary</em></h2>
          <p className="contact__sub">Open to senior AI/ML roles, consulting, and interesting collaborations. I respond within 24 hours.</p>
          <div className="contact__socials">
            {[
              { icon: <MAIL />, label: 'saikrishna95569@gmail.com',              href: 'mailto:saikrishna95569@gmail.com' },
              { icon: <LI />,   label: 'linkedin.com/in/sai-krishnab202',   href: 'https://www.linkedin.com/in/sai-krishnab202/' },
              // { icon: <GH />,   label: 'github.com/sai',        href: '#' },
              // { icon: <XX />,   label: '@sai',                  href: '#' },
            ].map((l,i) => (
              <a key={i} href={l.href} className="contact__social">{l.icon}{l.label}</a>
            ))}
          </div>
        </div>
        <div className="contact__right">
          {sent ? (
            <div className="contact__sent">
              <div className="contact__sent-check">✓</div>
              <h3>Message sent.</h3>
              <p>I'll get back to you soon.</p>
            </div>
          ) : (
            <form className="cform" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div className="cform__row">
                <div className="cform__field">
                  <label className="cform__label">Name</label>
                  <input className="cform__input" placeholder="Your name" value={form.name} onChange={set('name')} required />
                </div>
                <div className="cform__field">
                  <label className="cform__label">Email</label>
                  <input className="cform__input" type="email" placeholder="you@company.com" value={form.email} onChange={set('email')} required />
                </div>
              </div>
              <div className="cform__field">
                <label className="cform__label">Message</label>
                <textarea className="cform__textarea" rows={5} placeholder="Tell me about your project or opportunity..." value={form.message} onChange={set('message')} required />
              </div>
              <button type="submit" className="btn btn--solid btn--full">Send Message →</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
    FOOTER
═══════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span className="footer__logo">SK</span>
        <span className="footer__copy">© 2026 Sai Bollampally. All rights reserved.</span>
        <div className="footer__socials">
          <a href="https://www.linkedin.com/in/sai-krishnab202/" target="_blank" rel="noopener noreferrer" className="footer__social"><LI /></a>
          {/* <a href="#" className="footer__social"><GH /></a>
          <a href="#" className="footer__social"><XX /></a> */}
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
    APP ROOT
═══════════════════════════════════════════════════════════ */
export default function App() {
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);
  return (
    <>
      <div className="noise" />
      <Cursor />
      <Intro onDone={onDone} />
      <div className={`main${ready?' main--in':''}`}>
        <Navbar />
        <Hero />
        <Ticker />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Education />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
