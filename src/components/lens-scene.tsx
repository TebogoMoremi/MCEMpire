"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function LensScene({ onFailure }: { onFailure: () => void }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" }); }
    catch { onFailure(); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, .1, 30);
    camera.position.set(0, 0, 6.5);
    const lens = new THREE.Group();
    scene.add(lens, new THREE.HemisphereLight(0xe4edff, 0x242018, 3));
    const key = new THREE.DirectionalLight(0xffffff, 5); key.position.set(-3, 4, 4); scene.add(key);
    const rim = new THREE.PointLight(0xe8c76a, 45); rim.position.set(3, 1, 3); scene.add(rim);
    const metal = new THREE.MeshStandardMaterial({ color: 0x323337, metalness: .8, roughness: .28 });
    const gold = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: .75, roughness: .3 });
    const glass = new THREE.MeshPhysicalMaterial({ color: 0x163d48, metalness: .4, roughness: .08, clearcoat: 1, transparent: true, opacity: .72 });
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(1.05, .88, 1.15, 48, 1, true), metal);
    barrel.rotation.x = Math.PI / 2; lens.add(barrel);
    for (let i = 0; i < 12; i++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.02 - i * .008, i === 0 ? .035 : .018, 8, 64), i === 0 ? gold : metal);
      ring.position.z = .58 - i * .095; lens.add(ring);
    }
    const front = new THREE.Mesh(new THREE.CircleGeometry(.94, 64), glass); front.position.z = .55; lens.add(front);
    const inner = new THREE.Mesh(new THREE.CircleGeometry(.35, 32), new THREE.MeshBasicMaterial({ color: 0x030607 })); inner.position.z = .56; lens.add(inner);
    for (let i = 0; i < 8; i++) {
      const blade = new THREE.Mesh(new THREE.CircleGeometry(.34, 3), new THREE.MeshStandardMaterial({ color: 0x34434a, metalness: .7, roughness: .3 }));
      const angle = i * Math.PI / 4; blade.position.set(Math.cos(angle) * .48, Math.sin(angle) * .48, .57); blade.rotation.z = angle + .5; lens.add(blade);
    }
    element.appendChild(renderer.domElement);
    const resize = () => { const { width, height } = element.getBoundingClientRect(); if (!width || !height) return; renderer.setSize(width, height); camera.aspect = width / height; camera.updateProjectionMatrix(); };
    const observer = new ResizeObserver(resize); observer.observe(element); resize();
    let x = 0, y = 0, frame = 0, last = 0;
    const pointer = (event: PointerEvent) => { const rect = element.getBoundingClientRect(); x = (event.clientX - rect.left) / rect.width - .5; y = (event.clientY - rect.top) / rect.height - .5; };
    const reset = () => { x = 0; y = 0; };
    const lost = (event: Event) => { event.preventDefault(); onFailure(); };
    element.addEventListener("pointermove", pointer); element.addEventListener("pointerleave", reset);
    renderer.domElement.addEventListener("webglcontextlost", lost);
    const animate = (time: number) => {
      frame = requestAnimationFrame(animate);
      if (time - last < 33) return; last = time;
      lens.rotation.y += ((-.32 + x * .3 + Math.sin(time * .0003) * .08) - lens.rotation.y) * .06;
      lens.rotation.x += ((.15 + y * .2) - lens.rotation.x) * .06;
      lens.position.y = Math.sin(time * .0007) * .06;
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); element.removeEventListener("pointermove", pointer); element.removeEventListener("pointerleave", reset);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      scene.traverse((object) => { if (object instanceof THREE.Mesh) { object.geometry.dispose(); const materials = Array.isArray(object.material) ? object.material : [object.material]; materials.forEach((material) => material.dispose()); } });
      renderer.dispose(); renderer.domElement.remove();
    };
  }, [onFailure]);
  return <div className="lens-canvas" ref={host} />;
}
