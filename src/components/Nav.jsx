import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollSpy } from '../hooks/useScrollSpy';

export default function Nav() {
  const activeSection = useScrollSpy(['about', 'projects', 'skills', 'experience', 'contact']);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'about', label: 'about', num: '01' },
    { id: 'projects', label: 'projects', num: '02' },
    { id: 'skills', label: 'skills', num: '03' },
    { id: 'experience', label: 'experience', num: '04' },
    { id: 'contact', label: 'contact', num: '05' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-[100] h-[68px] flex items-center justify-between px-[1.5rem] md:px-[4rem] transition-all duration-300 ${
          scrolled 
            ? 'bg-[rgba(8,8,8,0.9)] backdrop-blur-[20px] saturate-[180%] border-b border-[var(--border)]' 
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="font-display font-[800] text-[16px] tracking-[0.1em] text-[var(--text-1)]">
          VT
        </div>

        <div className="hidden md:flex gap-[2rem]">
          {links.map(link => (
            <a 
              key={link.id} 
              href={`#${link.id}`}
              className="font-mono text-[10px] tracking-[0.18em] uppercase transition-colors duration-200"
              style={{
                color: activeSection === link.id ? 'var(--acid)' : 'var(--text-3)'
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--text-1)'}
              onMouseLeave={(e) => e.target.style.color = activeSection === link.id ? 'var(--acid)' : 'var(--text-3)'}
            >
              <span className="opacity-70 mr-1">{link.num}</span> {link.label}
            </a>
          ))}
        </div>

        <div 
          className="md:hidden font-mono text-[var(--text-2)] text-[24px] cursor-none"
          onClick={() => setMobileOpen(true)}
        >
          ☰
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[101] flex flex-col items-center justify-center bg-[#080808]"
          >
            <div 
              className="absolute top-[20px] right-[1.5rem] font-mono text-[var(--text-2)] text-[24px] cursor-none"
              onClick={() => setMobileOpen(false)}
            >
              ✕
            </div>
            <div className="flex flex-col items-center gap-[2rem]">
              {links.map(link => (
                <a 
                  key={link.id} 
                  href={`#${link.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="font-display font-[800] text-[2.5rem] text-[var(--text-1)] flex items-center"
                >
                  <span className="text-[var(--acid)] text-[1rem] mr-4">{link.num}</span>
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
