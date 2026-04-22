import { motion } from 'framer-motion';

export default function Projects() {
  const ProjectRow = ({ num, name, sub, desc, bullets, stack, isFlagship }) => {
    return (
      <motion.div 
        className={`project-card border-b border-[var(--border)] py-[3rem] md:py-[4rem] flex flex-col md:flex-row gap-[2rem] md:gap-[4rem] group cursor-none relative ${isFlagship ? 'bg-[var(--acid-dim)] rounded-[12px] border border-[var(--acid-mid)] p-[2.5rem] my-[2rem] md:my-[3rem]' : ''}`}
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        {!isFlagship && (
          <motion.div 
            className="absolute left-[-1.5rem] top-[3rem] bottom-[3rem] w-[1px] bg-[var(--acid)] origin-top hidden md:block"
            variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        )}
        
        {isFlagship && (
           <div className="absolute top-[2.5rem] right-[2.5rem] hidden md:block">
             <span className="font-mono text-[9px] bg-[var(--acid)] text-[#080808] px-[10px] py-[4px] rounded-[3px] tracking-[0.1em]">FLAGSHIP PROJECT</span>
           </div>
        )}

        <div className="w-full md:w-[25%] flex flex-col md:flex-row gap-[1rem] md:gap-[2rem]">
          <motion.div 
            className="font-mono text-[10px] tracking-[0.18em]"
            variants={{ rest: { color: isFlagship ? 'var(--acid)' : 'var(--text-3)' }, hover: { color: 'var(--acid)' } }}
          >
            {num}
          </motion.div>
          <div>
            <motion.div 
              className={`font-display font-[800] text-[2rem] leading-[1.1] mb-[0.5rem]`}
              variants={{ rest: { color: isFlagship ? 'var(--text-1)' : 'var(--text-2)' }, hover: { color: 'var(--text-1)' } }}
            >
              {name}
            </motion.div>
            <div className={`font-mono text-[11px] tracking-[0.08em] ${isFlagship ? 'text-[var(--acid)]' : 'text-[var(--text-3)]'}`}>
              {sub}
            </div>
            
            <div className="flex md:hidden flex-wrap gap-2 mt-[1.5rem] mb-[1rem]">
              {stack.map((s, i) => (
                <span key={i} className={`font-mono text-[11px] border rounded-[4px] px-[13px] py-[5px] ${isFlagship ? 'border-[var(--acid-mid)] text-[var(--acid)]' : 'border-[var(--border-2)] text-[var(--text-3)]'}`}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-[75%] flex flex-col justify-between">
          <div>
            {isFlagship && (
              <div className="md:hidden mb-[1.5rem]">
                <span className="font-mono text-[9px] bg-[var(--acid)] text-[#080808] px-[10px] py-[4px] rounded-[3px] tracking-[0.1em]">FLAGSHIP PROJECT</span>
              </div>
            )}
            <p className={`font-sans font-[400] text-[17px] leading-[1.85] mb-[2rem] max-w-[640px] ${isFlagship ? 'text-[var(--text-1)] opacity-90' : 'text-[var(--text-2)]'}`}>
              {desc}
            </p>
            <ul className="flex flex-col gap-[0.8rem]">
              {bullets.map((b, i) => (
                <li key={i} className={`font-sans font-[400] text-[15px] flex items-start gap-[1rem] max-w-[700px] ${isFlagship ? 'text-[var(--text-1)] opacity-80' : 'text-[var(--text-2)]'}`}>
                  <span className="text-[var(--acid)] mt-1">→</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="hidden md:flex flex-wrap gap-2 justify-end mt-[3rem]">
            {stack.map((s, i) => (
              <span key={i} className={`font-mono text-[11px] border rounded-[4px] px-[13px] py-[5px] ${isFlagship ? 'border-[var(--acid-mid)] text-[var(--acid)]' : 'border-[var(--border-2)] text-[var(--text-3)]'}`}>{s}</span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  const projectsData = [
    {
      num: '01', name: 'Stripe Ledger', sub: 'Double-Entry Bookkeeping Microservice', isFlagship: true,
      desc: "Production-grade financial ledger inspired by Stripe's internal money movement architecture. Every transaction debits one account and credits another — the ledger never goes out of balance. Designed with fintech-grade constraints: no money is lost, no transaction is double-posted, ever.",
      bullets: [
        "Atomic transaction posting with double-entry guarantees — one credit, one debit, always balanced.",
        "Optimistic locking on PostgreSQL for concurrent writes — correctness under contention.",
        "Redis-backed idempotency key cache — eliminates duplicate transaction processing at the infrastructure level.",
        "Immutable audit trail — every state transition is recorded, nothing is ever overwritten."
      ],
      stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'Docker']
    },
    {
      num: '02', name: 'Flowforge', sub: 'Distributed Workflow Execution Engine', isFlagship: false,
      desc: "State-machine-driven workflow engine with async execution, branching, retries, and failure recovery. Built for workflows that must survive partial failures and restarts without losing state.",
      bullets: [
        "Event-driven model via Redis queues — concurrent workflows processed with fault tolerance.",
        "Execution state modeled explicitly as a state machine — correctness is structural, not incidental.",
        "Drag-and-drop editor using a graph-based data model. Deployed via Docker with PostgreSQL persistence."
      ],
      stack: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'Vue.js']
    },
    {
      num: '03', name: 'Gravity Simulator', sub: 'Real-Time N-Body Physics Engine', isFlagship: false,
      desc: "Real-time n-body gravitational simulation with OpenGL rendering. Each frame computes force vectors, accelerations, and velocity updates across N particles. Built to understand what happens between the CPU and GPU.",
      bullets: [
        "Newton's law of universal gravitation applied across N particles — naive O(n²) loop optimized for real-time.",
        "Focused on the hardware-software boundary: CPU-bound physics loops feeding into GPU rendering pipelines."
      ],
      stack: ['C++', 'OpenGL']
    },
    {
      num: '04', name: 'InferMail', sub: 'AI Email Reply Agent', isFlagship: false,
      desc: "Local AI-powered email triage with LLM-generated draft replies and human-in-the-loop approval. Designed so zero emails are sent without explicit user sign-off.",
      bullets: [
        "LLM drafts, classifies, and queues replies. Human reviews via Flask UI before any send.",
        "SQLite-backed feedback loop — every approval/rejection improves future draft quality."
      ],
      stack: ['Python', 'SQLite', 'Flask', 'Ollama', 'Gmail SMTP']
    },
    {
      num: '05', name: 'Rust TUI', sub: 'Systems-Level Terminal Interface', isFlagship: false,
      desc: "A terminal UI application built to understand Rust's ownership model at the language level. No garbage collector. Manual lifetime management. Zero-cost abstractions that actually cost nothing.",
      bullets: [
        "Exploring what memory safety looks like without a runtime — every allocation explicit and owned."
      ],
      stack: ['Rust', 'Ratatui', 'Crossterm']
    }
  ];

  return (
    <section id="projects" className="px-[1.5rem] md:px-[4rem] py-[4rem] md:py-[6rem]">
      <span className="section-label">02 · projects</span>
      <h2 className="font-display font-[800] text-[clamp(2.5rem,6vw,5.5rem)] tracking-[-0.03em] mb-[3rem] md:mb-[5rem] text-[var(--text-1)]">
        What I've built
      </h2>

      <div className="w-full flex flex-col">
        {projectsData.map((p, i) => (
          <ProjectRow key={i} {...p} />
        ))}
      </div>
    </section>
  );
}
