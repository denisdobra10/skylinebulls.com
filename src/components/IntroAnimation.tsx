import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

// Register the TextPlugin
gsap.registerPlugin(TextPlugin);

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const textRef = React.useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!textRef.current) return;
    
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 300);
        }, 800);
      }
    });
    
    tl.to(textRef.current, {
      duration: 3.5,
      text: "We are your partner, let's grow your business",
      ease: "none",
      delay: 0.5
    })
    .to(textRef.current, {
      scale: 1.05,
      duration: 0.5,
      ease: "power1.out"
    })
    .to(textRef.current, {
      textShadow: "0 0 20px rgba(255, 51, 102, 0.8)",
      duration: 0.5,
      ease: "power1.out"
    })
    .to(textRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power1.in"
    })
    .to(textRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut"
    });
    
    return () => {
      tl.kill();
    };
  }, [onComplete]);
  
  if (!isVisible) return null;
  
  return (
    <div 
      className="intro-animation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}
    >
      <div 
        ref={textRef}
        style={{
          maxWidth: '800px',
          lineHeight: 1.4,
          fontSize: '3.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          padding: '0 2rem',
          color: '#fff',
          position: 'relative',
          zIndex: 1
        }}
      />
    </div>
  );
};

export default IntroAnimation; 