"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleSwarm = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();

  const particleCount = 400; // Optimized count

  // Generate particles
  const [positions, colors, randoms] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const rnd = new Float32Array(particleCount * 3); // For individual animation speeds

    const colorGreen = new THREE.Color('#10b981');
    const colorWhite = new THREE.Color('#ffffff');

    for (let i = 0; i < particleCount; i++) {
      // Spread across the viewport
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Mix between emerald green and white
      const mixedColor = colorWhite.clone().lerp(colorGreen, Math.random() > 0.3 ? 1 : 0.2);
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;

      rnd[i * 3] = Math.random();
      rnd[i * 3 + 1] = Math.random();
      rnd[i * 3 + 2] = Math.random();
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
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.5)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
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

    // Slow floating sine-wave motion
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const xRandom = randoms[i3];
      const yRandom = randoms[i3 + 1];
      
      // Gentle floating
      positionsAttr.array[i3 + 1] += Math.sin(time * 0.5 + yRandom * Math.PI * 2) * 0.005;
      positionsAttr.array[i3] += Math.cos(time * 0.3 + xRandom * Math.PI * 2) * 0.005;
    }
    
    positionsAttr.needsUpdate = true;

    // Mouse parallax effect (smoothly approach target rotation/position)
    const targetX = (mouse.x * viewport.width) / 10;
    const targetY = (mouse.y * viewport.height) / 10;
    
    pointsRef.current.rotation.x += (targetY * 0.05 - pointsRef.current.rotation.x) * 0.05;
    pointsRef.current.rotation.y += (targetX * 0.05 - pointsRef.current.rotation.y) * 0.05;
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
