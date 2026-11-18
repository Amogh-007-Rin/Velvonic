'use client';

import { useEffect, useRef } from 'react';
import './BlackholeBackground.css';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const BlackholeBackground = ({
  colors = ['#ffffff', '#7dd3fc', '#a78bfa'],
  speed = 0.35,
  opacity = 0.8,
  mouseInteraction = true,
  paused = false,
  dpr,
  className = '',
  style,
  ...rest
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!container || !canvas || !context) return undefined;

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const palette = Array.isArray(colors) && colors.length ? colors : ['#ffffff', '#7dd3fc', '#a78bfa'];
    const stars = Array.from({ length: 180 }, (_, index) => ({
      angle: (index * 2.39996) % (Math.PI * 2),
      radius: 0.35 + ((index * 0.61803) % 1) * 0.8,
      size: 0.35 + ((index * 0.173) % 1) * 1.35,
      alpha: 0.25 + ((index * 0.37) % 1) * 0.75,
      phase: (index * 1.73) % (Math.PI * 2),
    }));
    const pointer = { x: 0.5, y: 0.5 };
    let animationFrame = 0;
    let lastTime = 0;
    let elapsed = 0;

    const resize = () => {
      const ratio = Math.min(dpr || window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(container.clientWidth * ratio));
      canvas.height = Math.max(1, Math.round(container.clientHeight * ratio));
      canvas.style.width = `${container.clientWidth}px`;
      canvas.style.height = `${container.clientHeight}px`;
    };

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width * (0.5 + (pointer.x - 0.5) * 0.04);
      const centerY = height * (0.5 + (pointer.y - 0.5) * 0.04);
      const scale = Math.min(width, height);
      const radius = scale * 0.13;
      const diskRadius = radius * 1.65;
      const motion = reduceMotion || paused ? 0 : clamp(speed, 0, 2);

      context.clearRect(0, 0, width, height);
      const background = context.createRadialGradient(centerX, centerY, radius * 0.5, centerX, centerY, scale * 0.8);
      background.addColorStop(0, 'rgba(9, 6, 20, 0.98)');
      background.addColorStop(0.45, 'rgba(3, 3, 12, 0.96)');
      background.addColorStop(1, 'rgba(1, 1, 4, 1)');
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);

      context.save();
      context.globalCompositeOperation = 'lighter';
      stars.forEach((star) => {
        const angle = star.angle + elapsed * motion * (0.015 / star.radius);
        const x = width * 0.5 + Math.cos(angle) * scale * star.radius;
        const y = height * 0.5 + Math.sin(angle) * scale * star.radius * 0.55;
        const twinkle = star.alpha * (0.75 + Math.sin(elapsed * 2 + star.phase) * 0.25);
        context.fillStyle = `rgba(190, 220, 255, ${twinkle})`;
        context.fillRect(x, y, star.size, star.size);
      });

      context.translate(centerX, centerY);
      context.rotate(-0.12);
      context.scale(1, 0.38);
      const diskGlow = context.createRadialGradient(0, 0, radius * 0.8, 0, 0, diskRadius * 1.5);
      diskGlow.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      diskGlow.addColorStop(0.22, `${palette[0]}cc`);
      diskGlow.addColorStop(0.58, `${palette[1] ?? palette[0]}55`);
      diskGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      context.fillStyle = diskGlow;
      context.beginPath();
      context.arc(0, 0, diskRadius * 1.55, 0, Math.PI * 2);
      context.fill();

      for (let ring = 0; ring < 7; ring += 1) {
        context.beginPath();
        context.arc(0, 0, diskRadius * (0.92 + ring * 0.11), 0, Math.PI * 2);
        context.strokeStyle = `${palette[ring % palette.length]}${ring < 2 ? 'dd' : '66'}`;
        context.lineWidth = Math.max(1, scale * 0.004 * (1 - ring * 0.08));
        context.shadowBlur = scale * 0.025;
        context.shadowColor = palette[ring % palette.length];
        context.stroke();
      }
      context.shadowBlur = 0;
      context.restore();

      const eventHorizon = context.createRadialGradient(centerX - radius * 0.2, centerY - radius * 0.2, radius * 0.1, centerX, centerY, radius);
      eventHorizon.addColorStop(0, '#000000');
      eventHorizon.addColorStop(0.75, '#000000');
      eventHorizon.addColorStop(0.9, 'rgba(0, 0, 0, 0.95)');
      eventHorizon.addColorStop(1, 'rgba(255, 255, 255, 0)');
      context.fillStyle = eventHorizon;
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.fill();

      const lens = context.createRadialGradient(centerX, centerY, radius * 1.02, centerX, centerY, radius * 1.32);
      lens.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
      lens.addColorStop(0.25, `${palette[0]}66`);
      lens.addColorStop(1, 'rgba(0, 0, 0, 0)');
      context.fillStyle = lens;
      context.beginPath();
      context.arc(centerX, centerY, radius * 1.34, 0, Math.PI * 2);
      context.fill();
    };

    const frame = (now) => {
      elapsed += Math.min(50, now - lastTime || 16) / 1000;
      lastTime = now;
      draw();
      if (!reduceMotion && !paused) animationFrame = requestAnimationFrame(frame);
    };

    const onPointerMove = (event) => {
      if (!mouseInteraction) return;
      const bounds = container.getBoundingClientRect();
      pointer.x = clamp((event.clientX - bounds.left) / bounds.width, 0, 1);
      pointer.y = clamp((event.clientY - bounds.top) / bounds.height, 0, 1);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    resize();
    draw();
    if (!reduceMotion && !paused) animationFrame = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [colors, dpr, mouseInteraction, paused, speed]);

  return (
    <div ref={containerRef} className={`blackhole-background${className ? ` ${className}` : ''}`} style={style} {...rest}>
      <canvas ref={canvasRef} className="blackhole-background__canvas" aria-hidden="true" style={{ opacity }} />
    </div>
  );
};

export default BlackholeBackground;
