import { useRef } from 'react';
import { motion } from 'framer-motion';

const contacts = [
  { label: 'email', value: 'tripathivinayak30@gmail.com', href: 'mailto:tripathivinayak30@gmail.com' },
  { label: 'github', value: 'github.com/Winayak30', href: 'https://github.com/Winayak30' },
  { label: 'linkedin', value: 'linkedin.com/in/vinayak-tripathi-9a3001284', href: 'https://www.linkedin.com/in/vinayak-tripathi-9a3001284' },
  { label: 'phone', value: '+91 91790 71022', href: 'tel:+919179071022' },
  { label: 'location', value: 'Bhopal, Madhya Pradesh, India', href: null },
];

const rowVariants = {
  rest: { backgroundColor: 'transparent' },
  hover: { backgroundColor: 'var(--acid-dim)' },
};

const lineVariants = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1, transition: { duration: 0.3, ease: 'easeOut' } },
};

const valueVariants = {
  rest: { color: 'var(--text-2)' },
  hover: { color: 'var(--text-1)' },
};

function ContactRow({ label, value, href }) {
  const content = (
    <motion.div
      className="flex items-center py-[1.25rem] border-b border-[var(--border)] relative overflow-hidden cursor-none"
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={rowVariants}
      transition={{ duration: 0.2 }}
    >
      {/* Sliding bottom border */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--acid)] origin-left"
        variants={lineVariants}
      />

      <div
        className="font-mono uppercase text-[var(--text-3)] shrink-0 mr-[2rem]"
        style={{ fontSize: '10px', letterSpacing: '0.18em', width: '80px' }}
      >
        {label}
      </div>

      <motion.div
        className="font-sans font-[400]"
        style={{ fontSize: '15px' }}
        variants={valueVariants}
        transition={{ duration: 0.2 }}
      >
        {value}
      </motion.div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return content;
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="px-[1.5rem] md:px-[4rem] py-[4rem] md:py-[6rem] relative overflow-hidden"
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      {/* Decorative background text */}
      <div
        className="absolute select-none pointer-events-none font-display font-[800]"
        style={{
          fontSize: '18vw',
          color: 'rgba(212,255,30,0.03)',
          right: '-2vw',
          bottom: '5%',
          lineHeight: 1,
          userSelect: 'none',
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        OPEN
      </div>

      <div className="relative z-10">
        <span className="section-label">05 · let's connect</span>

        <div className="mb-[3rem] md:mb-[4rem]">
          <div
            className="font-display font-[800] text-[var(--text-1)] leading-[0.9] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}
          >
            Got a role?
          </div>
          <div
            className="font-display font-[800] text-[var(--acid)] leading-[0.9] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}
          >
            Let's talk.
          </div>
        </div>

        <div className="flex flex-col border-t border-[var(--border)]">
          {contacts.map((c) => (
            <ContactRow key={c.label} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}
