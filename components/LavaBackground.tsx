
import React, { useEffect, useRef } from 'react';

const LavaBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      color: string;
      wobble: number;

      constructor() {
        this.reset();
        // Distribute initially
        this.y = Math.random() * (canvas?.height || 0);
      }

      reset() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = (canvas?.height || 0) + 20;
        this.size = Math.random() * 4 + 0.5;
        this.speedY = Math.random() * 1.2 + 0.3;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.6 + 0.1;
        this.wobble = Math.random() * 0.1;
        const colors = ['#ff3333', '#ff6600', '#330000', '#ff0000'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * this.wobble;
        
        if (this.y < -20) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        
        // Add a bloom effect to brighter particles
        if (this.size > 2) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = this.color;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      const count = Math.min(80, Math.floor(window.innerWidth / 15));
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-[#050505]">
      <canvas ref={canvasRef} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#ff333311,transparent_70%)]" />
    </div>
  );
};

export default LavaBackground;
