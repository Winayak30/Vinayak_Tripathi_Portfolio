import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { id: '01', abbr: 'Ja', name: 'Java' },
  { id: '02', abbr: 'Py', name: 'Python' },
  { id: '03', abbr: 'Ts', name: 'TypeScript' },
  { id: '04', abbr: 'Rs', name: 'Rust' },
  { id: '05', abbr: 'Sb', name: 'Spring Boot' },
  { id: '06', abbr: 'Pg', name: 'PostgreSQL' },
  { id: '07', abbr: 'Rd', name: 'Redis' },
  { id: '08', abbr: 'Dk', name: 'Docker' },
  { id: '09', abbr: 'Gc', name: 'GCP' },
  { id: '10', abbr: 'Fb', name: 'Firebase' },
  { id: '11', abbr: 'Gt', name: 'Git' },
  { id: '12', abbr: 'Re', name: 'REST APIs' },
  { id: '13', abbr: 'Sm', name: 'State Machines' },
  { id: '14', abbr: 'Ed', name: 'Event-Driven' },
  { id: '15', abbr: 'Ds', name: 'DSA' },
  { id: '16', abbr: 'Oo', name: 'OOP' },
  { id: '17', abbr: 'Os', name: 'OS' },
  { id: '18', abbr: 'Db', name: 'DBMS' },
];

const TILE_STYLES = `
  .skill-tile {
    width: 100%;
    aspect-ratio: 1;
    min-height: 70px;
    max-height: 82px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    position: relative;
    transition: background 0.2s, border-color 0.2s;
    cursor: none;
  }
  .skill-tile:hover {
    background: var(--acid-dim);
    border-color: var(--acid-mid);
  }
  .skill-tile:hover .skill-abbr {
    color: var(--acid);
  }
  .skill-id {
    font-family: 'JetBrains Mono', monospace;
    font-weight: 300;
    font-size: 8px;
    color: var(--text-3);
    position: absolute;
    top: 6px;
    left: 8px;
    line-height: 1;
  }
  .skill-abbr {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 22px;
    color: var(--text-1);
    transition: color 0.2s;
    line-height: 1;
  }
  .skill-name {
    font-family: 'JetBrains Mono', monospace;
    font-weight: 300;
    font-size: 9px;
    letter-spacing: 0.06em;
    color: var(--text-3);
    text-align: center;
    line-height: 1.2;
    padding: 0 4px;
  }
  @media (max-width: 768px) {
    .skills-grid {
      grid-template-columns: repeat(auto-fill, minmax(70px, 1fr)) !important;
    }
    .skill-tile {
      min-height: 70px;
      max-height: 70px;
    }
    .skill-abbr {
      font-size: 18px;
    }
  }
`;

function SkillTile({ id, abbr, name }) {
  return (
    <div className="skill-tile">
      <span className="skill-id">{id}</span>
      <span className="skill-abbr">{abbr}</span>
      <span className="skill-name">{name}</span>
    </div>
  );
}

export default function Skills() {
  const gridRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const tiles = gridRef.current.querySelectorAll('.skill-tile');
    gsap.fromTo(
      tiles,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'back.out(1.4)',
        stagger: 0.04,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, []);

  return (
    <section id="skills" className="px-[1.5rem] md:px-[4rem] py-[4rem] md:py-[6rem]">
      {/* Single style injection — not inside map */}
      <style>{TILE_STYLES}</style>

      <span className="section-label">03 · skills</span>
      <h2
        className="font-display font-[800] tracking-[-0.03em] mb-[3rem] md:mb-[5rem] text-[var(--text-1)]"
        style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
      >
        What I work with
      </h2>

      <div
        ref={gridRef}
        className="skills-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(82px, 1fr))',
          gap: '8px',
        }}
      >
        {skills.map((skill) => (
          <SkillTile key={skill.id} {...skill} />
        ))}
      </div>
    </section>
  );
}
