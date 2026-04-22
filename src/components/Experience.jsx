import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const roles = [
  {
    role: 'Chapter Lead',
    org: 'Google Developer Group (GDG) LNCTS',
    period: 'Aug 2025 – Present',
    bullets: [
      'Leading a 3,000+ member developer community — strategy, speaker outreach, content, contributor growth.',
      'Organized DevFest: 200+ shortlisted attendees, full-stack logistics across design, outreach, and operations.',
      'Led Cloud Study Jam 2025 — LNCTS upgraded from tierless to Tier 2 based on completion rates and engagement.',
      'Delivered a hands-on GCP mentor session — turned documentation into hands-on paths for beginners.',
      'Ran an OSS & freelancing awareness drive — tangible early-career outcomes for multiple students.',
      'Prepped a team for a bug bounty competition — covered recon, XSS, IDOR, auth flaws, responsible disclosure.',
    ],
  },
  {
    role: 'Admin Team Lead',
    org: 'Entrepreneurship Cell (E-Cell) LNCTS',
    period: 'May 2025 – Aug 2025',
    bullets: [
      'Led case study design, sponsorship acquisition, and product design for 500+ participant events.',
      'Coordinated cross-functional teams across admin, outreach, and design tracks.',
    ],
  },
];

export default function Experience() {
  const rowRefs = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    rowRefs.current.forEach((row) => {
      if (!row) return;
      gsap.fromTo(
        row,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <section id="experience" className="px-[1.5rem] md:px-[4rem] py-[4rem] md:py-[6rem]">
      <span className="section-label">04 · experience</span>
      <h2 className="font-display font-[800] text-[clamp(2.5rem,6vw,5.5rem)] tracking-[-0.03em] mb-[3rem] md:mb-[5rem] text-[var(--text-1)]">
        Where I've led
      </h2>

      <div className="flex flex-col">
        {roles.map((item, i) => (
          <div
            key={i}
            ref={(el) => (rowRefs.current[i] = el)}
            className="flex flex-col md:flex-row gap-[2rem] md:gap-[4rem] py-[3rem] md:py-[4rem] border-b border-[var(--border)]"
          >
            {/* Left */}
            <div className="w-full md:w-[30%] flex flex-col gap-[0.5rem]">
              <div
                className="font-display font-[700] text-[var(--text-1)]"
                style={{ fontSize: '1.4rem' }}
              >
                {item.role}
              </div>
              <div
                className="font-mono text-[var(--acid)]"
                style={{ fontSize: '11px', letterSpacing: '0.06em' }}
              >
                {item.org}
              </div>
              <div
                className="font-mono text-[var(--text-3)]"
                style={{ fontSize: '10px', letterSpacing: '0.1em' }}
              >
                {item.period}
              </div>
            </div>

            {/* Right */}
            <div className="w-full md:w-[70%]">
              <ul className="flex flex-col gap-[1rem]">
                {item.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-[1rem] font-sans font-[400] text-[var(--text-2)]"
                    style={{ fontSize: '15px', lineHeight: 1.75 }}
                  >
                    <span className="text-[var(--acid)] mt-[2px] shrink-0">→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        {/* Education block */}
        <div
          ref={(el) => (rowRefs.current[roles.length] = el)}
          className="pt-[3rem] md:pt-[4rem]"
        >
          <div
            className="font-mono uppercase text-[var(--text-3)] mb-[1.25rem]"
            style={{ fontSize: '9px', letterSpacing: '0.2em' }}
          >
            education
          </div>
          <div
            className="font-display font-[700] text-[var(--text-1)] mb-[0.6rem]"
            style={{ fontSize: '1.3rem' }}
          >
            B.Tech Computer Science &amp; Engineering (AI &amp; ML)
          </div>
          <div
            className="font-sans font-[400] text-[var(--text-2)] mb-[0.5rem]"
            style={{ fontSize: '15px' }}
          >
            Lakshmi Narain College of Technology &amp; Science, Bhopal
          </div>
          <div
            className="font-mono text-[var(--text-3)]"
            style={{ fontSize: '11px', letterSpacing: '0.08em' }}
          >
            2023 – 2027 &nbsp;·&nbsp; CGPA 8.27 / 10
          </div>
        </div>
      </div>
    </section>
  );
}
