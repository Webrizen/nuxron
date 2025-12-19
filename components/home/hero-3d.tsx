"use client";
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// --- Interfaces ---

interface TooltipState {
  visible: boolean;
  text: string;
  x: number;
  y: number;
  meta: string;
}

interface NucleotideUserData {
  name: string;
  meta: string;
}

export interface DnaHeroProps {
  /** Size of the DNA model (default: 1) */
  modelScale?: number;
  /** [x, y, z] position offset of the model (default: [0, 0, 0]) */
  modelPosition?: [number, number, number];
  /** Speed of rotation (default: 0.002) */
  rotationSpeed?: number;
  /** Distance of the camera (default: 18) */
  cameraDistance?: number;
  /** Optional class name for the container */
  className?: string;
  /** Optional inline styles for the container */
  style?: React.CSSProperties;
}

export const DnaHero: React.FC<DnaHeroProps> = ({
  modelScale = 1,
  modelPosition = [0, 0, 0],
  rotationSpeed = 0.02,
  cameraDistance = 18,
  className,
  style,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Refs for values accessed inside the animation loop to avoid re-binding
  const configRef = useRef({
    modelScale,
    modelPosition,
    rotationSpeed,
    cameraDistance,
  });

  // Keep configRef in sync with props
  useEffect(() => {
    configRef.current = { modelScale, modelPosition, rotationSpeed, cameraDistance };
  }, [modelScale, modelPosition, rotationSpeed, cameraDistance]);

  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    text: '',
    x: 0,
    y: 0,
    meta: ''
  });

  useEffect(() => {
    if (!mountRef.current) return;

    // --- Configuration ---
    const colors = {
      colorA: 0x00E5B3, // Emerald (A)
      colorT: 0xFF4D4D, // Crimson (T)
      colorG: 0x3DD1FF, // Cyan (G)
      colorC: 0xFFC27A, // Amber (C)
      backboneColor: 0x2a3b66,
    };

    const geometryConfig = {
      particleCount: 200,
      dnaLength: 40,
      radius: 3,
      tubeRadius: 0.3,
    };

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x071026, 0.035);

    // Initial sizing based on container
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 100);
    camera.position.set(0, 0, configRef.current.cameraDistance);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    mountRef.current.appendChild(renderer.domElement);

    // --- Assets & Geometry ---
    const dnaGroup = new THREE.Group();
    scene.add(dnaGroup);

    // Apply initial props immediately
    dnaGroup.position.set(...configRef.current.modelPosition);
    dnaGroup.scale.setScalar(configRef.current.modelScale);

    const backboneMaterial = new THREE.MeshPhysicalMaterial({
      color: colors.backboneColor,
      roughness: 0.3,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.9
    });

    const nucleobaseGeo = new THREE.CylinderGeometry(0.15, 0.15, 1, 8);
    nucleobaseGeo.rotateZ(Math.PI / 2);
    const sphereGeo = new THREE.SphereGeometry(0.4, 16, 16);

    const nucleotideMeshes: THREE.Mesh[] = [];

    // --- DNA Generation Loop ---
    for (let i = 0; i < geometryConfig.dnaLength; i++) {
      const t = i * 0.5; // Twist
      const y = (i - geometryConfig.dnaLength / 2) * 1.2; // Vertical spacing

      // Double helix coordinates
      const x1 = Math.cos(t) * geometryConfig.radius;
      const z1 = Math.sin(t) * geometryConfig.radius;
      const x2 = Math.cos(t + Math.PI) * geometryConfig.radius;
      const z2 = Math.sin(t + Math.PI) * geometryConfig.radius;

      // Backbone (Phosphates)
      const bb1 = new THREE.Mesh(sphereGeo, backboneMaterial);
      bb1.position.set(x1, y, z1);
      dnaGroup.add(bb1);

      const bb2 = new THREE.Mesh(sphereGeo, backboneMaterial);
      bb2.position.set(x2, y, z2);
      dnaGroup.add(bb2);

      // Base Pairs
      const isAT = Math.random() > 0.5;
      const color1 = isAT ? colors.colorA : colors.colorG;
      const color2 = isAT ? colors.colorT : colors.colorC;
      const name1 = isAT ? "Adenine" : "Guanine";
      const name2 = isAT ? "Thymine" : "Cytosine";

      // Nucleotide 1
      const mat1 = new THREE.MeshPhysicalMaterial({
        color: color1,
        emissive: color1,
        emissiveIntensity: 0.5,
        roughness: 0.2,
        transmission: 0.6,
        transparent: true
      });
      const nuc1 = new THREE.Mesh(nucleobaseGeo, mat1);
      nuc1.position.set(x1 * 0.5, y, z1 * 0.5);
      nuc1.lookAt(0, y, 0);
      nuc1.scale.set(1, geometryConfig.radius, 1);
      
      const userData1: NucleotideUserData = { name: name1, meta: `Pos: ${i*3} • Bond: Weak` };
      nuc1.userData = userData1;
      
      dnaGroup.add(nuc1);
      nucleotideMeshes.push(nuc1);

      // Nucleotide 2
      const mat2 = new THREE.MeshPhysicalMaterial({
        color: color2,
        emissive: color2,
        emissiveIntensity: 0.5,
        roughness: 0.2,
        transmission: 0.6,
        transparent: true
      });
      const nuc2 = new THREE.Mesh(nucleobaseGeo, mat2);
      nuc2.position.set(x2 * 0.5, y, z2 * 0.5);
      nuc2.lookAt(0, y, 0);
      nuc2.scale.set(1, geometryConfig.radius, 1);
      
      const userData2: NucleotideUserData = { name: name2, meta: `Pos: ${i*3} • Bond: Strong` };
      nuc2.userData = userData2;

      dnaGroup.add(nuc2);
      nucleotideMeshes.push(nuc2);
    }

    // --- Particles (Background Dust) ---
    const particlesGeo = new THREE.BufferGeometry();
    const particlePos: number[] = [];
    for (let i = 0; i < geometryConfig.particleCount; i++) {
      particlePos.push((Math.random() - 0.5) * 40); // x
      particlePos.push((Math.random() - 0.5) * 60); // y
      particlePos.push((Math.random() - 0.5) * 30 - 10); // z
    }
    particlesGeo.setAttribute('position', new THREE.Float32BufferAttribute(particlePos, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0x3DD1FF,
      size: 0.1,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x3DD1FF, 2);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0xFFC27A, 1);
    fillLight.position.set(-5, 0, 5);
    scene.add(fillLight);

    const rimLight = new THREE.SpotLight(0xD83DFF, 3);
    rimLight.position.set(0, 10, -10);
    rimLight.lookAt(0, 0, 0);
    scene.add(rimLight);

    // --- Interaction State ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let hoveredMesh: THREE.Mesh | null = null;

    // --- Event Listeners ---
    const handleMouseMove = (event: MouseEvent) => {
      // Calculate mouse position relative to the canvas, not the window
      if (!mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      
      // Normalized coordinates for Raycaster (-1 to +1)
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Parallax effect intensity
      mouseX = (event.clientX - window.innerWidth / 2) * 0.001;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.001;
      
      setTooltip(prev => ({ ...prev, x: event.clientX + 20, y: event.clientY + 20 }));
    };

    // Use ResizeObserver for container-aware resizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === mountRef.current) {
          const { width, height } = entry.contentRect;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      }
    });
    
    resizeObserver.observe(mountRef.current);
    window.addEventListener('mousemove', handleMouseMove);

    // --- Animation Loop ---
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const currentConfig = configRef.current;

      // Update props dynamically
      camera.position.z = currentConfig.cameraDistance;
      
      // Smoothly interpolate to new props if they change
      dnaGroup.position.x += (currentConfig.modelPosition[0] - dnaGroup.position.x) * 0.1;
      dnaGroup.position.y += (currentConfig.modelPosition[1] + Math.sin(time * 0.3) * 0.5 - dnaGroup.position.y) * 0.1;
      dnaGroup.position.z += (currentConfig.modelPosition[2] - dnaGroup.position.z) * 0.1;
      
      const targetScale = currentConfig.modelScale;
      dnaGroup.scale.x += (targetScale - dnaGroup.scale.x) * 0.1;
      dnaGroup.scale.y += (targetScale - dnaGroup.scale.y) * 0.1;
      dnaGroup.scale.z += (targetScale - dnaGroup.scale.z) * 0.1;

      // Rotations
      dnaGroup.rotation.y += currentConfig.rotationSpeed;
      targetRotationY += (mouseX - targetRotationY) * 0.000005;
      targetRotationX += (mouseY - targetRotationX) * 0.000005;

      dnaGroup.rotation.y += targetRotationY;
      dnaGroup.rotation.x = targetRotationX + Math.sin(time * 0.5) * 0.05;

      // Particle Motion
      particleSystem.rotation.y = time * 0.05;

      // Raycasting
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nucleotideMeshes);

      if (intersects.length > 0) {
        const object = intersects[0].object as THREE.Mesh<THREE.CylinderGeometry, THREE.MeshPhysicalMaterial>;
        
        if (hoveredMesh !== object) {
          if (hoveredMesh) {
             (hoveredMesh.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.5;
          }
          
          hoveredMesh = object;
          (hoveredMesh.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 2.0;

          const userData = object.userData as NucleotideUserData;
          setTooltip(prev => ({
            ...prev,
            visible: true,
            text: userData.name,
            meta: userData.meta
          }));
          document.body.style.cursor = 'crosshair';
        }
      } else {
        if (hoveredMesh) {
          (hoveredMesh.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.5;
          hoveredMesh = null;
          setTooltip(prev => ({ ...prev, visible: false }));
          document.body.style.cursor = 'default';
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      nucleobaseGeo.dispose();
      sphereGeo.dispose();
      backboneMaterial.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []); 

  return (
    <div 
      ref={mountRef} 
      className={className}
      style={{ 
        position: 'relative', 
        width: '150%', 
        height: '100%', 
        minHeight: '550px',
        overflow: 'hidden', 
        backgroundColor: '#071026',
        ...style 
      }}
    >
      {/* Tooltip Overlay */}
      <div
        style={{
          position: 'fixed',
          top: tooltip.y,
          left: tooltip.x,
          opacity: tooltip.visible ? 1 : 0,
          pointerEvents: 'none',
          transition: 'opacity 0.2s ease',
          zIndex: 50,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderLeft: '2px solid #3DD1FF',
          padding: '8px 16px',
          borderRadius: '8px',
          color: 'white',
          fontFamily: 'monospace',
          fontSize: '12px'
        }}
      >
        <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '2px' }}>{tooltip.text}</div>
        <div style={{ opacity: 0.7 }}>{tooltip.meta}</div>
      </div>
    </div>
  );
};