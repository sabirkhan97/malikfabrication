import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { ArrowRight, CheckCircle, Shield, Zap, Award, Clock, Users, Wrench, Phone, ChevronRight } from 'lucide-react';
import * as THREE from 'three';

// ─── Animated Counter ───────────────────────────────────────────────
function AnimatedCounter({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const match = value.match(/^(\d+)(.*)$/);
  const num = match ? parseInt(match[1]) : 0;
  const suffix = match ? match[2] : '';

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const ctrl = animate(0, num, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => { el.textContent = Math.round(v) + suffix; },
    });
    return ctrl.stop;
  }, [inView, num, suffix]);

  return <div ref={ref} className="mf-stat-val">{value}</div>;
}

function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function SectionHead({ tag, title, center = false, divider = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <div ref={ref} style={center ? { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 56 } : { marginBottom: 0 }}>
      <motion.span className="mf-tag" initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.45, ease: 'easeOut' }}>{tag}</motion.span>
      <motion.h2 className="mf-section-title" initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}>{title}</motion.h2>
      {divider && (
        <motion.div className={`mf-divider${center ? ' mf-divider-center' : ''}`} initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} style={{ transformOrigin: center ? 'center' : 'left' }} />
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════
// 3D STEEL LOGO (Three.js)
// ══════════════════════════════════════════════════════
function SteelLogo3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth || 220, H = el.clientHeight || 220;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    // Lights — dramatic metallic setup
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xfff5e0, 2.2);
    keyLight.position.set(3, 4, 3);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xe85d04, 1.8);
    rimLight.position.set(-4, -1, -2);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0x1a3a6b, 1.5, 20);
    fillLight.position.set(-3, 2, 4);
    scene.add(fillLight);

    // Sweep light that orbits
    const sweepLight = new THREE.SpotLight(0xffffff, 4, 20, Math.PI / 8, 0.5);
    sweepLight.position.set(5, 3, 5);
    scene.add(sweepLight);

    // Hexagonal badge body
    const hexShape = new THREE.Shape();
    const R = 1.4;
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const x = R * Math.cos(angle), y = R * Math.sin(angle);
      i === 0 ? hexShape.moveTo(x, y) : hexShape.lineTo(x, y);
    }
    hexShape.closePath();

    // Inner cutout ring
    const holeShape = new THREE.Shape();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const x = 1.0 * Math.cos(angle), y = 1.0 * Math.sin(angle);
      i === 0 ? holeShape.moveTo(x, y) : holeShape.lineTo(x, y);
    }
    holeShape.closePath();
    hexShape.holes.push(holeShape);

    const extrudeSettings = { depth: 0.45, bevelEnabled: true, bevelThickness: 0.12, bevelSize: 0.1, bevelSegments: 8 };
    const badgeGeo = new THREE.ExtrudeGeometry(hexShape, extrudeSettings);
    badgeGeo.center();

    const steelMat = new THREE.MeshStandardMaterial({
      color: 0x8899bb,
      metalness: 0.95,
      roughness: 0.12,
      envMapIntensity: 1.5,
    });

    const badge = new THREE.Mesh(badgeGeo, steelMat);
    badge.castShadow = true;
    scene.add(badge);

    // Inner disc (orange accent)
    const discGeo = new THREE.CylinderGeometry(0.82, 0.82, 0.55, 32);
    const discMat = new THREE.MeshStandardMaterial({ color: 0xe85d04, metalness: 0.85, roughness: 0.15 });
    const disc = new THREE.Mesh(discGeo, discMat);
    disc.rotation.x = Math.PI / 2;
    disc.position.z = 0.0;
    scene.add(disc);

    // "MF" letter plates embossed
    const letterMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9, roughness: 0.08 });

    // M shape
    const mShape = new THREE.Shape();
    mShape.moveTo(-0.38, -0.28); mShape.lineTo(-0.38, 0.28);
    mShape.lineTo(-0.26, 0.28); mShape.lineTo(-0.12, 0.05);
    mShape.lineTo(0.02, 0.28); mShape.lineTo(0.14, 0.28);
    mShape.lineTo(0.14, -0.28); mShape.lineTo(0.02, -0.28);
    mShape.lineTo(0.02, 0.08); mShape.lineTo(-0.12, -0.12);
    mShape.lineTo(-0.26, 0.08); mShape.lineTo(-0.26, -0.28);
    mShape.closePath();

    const mGeo = new THREE.ExtrudeGeometry(mShape, { depth: 0.15, bevelEnabled: false });
    mGeo.center();
    const mMesh = new THREE.Mesh(mGeo, letterMat);
    mMesh.position.set(-0.12, 0, 0.25);
    scene.add(mMesh);

    // F shape
    const fShape = new THREE.Shape();
    fShape.moveTo(0.22, -0.28); fShape.lineTo(0.22, 0.28);
    fShape.lineTo(0.56, 0.28); fShape.lineTo(0.56, 0.18);
    fShape.lineTo(0.33, 0.18); fShape.lineTo(0.33, 0.06);
    fShape.lineTo(0.52, 0.06); fShape.lineTo(0.52, -0.04);
    fShape.lineTo(0.33, -0.04); fShape.lineTo(0.33, -0.28);
    fShape.closePath();

    const fGeo = new THREE.ExtrudeGeometry(fShape, { depth: 0.15, bevelEnabled: false });
    fGeo.center();
    const fMesh = new THREE.Mesh(fGeo, letterMat);
    fMesh.position.set(0.12, 0, 0.25);
    scene.add(fMesh);

    // Outer ring glow
    const ringGeo = new THREE.TorusGeometry(1.5, 0.05, 12, 80);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xe85d04, metalness: 0.7, roughness: 0.3, emissive: 0xe85d04, emissiveIntensity: 0.4 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ring);

    // Small bolt details
    const boltGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.18, 8);
    const boltMat = new THREE.MeshStandardMaterial({ color: 0x5566aa, metalness: 1, roughness: 0.05 });
    [0, 1, 2, 3, 4, 5].forEach(i => {
      const a = (Math.PI / 3) * i;
      const bolt = new THREE.Mesh(boltGeo, boltMat);
      bolt.rotation.x = Math.PI / 2;
      bolt.position.set(1.2 * Math.cos(a), 1.2 * Math.sin(a), 0.3);
      scene.add(bolt);
    });

    let t = 0;
    const animate = () => {
      const id = requestAnimationFrame(animate);
      t += 0.012;
      badge.rotation.y = t * 0.4;
      badge.rotation.x = Math.sin(t * 0.3) * 0.15;
      disc.rotation.z = t * 0.4;
      ring.rotation.z = -t * 0.2;
      mMesh.rotation.y = t * 0.4;
      fMesh.rotation.y = t * 0.4;
      mMesh.rotation.x = Math.sin(t * 0.3) * 0.15;
      fMesh.rotation.x = Math.sin(t * 0.3) * 0.15;

      // Sweep light orbit
      sweepLight.position.x = Math.cos(t * 0.7) * 6;
      sweepLight.position.z = Math.sin(t * 0.7) * 6;
      sweepLight.position.y = Math.sin(t * 0.5) * 3;

      renderer.render(scene, camera);
      return id;
    };
    const id = animate();

    return () => { cancelAnimationFrame(id); renderer.dispose(); if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement); };
  }, []);

  return <div ref={mountRef} style={{ width: 220, height: 220, cursor: 'grab' }} />;
}

