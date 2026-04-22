import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId;

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseDown = () => {
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%) scale(0.7)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(0.7)`;
    };

    const onMouseUp = () => {
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%) scale(1)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(1)`;
    };

    const render = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    animationFrameId = requestAnimationFrame(render);

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest('a') || target.closest('button') || target.closest('[data-hover]');
      const isProjectCard = target.closest('.project-card');

      if (isProjectCard) {
        if (ringRef.current) {
          ringRef.current.style.width = '100px';
          ringRef.current.style.height = '100px';
          ringRef.current.style.borderWidth = '0.5px';
        }
      } else if (isInteractive) {
        if (ringRef.current) {
          ringRef.current.style.width = '72px';
          ringRef.current.style.height = '72px';
          ringRef.current.style.borderColor = 'var(--acid)';
        }
        if (dotRef.current) {
          dotRef.current.style.width = '3px';
          dotRef.current.style.height = '3px';
        }
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      const isInteractive = target.closest('a') || target.closest('button') || target.closest('[data-hover]');
      const isProjectCard = target.closest('.project-card');
      
      if (isProjectCard || isInteractive) {
         if (ringRef.current) {
            ringRef.current.style.width = '44px';
            ringRef.current.style.height = '44px';
            ringRef.current.style.borderColor = 'rgba(212,255,30,0.4)';
            ringRef.current.style.borderWidth = '1px';
         }
         if (dotRef.current) {
            dotRef.current.style.width = '8px';
            dotRef.current.style.height = '8px';
         }
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return createPortal(
    <>
      <style>{`
        @media (hover: none) {
          #cursor-dot, #cursor-ring { display: none !important; }
        }
      `}</style>
      <div 
        id="cursor-dot"
        ref={dotRef}
        className="w-[8px] h-[8px] rounded-full bg-[var(--acid)] fixed top-0 left-0 pointer-events-none z-[9999] transition-[width,height] duration-300 will-change-transform"
      />
      <div 
        id="cursor-ring"
        ref={ringRef}
        className="w-[44px] h-[44px] rounded-full border border-[rgba(212,255,30,0.4)] fixed top-0 left-0 pointer-events-none z-[9998] transition-[width,height,border-color,border-width] duration-300 will-change-transform"
      />
    </>,
    document.body
  );
}
