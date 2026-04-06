import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * SteelLogo3D
 * A heavy metallic badge that rotates slowly with a light sweep.
 * Props:
 *   size   — canvas size in px (default 320)
 *   text   — top line text (default "MF")
 *   sub    — sub text (default "MALIK FABRICATION")
 */
export default function SteelLogo3D({ size = 320, text = 'MF', sub = 'MALIK FABRICATION' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const W = size, H = size;
    const el = mountRef.current;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    el.appendChild(renderer.domElement);

    /* ── Scene / Camera ── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 6);

    /* ── Lights ── */
    // Ambient
    scene.add(new THREE.AmbientLight(0x334466, 0.6));

    // Key light (bright white from upper-left)
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(4, 6, 5);
    key.castShadow = true;
    scene.add(key);

    // Orange rim (fabrication accent)
    const rim = new THREE.DirectionalLight(0xff7700, 1.4);
    rim.position.set(-4, -2, 3);
    scene.add(rim);

    // Sweep point light — orbits the badge
    const sweep = new THREE.PointLight(0xffffff, 3.5, 12);
    sweep.position.set(3, 2, 4);
    scene.add(sweep);

    /* ── Badge body — CylinderGeometry as thick disc ── */
    const badgeMat = new THREE.MeshStandardMaterial({
      color: 0x8899bb,
      metalness: 1.0,
      roughness: 0.18,
      envMapIntensity: 1.2,
    });

    // Outer ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.85, 0.18, 32, 128),
      badgeMat
    );
    ring.rotation.x = Math.PI * 0.04;

    // Main disc
    const disc = new THREE.Mesh(
      new THREE.CylinderGeometry(1.85, 1.85, 0.28, 128),
      badgeMat
    );
    disc.rotation.x = Math.PI / 2;

    // Edge bevel ring
    const bevel = new THREE.Mesh(
      new THREE.TorusGeometry(1.85, 0.07, 16, 128),
      new THREE.MeshStandardMaterial({ color: 0xaabbcc, metalness: 1, roughness: 0.1 })
    );

    const badge = new THREE.Group();
    badge.add(disc, ring, bevel);
    scene.add(badge);

    /* ── Orange accent circle ── */
    const accentRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.55, 0.04, 16, 128),
      new THREE.MeshStandardMaterial({ color: 0xe85d04, metalness: 0.8, roughness: 0.3, emissive: 0xe85d04, emissiveIntensity: 0.3 })
    );
    accentRing.rotation.x = Math.PI / 2;
    badge.add(accentRing);

    /* ── Text drawn on canvas texture ── */
    const texCanvas = document.createElement('canvas');
    texCanvas.width = 512; texCanvas.height = 512;
    const ctx = texCanvas.getContext('2d');

    const drawTexture = () => {
      ctx?.clearRect(0, 0, 512, 512);
      // Dark metal base
      const grad = ctx?.createRadialGradient(256, 256, 0, 256, 256, 256);
      grad?.addColorStop(0, '#2a3a5a');
      grad?.addColorStop(1, '#111825');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(256, 256, 250, 0, Math.PI * 2);
      ctx.fill();

      // Main initials
      ctx.fillStyle = '#c8d8f0';
      ctx.font = 'bold 148px "Arial Black", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(232,93,4,0.6)';
      ctx.shadowBlur = 20;
      ctx.fillText(text, 256, 230);

      // Sub text
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#e85d04';
      ctx.font = 'bold 28px "Arial", sans-serif';
      ctx.letterSpacing = '4px';
      ctx.fillText(sub, 256, 330);

      // Divider line
      ctx.strokeStyle = 'rgba(232,93,4,0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(120, 295); ctx.lineTo(392, 295);
      ctx.stroke();

      // Tick marks around edge
      for (let i = 0; i < 36; i++) {
        const angle = (i / 36) * Math.PI * 2;
        const r1 = 228, r2 = i % 3 === 0 ? 210 : 218;
        ctx.strokeStyle = i % 3 === 0 ? '#e85d04' : '#4466aa';
        ctx.lineWidth = i % 3 === 0 ? 2.5 : 1;
        ctx.beginPath();
        ctx.moveTo(256 + Math.cos(angle) * r1, 256 + Math.sin(angle) * r1);
        ctx.lineTo(256 + Math.cos(angle) * r2, 256 + Math.sin(angle) * r2);
        ctx.stroke();
      }
    };
    drawTexture();

    const tex = new THREE.CanvasTexture(texCanvas);
    const faceMat = new THREE.MeshStandardMaterial({
      map: tex,
      metalness: 0.85,
      roughness: 0.22,
    });

    // Front face disc
    const face = new THREE.Mesh(
      new THREE.CircleGeometry(1.82, 128),
      faceMat
    );
    face.position.z = 0.145;
    badge.add(face);

    /* ── Bolts at cardinal points ── */
    const boltMat = new THREE.MeshStandardMaterial({ color: 0x778899, metalness: 1, roughness: 0.2 });
    [0, 1, 2, 3].forEach(i => {
      const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
      const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.22, 16), boltMat);
      bolt.rotation.x = Math.PI / 2;
      bolt.position.set(Math.cos(angle) * 1.6, Math.sin(angle) * 1.6, 0.13);
      badge.add(bolt);
      // Bolt head cross
      const cross1 = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.02, 0.04), boltMat);
      cross1.position.copy(bolt.position); cross1.position.z = 0.25;
      badge.add(cross1);
      const cross2 = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.09, 0.04), boltMat);
      cross2.position.copy(bolt.position); cross2.position.z = 0.25;
      badge.add(cross2);
    });

    /* ── Mouse tilt ── */
    const mouse = { x: 0, y: 0 };
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / W - 0.5) * 2;
      mouse.y = -((e.clientY - rect.top) / H - 0.5) * 2;
    };
    el.addEventListener('mousemove', onMove);

    /* ── Animate ── */
    let frame:any;
    const clock = new THREE.Clock();
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Slow auto rotation
      badge.rotation.y = t * 0.4 + mouse.x * 0.35;
      badge.rotation.x = mouse.y * 0.2 + Math.sin(t * 0.3) * 0.06;

      // Sweep light orbit
      sweep.position.x = Math.sin(t * 0.7) * 5;
      sweep.position.y = Math.cos(t * 0.5) * 3;
      sweep.position.z = 4 + Math.sin(t * 0.9) * 1.5;
      sweep.intensity = 2.5 + Math.sin(t * 1.2) * 1.0;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('mousemove', onMove);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [size, text, sub]);

  return (
    <div
      ref={mountRef}
      style={{ width: size, height: size, cursor: 'none', userSelect: 'none' }}
    />
  );
}