// ══════════════════════════════════════════════════════
// 3D GEAR SYSTEM (Three.js)
// ══════════════════════════════════════════════════════
function GearSystem3D({ width = 700, height = 320 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth || width, H = el.clientHeight || height;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
    camera.position.set(0, 0, 14);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dLight = new THREE.DirectionalLight(0xfff5e0, 2.5);
    dLight.position.set(4, 6, 6);
    scene.add(dLight);
    const rimL = new THREE.DirectionalLight(0xe85d04, 1.2);
    rimL.position.set(-5, -2, -4);
    scene.add(rimL);

    // Build gear shape
    function makeGear(teeth, innerR, outerR, toothH, thickness) {
      const shape = new THREE.Shape();
      const totalTeeth = teeth;
      const step = (Math.PI * 2) / totalTeeth;
      for (let i = 0; i < totalTeeth; i++) {
        const a0 = step * i - step * 0.2;
        const a1 = step * i + step * 0.2;
        const a2 = step * i + step * 0.3;
        const a3 = step * (i + 1) - step * 0.3;
        if (i === 0) shape.moveTo(innerR * Math.cos(a0), innerR * Math.sin(a0));
        else shape.lineTo(innerR * Math.cos(a0), innerR * Math.sin(a0));
        shape.lineTo(outerR * Math.cos(a1), outerR * Math.sin(a1));
        shape.lineTo(outerR * Math.cos(a2), outerR * Math.sin(a2));
        shape.lineTo(innerR * Math.cos(a3), innerR * Math.sin(a3));
      }
      shape.closePath();
      // Hub hole
      const hole = new THREE.Path();
      const hR = innerR * 0.38;
      hole.absarc(0, 0, hR, 0, Math.PI * 2, true);
      shape.holes.push(hole);

      const geo = new THREE.ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.05, bevelSegments: 4 });
      geo.center();
      return geo;
    }

    const steelMat = new THREE.MeshStandardMaterial({ color: 0x7788aa, metalness: 0.9, roughness: 0.15 });
    const accentMat = new THREE.MeshStandardMaterial({ color: 0xe85d04, metalness: 0.8, roughness: 0.2 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x2a3a5a, metalness: 0.95, roughness: 0.1 });

    // Large center gear: 24 teeth
    const gearA = new THREE.Mesh(makeGear(24, 2.0, 2.5, 0.5, 0.5), steelMat);
    gearA.position.set(0, 0, 0);
    scene.add(gearA);

    // Medium right gear: 16 teeth — meshes with A
    const gearB = new THREE.Mesh(makeGear(16, 1.3, 1.65, 0.35, 0.45), accentMat);
    gearB.position.set(3.65, 0, 0);
    scene.add(gearB);

    // Small top gear: 10 teeth
    const gearC = new THREE.Mesh(makeGear(10, 0.85, 1.08, 0.23, 0.4), darkMat);
    gearC.position.set(0, 3.1, 0);
    scene.add(gearC);

    // Extra gear: medium left
    const gearD = new THREE.Mesh(makeGear(16, 1.3, 1.65, 0.35, 0.45), steelMat);
    gearD.position.set(-3.65, 0, 0);
    scene.add(gearD);

    // Small bottom-right
    const gearE = new THREE.Mesh(makeGear(10, 0.85, 1.08, 0.23, 0.4), accentMat);
    gearE.position.set(3.65, -2.8, 0);
    scene.add(gearE);

    // Axle pegs
    const axleGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.2, 12);
    [gearA, gearB, gearC, gearD, gearE].forEach(g => {
      const axle = new THREE.Mesh(axleGeo, darkMat);
      axle.rotation.x = Math.PI / 2;
      axle.position.copy(g.position);
      scene.add(axle);
    });

    let t = 0;
    const anim = () => {
      requestAnimationFrame(anim);
      t += 0.008;
      // Gear ratios based on teeth counts
      gearA.rotation.z = t;
      gearB.rotation.z = -t * (24 / 16);  // opposite, faster
      gearC.rotation.z = -t * (24 / 10);
      gearD.rotation.z = -t * (24 / 16);
      gearE.rotation.z = t * (16 / 10);

      // Subtle camera drift
      camera.position.x = Math.sin(t * 0.08) * 1.5;
      camera.position.y = Math.cos(t * 0.06) * 0.8;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    anim();

    return () => { renderer.dispose(); if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement); };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height }} />;
}

