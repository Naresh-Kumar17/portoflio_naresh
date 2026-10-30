import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../hooks/useAnimations';
import { useTheme } from '../contexts/ThemeContext';

/**
 * ThreeUI / MotionSites inspired Interactive 3D Data Core
 * Features physical PBR materials, faceted geodesic crystal,
 * concentric orbital telemetry rings, drag-to-spin physics,
 * and mouse-following inertia.
 */
export function ThreeHeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 68);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // Root Group for smooth inertia and user drag
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Color definitions (Obsidian, Lavender & Citron Palette)
    const isDark = theme === 'dark';
    const primaryColor = new THREE.Color(isDark ? 0x9b8fff : 0x705eff); // Electric Iris / Lavender (#9b8fff)
    const accentColor = new THREE.Color(isDark ? 0xcfff04 : 0x566800);  // Cyber Citron / Acid Lime (#cfff04)
    const goldColor = new THREE.Color(isDark ? 0xff6a3d : 0xc8461f);    // Coral Amber Accent (#ff6a3d)

    // ── 1. Inner Faceted Geodesic Crystal (Data Core) ──
    const coreGeometry = new THREE.IcosahedronGeometry(13.5, 1);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0x161326 : 0xf8fafc,
      emissive: primaryColor,
      emissiveIntensity: isDark ? 0.32 : 0.18,
      metalness: 0.88,
      roughness: 0.16,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transmission: 0.28,
      ior: 1.6,
      reflectivity: 0.95,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    rootGroup.add(coreMesh);

    // ── 2. Delicate Outer Wireframe Halo ──
    const wireGeometry = new THREE.WireframeGeometry(coreGeometry);
    const wireMaterial = new THREE.LineBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: isDark ? 0.5 : 0.35,
      blending: THREE.AdditiveBlending,
    });
    const wireframe = new THREE.LineSegments(wireGeometry, wireMaterial);
    wireframe.scale.setScalar(1.005);
    coreMesh.add(wireframe);

    // ── 3. Torus Knot Orbit Ring (Telemetry Stream) ──
    const knotGeometry = new THREE.TorusGeometry(20, 0.45, 16, 100);
    const knotMaterial = new THREE.MeshStandardMaterial({
      color: accentColor,
      emissive: accentColor,
      emissiveIntensity: 0.6,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: false,
    });
    const orbitRing1 = new THREE.Mesh(knotGeometry, knotMaterial);
    orbitRing1.rotation.x = Math.PI / 3;
    orbitRing1.rotation.y = Math.PI / 6;
    rootGroup.add(orbitRing1);

    const orbitRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(24, 0.3, 16, 100),
      new THREE.MeshStandardMaterial({
        color: primaryColor,
        emissive: primaryColor,
        emissiveIntensity: 0.45,
        metalness: 0.85,
        roughness: 0.15,
        wireframe: false,
      })
    );
    orbitRing2.rotation.x = -Math.PI / 4;
    orbitRing2.rotation.z = Math.PI / 5;
    rootGroup.add(orbitRing2);

    // ── 4. Glowing Data Beacons on Orbit ──
    const beaconGeometry = new THREE.SphereGeometry(0.9, 16, 16);
    const beaconMaterial1 = new THREE.MeshStandardMaterial({
      color: accentColor,
      emissive: accentColor,
      emissiveIntensity: 0.85,
      roughness: 0.1,
    });
    const beacon1 = new THREE.Mesh(beaconGeometry, beaconMaterial1);
    rootGroup.add(beacon1);

    const beacon2 = new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 16, 16),
      new THREE.MeshStandardMaterial({
        color: primaryColor,
        emissive: primaryColor,
        emissiveIntensity: 0.9,
        roughness: 0.1,
      })
    );
    rootGroup.add(beacon2);

    // ── 5. Ambient Constellation Particles (Micro Data Cloud) ──
    const particleCount = 75;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 17 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      const randVal = Math.random();
      const colorMix = randVal < 0.5 ? primaryColor : randVal < 0.85 ? accentColor : goldColor;
      particleColors[i * 3] = colorMix.r;
      particleColors[i * 3 + 1] = colorMix.g;
      particleColors[i * 3 + 2] = colorMix.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 1.4,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.75 : 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particleCloud = new THREE.Points(particleGeo, particleMaterial);
    rootGroup.add(particleCloud);

    // ── 6. Studio Lighting System ──
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.7 : 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(primaryColor, isDark ? 3.5 : 2.5);
    keyLight.position.set(30, 40, 40);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(accentColor, isDark ? 3.0 : 2.0);
    rimLight.position.set(-30, -30, -30);
    scene.add(rimLight);

    const topLight = new THREE.PointLight(0xffffff, 2.0, 100);
    topLight.position.set(0, 30, 20);
    scene.add(topLight);

    // ── 7. Interactive Physics & Drag Controls ──
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotX = 0.2;
    let targetRotY = -0.3;
    let velocityX = 0;
    let velocityY = 0;
    let mouseNormX = 0;
    let mouseNormY = 0;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      setIsInteracting(true);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      container.style.cursor = 'grabbing';
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouseNormX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNormY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;

        velocityX = deltaX * 0.008;
        velocityY = deltaY * 0.008;
        targetRotY += velocityX;
        targetRotX += velocityY;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
      container.style.cursor = 'grab';
    };

    container.style.cursor = 'grab';
    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Handle Resize
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // Visibility management (pause render when off-screen)
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    visibilityObserver.observe(container);

    // ── 8. Render Animation Loop ──
    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = (performance.now() - startTime) * 0.001;

      if (!reducedMotion) {
        // Natural idle rotation
        if (!isDragging) {
          targetRotY += 0.004;
          targetRotX += Math.sin(elapsedTime * 0.5) * 0.0008;
          velocityX *= 0.95;
          velocityY *= 0.95;
          targetRotY += velocityX;
          targetRotX += velocityY;
        }

        // Pointer parallax subtle offset
        const parallaxX = mouseNormY * 0.25;
        const parallaxY = mouseNormX * 0.25;

        // Smooth spring lerp
        rootGroup.rotation.x += (targetRotX + parallaxX - rootGroup.rotation.x) * 0.07;
        rootGroup.rotation.y += (targetRotY + parallaxY - rootGroup.rotation.y) * 0.07;

        // Orbit ring counter-rotations
        orbitRing1.rotation.z = elapsedTime * 0.4;
        orbitRing2.rotation.y = -elapsedTime * 0.35;

        // Animate beacon positions along orbits
        const b1Angle = elapsedTime * 0.8;
        beacon1.position.set(
          Math.cos(b1Angle) * 20,
          Math.sin(b1Angle) * 20 * Math.sin(Math.PI / 3),
          Math.sin(b1Angle) * 20 * Math.cos(Math.PI / 3)
        );

        const b2Angle = -elapsedTime * 0.7;
        beacon2.position.set(
          Math.cos(b2Angle) * 24,
          Math.sin(b2Angle) * 24 * Math.sin(-Math.PI / 4),
          Math.sin(b2Angle) * 24 * Math.cos(-Math.PI / 4)
        );

        // Core gentle breathing
        const breathe = 1 + Math.sin(elapsedTime * 1.5) * 0.03;
        coreMesh.scale.setScalar(breathe);

        // Slow constellation drift
        particleCloud.rotation.y = elapsedTime * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      coreGeometry.dispose();
      coreMaterial.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      knotGeometry.dispose();
      knotMaterial.dispose();
      particleGeo.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [theme, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`three-hero-viewport ${isInteracting ? 'three-hero-viewport--active' : ''}`}
      aria-label="Interactive 3D Data Core. Drag to rotate."
      role="img"
    />
  );
}
