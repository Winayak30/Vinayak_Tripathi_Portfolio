import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const SplitText = ({ text }) => {
  return (
    <>
      {text.split('').map((char, index) => (
        <span 
          key={index} 
          className="char inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </span>
      ))}
    </>
  );
};

export default function Hero({ ready }) {
  const containerRef = useRef(null);
  const subtitleRef = useRef(null);
  const [terminalText, setTerminalText] = useState('');
  
  const fullTerminalText = `POST /v1/transactions
{
  "type": "debit",
  "account": "acc_usr_8821",
  "amount": 149900,
  "currency": "INR",
  "idempotency_key": "txn_k9x2"
}

→ 200 OK
→ ledger balanced ✓
→ audit trail written`;

  useEffect(() => {
    let charIndex = 0;
    let typingInterval;
    
    const type = () => {
      if (charIndex <= fullTerminalText.length) {
        setTerminalText(fullTerminalText.slice(0, charIndex));
        charIndex++;
        typingInterval = setTimeout(type, 28);
      } else {
        setTimeout(() => {
          charIndex = 0;
          setTerminalText('');
          type();
        }, 2400);
      }
    };
    
    type();
    
    return () => clearTimeout(typingInterval);
  }, []);

  useEffect(() => {
    if (!ready) return;
    
    const chars = containerRef.current.querySelectorAll('.char');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      gsap.set(chars, { opacity: 1, y: 0, rotateX: 0 });
      gsap.set(subtitleRef.current, { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline();
    
    tl.fromTo(chars, 
      { opacity: 0, y: 120, rotateX: -90 },
      {
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.032,
      }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.2'
    );
    
  }, [ready]);

  return (
    <section className="relative w-full h-[100dvh] flex flex-col justify-end px-[1.5rem] md:px-[4rem] pb-[3rem] md:pb-[4.5rem]">
      
      <div className="hidden md:absolute md:block top-[120px] right-[4rem] w-[280px] border-l border-[var(--border)] pl-[1.5rem]">
        <div className="font-mono text-[12px] text-[var(--text-3)] leading-[1.9] whitespace-pre-wrap">
          {terminalText}<span className="animate-pulse">_</span>
        </div>
      </div>

      <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--acid)] mb-[1.4rem]">
        backend engineer · fintech infrastructure
      </div>

      <div 
        ref={containerRef} 
        style={{ perspective: '1000px' }}
        className="flex flex-col"
      >
        <h1 className="font-display font-[800] text-[clamp(3.5rem,18vw,5.5rem)] md:text-[clamp(5rem,13vw,11rem)] tracking-[-0.04em] leading-[0.86] text-[var(--text-1)] uppercase">
          <SplitText text="VINAYAK" />
        </h1>
        <h1 className="font-display font-[800] text-[clamp(3.5rem,18vw,5.5rem)] md:text-[clamp(5rem,13vw,11rem)] tracking-[-0.04em] leading-[0.86] text-[var(--text-1)] uppercase">
          <SplitText text="TRIPATHI" />
        </h1>
      </div>

      <p 
        ref={subtitleRef}
        className="opacity-0 font-sans font-[400] text-[17px] text-[var(--text-2)] max-w-[480px] mt-[1.75rem] leading-[1.75] mb-[3rem] md:mb-[3rem]"
      >
        Building distributed systems that don't lie. Open to backend roles at Razorpay, Juspay & Zerodha — 2027.
      </p>

      <div className="flex flex-wrap items-center gap-[1rem]">
        <a 
          href="https://github.com/Winayak30" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-mono text-[11px] border border-[var(--acid-mid)] text-[var(--acid)] rounded-full px-[18px] py-[8px] transition-colors duration-200 hover:bg-[var(--acid-dim)] cursor-none"
        >
          github.com/Winayak30 ↗
        </a>
        <span className="hidden md:inline text-[var(--text-3)]">·</span>
        <span className="font-mono text-[10px] tracking-[0.1em] text-[var(--text-3)] uppercase transition-colors duration-300 w-full md:w-auto">
          LNCTS Bhopal  ·  2027 Batch  ·  CGPA 8.27
        </span>
      </div>

      <div className="hidden md:flex absolute bottom-[2.5rem] left-[50%] translate-x-[-50%] flex-col items-center gap-2">
        <div className="w-[1px] h-[48px] bg-[#181818] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[var(--text-3)] translate-y-[-100%] animate-[scroll-down_2s_infinite]" />
        </div>
        <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--text-3)] uppercase">scroll</span>
      </div>

      <style>{`
        @keyframes scroll-down {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}