// ══════════════════════════════════════════════════════
// 3D LASER CUTTING TITLE (Three.js)
// ══════════════════════════════════════════════════════
function LaserCutTitle({ text = 'MALIK FABRICATION' }) {
  const mountRef = useRef(null);
  const inView = useInView(mountRef, { once: true, amount: 0.3 });
  const triggered = useRef(false);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth || 700, H = 140;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, W / H, 0.1, 100);
    camera.position.set(0, 0, 18);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dLight = new THREE.DirectionalLight(0xfff5e0, 2.0);
    dLight.position.set(3, 5, 8);
    scene.add(dLight);

    // Metal plate — the surface being "cut"
    const plateGeo = new THREE.BoxGeometry(W / 30, 2.8, 0.25);
    const plateMat = new THREE.MeshStandardMaterial({ color: 0x3a4a6a, metalness: 0.95, roughness: 0.1 });
    const plate = new THREE.Mesh(plateGeo, plateMat);
    plate.position.z = -0.3;
    scene.add(plate);

    // Text as individual letter meshes (box approximation)
    const letters = text.split('');
    const totalWidth = letters.length * 0.82;
    const letterGroup = new THREE.Group();
    scene.add(letterGroup);

    const letterMeshes = [];
    letters.forEach((char, i) => {
      if (char === ' ') { letterMeshes.push(null); return; }
      const geo = new THREE.BoxGeometry(0.55, 1.1, 0.25);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x8899bb, metalness: 0.95, roughness: 0.08,
        emissive: 0x000000, emissiveIntensity: 0
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.x = (i * 0.82) - totalWidth / 2;
      mesh.scale.y = 0;
      letterGroup.add(mesh);
      letterMeshes.push(mesh);
    });

    // Laser beam
    const laserGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.5, 8);
    const laserMat = new THREE.MeshBasicMaterial({ color: 0xff6600 });
    const laser = new THREE.Mesh(laserGeo, laserMat);
    laser.rotation.z = Math.PI / 2;
    scene.add(laser);

    // Laser glow sphere
    const glowGeo = new THREE.SphereGeometry(0.15, 12, 12);
    const glowMat = new THREE.MeshBasicMaterial({ color: 0xff8800, transparent: true, opacity: 0.85 });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glow);

    // Sparks system
    const sparkCount = 120;
    const sparkPositions = new Float32Array(sparkCount * 3);
    const sparkVelocities = [];
    const sparkLife = new Float32Array(sparkCount);
    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
    const sparkMat = new THREE.PointsMaterial({ color: 0xff8800, size: 0.12, transparent: true, opacity: 0.9 });
    const sparks = new THREE.Points(sparkGeo, sparkMat);
    scene.add(sparks);
    for (let i = 0; i < sparkCount; i++) {
      sparkVelocities.push({ x: 0, y: 0, z: 0 });
      sparkLife[i] = 0;
    }

    // Cutting progress state
    let cutProgress = -1; // -1 = not started
    let cutting = false;
    let sparkIdx = 0;

    const startCut = () => {
      if (cutting) return;
      cutting = true;
      cutProgress = 0;
    };

    // Watch for inView to trigger
    const checkInView = () => {
      if (inView && !triggered.current) {
        triggered.current = true;
        setTimeout(startCut, 400);
      }
    };

    let t = 0;
    const anim = () => {
      requestAnimationFrame(anim);
      t += 0.016;
      checkInView();

      if (cutting && cutProgress < letters.length) {
        cutProgress += 0.08;
        const ci = Math.floor(cutProgress);

        // Position laser
        const lx = (ci * 0.82) - totalWidth / 2;
        const frac = cutProgress - ci;
        laser.position.x = lx + frac * 0.82 - 0.41 * (1 - frac);
        laser.position.y = 1.4 - frac * 2.8;
        glow.position.copy(laser.position);

        // Reveal letters as laser passes
        for (let i = 0; i <= ci && i < letterMeshes.length; i++) {
          const m = letterMeshes[i];
          if (!m) continue;
          const reveal = Math.min(1, cutProgress - i + 0.5);
          m.scale.y = reveal;
          m.material.emissive.setHex(i === ci ? 0xe85d04 : 0x000000);
          m.material.emissiveIntensity = i === ci ? (1 - frac) * 1.5 : 0;
        }

        // Emit sparks
        for (let k = 0; k < 3; k++) {
          const si = (sparkIdx++) % sparkCount;
          sparkPositions[si * 3] = laser.position.x + (Math.random() - 0.5) * 0.2;
          sparkPositions[si * 3 + 1] = laser.position.y + (Math.random() - 0.5) * 0.2;
          sparkPositions[si * 3 + 2] = 0.3;
          sparkVelocities[si] = {
            x: (Math.random() - 0.5) * 0.12,
            y: Math.random() * 0.14 - 0.03,
            z: Math.random() * 0.1
          };
          sparkLife[si] = 1.0;
        }
      } else if (cutting && cutProgress >= letters.length) {
        laser.visible = false;
        glow.visible = false;
      }

      // Update sparks
      for (let i = 0; i < sparkCount; i++) {
        if (sparkLife[i] <= 0) {
          sparkPositions[i * 3 + 1] = -999;
          continue;
        }
        sparkLife[i] -= 0.025;
        sparkPositions[i * 3] += sparkVelocities[i].x;
        sparkPositions[i * 3 + 1] += sparkVelocities[i].y - 0.008;
        sparkPositions[i * 3 + 2] += sparkVelocities[i].z;
      }
      sparkGeo.attributes.position.needsUpdate = true;
      sparkMat.opacity = 0.9;

      // Subtle plate tilt
      plate.rotation.x = Math.sin(t * 0.2) * 0.04;
      letterGroup.rotation.x = Math.sin(t * 0.2) * 0.04;

      renderer.render(scene, camera);
    };
    anim();

    return () => { renderer.dispose(); if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement); };
  }, [inView]);

  return <div ref={mountRef} style={{ width: '100%', height: 140 }} />;
}

