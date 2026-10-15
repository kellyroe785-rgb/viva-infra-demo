import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Camera, Sun, Moon, Layers, ChevronDown, ChevronUp, Eye, Compass, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

type CameraPreset = 'isometric' | 'entrance' | 'terrace' | 'top';
type LightingMode = 'day' | 'dusk';

export const ArchitecturalScene: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasMountRef = useRef<HTMLDivElement>(null);

  // UI States
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('isometric');
  const [lightingMode, setLightingMode] = useState<LightingMode>('day');
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [isControlsCollapsed, setIsControlsCollapsed] = useState<boolean>(false);
  const [webglError, setWebglError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // References for animation state
  const targetCameraPos = useRef(new THREE.Vector3(14, 10, 14));
  const targetLookAt = useRef(new THREE.Vector3(0, 2.5, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 2.5, 0));
  const explodedOffset = useRef(0);
  const targetExplodedOffset = useRef(0);

  // Light references
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);
  const upperFloorGroupRef = useRef<THREE.Group | null>(null);
  const roofGroupRef = useRef<THREE.Group | null>(null);

  // Handle Preset Changes
  useEffect(() => {
    switch (cameraPreset) {
      case 'isometric':
        targetCameraPos.current.set(13, 9, 13);
        targetLookAt.current.set(0, 2.5, 0);
        break;
      case 'entrance':
        targetCameraPos.current.set(4, 2.8, 11);
        targetLookAt.current.set(0, 2, 0);
        break;
      case 'terrace':
        targetCameraPos.current.set(8, 7.5, 6);
        targetLookAt.current.set(0, 4.2, 0);
        break;
      case 'top':
        targetCameraPos.current.set(0.1, 19, 0.1);
        targetLookAt.current.set(0, 0, 0);
        break;
    }
  }, [cameraPreset]);

  // Handle Lighting Changes
  useEffect(() => {
    if (dirLightRef.current && hemiLightRef.current) {
      if (lightingMode === 'day') {
        dirLightRef.current.color.set('#FFF8E7');
        dirLightRef.current.intensity = 2.2;
        dirLightRef.current.position.set(16, 22, 14);
        hemiLightRef.current.color.set('#E6ECF5');
        hemiLightRef.current.groundColor.set('#7C6F5E');
        hemiLightRef.current.intensity = 0.9;
      } else {
        // Golden Dusk
        dirLightRef.current.color.set('#FDBA74');
        dirLightRef.current.intensity = 2.8;
        dirLightRef.current.position.set(22, 9, 12);
        hemiLightRef.current.color.set('#C2410C');
        hemiLightRef.current.groundColor.set('#292524');
        hemiLightRef.current.intensity = 0.7;
      }
    }
  }, [lightingMode]);

  // Handle Explode Animation Target
  useEffect(() => {
    targetExplodedOffset.current = isExploded ? 3.5 : 0;
  }, [isExploded]);

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglError(true);
        setIsLoading(false);
        return;
      }
    } catch {
      setWebglError(true);
      setIsLoading(false);
      return;
    }

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 1. Scene & Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#F3EFE6'); // Architectural warm canvas
    scene.fog = new THREE.FogExp2('#F3EFE6', 0.022);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.2, 120);
    camera.position.copy(targetCameraPos.current);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(renderer.domElement);

    // 2. Lighting System
    const hemiLight = new THREE.HemisphereLight('#E8EDF2', '#7D7465', 0.85);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const dirLight = new THREE.DirectionalLight('#FFF9EE', 2.2);
    dirLight.position.set(16, 22, 14);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 45;
    const shadowD = 14;
    dirLight.shadow.camera.left = -shadowD;
    dirLight.shadow.camera.right = shadowD;
    dirLight.shadow.camera.top = shadowD;
    dirLight.shadow.camera.bottom = -shadowD;
    dirLight.shadow.bias = -0.0005;
    dirLight.shadow.normalBias = 0.02;
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    // Subtle Rim Light for architectural edges
    const rimLight = new THREE.DirectionalLight('#D1D5DB', 0.6);
    rimLight.position.set(-14, 12, -14);
    scene.add(rimLight);

    // 3. PBR Materials Palette
    const warmStuccoMat = new THREE.MeshStandardMaterial({
      color: '#F8F6F0',
      roughness: 0.85,
      metalness: 0.04,
    });

    const terracottaMat = new THREE.MeshStandardMaterial({
      color: '#A9563B', // Terracotta
      roughness: 0.72,
      metalness: 0.08,
    });

    const deepTerracottaMat = new THREE.MeshStandardMaterial({
      color: '#85432F',
      roughness: 0.75,
      metalness: 0.1,
    });

    const teakWoodMat = new THREE.MeshStandardMaterial({
      color: '#9E6845',
      roughness: 0.65,
      metalness: 0.05,
    });

    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: '#272923',
      roughness: 0.35,
      metalness: 0.85,
    });

    const glassMat = new THREE.MeshStandardMaterial({
      color: '#D8E8F5',
      roughness: 0.1,
      metalness: 0.2,
      transparent: true,
      opacity: 0.55,
    });

    const paverMat = new THREE.MeshStandardMaterial({
      color: '#E5E0D5',
      roughness: 0.88,
      metalness: 0.02,
    });

    const lawnMat = new THREE.MeshStandardMaterial({
      color: '#879479',
      roughness: 0.95,
      metalness: 0.0,
    });

    const waterMat = new THREE.MeshStandardMaterial({
      color: '#557A84',
      roughness: 0.08,
      metalness: 0.6,
      transparent: true,
      opacity: 0.85,
    });

    const foliageMat = new THREE.MeshStandardMaterial({
      color: '#4F5E48',
      roughness: 0.82,
      metalness: 0.02,
    });

    const trunkMat = new THREE.MeshStandardMaterial({
      color: '#524338',
      roughness: 0.9,
      metalness: 0.0,
    });

    // 4. Building Assembly (Root Architectural Group)
    const architecturalGroup = new THREE.Group();
    scene.add(architecturalGroup);

    // --- Ground Plinth & Landscaping ---
    const groundPlinth = new THREE.Mesh(
      new THREE.BoxGeometry(22, 0.4, 18),
      lawnMat
    );
    groundPlinth.position.y = -0.2;
    groundPlinth.receiveShadow = true;
    architecturalGroup.add(groundPlinth);

    // Paver Entrance Walkway
    const walkway = new THREE.Mesh(
      new THREE.BoxGeometry(3.6, 0.42, 6.5),
      paverMat
    );
    walkway.position.set(0, -0.18, 5.8);
    walkway.receiveShadow = true;
    architecturalGroup.add(walkway);

    // Pool / Water Feature
    const poolBorder = new THREE.Mesh(
      new THREE.BoxGeometry(4.4, 0.45, 6.2),
      paverMat
    );
    poolBorder.position.set(6.8, -0.17, 3.2);
    poolBorder.receiveShadow = true;
    architecturalGroup.add(poolBorder);

    const waterSurface = new THREE.Mesh(
      new THREE.PlaneGeometry(3.8, 5.6),
      waterMat
    );
    waterSurface.rotation.x = -Math.PI / 2;
    waterSurface.position.set(6.8, 0.08, 3.2);
    architecturalGroup.add(waterSurface);

    // Concrete Base Slab of House
    const baseSlab = new THREE.Mesh(
      new THREE.BoxGeometry(13.5, 0.5, 11),
      paverMat
    );
    baseSlab.position.set(-0.5, 0.25, 0);
    baseSlab.receiveShadow = true;
    baseSlab.castShadow = true;
    architecturalGroup.add(baseSlab);

    // Entrance Steps
    for (let i = 0; i < 3; i++) {
      const step = new THREE.Mesh(
        new THREE.BoxGeometry(3.2 - i * 0.3, 0.16, 0.9),
        paverMat
      );
      step.position.set(0, 0.08 + i * 0.16, 5.3 - i * 0.7);
      step.receiveShadow = true;
      step.castShadow = true;
      architecturalGroup.add(step);
    }

    // --- Ground Floor Group ---
    const groundFloorGroup = new THREE.Group();
    architecturalGroup.add(groundFloorGroup);

    // Main Ground Floor Living Mass (Off-white Stucco)
    const livingVolume = new THREE.Mesh(
      new THREE.BoxGeometry(7.2, 2.8, 5.6),
      warmStuccoMat
    );
    livingVolume.position.set(-3.2, 1.9, 0.5);
    livingVolume.castShadow = true;
    livingVolume.receiveShadow = true;
    groundFloorGroup.add(livingVolume);

    // Dining & Kitchen Wing (Terracotta Feature Wall)
    const diningVolume = new THREE.Mesh(
      new THREE.BoxGeometry(4.6, 2.8, 6.2),
      terracottaMat
    );
    diningVolume.position.set(2.8, 1.9, -1.2);
    diningVolume.castShadow = true;
    diningVolume.receiveShadow = true;
    groundFloorGroup.add(diningVolume);

    // Glazed Living Courtyard Facade (Ground Floor Glass)
    const gfGlass = new THREE.Mesh(
      new THREE.BoxGeometry(5.8, 2.6, 0.15),
      glassMat
    );
    gfGlass.position.set(-3.2, 1.85, 3.32);
    groundFloorGroup.add(gfGlass);

    // Glass Mullions (Dark Bronze)
    for (let x = -5.8; x <= -0.6; x += 1.3) {
      const mullion = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 2.6, 0.2),
        darkMetalMat
      );
      mullion.position.set(x, 1.85, 3.33);
      mullion.castShadow = true;
      groundFloorGroup.add(mullion);
    }

    // Entry Timber Portal with Pivot Door
    const entryFrame = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 2.7, 0.6),
      deepTerracottaMat
    );
    entryFrame.position.set(0, 1.85, 2.8);
    entryFrame.castShadow = true;
    groundFloorGroup.add(entryFrame);

    const entryDoor = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 2.5, 0.15),
      teakWoodMat
    );
    entryDoor.position.set(0, 1.75, 2.9);
    groundFloorGroup.add(entryDoor);

    // Teak Brise-Soleil Vertical Slats (Courtyard Screen)
    for (let i = 0; i < 9; i++) {
      const slat = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 2.8, 0.35),
        teakWoodMat
      );
      slat.position.set(1.4 + i * 0.45, 1.9, 2.8);
      slat.castShadow = true;
      groundFloorGroup.add(slat);
    }

    // Mid-level Floor Slab (Separating Level 1 and Level 2)
    const midSlab = new THREE.Mesh(
      new THREE.BoxGeometry(14.2, 0.4, 11.5),
      paverMat
    );
    midSlab.position.set(-0.2, 3.5, 0.2);
    midSlab.castShadow = true;
    midSlab.receiveShadow = true;
    groundFloorGroup.add(midSlab);

    // --- Upper Floor Group (Animates during explode mode) ---
    const upperFloorGroup = new THREE.Group();
    architecturalGroup.add(upperFloorGroup);
    upperFloorGroupRef.current = upperFloorGroup;

    // Master Bedroom Suite Volume (Dramatic Cantilever)
    const masterSuiteVolume = new THREE.Mesh(
      new THREE.BoxGeometry(6.6, 2.7, 6.8),
      warmStuccoMat
    );
    masterSuiteVolume.position.set(-2.8, 5.05, 1.4); // Projects forward over entrance
    masterSuiteVolume.castShadow = true;
    masterSuiteVolume.receiveShadow = true;
    upperFloorGroup.add(masterSuiteVolume);

    // Upper Feature Cladding (Terracotta accent box)
    const upperTerracottaAcc = new THREE.Mesh(
      new THREE.BoxGeometry(3.8, 2.7, 5.2),
      terracottaMat
    );
    upperTerracottaAcc.position.set(2.6, 5.05, -0.6);
    upperTerracottaAcc.castShadow = true;
    upperTerracottaAcc.receiveShadow = true;
    upperFloorGroup.add(upperTerracottaAcc);

    // Upper Floor Balcony / Terrace
    const balconyFloor = new THREE.Mesh(
      new THREE.BoxGeometry(4.2, 0.25, 3.6),
      paverMat
    );
    balconyFloor.position.set(2.4, 3.75, 2.8);
    balconyFloor.castShadow = true;
    balconyFloor.receiveShadow = true;
    upperFloorGroup.add(balconyFloor);

    // Glass Balustrade on Balcony
    const glassBalustrade = new THREE.Mesh(
      new THREE.BoxGeometry(4.1, 0.9, 0.08),
      glassMat
    );
    glassBalustrade.position.set(2.4, 4.25, 4.55);
    upperFloorGroup.add(glassBalustrade);

    // Upper Floor Panoramic Windows
    const upperWindow = new THREE.Mesh(
      new THREE.BoxGeometry(5.2, 1.8, 0.12),
      glassMat
    );
    upperWindow.position.set(-2.8, 5.1, 4.82);
    upperFloorGroup.add(upperWindow);

    // Window Mullions
    for (let x = -5.0; x <= -0.6; x += 1.4) {
      const mullion = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 1.8, 0.16),
        darkMetalMat
      );
      mullion.position.set(x, 5.1, 4.83);
      mullion.castShadow = true;
      upperFloorGroup.add(mullion);
    }

    // Planter Box on Master Suite
    const planterBox = new THREE.Mesh(
      new THREE.BoxGeometry(5.4, 0.45, 0.6),
      deepTerracottaMat
    );
    planterBox.position.set(-2.8, 4.0, 4.9);
    planterBox.castShadow = true;
    upperFloorGroup.add(planterBox);

    const planterShrub = new THREE.Mesh(
      new THREE.BoxGeometry(5.1, 0.35, 0.45),
      foliageMat
    );
    planterShrub.position.set(-2.8, 4.3, 4.9);
    upperFloorGroup.add(planterShrub);

    // --- Roof Group (Animates with explode mode) ---
    const roofGroup = new THREE.Group();
    architecturalGroup.add(roofGroup);
    roofGroupRef.current = roofGroup;

    // Cantilevered Architectural Roof Slab
    const roofSlab = new THREE.Mesh(
      new THREE.BoxGeometry(14.8, 0.35, 12.2),
      paverMat
    );
    roofSlab.position.set(-0.2, 6.6, 0.4);
    roofSlab.castShadow = true;
    roofSlab.receiveShadow = true;
    roofGroup.add(roofSlab);

    // Modern Pergola Slats over Roof Terrace
    for (let i = 0; i < 7; i++) {
      const pergolaSlat = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.28, 4.5),
        darkMetalMat
      );
      pergolaSlat.position.set(1.2 + i * 0.65, 7.0, 2.6);
      pergolaSlat.castShadow = true;
      roofGroup.add(pergolaSlat);
    }

    // --- Minimalist Architectural Trees & Landscape ---
    const createTree = (x: number, z: number, scale: number) => {
      const treeGroup = new THREE.Group();
      treeGroup.position.set(x, 0, z);

      // Trunk
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12 * scale, 0.18 * scale, 3.2 * scale, 8),
        trunkMat
      );
      trunk.position.y = 1.6 * scale;
      trunk.castShadow = true;
      treeGroup.add(trunk);

      // Tiered Foliage Spheres
      const crown1 = new THREE.Mesh(
        new THREE.SphereGeometry(1.1 * scale, 8, 8),
        foliageMat
      );
      crown1.position.y = 3.2 * scale;
      crown1.castShadow = true;
      treeGroup.add(crown1);

      const crown2 = new THREE.Mesh(
        new THREE.SphereGeometry(0.85 * scale, 8, 8),
        foliageMat
      );
      crown2.position.set(0.3 * scale, 3.9 * scale, -0.2 * scale);
      crown2.castShadow = true;
      treeGroup.add(crown2);

      architecturalGroup.add(treeGroup);
    };

    // Trees surrounding the villa
    createTree(-8.8, 4.2, 1.1);
    createTree(-8.2, -4.5, 0.95);
    createTree(8.5, -4.8, 1.15);
    createTree(-9.5, -0.5, 0.85);

    // Shrub Clusters
    for (let i = 0; i < 5; i++) {
      const shrub = new THREE.Mesh(
        new THREE.SphereGeometry(0.45 + (i % 3) * 0.15, 7, 7),
        foliageMat
      );
      shrub.position.set(3.2 + i * 0.8, 0.3, 6.2);
      shrub.castShadow = true;
      architecturalGroup.add(shrub);
    }

    // 5. User Interaction (Mouse / Touch Orbit)
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0;
    let currentRotationY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;
      prevMouseX = clientX;
      prevMouseY = clientY;

      targetRotationY += deltaX * 0.007;

      // Subtle tilt adjustment
      targetCameraPos.current.y = THREE.MathUtils.clamp(
        targetCameraPos.current.y + deltaY * 0.02,
        2.5,
        22
      );
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.01;
      const dir = targetCameraPos.current.clone().sub(targetLookAt.current).normalize();
      const dist = targetCameraPos.current.distanceTo(targetLookAt.current);
      if (dist + zoomDelta > 6 && dist + zoomDelta < 32) {
        targetCameraPos.current.addScaledVector(dir, zoomDelta);
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onPointerDown);
    domElement.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);
    domElement.addEventListener('wheel', onWheel, { passive: false });

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // 6. Animation Loop with Smooth Exponential Damping
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);

      // Smooth camera interpolation
      camera.position.lerp(targetCameraPos.current, 0.08);
      currentLookAt.current.lerp(targetLookAt.current, 0.08);
      camera.lookAt(currentLookAt.current);

      // Smooth scene rotation damping
      currentRotationY = THREE.MathUtils.damp(currentRotationY, targetRotationY, 8, delta);
      architecturalGroup.rotation.y = currentRotationY;

      // Gentle auto-rotation when idle
      if (!isDragging && cameraPreset === 'isometric') {
        targetRotationY += 0.0012;
      }

      // Smooth exploded-floor animation
      explodedOffset.current = THREE.MathUtils.damp(
        explodedOffset.current,
        targetExplodedOffset.current,
        5,
        delta
      );

      if (upperFloorGroupRef.current) {
        upperFloorGroupRef.current.position.y = explodedOffset.current * 0.65;
      }
      if (roofGroupRef.current) {
        roofGroupRef.current.position.y = explodedOffset.current * 1.35;
      }

      renderer.render(scene, camera);
    };

    setIsLoading(false);
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', onPointerDown);
      domElement.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchend', onPointerUp);
      domElement.removeEventListener('wheel', onWheel);

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520px] sm:h-[600px] lg:h-[680px] bg-[#F3EFE6] border border-[#E6E1D8] overflow-hidden select-none"
      role="region"
      aria-label={t.hero.mode3d}
    >
      {/* 3D Canvas Mount Point */}
      <div ref={canvasMountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing w-full h-full" />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#F3EFE6] z-10">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-[#A9563B] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs uppercase tracking-widest text-[#77766F] font-mono">
              Loading Architectural Scene...
            </p>
          </div>
        </div>
      )}

      {/* WebGL Error / Reduced-Motion Fallback Banner */}
      {webglError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#F8F7F2] p-6 z-20">
          <div className="max-w-md text-center p-6 bg-white border border-[#E6E1D8]">
            <Compass className="w-10 h-10 text-[#A9563B] mx-auto mb-3" />
            <h3 className="font-serif text-xl font-medium text-[#272923] mb-2">
              {t.hero.fallbackTitle}
            </h3>
            <p className="text-xs text-[#77766F] leading-relaxed mb-4">
              {t.hero.fallbackDesc}
            </p>
            <div className="w-full h-44 bg-[#F3EFE6] border border-[#E6E1D8] flex items-center justify-center relative overflow-hidden">
              <svg className="w-full h-full text-[#A9563B]/20" viewBox="0 0 200 120" fill="none" stroke="currentColor">
                <rect x="20" y="40" width="80" height="60" strokeWidth="1.5" />
                <rect x="100" y="20" width="70" height="80" strokeWidth="1.5" />
                <line x1="10" y1="100" x2="190" y2="100" strokeWidth="2" />
                <line x1="40" y1="40" x2="40" y2="100" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="70" y1="40" x2="70" y2="100" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="120" y1="20" x2="120" y2="100" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
              <span className="absolute bottom-2 right-3 text-[10px] font-mono text-[#77766F]">
                ELEVATION A-101
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Top Floating Badge & Specs (Zero Occlusion) */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 pointer-events-none">
        <div className="bg-white/90 border border-[#E6E1D8] px-3.5 py-2 shadow-xs">
          <div className="text-[11px] font-mono text-[#A9563B] tracking-wider uppercase">
            3D Studio Model
          </div>
          <div className="text-sm font-semibold text-[#272923] tracking-tight">
            The Courtyard Villa Concept
          </div>
        </div>
      </div>

      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 pointer-events-none hidden sm:block">
        <div className="bg-white/80 border border-[#E6E1D8] px-3 py-1.5 text-[11px] font-mono text-[#77766F]">
          {t.hero.dragHint}
        </div>
      </div>

      {/* Collapsible Unified Bottom Control Dock (Three.js Directive: Central, 100% Zero-Side-Occlusion) */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-[94%] max-w-2xl z-20">
        {/* Toggle Collapse Button */}
        <div className="flex justify-center -mb-px">
          <button
            onClick={() => setIsControlsCollapsed(!isControlsCollapsed)}
            className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium text-[#77766F] bg-white border border-b-0 border-[#E6E1D8] rounded-t hover:text-[#272923] transition-colors shadow-xs"
            aria-label={isControlsCollapsed ? 'Show 3D Scene Controls' : 'Hide 3D Scene Controls'}
          >
            {isControlsCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Show Controls</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Hide Controls</span>
              </>
            )}
          </button>
        </div>

        {/* Dock Controls Body */}
        {!isControlsCollapsed && (
          <div className="bg-white/95 border border-[#E6E1D8] p-3 shadow-md flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Camera View Presets */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-medium text-[#77766F] mr-1 hidden sm:inline">
                View:
              </span>
              <button
                onClick={() => setCameraPreset('isometric')}
                className={`px-2.5 py-1 text-xs font-medium border transition-colors ${
                  cameraPreset === 'isometric'
                    ? 'bg-[#272923] text-white border-[#272923]'
                    : 'bg-white text-[#272923] border-[#E6E1D8] hover:bg-[#F8F7F2]'
                }`}
              >
                {t.hero.isometricView}
              </button>
              <button
                onClick={() => setCameraPreset('entrance')}
                className={`px-2.5 py-1 text-xs font-medium border transition-colors ${
                  cameraPreset === 'entrance'
                    ? 'bg-[#272923] text-white border-[#272923]'
                    : 'bg-white text-[#272923] border-[#E6E1D8] hover:bg-[#F8F7F2]'
                }`}
              >
                {t.hero.entranceView}
              </button>
              <button
                onClick={() => setCameraPreset('terrace')}
                className={`px-2.5 py-1 text-xs font-medium border transition-colors ${
                  cameraPreset === 'terrace'
                    ? 'bg-[#272923] text-white border-[#272923]'
                    : 'bg-white text-[#272923] border-[#E6E1D8] hover:bg-[#F8F7F2]'
                }`}
              >
                {t.hero.terraceView}
              </button>
              <button
                onClick={() => setCameraPreset('top')}
                className={`px-2.5 py-1 text-xs font-medium border transition-colors ${
                  cameraPreset === 'top'
                    ? 'bg-[#272923] text-white border-[#272923]'
                    : 'bg-white text-[#272923] border-[#E6E1D8] hover:bg-[#F8F7F2]'
                }`}
              >
                {t.hero.topView}
              </button>
            </div>

            {/* Exploded Floor Plates & Lighting Toggles */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsExploded(!isExploded)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium border transition-colors ${
                  isExploded
                    ? 'bg-[#A9563B] text-white border-[#A9563B]'
                    : 'bg-white text-[#272923] border-[#E6E1D8] hover:bg-[#F8F7F2]'
                }`}
                title="Separate floor plates to inspect interior organization"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{isExploded ? t.hero.collapseModel : t.hero.explodeModel}</span>
              </button>

              <button
                onClick={() => setLightingMode(lightingMode === 'day' ? 'dusk' : 'day')}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-white border border-[#E6E1D8] text-[#272923] hover:bg-[#F8F7F2] transition-colors"
                title="Toggle daylight and dusk golden hour illumination"
              >
                {lightingMode === 'day' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>{t.hero.lightingDay}</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-orange-600" />
                    <span>{t.hero.lightingDusk}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
