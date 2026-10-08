"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import { FallbackSpace } from "./FallbackSpace";

export function SpaceScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const isWebGL = useWebGLSupport();

  useEffect(() => {
    if (!isWebGL) return;
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05060a, 0.0012);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 80;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x05060a, 1);
      mount.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // 1. Distant Starfield (1,800 stars)
    const starCount = 1800;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colorWhite = new THREE.Color(0xffffff);
    const colorViolet = new THREE.Color(0xa78bfa);
    const colorIndigo = new THREE.Color(0x818cf8);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 600;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 600;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 600;

      const rand = Math.random();
      const chosenColor = rand > 0.6 ? colorViolet : rand > 0.3 ? colorIndigo : colorWhite;
      starColors[i * 3] = chosenColor.r;
      starColors[i * 3 + 1] = chosenColor.g;
      starColors[i * 3 + 2] = chosenColor.b;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 2. Near Floating Cosmic Dust Particles (300 particles)
    const dustCount = 300;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 150;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 150;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 2.2,
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const dustField = new THREE.Points(dustGeo, dustMat);
    scene.add(dustField);

    // 3. Subtle Nebula Clouds (Procedural Planes with Radial Glow)
    const createNebulaPlane = (colorHex: number, x: number, y: number, z: number, size: number) => {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        grad.addColorStop(0, "rgba(255, 255, 255, 0.8)");
        grad.addColorStop(0.3, "rgba(124, 58, 237, 0.4)");
        grad.addColorStop(0.7, "rgba(79, 70, 229, 0.1)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 128, 128);
      }

      const texture = new THREE.CanvasTexture(canvas);
      const planeGeo = new THREE.PlaneGeometry(size, size);
      const planeMat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const mesh = new THREE.Mesh(planeGeo, planeMat);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      return mesh;
    };

    const nebula1 = createNebulaPlane(0x7c3aed, -30, 20, -20, 120);
    const nebula2 = createNebulaPlane(0x4f46e5, 35, -25, -30, 140);

    // Mouse parallax tracking
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Window resize handler
    const handleResize = () => {
      if (!renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    let animationId: number;
    const startTime = performance.now();

    const animate = () => {
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smooth camera lerp with mouse parallax
      targetX += (mouseX * 5 - targetX) * 0.03;
      targetY += (mouseY * 5 - targetY) * 0.03;

      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(0, 0, 0);

      // Slow orbital drift
      starField.rotation.y = elapsedTime * 0.015;
      starField.rotation.x = elapsedTime * 0.005;

      dustField.rotation.y = -elapsedTime * 0.02;
      dustField.rotation.z = elapsedTime * 0.01;

      nebula1.rotation.z = elapsedTime * 0.008;
      nebula2.rotation.z = -elapsedTime * 0.006;

      if (renderer) {
        renderer.render(scene, camera);
      }
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);

      if (renderer && renderer.domElement && mount) {
        mount.removeChild(renderer.domElement);
        renderer.dispose();
      }

      starGeo.dispose();
      starMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
    };
  }, [isWebGL]);

  if (!isWebGL) {
    return <FallbackSpace />;
  }

  return (
    <div
      ref={mountRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full bg-[#05060A]"
    />
  );
}
