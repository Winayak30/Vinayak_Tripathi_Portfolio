export default function Marquee() {
  const content = (
    <div className="flex items-center whitespace-nowrap">
      <span>BACKEND ENGINEERING</span><span className="mx-[1.2rem] text-[var(--acid)]">·</span>
      <span>FINTECH INFRASTRUCTURE</span><span className="mx-[1.2rem] text-[var(--acid)]">·</span>
      <span>JAVA</span><span className="mx-[1.2rem] text-[var(--acid)]">·</span>
      <span>SPRING BOOT</span><span className="mx-[1.2rem] text-[var(--acid)]">·</span>
      <span>POSTGRESQL</span><span className="mx-[1.2rem] text-[var(--acid)]">·</span>
      <span>REDIS</span><span className="mx-[1.2rem] text-[var(--acid)]">·</span>
      <span>DOCKER</span><span className="mx-[1.2rem] text-[var(--acid)]">·</span>
      <span>DISTRIBUTED SYSTEMS</span><span className="mx-[1.2rem] text-[var(--acid)]">·</span>
      <span>STATE MACHINES</span><span className="mx-[1.2rem] text-[var(--acid)]">·</span>
      <span>DOUBLE-ENTRY LEDGER</span><span className="mx-[1.2rem] text-[var(--acid)]">·</span>
      <span>EVENT-DRIVEN ARCHITECTURE</span><span className="mx-[1.2rem] text-[var(--acid)]">·</span>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-container:hover .marquee-content {
          animation-play-state: paused;
          color: var(--text-2);
        }
        .marquee-content {
          color: var(--text-3);
          transition: color 0.3s ease;
        }
      `}</style>
      <div className="marquee-container w-full h-[48px] border-y border-[var(--border)] bg-[var(--bg)] overflow-hidden flex items-center">
        <div 
          className="marquee-content flex font-mono text-[10px] tracking-[0.22em] uppercase"
          style={{ animation: 'marquee 35s linear infinite', width: 'fit-content' }}
        >
          {content}
          {content}
        </div>
      </div>
    </>
  );
}
