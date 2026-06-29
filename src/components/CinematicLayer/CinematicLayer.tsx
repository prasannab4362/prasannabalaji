"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleSwarm = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();

  const particleCount = 1200; // Dense constellation

  // Generate particles
  const [positions, colors, randoms] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const rnd = new Float32Array(particleCount * 3);

    const colorGreen = new THREE.Color('#10b981');
    const colorWhite = new THREE.Color('#ffffff');

    for (let i = 0; i < particleCount; i++) {
      // Initialize in circular shells around center
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 8 + 0.5; // Radius from 0.5 to 8.5
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8; // Depth spread

      // Mix between emerald green and white
      const mixedColor = colorWhite.clone().lerp(colorGreen, Math.random() > 0.45 ? 1 : 0.15);
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;

      // Radially distributed random properties
      rnd[i * 3] = radius; // Orbit radius
      rnd[i * 3 + 1] = Math.random() * 0.1 + 0.02; // Speed factor
      rnd[i * 3 + 2] = angle; // Initial angle
    }

    return [pos, col, rnd];
  }, [particleCount]);

  // Create a soft glowing particle texture
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(16, 185, 129, 0.8)');
      gradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const positionsAttr = pointsRef.current.geometry.attributes.position;

    // Orbit constellation motion
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = randoms[i3];
      const speed = randoms[i3 + 1];
      const initialAngle = randoms[i3 + 2];
      
      const currentAngle = initialAngle + time * speed;
      positionsAttr.array[i3] = Math.cos(currentAngle) * radius;
      positionsAttr.array[i3 + 1] = Math.sin(currentAngle) * radius + Math.sin(time * 0.1 + radius) * 0.3;
    }
    
    positionsAttr.needsUpdate = true;

    // Mouse parallax effect
    const targetX = (mouse.x * viewport.width) / 12;
    const targetY = (mouse.y * viewport.height) / 12;
    
    pointsRef.current.rotation.x += (targetY * 0.03 - pointsRef.current.rotation.x) * 0.05;
    pointsRef.current.rotation.y += (targetX * 0.03 - pointsRef.current.rotation.y) * 0.05;

    // Scroll morphing integration
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const maxScroll = typeof window !== 'undefined' ? document.body.scrollHeight - window.innerHeight : 1;
    const scrollPercent = scrollY / (maxScroll || 1);
    
    // Zoom constellation closer and rotate on scroll
    pointsRef.current.position.z = scrollPercent * 3.5;
    pointsRef.current.rotation.z = scrollPercent * Math.PI * 0.35;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        map={particleTexture}
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </points>
  );
};

export default function CinematicLayer() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 2]} gl={{ antialias: false, alpha: true }}>
        <ParticleSwarm />
      </Canvas>
    </div>
  );
}