// ══════════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════════
const features = [
  { icon: Shield, title: 'Quality Assurance', description: 'Every project undergoes rigorous quality checks to ensure precision and long-term durability.' },
  { icon: Zap, title: 'Fast Turnaround', description: 'On-time delivery guaranteed through efficient project management and a skilled workforce.' },
  { icon: Award, title: 'Expert Craftsmanship', description: '15+ years of proven experience in metal fabrication and welding services.' },
  { icon: Clock, title: '24/7 Support', description: 'Round-the-clock assistance for quotes, project updates, and after-service support.' },
];

const services = [
  { title: 'Metal Fabrication', description: 'Custom-built metal structures with precision finishing for industrial and commercial applications.', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600', tag: 'Industrial' },
  { title: 'Welding Services', description: 'Professional MIG & TIG welding by certified welders with full quality assurance.', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600', tag: 'Certified' },
  { title: 'Industrial Sheds', description: 'Durable steel sheds designed and fabricated to your exact specifications.', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600', tag: 'Structural' },
  { title: 'Gates & Railings', description: 'Elegant, secure gates, grills, and railings for residential and commercial spaces.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600', tag: 'Custom' },
];

const stats = [
  { value: '15+', label: 'Years Experience', icon: Clock },
  { value: '500+', label: 'Projects Done', icon: Wrench },
  { value: '300+', label: 'Happy Clients', icon: Users },
  { value: '100%', label: 'Quality Guaranteed', icon: Award },
];

const trustBadges = ['ISO 9001 Certified', '15+ Years Experience', '500+ Projects', '100% Satisfaction'];

// ══════════════════════════════════════════════════════
// CSS
// ══════════════════════════════════════════════════════
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,600&display=swap');
  :root {
    --navy: #0f1f3d; --blue: #1a3a6b; --accent: #e85d04; --accent-light: #ff7b2c;
    --steel: #f4f6fa; --border: #dde3ef; --text: #1a1f2e; --muted: #6b7280; --white: #ffffff;
  }
  .mf-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .mf-root { font-family: 'DM Sans', sans-serif; color: var(--text); background: var(--white); }
  .mf-root h1, .mf-root h2, .mf-root h3 { font-family: 'Barlow Condensed', sans-serif; }

  /* ── Hero ── */
  .mf-hero {
    position: relative; min-height: 100vh; background: var(--white);
    display: flex; align-items: center; overflow: hidden; padding-top: 80px;
  }
  .mf-hero-stripe {
    position: absolute; top: 0; right: 0; width: 52%; height: 100%;
    background: var(--steel); clip-path: polygon(9% 0, 100% 0, 100% 100%, 0% 100%);
  }
  .mf-hero-dots {
    position: absolute; top: 0; right: 0; width: 52%; height: 100%;
    background-image: radial-gradient(circle, #c0cde8 1px, transparent 1px);
    background-size: 26px 26px; opacity: 0.45;
    clip-path: polygon(9% 0, 100% 0, 100% 100%, 0% 100%);
  }
  .mf-hero-bar {
    position: absolute; left: 0; top: 0; width: 5px; height: 100%;
    background: linear-gradient(to bottom, var(--accent), var(--blue));
  }
  .mf-hero-inner {
    position: relative; z-index: 1; max-width: 1200px; margin: 0 auto;
    padding: 60px 24px; display: grid; grid-template-columns: 1fr 1fr;
    gap: 60px; align-items: center; width: 100%;
  }
  .mf-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    background: #fff8f4; border: 1px solid #fdd0b0;
    color: var(--accent); font-size: 11px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    padding: 6px 14px; border-radius: 4px; margin-bottom: 22px;
  }
  .mf-eyebrow-dot {
    width: 6px; height: 6px; background: var(--accent); border-radius: 50%;
    animation: mf-pulse 1.5s infinite;
  }
  @keyframes mf-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.3)} }
  .mf-hero-title {
    font-size: clamp(48px,5.5vw,78px); font-weight: 800; line-height: 1.0;
    color: var(--navy); letter-spacing: -0.01em; margin-bottom: 20px; text-transform: uppercase;
  }
  .mf-title-solid { color: var(--blue); }
  .mf-title-outline { color: transparent; -webkit-text-stroke: 2.5px var(--navy); }
  .mf-hero-sub { font-size: 15.5px; color: var(--muted); line-height: 1.7; max-width: 460px; margin-bottom: 34px; }
  .mf-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 46px; }

  .mf-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--accent); color: #fff; padding: 13px 26px; border-radius: 6px;
    font-weight: 600; font-size: 14.5px; text-decoration: none;
    position: relative; overflow: hidden;
    transition: background .25s, transform .2s, box-shadow .25s;
  }
  .mf-btn-primary::before { content:''; position:absolute; top:0; left:-75%; width:50%; height:100%; background:linear-gradient(120deg,transparent,rgba(255,255,255,.3),transparent); transform:skewX(-20deg); transition:left .5s ease; }
  .mf-btn-primary:hover::before { left:130%; }
  .mf-btn-primary:hover { background:var(--accent-light); transform:translateY(-2px); box-shadow:0 8px 24px rgba(232,93,4,.38); }
  .mf-btn-primary:active { transform:translateY(0) scale(.97); box-shadow:none; }

  .mf-btn-secondary {
    display: inline-flex; align-items: center; gap: 8px;
    border: 2px solid var(--navy); color: var(--navy); padding: 13px 26px; border-radius: 6px;
    font-weight: 600; font-size: 14.5px; text-decoration: none;
    position: relative; overflow: hidden; background: transparent;
    transition: color .25s, transform .2s;
  }
  .mf-btn-secondary::before { content:''; position:absolute; inset:0; background:var(--navy); transform:scaleX(0); transform-origin:left; transition:transform .28s ease; z-index:0; }
  .mf-btn-secondary span, .mf-btn-secondary svg { position:relative; z-index:1; }
  .mf-btn-secondary:hover::before { transform:scaleX(1); }
  .mf-btn-secondary:hover { color:#fff; transform:translateY(-2px); }
  .mf-btn-secondary:active { transform:translateY(0) scale(.97); }

  .ab-cta-btn2 {
    display:inline-flex; align-items:center; gap:8px;
    background:rgba(0,0,0,.04); border:1px solid rgba(0,0,0,.12);
    color:#111; padding:13px 26px; border-radius:6px;
    font-family:'DM Sans',sans-serif; font-size:14.5px; font-weight:600; text-decoration:none;
    transition:background .2s, transform .2s, box-shadow .2s;
  }
  .ab-cta-btn2:hover { background:rgba(0,0,0,.08); transform:translateY(-2px); box-shadow:0 4px 14px rgba(0,0,0,.1); }
  .ab-cta-btn2:active { transform:translateY(0) scale(.97); }

  /* Stats bar */
  .mf-stats-bar { display:grid; grid-template-columns:repeat(4,1fr); border:1px solid var(--border); border-radius:10px; overflow:hidden; background:var(--white); box-shadow:0 2px 16px rgba(15,31,61,.07); }
  .mf-stat { padding:18px 14px; text-align:center; border-right:1px solid var(--border); transition:background .2s; }
  .mf-stat:last-child { border-right:none; }
  .mf-stat:hover { background:#fff8f4; }
  .mf-stat svg { width:24px; height:24px; color:var(--accent); margin:0 auto 6px; display:block; }
  .mf-stat-val { font-family:'Barlow Condensed',sans-serif; font-size:28px; font-weight:800; color:var(--navy); line-height:1; }
  .mf-stat-lbl { font-size:10px; color:var(--muted); margin-top:3px; font-weight:500; letter-spacing:.04em; text-transform:uppercase; }

  /* Image grid */
  .mf-img-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; position:relative; }
  .mf-img-col { display:flex; flex-direction:column; gap:14px; }
  .mf-img-col:nth-child(2) { margin-top:36px; }
  .mf-img-grid img { width:100%; border-radius:10px; object-fit:cover; display:block; box-shadow:0 8px 32px rgba(15,31,61,.12); transition:transform .4s,box-shadow .4s; }
  .mf-img-grid img:hover { transform:scale(1.03); box-shadow:0 16px 40px rgba(15,31,61,.18); }
  .mf-img-badge {
    position:absolute; bottom:16px; left:-16px;
    background:var(--accent); color:white; padding:11px 16px; border-radius:7px;
    font-family:'Barlow Condensed',sans-serif; font-size:14px; font-weight:700;
    letter-spacing:.04em; box-shadow:0 8px 24px rgba(232,93,4,.3); z-index:2;
    animation:mf-float 3.5s ease-in-out infinite;
  }
  @keyframes mf-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }

  /* 3D Logo badge in hero */
  .mf-3d-logo-wrap {
    display: flex; align-items: center; gap: 20px; margin-bottom: 32px;
    background: linear-gradient(135deg, #f4f6fa, #e8eef9);
    border: 1px solid var(--border); border-radius: 14px;
    padding: 14px 20px; max-width: fit-content;
  }
  .mf-3d-logo-info { display: flex; flex-direction: column; }
  .mf-3d-logo-name { font-family: 'Barlow Condensed', sans-serif; font-size: 22px; font-weight: 800; color: var(--navy); text-transform: uppercase; letter-spacing: 0.04em; }
  .mf-3d-logo-sub { font-size: 11px; color: var(--muted); font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; margin-top: 2px; }

  /* Gear section */
  .mf-gears-section {
    background: var(--navy); overflow: hidden; position: relative; padding: 0;
  }
  .mf-gears-overlay {
    position: absolute; inset: 0; z-index: 2; pointer-events: none;
    background: linear-gradient(to right, var(--navy) 0%, transparent 25%, transparent 75%, var(--navy) 100%);
  }
  .mf-gears-label {
    position: absolute; inset: 0; z-index: 3; display: flex; align-items: center; justify-content: center;
    pointer-events: none;
  }
  .mf-gears-text {
    font-family: 'Barlow Condensed', sans-serif; font-size: 13px; font-weight: 700;
    letter-spacing: 0.25em; text-transform: uppercase; color: rgba(255,255,255,0.25);
  }

  /* Laser title section */
  .mf-laser-wrap {
    padding: 28px 0 8px;
  }
  .mf-laser-caption {
    text-align: center; font-size: 11px; color: var(--muted); letter-spacing: 0.1em;
    text-transform: uppercase; margin-top: 4px; font-weight: 500;
  }

  /* Sections */
  .mf-section { padding: 92px 0; }
  .mf-section-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
  .mf-section-steel { background: var(--steel); }
  .mf-tag { display:inline-block; font-size:10.5px; font-weight:700; letter-spacing:.13em; text-transform:uppercase; color:var(--accent); margin-bottom:12px; }
  .mf-section-title { font-size:clamp(30px,3.8vw,50px); font-weight:800; color:var(--navy); text-transform:uppercase; line-height:1.05; letter-spacing:-.01em; }
  .mf-title-blue { color:var(--blue); }
  .mf-title-orange { color:var(--accent); }
  .mf-divider { width:44px; height:4px; background:var(--accent); border-radius:2px; margin-top:14px; }
  .mf-divider-center { margin-left:auto; margin-right:auto; }

  /* Features */
  .mf-feat-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:22px; }
  .mf-feat-card { background:var(--white); border:1px solid var(--border); border-radius:12px; padding:34px 26px; transition:box-shadow .25s,transform .25s; position:relative; overflow:hidden; }
  .mf-feat-card::before { content:''; position:absolute; top:0; left:0; width:4px; height:100%; background:var(--accent); transform:scaleY(0); transform-origin:top; transition:transform .3s; }
  .mf-feat-card:hover { box-shadow:0 12px 40px rgba(15,31,61,.1); transform:translateY(-4px); }
  .mf-feat-card:hover::before { transform:scaleY(1); }
  .mf-feat-ico-wrap { width:50px; height:50px; background:#e8eef9; border-radius:10px; display:flex; align-items:center; justify-content:center; margin-bottom:18px; transition:background .25s,transform .25s; }
  .mf-feat-card:hover .mf-feat-ico-wrap { background:var(--accent); transform:scale(1.1); }
  .mf-feat-ico-wrap svg { width:22px; height:22px; color:var(--blue); transition:color .25s; }
  .mf-feat-card:hover .mf-feat-ico-wrap svg { color:white; }
  .mf-feat-title { font-family:'Barlow Condensed',sans-serif; font-size:19px; font-weight:700; color:var(--navy); text-transform:uppercase; letter-spacing:.02em; margin-bottom:9px; }
  .mf-feat-desc { font-size:13.5px; color:var(--muted); line-height:1.65; }

  /* Services */
  .mf-svc-hd { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:48px; gap:24px; }
  .mf-view-all { display:inline-flex; align-items:center; gap:6px; color:var(--blue); font-weight:600; font-size:13.5px; text-decoration:none; white-space:nowrap; transition:gap .2s,color .2s; }
  .mf-view-all:hover { gap:10px; color:var(--accent); }
  .mf-svc-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:22px; }
  .mf-svc-card { background:var(--white); border:1px solid var(--border); border-radius:12px; overflow:hidden; transition:box-shadow .25s,transform .25s; }
  .mf-svc-card:hover { box-shadow:0 16px 48px rgba(15,31,61,.12); transform:translateY(-5px); }
  .mf-svc-img { position:relative; height:196px; overflow:hidden; }
  .mf-svc-img img { width:100%; height:100%; object-fit:cover; transition:transform .5s; }
  .mf-svc-card:hover .mf-svc-img img { transform:scale(1.07); }
  .mf-svc-tag { position:absolute; top:11px; left:11px; background:var(--accent); color:white; font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:4px 9px; border-radius:4px; }
  .mf-svc-body { padding:22px; }
  .mf-svc-title { font-family:'Barlow Condensed',sans-serif; font-size:19px; font-weight:700; color:var(--navy); text-transform:uppercase; margin-bottom:7px; letter-spacing:.02em; }
  .mf-svc-desc { font-size:13px; color:var(--muted); line-height:1.6; margin-bottom:16px; }
  .mf-svc-link { display:inline-flex; align-items:center; gap:5px; color:var(--accent); font-size:13px; font-weight:600; text-decoration:none; transition:gap .2s; }
  .mf-svc-link:hover { gap:9px; }

  /* CTA */
  .mf-cta { background:var(--navy); position:relative; overflow:hidden; padding:96px 0; }
  .mf-cta-lines { position:absolute; inset:0; background-image:repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(255,255,255,.018) 40px,rgba(255,255,255,.018) 41px); }
  .mf-cta-glow { position:absolute; right:-80px; top:-80px; width:380px; height:380px; border-radius:50%; background:radial-gradient(circle,rgba(232,93,4,.15),transparent 70%); animation:mf-glow-breathe 4s ease-in-out infinite; }
  @keyframes mf-glow-breathe { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.18);opacity:.7} }
  .mf-cta-inner { position:relative; z-index:1; max-width:800px; margin:0 auto; padding:0 24px; text-align:center; }
  .mf-cta-title { font-size:clamp(36px,5vw,62px); font-weight:800; color:white; text-transform:uppercase; line-height:1.05; margin-bottom:16px; letter-spacing:-.01em; }
  .mf-cta-sub { color:rgba(255,255,255,.58); font-size:15.5px; line-height:1.65; margin-bottom:38px; max-width:540px; margin-left:auto; margin-right:auto; }
  .mf-cta-btns { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
  .mf-cta-btn1 { display:inline-flex; align-items:center; gap:8px; background:var(--accent); color:white; padding:14px 30px; border-radius:6px; font-weight:600; font-size:14.5px; text-decoration:none; position:relative; overflow:hidden; transition:background .25s,transform .2s,box-shadow .25s; }
  .mf-cta-btn1::before { content:''; position:absolute; top:0; left:-75%; width:50%; height:100%; background:linear-gradient(120deg,transparent,rgba(255,255,255,.28),transparent); transform:skewX(-20deg); transition:left .5s ease; }
  .mf-cta-btn1:hover::before { left:130%; }
  .mf-cta-btn1:hover { background:var(--accent-light); transform:translateY(-2px); box-shadow:0 10px 28px rgba(232,93,4,.45); }
  .mf-cta-btn1:active { transform:translateY(0) scale(.97); }
  .mf-cta-btn2 { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.2); color:white; padding:14px 30px; border-radius:6px; font-weight:600; font-size:14.5px; text-decoration:none; transition:background .2s,transform .2s,border-color .2s; }
  .mf-cta-btn2:hover { background:rgba(255,255,255,.14); border-color:rgba(255,255,255,.4); transform:translateY(-2px); }
  .mf-cta-btn2:active { transform:translateY(0) scale(.97); }

  /* Trust */
  .mf-trust { padding:44px 0; background:var(--white); border-top:1px solid var(--border); }
  .mf-trust-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
  .mf-trust-item { display:flex; align-items:center; gap:10px; padding:16px 18px; border:1px solid var(--border); border-radius:8px; background:var(--steel); transition:border-color .2s,transform .2s,box-shadow .2s; }
  .mf-trust-item:hover { border-color:var(--accent); transform:translateY(-2px); box-shadow:0 4px 16px rgba(232,93,4,.1); }
  .mf-trust-item svg { width:18px; height:18px; color:var(--accent); flex-shrink:0; }
  .mf-trust-item span { font-size:13px; font-weight:600; color:var(--navy); letter-spacing:.01em; }

  @media (max-width:1024px) {
    .mf-feat-grid { grid-template-columns:repeat(2,1fr); }
    .mf-svc-grid { grid-template-columns:repeat(2,1fr); }
    .mf-trust-grid { grid-template-columns:repeat(2,1fr); }
  }
  @media (max-width:768px) {
    .mf-hero-stripe { width:100%; clip-path:none; opacity:.3; }
    .mf-hero-dots { display:none; }
    .mf-hero-inner { grid-template-columns:1fr; gap:44px; padding:40px 20px 56px; }
    .mf-img-grid { display:none; }
    .mf-stats-bar { grid-template-columns:repeat(2,1fr); }
    .mf-stat:nth-child(2) { border-right:none; }
    .mf-stat:nth-child(3) { border-top:1px solid var(--border); }
    .mf-stat:nth-child(4) { border-top:1px solid var(--border); border-right:none; }
    .mf-feat-grid { grid-template-columns:1fr; }
    .mf-svc-grid { grid-template-columns:1fr; }
    .mf-svc-hd { flex-direction:column; align-items:flex-start; }
    .mf-section { padding:60px 0; }
    .mf-3d-logo-wrap { padding:10px 14px; }
  }
  @media (max-width:480px) {
    .mf-trust-grid { grid-template-columns:1fr; }
    .mf-hero-title { font-size:40px; }
    .mf-cta-title { font-size:34px; }
  }
