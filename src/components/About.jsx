import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Counter({ end, suffix = '', label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        let start = 0;
        const duration = 2000;
        const startTime = performance.now();

        const step = (currentTime) => {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          setCount(start + (end - start) * easeProgress);

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            setCount(end);
          }
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  const isFloat = end % 1 !== 0;
  const displayCount = hasAnimated.current && count === end 
    ? (isFloat ? end.toFixed(2) : end)
    : (isFloat ? count.toFixed(2) : (count < 1 ? count.toFixed(2) : Math.floor(count)));

  return (
    <div ref={ref} className="border-t border-[var(--border)] pt-[1.25rem]">
      <div className="font-display font-[800] text-[2.8rem] text-[var(--text-1)]">
        {displayCount}{suffix}
      </div>
      <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--text-3)] whitespace-pre-wrap mt-1">
        {label}
      </div>
    </div>
  );
}

export default function About() {
  const headingRef = useRef(null);
  const paraRef1 = useRef(null);
  const paraRef2 = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (headingRef.current) {
      const words = headingRef.current.innerText.split(' ');
      headingRef.current.innerHTML = words.map(w => `<span class="inline-block overflow-hidden"><span class="inline-block word-inner origin-top">${w}</span></span>`).join(' ');
      
      gsap.fromTo(headingRef.current.querySelectorAll('.word-inner'),
        { y: 60, opacity: 0 },
        { 
          y: 0, opacity: 1, 
          stagger: 0.1, 
          ease: 'power3.out',
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );
    }

    [paraRef1.current, paraRef2.current].forEach((para, i) => {
      gsap.fromTo(para,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: para,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

  }, []);

  const pills = ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'Docker', 'GCP', 'Python', 'Git'];

  return (
    <section id="about" className="px-[1.5rem] md:px-[4rem] py-[4rem] md:py-[6rem]">
      <span className="section-label">01 · about</span>
      <h2 ref={headingRef} className="font-display font-[800] text-[clamp(2.5rem,6vw,5.5rem)] tracking-[-0.03em] mb-[3rem] md:mb-[5rem] text-[var(--text-1)]">
        Who I am
      </h2>

      <div className="flex flex-col md:flex-row gap-[4rem] md:gap-[10%]">
        <div className="w-full md:w-[60%]">
          <p ref={paraRef1} className="font-sans font-[400] text-[17px] text-[var(--text-2)] max-w-[540px] leading-[1.85] mb-[1.85rem]">
            3rd-year B.Tech CSE (AI & ML) at LNCTS, Bhopal — CGPA 8.27. I'm drawn to backend engineering where correctness is non-negotiable: concurrent writes, distributed state, money movement. The kind of code that can't afford to be wrong.
          </p>
          <p ref={paraRef2} className="font-sans font-[400] text-[17px] text-[var(--text-2)] max-w-[540px] leading-[1.85] mb-[3rem]">
            Outside of systems, I run the GDG chapter at LNCTS — 3,000+ member community. Led Cloud Study Jam 2025 to Tier 2 recognition. Organized DevFest for 200+ attendees. I think about fintech infrastructure the way a civil engineer thinks about bridges — precision first, elegance second.
          </p>

          <div>
            <div className="font-mono text-[9px] uppercase text-[var(--text-3)] tracking-[0.18em] mb-[0.85rem]">
              primary stack
            </div>
            <div className="flex flex-wrap gap-2">
              {pills.map((pill, i) => (
                <span 
                  key={i}
                  className="font-mono text-[11px] border border-[var(--border-2)] text-[var(--text-3)] rounded-[4px] px-[13px] py-[5px] transition-all duration-200 hover:border-[var(--acid-mid)] hover:text-[var(--acid)] hover:bg-[var(--acid-dim)] cursor-none"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-[40%] grid grid-cols-2 gap-x-[2rem] gap-y-[3rem] mt-[2rem] md:mt-0">
          <Counter end={8.27} label="CGPA" />
          <Counter end={3000} suffix="+" label="GDG members" />
          <Counter end={200} suffix="+" label={`DevFest\nattendees`} />
          <Counter end={2027} label={`Placement target\nbatch`} />
        </div>
      </div>
    </section>
  );
}
