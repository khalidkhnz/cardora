"use client";

import { useEffect, useRef } from "react";

type ParticleType = "PETAL" | "LIGHT" | "DUST";

interface ParticleLayerProps {
  count?: number;
  intensity?: "low" | "medium" | "high";
  type?: ParticleType;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  life: number;
  maxLife: number;
  type: ParticleType;
}

function isLowEndDevice(): boolean {
  if (typeof window === "undefined") return true;
  const nav = navigator as Navigator & { deviceMemory?: number };
  if (nav.hardwareConcurrency && nav.hardwareConcurrency <= 2) return true;
  if (nav.deviceMemory && nav.deviceMemory <= 2) return true;
  if (/Mobi|Android/i.test(navigator.userAgent)) return true;
  return false;
}

export function ParticleLayer({
  count = 30,
  intensity = "medium",
  type = "PETAL",
}: ParticleLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isLowEndDevice()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Particle[] = [];

    const multiplier = intensity === "low" ? 0.5 : intensity === "high" ? 1.5 : 1;
    const particleCount = Math.round(count * multiplier);

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function createParticle(): Particle {
      return {
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        size: type === "PETAL" ? 3 + Math.random() * 4 : type === "LIGHT" ? 2 + Math.random() * 6 : 1 + Math.random() * 2,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: -0.3 - Math.random() * 0.5,
        opacity: 0.2 + Math.random() * 0.5,
        life: 0,
        maxLife: 200 + Math.random() * 300,
        type,
      };
    }

    function drawParticle(p: Particle) {
      if (!ctx) return;
      const fadeRatio = Math.sin((p.life / p.maxLife) * Math.PI);
      const alpha = p.opacity * fadeRatio;

      ctx.save();
      ctx.globalAlpha = alpha;

      if (p.type === "PETAL") {
        ctx.fillStyle = "#FFB6C1";
        ctx.shadowColor = "#FFB6C1";
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.size, p.size * 0.6, Math.random() * Math.PI, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === "LIGHT") {
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grad.addColorStop(0, "rgba(255, 215, 0, 0.8)");
        grad.addColorStop(1, "rgba(255, 215, 0, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = "rgba(255, 215, 0, 0.4)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      while (particles.length < particleCount) {
        particles.push(createParticle());
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]!;
        p.x += p.speedX;
        p.y += p.speedY;
        p.life++;

        if (p.life > p.maxLife || p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          particles.splice(i, 1);
          continue;
        }

        drawParticle(p);
      }

      animationId = requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [count, intensity, type]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
