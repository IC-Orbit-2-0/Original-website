"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";

export function HeroGlobe() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const isWebGL = useWebGLSupport();

  useEffect(() => {
    if (!isWebGL) return;
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 32);

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      mount.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // 1. Procedural Earth Texture Canvas
    const createEarthTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");
      if (!ctx) return new THREE.Texture();

      // Deep ocean gradient
      const oceanGrad = ctx.createLinearGradient(0, 0, 0, 512);
      oceanGrad.addColorStop(0, "#080c1d");
      oceanGrad.addColorStop(0.5, "#0d1330");
      oceanGrad.addColorStop(1, "#050711");
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, 1024, 512);

      // Continent shapes with purple/blue landmasses
      ctx.fillStyle = "#1e1b4b";
      const continents = [
        // North America
        { x: 220, y: 140, rx: 90, ry: 60, rot: -0.2 },
        // South America
        { x: 320, y: 320, rx: 60, ry: 100, rot: 0.3 },
        // Europe & Africa
        { x: 520, y: 150, rx: 50, ry: 40, rot: 0 },
        { x: 530, y: 280, rx: 70, ry: 90, rot: 0.1 },
        // Asia
        { x: 740, y: 160, rx: 130, ry: 80, rot: -0.1 },
        // Australia
        { x: 860, y: 360, rx: 55, ry: 45, rot: 0.2 },
      ];

      continents.forEach((c) => {
        ctx.beginPath();
        ctx.ellipse(c.x, c.y, c.rx, c.ry, c.rot, 0, Math.PI * 2);
        ctx.fill();

        // City night lights / data hubs
        ctx.fillStyle = "#a78bfa";
        for (let i = 0; i < 25; i++) {
          const px = c.x + (Math.random() - 0.5) * c.rx * 1.5;
          const py = c.y + (Math.random() - 0.5) * c.ry * 1.5;
          ctx.fillRect(px, py, 2, 2);
        }
        ctx.fillStyle = "#1e1b4b";
      });

      return new THREE.CanvasTexture(canvas);
    };

    const earthTexture = createEarthTexture();

    // 2. Central 3D Globe Mesh
    const globeRadius = 6.2;
    const globeGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const globeMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.65,
      metalness: 0.2,
      emissive: new THREE.Color(0x1e1548),
      emissiveIntensity: 0.45,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    scene.add(globeMesh);

    // 3. Atmospheric Fresnel Glow (Outer Aura)
    const atmosphereGeo = new THREE.SphereGeometry(globeRadius * 1.08, 64, 64);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.2);
          gl_FragColor = vec4(0.48, 0.28, 0.98, 1.0) * intensity * 1.6;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    scene.add(atmosphereMesh);

    // 4. Primary Glowing Orbital Ring (Inclined at ~25 degrees, matching logo)
    const orbitGroup = new THREE.Group();
    orbitGroup.rotation.x = Math.PI * 0.32;
    orbitGroup.rotation.y = -Math.PI * 0.18;
    scene.add(orbitGroup);

    const orbitRadius = 10.5;
    const ringTube = 0.08;
    const ringGeo = new THREE.TorusGeometry(orbitRadius, ringTube, 16, 128);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.85,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    orbitGroup.add(ringMesh);

    // Secondary concentric dashed orbit ring
    const secondaryOrbitRadius = 12.2;
    const secRingGeo = new THREE.RingGeometry(secondaryOrbitRadius - 0.02, secondaryOrbitRadius + 0.02, 96);
    const secRingMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const secRingMesh = new THREE.Mesh(secRingGeo, secRingMat);
    orbitGroup.add(secRingMesh);

    // 5. Glowing Celestial Satellite / Moon traversing the orbital ring
    const satelliteGeo = new THREE.SphereGeometry(0.55, 32, 32);
    const satelliteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xa78bfa,
      emissiveIntensity: 1.4,
      roughness: 0.2,
      metalness: 0.8,
    });
    const satelliteMesh = new THREE.Mesh(satelliteGeo, satelliteMat);
    orbitGroup.add(satelliteMesh);

    // Satellite point light
    const satLight = new THREE.PointLight(0xa78bfa, 2.5, 15);
    satelliteMesh.add(satLight);

    // 6. Floating Tech Geometric Particles
    const geoCount = 12;
    const geoGroup = new THREE.Group();
    const geoms = [
      new THREE.IcosahedronGeometry(0.3, 0),
      new THREE.OctahedronGeometry(0.35, 0),
      new THREE.TetrahedronGeometry(0.3, 0),
    ];
    const geoMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      roughness: 0.3,
      metalness: 0.8,
      wireframe: true,
    });

    const floatingNodes: { mesh: THREE.Mesh; rotSpeed: { x: number; y: number } }[] = [];
    for (let i = 0; i < geoCount; i++) {
      const chosenGeo = geoms[i % geoms.length];
      const m = new THREE.Mesh(chosenGeo, geoMat);
      const angle = (i / geoCount) * Math.PI * 2;
      const dist = 11 + Math.random() * 4;
      m.position.set(
        Math.cos(angle) * dist,
        (Math.random() - 0.5) * 6,
        Math.sin(angle) * dist
      );
      geoGroup.add(m);
      floatingNodes.push({
        mesh: m,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
        },
      });
    }
    scene.add(geoGroup);

    // 7. Lighting
    const ambientLight = new THREE.AmbientLight(0x18152e, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.2);
    sunLight.position.set(20, 15, 25);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x7c3aed, 2.0);
    rimLight.position.set(-20, -10, -10);
    scene.add(rimLight);

    // Mouse movement interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!mount || !renderer) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Render loop
    let animationId: number;
    const startTime = performance.now();

    const animate = () => {
      const elapsed = (performance.now() - startTime) * 0.001;

      // Earth slow rotation
      globeMesh.rotation.y = elapsed * 0.07;

      // Orbit satellite motion around the elliptical ring
      const satSpeed = elapsed * 0.6;
      satelliteMesh.position.x = Math.cos(satSpeed) * orbitRadius;
      satelliteMesh.position.y = Math.sin(satSpeed) * orbitRadius;

      // Mouse parallax smooth lerp
      targetRotX += (mouseY * 0.25 - targetRotX) * 0.04;
      targetRotY += (mouseX * 0.35 - targetRotY) * 0.04;

      globeMesh.rotation.x = targetRotX;
      orbitGroup.rotation.z = elapsed * 0.02 + targetRotY * 0.5;

      // Floating tech nodes tumble
      floatingNodes.forEach((node) => {
        node.mesh.rotation.x += node.rotSpeed.x;
        node.mesh.rotation.y += node.rotSpeed.y;
      });
      geoGroup.rotation.y = elapsed * 0.04;

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

      globeGeo.dispose();
      globeMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      secRingGeo.dispose();
      secRingMat.dispose();
      satelliteGeo.dispose();
      satelliteMat.dispose();
      earthTexture.dispose();
    };
  }, [isWebGL]);

  if (!isWebGL) return null;

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
