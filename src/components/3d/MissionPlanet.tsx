"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";

interface MissionLabel {
  name: string;
  angle: number; // initial angle in radians
  description: string;
}

const LABELS: MissionLabel[] = [
  { name: "LEARN", angle: 0, description: "Master modern languages, systems & AI fundamentals" },
  { name: "BUILD", angle: (Math.PI * 2 * 1) / 5, description: "Ship production software, tools & hardware MVPs" },
  { name: "CREATE", angle: (Math.PI * 2 * 2) / 5, description: "Craft fluid 3D web, shaders & computational art" },
  { name: "COLLABORATE", angle: (Math.PI * 2 * 3) / 5, description: "Pair-program in high-trust multidisciplinary pods" },
  { name: "GROW", angle: (Math.PI * 2 * 4) / 5, description: "Accelerate your career, leadership & hackathon wins" },
];

export function MissionPlanet() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const isWebGL = useWebGLSupport();
  const [activeLabel, setActiveLabel] = useState<MissionLabel | null>(null);
  const [labelPositions, setLabelPositions] = useState<
    { name: string; x: number; y: number; visible: boolean; desc: string }[]
  >([]);

  useEffect(() => {
    if (!isWebGL) return;
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 600;
    const height = mount.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 4, 18);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(width, height);
      mount.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // Planetary core
    const planetRadius = 3.6;
    const planetGeo = new THREE.SphereGeometry(planetRadius, 32, 32);
    const planetMat = new THREE.MeshStandardMaterial({
      color: 0x17152e,
      roughness: 0.4,
      metalness: 0.8,
      emissive: 0x312e81,
      emissiveIntensity: 0.6,
    });
    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    scene.add(planetMesh);

    // Glowing wireframe cage
    const wireGeo = new THREE.IcosahedronGeometry(planetRadius * 1.05, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireMesh);

    // Orbit Ring
    const orbitRadius = 6.8;
    const ringGeo = new THREE.RingGeometry(orbitRadius - 0.04, orbitRadius + 0.04, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.3;
    scene.add(ringMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xa78bfa, 2.5);
    dirLight.position.set(10, 10, 10);
    scene.add(dirLight);

    const handleResize = () => {
      if (!mount || !renderer) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    let animationId: number;
    const startTime = performance.now();

    const animate = () => {
      const elapsed = (performance.now() - startTime) * 0.001;

      planetMesh.rotation.y = elapsed * 0.15;
      wireMesh.rotation.y = -elapsed * 0.1;
      wireMesh.rotation.x = elapsed * 0.05;

      // Calculate 2D screen positions of orbital labels
      const posArray: { name: string; x: number; y: number; visible: boolean; desc: string }[] = [];
      const currentAngle = elapsed * 0.3;

      LABELS.forEach((label) => {
        const theta = label.angle + currentAngle;
        const v = new THREE.Vector3(
          Math.cos(theta) * orbitRadius,
          0,
          Math.sin(theta) * orbitRadius
        );
        // Apply ring tilt rotation
        v.applyEuler(ringMesh.rotation);

        const screenPos = v.clone().project(camera);
        const sx = ((screenPos.x + 1) * width) / 2;
        const sy = ((-screenPos.y + 1) * height) / 2;

        posArray.push({
          name: label.name,
          x: sx,
          y: sy,
          visible: screenPos.z < 1,
          desc: label.description,
        });
      });

      setLabelPositions(posArray);

      if (renderer) {
        renderer.render(scene, camera);
      }
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (renderer && renderer.domElement && mount) {
        mount.removeChild(renderer.domElement);
        renderer.dispose();
      }
      planetGeo.dispose();
      planetMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, [isWebGL]);

  return (
    <div className="relative mx-auto flex h-[420px] sm:h-[480px] w-full max-w-[640px] items-center justify-center">
      {/* Three.js canvas mount */}
      <div ref={mountRef} className="h-full w-full" />

      {/* 2D Projected Interactive Orbital Tags */}
      {labelPositions.map((lbl) => (
        <div
          key={lbl.name}
          onMouseEnter={() =>
            setActiveLabel(LABELS.find((l) => l.name === lbl.name) || null)
          }
          onMouseLeave={() => setActiveLabel(null)}
          style={{
            transform: `translate(${lbl.x}px, ${lbl.y}px) translate(-50%, -50%)`,
          }}
          className={`group absolute top-0 left-0 cursor-pointer transition-all duration-300 ${
            lbl.visible ? "opacity-100" : "opacity-30"
          }`}
        >
          <div className="flex items-center gap-1.5 rounded-full border border-violet-400/40 bg-[#0B0D18]/90 px-3 py-1 text-xs font-mono font-bold tracking-wider text-violet-200 backdrop-blur-md transition-all duration-300 group-hover:scale-115 group-hover:border-violet-300 group-hover:bg-violet-900/60 group-hover:text-white group-hover:shadow-[0_0_20px_#7C3AED]">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 group-hover:bg-white animate-pulse" />
            {lbl.name}
          </div>
        </div>
      ))}

      {/* Active tooltip on hover */}
      {activeLabel && (
        <div className="pointer-events-none absolute bottom-4 z-20 max-w-xs rounded-xl border border-violet-400/50 bg-[#0B0D18]/95 px-4 py-2.5 text-center backdrop-blur-md shadow-[0_0_25px_rgba(124,58,237,0.4)] animate-in fade-in duration-200">
          <div className="text-xs font-mono font-bold tracking-widest text-violet-300">
            {activeLabel.name}
          </div>
          <div className="mt-1 text-xs text-slate-200">{activeLabel.description}</div>
        </div>
      )}
    </div>
  );
}
