export default function Footer() {
  const marqueeContent = (
    <div className="flex items-center whitespace-nowrap">
      <span>AVAILABLE FOR BACKEND ROLES</span><span className="mx-[0.8rem] text-[var(--acid)]">·</span>
      <span>RAZORPAY</span><span className="mx-[0.8rem] text-[var(--acid)]">·</span>
      <span>JUSPAY</span><span className="mx-[0.8rem] text-[var(--acid)]">·</span>
      <span>ZERODHA</span><span className="mx-[0.8rem] text-[var(--acid)]">·</span>
      <span>2027 BATCH</span><span className="mx-[0.8rem] text-[var(--acid)]">·</span>
    </div>
  );

  return (
    <footer className="w-full border-t border-[var(--border)] px-[1.5rem] md:px-[4rem] py-[1.5rem] flex flex-col md:flex-row justify-center md:justify-between items-center gap-[0.5rem] md:gap-0 pb-[3rem]">
      <div className="font-mono text-[10px] tracking-[0.12em] text-[var(--text-3)] text-center md:text-left">
        Vinayak Tripathi
      </div>

      <div className="w-full md:w-auto max-w-[360px] overflow-hidden flex items-center">
        <style>{`
          @keyframes marquee-footer {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
        <div 
          className="flex font-mono text-[9px] text-[var(--text-3)] tracking-[0.16em] uppercase whitespace-nowrap"
          style={{ animation: 'marquee-footer 50s linear infinite', width: 'fit-content' }}
        >
          {marqueeContent}
          {marqueeContent}
        </div>
      </div>

      <div className="font-mono text-[10px] text-[var(--text-3)] text-center md:text-right">
        Bhopal, India
      </div>
    </footer>
  );
}
