import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ 
  children, 
  delay = 0, 
  duration = 1, 
  y = 50,
  className = ''
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            
            gsap.fromTo(
              section,
              { 
                opacity: 0, 
                y: y,
                filter: 'blur(10px)'
              },
              { 
                opacity: 1, 
                y: 0,
                filter: 'blur(0px)',
                duration: duration,
                delay: delay,
                ease: 'power3.out'
              }
            );
            
            // Unobserve after animation
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    observer.observe(section);

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [delay, duration, y]);

  return (
    <div ref={sectionRef} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
};

export default FadeInSection; 