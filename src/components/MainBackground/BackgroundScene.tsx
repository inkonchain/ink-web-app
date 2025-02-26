"use client";
import React, { Suspense, useRef, useState } from "react";
import {
  Environment,
  Lightformer,
  OrbitControls,
  StatsGl,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  BrightnessContrast,
  ColorAverage,
  EffectComposer,
  HueSaturation,
} from "@react-three/postprocessing";
import { useControls } from "leva";
import { useTheme } from "next-themes";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

import { FPSLimiter } from "./FPSLimiter";
import { Morpheus } from "./Morpheus";

interface BackgroundSceneProps {
  showDebugTools: boolean;
  limitFPS: boolean;
}

const Lights = () => {
  const { intensity: ambientLightIntensity } = useControls(
    "AmbientLight",
    {
      intensity: {
        value: 6,
        min: 0,
        max: 20,
        step: 0.1,
      },
    },
    { collapsed: true }
  );

  return (
    <>
      <ambientLight intensity={ambientLightIntensity} color={"#A1B2FF"} />
    </>
  );
};

const Lightformers: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const [target] = useState(() => new THREE.Object3D());
  // Note Unfortunately since its rendered in Environment it seems like it can't be adjusted in runtime
  // so useControl doesn't work with it
  return (
    <>
      {/* Accent */}
      <Lightformer
        form="circle"
        intensity={100}
        position={[1.8, 2, 0]}
        color={isDark ? "#000088" : "#DBA3FF"}
        rotation={[(2 * Math.PI) / 3, 0, 0]}
      />
      {/* Right Top Back */}
      <Lightformer
        intensity={2}
        form="circle"
        position={[-3, 1, -4]}
        scale={5}
        rotation={[Math.PI / 2, 0, 0]}
        color={isDark ? "#000307" : "#ABB9FF"}
      />
      {/* Bottom Highlight */}
      <Lightformer
        intensity={2}
        form="circle"
        position={[1, -1, -2]}
        scale={[2, 2, 1]}
        rotation={[-Math.PI / 4, 0, 0]}
        color={isDark ? "#446EB6" : "#A1B2FF"}
      />
      <primitive object={target} position={[0, 0.4, 0.0]} />
    </>
  );
};

const Loader = () => {
  // To be replaced, used by e2e tests to wait for threejs
  return (
    <div
      id="threejs-loader"
      className="flex flex-col h-screen justify-center items-center"
    >
      Loading...
    </div>
  );
};

export const BackgroundScene: React.FC<BackgroundSceneProps> = ({
  showDebugTools,
  limitFPS,
}) => {
  const { resolvedTheme } = useTheme();
  const { blendMethod, hue, saturation, brightness, contrast } = useControls(
    "Environment",
    {
      blendMethod: {
        value: BlendFunction.HARD_LIGHT,
        options: BlendFunction,
      },
      hue: {
        value: 0.18,
        min: 0,
        max: Math.PI,
      },
      saturation: {
        value: 0.09,
        min: 0,
        max: Math.PI,
      },
      brightness: {
        value: 0,
        min: -1,
        max: 1,
        step: 0.1,
      },
      contrast: {
        value: 0.1,
        min: -1,
        max: 1,
        step: 0.1,
      },
    },
    { collapsed: true }
  );

  const { focusDistance, showFocusPoint } = useControls(
    "DepthOfField",
    {
      focusDistance: {
        min: 0,
        max: 4,
        value: 0.82,
        step: 0.01,
      },
      focalLength: {
        min: 0,
        max: 1,
        value: 0.2,
        step: 0.01,
      },
      bokehScale: {
        min: 0,
        max: 10,
        value: 4,
        step: 0.01,
      },
      showFocusPoint: {
        value: false,
      },
    },
    { collapsed: true }
  );

  return (
    <Suspense>
      <Canvas
        className="overflow-visible!"
        camera={{ position: [0, 0, 15], far: 16, fov: 18 }}
        frameloop={limitFPS ? "never" : "always"}
        dpr={0.75}
        gl={{
          precision: "lowp",
          powerPreference: "low-power",
          antialias: false,
        }}
      >
        <Morpheus />
        <FocusPoint focusDistance={focusDistance} visible={showFocusPoint} />
        <Lights />
        <Environment key={resolvedTheme} resolution={256}>
          <Lightformers isDark={resolvedTheme === "dark"} />
        </Environment>
        <OrbitControls />
        <EffectComposer>
          <HueSaturation hue={hue} saturation={saturation} />
          <ColorAverage blendFunction={blendMethod as BlendFunction} />
          <BrightnessContrast brightness={brightness} contrast={contrast} />
          {/* <DepthOfField
            focusDistance={focusDistance}
            focalLength={focalLength}
            bokehScale={bokehScale}
          /> */}
        </EffectComposer>
        {showDebugTools ? (
          <>
            <StatsGl />
          </>
        ) : null}
        {limitFPS ? <FPSLimiter fps={30} /> : null}
      </Canvas>
    </Suspense>
  );
};

const FocusPoint = ({
  focusDistance,
  visible,
}: {
  focusDistance: number;
  visible: boolean;
}) => {
  const focusRef = useRef<THREE.Mesh | null>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (focusRef.current && visible) {
      const position = focusDistance * (camera.far - camera.near) + camera.near;
      focusRef.current.position.z = camera.position.z - position;
    }
  });

  return (
    <mesh ref={focusRef} position={[0, 0, 0]} visible={visible}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshBasicMaterial color="red" />
    </mesh>
  );
};
