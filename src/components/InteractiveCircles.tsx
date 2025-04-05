import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import '../styles/interactive-circles.css';

const InteractiveCircles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const [hasMouseMoved, setHasMouseMoved] = useState(false);
  
  useEffect(() => {
    if (!containerRef.current || !circleRef.current) return;
    
    const updateCirclePosition = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const x = lastMousePosition.current.x - rect.left;
      const y = lastMousePosition.current.y - rect.top;
      
      gsap.to(circleRef.current, {
        x: x,
        y: y,
        duration: 0.6,
        ease: 'power2.out'
      });
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!hasMouseMoved) {
        setHasMouseMoved(true);
        gsap.to(circleRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
      lastMousePosition.current = { x: e.clientX, y: e.clientY };
      updateCirclePosition();
    };
    
    const handleScroll = () => {
      updateCirclePosition();
    };
    
    // Set initial position
    const initialX = window.innerWidth / 2;
    const initialY = window.innerHeight / 2;
    lastMousePosition.current = { x: initialX, y: initialY };
    
    gsap.set(circleRef.current, {
      x: initialX,
      y: initialY,
      opacity: 0
    });
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasMouseMoved]);
  
  return (
    <div 
      ref={containerRef} 
      className="interactive-circles-container"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0
      }}
    >
      <div
        ref={circleRef}
        className="interactive-circle"
        style={{
          width: '300px',
          height: '300px',
          position: 'absolute',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(255, 51, 102, 0.4) 0%, rgba(255, 51, 102, 0) 70%)',
          filter: 'blur(20px)',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 0.3s ease'
        }}
      />
    </div>
  );
};

export default InteractiveCircles; 