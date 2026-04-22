import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Loader({ onComplete }) {
  const [mounted, setMounted] = useState(true);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setMounted(false);
        if (onComplete) onComplete();
      }
    });

    tl.to(progressRef.current, {
      width: '220px',
      duration: 1.2,
      ease: 'power3.inOut'
    })
    .to(textRef.current, {
      scale: 6,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in'
    }, '+=0.1')
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.4
    }, '+=0.3');

  }, [onComplete]);

  if (!mounted) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-none"
      style={{ backgroundColor: '#080808' }}
    >
      <div 
        ref={textRef}
        className="font-display text-[80px] text-[var(--acid)] tracking-[0.1em] origin-center"
      >
        VT
      </div>
      <div 
        className="h-[1px] bg-[var(--acid)] mt-8"
        ref={progressRef}
        style={{ width: 0 }}
      />
    </div>
  );
}