`;

// ══════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════
export default function Home() {
  return (
    <>
      <style>{CSS}</style>
      <div className="mf-root">

        {/* ── HERO ── */}
        <section className="mf-hero">
          <div className="mf-hero-bar" />
          <div className="mf-hero-stripe" />
          <div className="mf-hero-dots" />

          <div className="mf-hero-inner">
            <div>
              <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                <div className="mf-eyebrow">
                  <span className="mf-eyebrow-dot" />
                  Best Fabrication Services in Gurgaon
                </div>
              </motion.div>

              {/* ── 3D Steel Logo Badge ── */}
              <motion.div className="mf-3d-logo-wrap" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
                <SteelLogo3D />
                <div className="mf-3d-logo-info">
                  <div className="mf-3d-logo-name">Malik Fabrication</div>
                  <div className="mf-3d-logo-sub">Precision Metal Works · Est. 2008</div>
                </div>
              </motion.div>

              {['Precision', 'Metal Work', '& Welding'].map((line, i) => (
                <div key={i} style={{ overflow: 'hidden' }}>
                  <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.65, delay: 0.35 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}>
                    <h1 className="mf-hero-title" style={{ marginBottom: i === 2 ? 20 : 0 }}>
                      {i === 0 && 'Precision'}
                      {i === 1 && <><span className="mf-title-solid">Metal</span>{' '}<span className="mf-title-outline">Work</span></>}
                      {i === 2 && '& Welding'}
                    </h1>
                  </motion.div>
                </div>
              ))}

              <motion.p className="mf-hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.85 }}>
                Malik Fabrication — your trusted partner for professional metal fabrication,
                welding, and structural steel work. Quality craftsmanship since 2008.
              </motion.p>

              <motion.div className="mf-actions" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.0 }}>
                <a href="/contact" className="mf-btn-primary">Get Free Quote <ArrowRight size={16} /></a>
                <a href="/services" className="mf-btn-secondary"><span>Our Services</span><ChevronRight size={16} /></a>
                <a href="tel:+917838170214" className="ab-cta-btn2"><Phone size={16} /> +91 78381 70214</a>
              </motion.div>

              <motion.div className="mf-stats-bar" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.15 }}>
                {stats.map((s, i) => (
                  <div className="mf-stat" key={i}>
                    <s.icon />
                    <AnimatedCounter value={s.value} />
                    <div className="mf-stat-lbl">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div className="mf-img-grid" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
              <div className="mf-img-col">
                <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=280&fit=crop" alt="Metal Fabrication" style={{ height: 198 }} />
                <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=220&fit=crop" alt="Welding" style={{ height: 160 }} />
              </div>
              <div className="mf-img-col">
                <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=220&fit=crop" alt="Gates" style={{ height: 160 }} />
                <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=280&fit=crop" alt="Industrial" style={{ height: 198 }} />
              </div>
              <div className="mf-img-badge">Trusted Since 2008</div>
            </motion.div>
          </div>
        </section>

        {/* ── 3D GEAR SYSTEM DIVIDER ── */}
        <div className="mf-gears-section">
          <div className="mf-gears-overlay" />
          <div className="mf-gears-label">
            <span className="mf-gears-text">Engineering Excellence · Precision Manufacturing · Quality Craftsmanship</span>
          </div>
          <GearSystem3D height={320} />
        </div>

        {/* ── FEATURES ── */}
        <section className="mf-section mf-section-steel">
          <div className="mf-section-inner">
            <SectionHead tag="Why Choose Us" center title={<>Built on <span className="mf-title-blue">Trust</span> &amp; <span className="mf-title-orange">Precision</span></>} />
            <div className="mf-feat-grid">
              {features.map((f, i) => (
                <motion.div className="mf-feat-card" key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true, amount: 0.2 }}>
                  <div className="mf-feat-ico-wrap"><f.icon /></div>
                  <div className="mf-feat-title">{f.title}</div>
                  <p className="mf-feat-desc">{f.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES with 3D Laser Title ── */}
        <section className="mf-section">
          <div className="mf-section-inner">
            <div className="mf-svc-hd">
              <div>
                <SectionHead tag="What We Do" title={<>Our <span className="mf-title-orange">Services</span></>} />
                {/* 3D Laser cut title reveals below heading */}
                <div className="mf-laser-wrap">
                  <LaserCutTitle text="MALIK FABRICATION" />
                  <div className="mf-laser-caption">Laser-Precision Craftsmanship</div>
                </div>
              </div>
              <FadeUp delay={0.2}>
                <a href="/services" className="mf-view-all">View All Services <ArrowRight size={15} /></a>
              </FadeUp>
            </div>

            <div className="mf-svc-grid">
              {services.map((s, i) => (
                <motion.div className="mf-svc-card" key={i} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true, amount: 0.15 }}>
                  <div className="mf-svc-img">
                    <img src={s.image} alt={s.title} />
                    <span className="mf-svc-tag">{s.tag}</span>
                  </div>
                  <div className="mf-svc-body">
                    <div className="mf-svc-title">{s.title}</div>
                    <p className="mf-svc-desc">{s.description}</p>
                    <a href="/services" className="mf-svc-link">Learn More <ArrowRight size={13} /></a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="mf-cta">
          <div className="mf-cta-lines" />
          <div className="mf-cta-glow" />
          <div className="mf-cta-inner">
            <motion.h2 className="mf-cta-title" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }}>
              Ready to Start<br />Your Project?
            </motion.h2>
            <motion.p className="mf-cta-sub" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
              Contact us today for a free consultation and quote. Our team is ready to bring your vision to life with quality craftsmanship.
            </motion.p>
            <motion.div className="mf-cta-btns" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
              <a href="/contact" className="mf-cta-btn1">Get Free Quote <ArrowRight size={16} /></a>
              <a href="tel:+917838170214" className="mf-cta-btn2"><Phone size={16} /> +91 78381 70214</a>
            </motion.div>
          </div>
        </section>

        {/* ── TRUST ── */}
        <section className="mf-trust">
          <div className="mf-section-inner">
            <div className="mf-trust-grid">
              {trustBadges.map((badge, i) => (
                <motion.div className="mf-trust-item" key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }}>
                  <CheckCircle />
                  <span>{badge}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}