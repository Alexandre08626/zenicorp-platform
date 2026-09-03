'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree, extend, type ThreeElements } from '@react-three/fiber';
import { AdaptiveDpr, Edges, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';

/* ══════════════════════════════════════════════════════════════
   TEXTURE DE HALO
   Un spriteMaterial sans texture rend un carré opaque : il faut
   fournir un dégradé radial, sinon les nœuds apparaissent comme
   des rectangles de couleur.
   ══════════════════════════════════════════════════════════════ */

function useGlowTexture() {
  return useMemo(() => {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.18, 'rgba(255,255,255,0.55)');
    g.addColorStop(0.45, 'rgba(255,255,255,0.14)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

/* ══════════════════════════════════════════════════════════════
   SHADER — Sol « plan d'architecte »
   Grille antialiasée (fwidth), fondu radial, balayage discret.
   ══════════════════════════════════════════════════════════════ */

const BlueprintMaterial = /* @__PURE__ */ (() => {
  class Mat extends THREE.ShaderMaterial {
    constructor() {
      super({
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uGrid: { value: new THREE.Color('#7C8BA8') },
          uGold: { value: new THREE.Color('#D4AF37') },
        },
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          precision highp float;
          varying vec2 vUv;
          uniform float uTime;
          uniform vec3 uGrid;
          uniform vec3 uGold;

          float gridLine(vec2 uv, float density, float thickness) {
            vec2 g = fract(uv * density);
            vec2 d = min(g, 1.0 - g);
            vec2 w = fwidth(uv * density) * thickness;
            vec2 l = 1.0 - smoothstep(vec2(0.0), w, d);
            return clamp(max(l.x, l.y), 0.0, 1.0);
          }

          void main() {
            vec2 c = vUv - 0.5;
            float dist = length(c);

            // La grille ne vit que dans une couronne : ni bord dur, ni sol infini criard
            float fade = smoothstep(0.5, 0.30, dist) * smoothstep(0.02, 0.10, dist);

            float fine  = gridLine(vUv, 120.0, 0.7) * 0.16;
            float major = gridLine(vUv, 24.0, 0.9) * 0.5;
            float grid = max(fine, major);

            // Balayage lent, très discret : suggère la matérialisation
            float sweep = smoothstep(0.20, 0.0, abs(vUv.y - fract(uTime * 0.045)));

            vec3 col = uGrid * grid;
            col += uGold * grid * sweep * 0.55;

            float alpha = grid * fade * 0.85;
            if (alpha < 0.002) discard;
            gl_FragColor = vec4(col, alpha);
          }
        `,
      });
    }
  }
  return Mat;
})();

extend({ BlueprintMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    blueprintMaterial: ThreeElements['shaderMaterial'];
  }
}

function BlueprintFloor() {
  const ref = useRef<THREE.ShaderMaterial>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.uniforms.uTime.value += dt;
  });
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
      <planeGeometry args={[40, 40]} />
      <blueprintMaterial ref={ref} attach="material" />
    </mesh>
  );
}

/* ══════════════════════════════════════════════════════════════
   STRUCTURE — composition architecturale asymétrique.
   Les volumes bas sont bâtis (pleins) ; les volumes hauts ne sont
   encore que des arêtes : le plan devient matière du bas vers le haut.
   ══════════════════════════════════════════════════════════════ */

type Block = { pos: [number, number, number]; size: [number, number, number]; solid: boolean };

const BLOCKS: Block[] = [
  // Dalle / plateforme
  { pos: [0, -1.28, 0], size: [3.5, 0.1, 2.7], solid: true },
  // Socle bâti
  { pos: [-0.6, -0.92, 0.2], size: [1.7, 0.62, 1.8], solid: true },
  { pos: [0.85, -1.0, -0.3], size: [1.2, 0.44, 1.3], solid: true },
  // Corps principal
  { pos: [-0.5, -0.2, 0.1], size: [1.25, 0.82, 1.4], solid: true },
  // Porte-à-faux
  { pos: [0.6, 0.02, 0.35], size: [1.9, 0.26, 0.9], solid: true },
  // Volumes en cours : arêtes seules
  { pos: [-0.4, 0.55, -0.05], size: [0.9, 0.68, 1.0], solid: false },
  { pos: [0.75, 0.68, -0.35], size: [0.58, 1.1, 0.62], solid: false },
  { pos: [-0.2, 1.2, 0.25], size: [0.5, 0.5, 0.5], solid: false },
];

function Structure() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = -0.5 + Math.sin(t * 0.085) * 0.13;
    group.current.position.y = Math.sin(t * 0.5) * 0.03;
  });

  return (
    <group ref={group} scale={0.72}>
      {BLOCKS.map((b, i) => (
        <mesh key={i} position={b.pos}>
          <boxGeometry args={b.size} />
          {b.solid ? (
            <meshStandardMaterial color="#0C1118" metalness={0.7} roughness={0.45} />
          ) : (
            // Volume non bâti : invisible, seules les arêtes sont dessinées
            <meshBasicMaterial visible={false} />
          )}
          <Edges threshold={15} scale={1.0015}>
            <lineBasicMaterial
              color={b.solid ? '#D4AF37' : '#8C9BB5'}
              transparent
              opacity={b.solid ? 0.5 : 0.26}
            />
          </Edges>
        </mesh>
      ))}
    </group>
  );
}

/* ══════════════════════════════════════════════════════════════
   NŒUD DE DIVISION — satellite relié au cœur de la plateforme
   ══════════════════════════════════════════════════════════════ */

function DivisionNode({
  color,
  radius,
  height,
  speed,
  phase,
  glow,
}: {
  color: string;
  radius: number;
  height: number;
  speed: number;
  phase: number;
  glow: THREE.Texture | null;
}) {
  const node = useRef<THREE.Group>(null);
  const link = useRef<THREE.Mesh>(null);
  const target = useMemo(() => new THREE.Vector3(), []);
  const origin = useMemo(() => new THREE.Vector3(0, -0.15, 0), []);
  const up = useMemo(() => new THREE.Vector3(0, 1, 0), []);
  const dir = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + phase;
    target.set(Math.cos(t) * radius, height + Math.sin(t * 1.3) * 0.2, Math.sin(t) * radius);
    if (node.current) node.current.position.copy(target);

    if (link.current) {
      dir.subVectors(target, origin);
      const len = dir.length();
      link.current.position.copy(origin).addScaledVector(dir, 0.5);
      link.current.scale.set(1, len, 1);
      link.current.quaternion.setFromUnitVectors(up, dir.normalize());
    }
  });

  return (
    <group>
      {/* Liaison lumineuse cœur → nœud */}
      <mesh ref={link}>
        <cylinderGeometry args={[0.0045, 0.0045, 1, 5, 1, true]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.24}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <group ref={node}>
        <mesh>
          <sphereGeometry args={[0.062, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
        {glow && (
          <sprite scale={[1.15, 1.15, 1.15]}>
            <spriteMaterial
              map={glow}
              color={color}
              transparent
              opacity={0.62}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </sprite>
        )}
        <pointLight intensity={1.6} distance={4.2} color={color} />
      </group>
    </group>
  );
}

/* ══════════════════════════════════════════════════════════════
   CŒUR — la plateforme elle-même
   ══════════════════════════════════════════════════════════════ */

function Core({ glow }: { glow: THREE.Texture | null }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.28;
    ref.current.rotation.x = t * 0.11;
  });

  return (
    <group position={[0, -0.15, 0]}>
      <mesh ref={ref}>
        <octahedronGeometry args={[0.2, 0]} />
        <meshBasicMaterial color="#F0D468" />
      </mesh>
      {glow && (
        <sprite scale={[2.6, 2.6, 2.6]}>
          <spriteMaterial
            map={glow}
            color="#D4AF37"
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </sprite>
      )}
      <pointLight intensity={3.2} distance={7} color="#D4AF37" />
    </group>
  );
}

/* ══════════════════════════════════════════════════════════════
   POUSSIÈRE — profondeur atmosphérique
   ══════════════════════════════════════════════════════════════ */

function Dust({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 16;
      a[i * 3 + 1] = Math.random() * 7 - 1.6;
      a[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return a;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.012;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.14) * 0.22;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#B9C6DA"
        transparent
        opacity={0.42}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ══════════════════════════════════════════════════════════════
   CAMÉRA — parallaxe souris + recul au scroll
   ══════════════════════════════════════════════════════════════ */

function Rig({ interactive, compact }: { interactive: boolean; compact: boolean }) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const look = useMemo(() => new THREE.Vector3(compact ? 0.1 : 1.7, -0.1, compact ? -1 : 0), [compact]);

  useFrame(() => {
    const s =
      typeof window === 'undefined'
        ? 0
        : Math.min(1, Math.max(0, window.scrollY / (window.innerHeight || 1)));

    const tx = (compact ? 0.1 : 0.8) + mouse.current.x * (compact ? 0.3 : 0.85);
    const ty = (compact ? 0.7 : 0.95) + mouse.current.y * 0.5 + s * 1.6;
    const tz = (compact ? 8.2 : 8.6) + s * 2.4;

    camera.position.x += (tx - camera.position.x) * 0.042;
    camera.position.y += (ty - camera.position.y) * 0.042;
    camera.position.z += (tz - camera.position.z) * 0.042;
    camera.lookAt(look);
  });

  useMemo(() => {
    if (!interactive || typeof window === 'undefined') return;
    const handler = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', handler, { passive: true });
    return () => window.removeEventListener('pointermove', handler);
  }, [interactive]);

  return null;
}

/* ══════════════════════════════════════════════════════════════ */

export type HeroSceneProps = {
  colors: string[];
  interactive?: boolean;
  quality?: number;
};

function SceneContents({ colors, interactive, quality }: Required<HeroSceneProps>) {
  const glow = useGlowTexture();
  const compact = quality < 1;
  const dustCount = compact ? 140 : 420;

  const orbits = [
    { radius: 2.3, height: 0.6, speed: 0.22, phase: 0 },
    { radius: 2.75, height: -0.45, speed: 0.17, phase: Math.PI * 0.55 },
    { radius: 2.05, height: 1.15, speed: 0.26, phase: Math.PI },
    { radius: 3.0, height: 0.1, speed: 0.14, phase: Math.PI * 1.5 },
  ];

  return (
    <>
      <fog attach="fog" args={['#05070B', 8, 21]} />
      <ambientLight intensity={0.28} />
      <directionalLight position={[5, 6.5, 4]} intensity={0.85} color="#D9E4F5" />
      <directionalLight position={[-6, 2, -4]} intensity={0.35} color="#0E95D9" />

      <BlueprintFloor />

      {/* L'ensemble est décalé à droite pour laisser la colonne de texte lisible.
          Sur petit écran, on recentre et on réduit : sinon l'objet est rogné par
          le bord et vient concurrencer le texte. */}
      <group
        position={compact ? [0.15, 0.55, -2.1] : [2.45, 0.3, -0.5]}
        scale={compact ? 0.6 : 0.8}
      >
        <Structure />
        <Core glow={glow} />
        {orbits.map((o, i) => (
          <DivisionNode key={i} color={colors[i] ?? '#D4AF37'} glow={glow} {...o} />
        ))}
      </group>

      <Dust count={dustCount} />
      <Rig interactive={interactive} compact={compact} />
    </>
  );
}

export default function HeroScene({
  colors,
  interactive = true,
  quality = 1,
}: HeroSceneProps) {
  return (
    <Canvas
      dpr={quality < 1 ? [1, 1.3] : [1, 1.8]}
      gl={{ antialias: quality >= 1, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0.7, 0.9, 8.6], fov: 40, near: 0.1, far: 70 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.1;
      }}
    >
      <PerformanceMonitor />
      <AdaptiveDpr pixelated={false} />
      <SceneContents colors={colors} interactive={interactive} quality={quality} />
    </Canvas>
  );
}
