import React, { useEffect } from 'react';

const StarryBackground: React.FC = () => {
  useEffect(() => {
    const canvas = document.getElementById('starry-bg') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Star properties
    const stars: { x: number; y: number; size: number; speed: number }[] = [];
    const numStars = 200;

    // Initialize stars with slower speed
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.2 + 0.05 // Reduced speed range
      });
    }

    // Animation function
    const animate = () => {
      if (!ctx) return;
      
      // Create gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width
      );
      gradient.addColorStop(0, '#200000'); // Darker red
      gradient.addColorStop(1, '#000000');

      // Clear and fill background
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add darker overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      stars.forEach(star => {
        star.y = (star.y + star.speed) % canvas.height;
        
        // Draw star with slightly reduced brightness
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, ${130 + Math.random() * 100}, ${130 + Math.random() * 100}, ${0.4 + Math.random() * 0.4})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
      <canvas
        id="starry-bg"
        className="fixed top-0 left-0 w-full h-full -z-10"
        style={{ background: 'black' }}
      />
      <div className="fixed top-0 left-0 w-full h-full bg-black/40 -z-10" /> {/* Additional overlay */}
    </>
  );
};

export default StarryBackground; 