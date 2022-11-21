/* eslint-disable @typescript-eslint/no-unused-vars */
import { useHelper } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import React, { useEffect, useMemo, useRef } from 'react';
import {
  CameraHelper,
  DirectionalLight,
  DirectionalLightHelper,
  Object3D,
  OrthographicCamera,
  Vector3
} from 'three';
import useStore from '../../store';

const simulationTarget = new Vector3(-24, 24, -24);

function Lights(): JSX.Element {
  const directionalLightRef = useRef<DirectionalLight>(null);
  const shadowCameraRef = useRef<OrthographicCamera>(null);
  const accumulator = useRef<number>(0);

  const {
    position,
    cameraFrustumTop,
    cameraFrustumBottom,
    cameraFrustumLeft,
    cameraFrustumRight,
    shouldShowHelper,
    cameraNear,
    cameraFar
  } = useControls('Sun', {
    position: { value: [24, 24, 24] },
    cameraFrustumTop: { value: 40 },
    cameraFrustumBottom: { value: -40 },
    cameraFrustumLeft: { value: 40 },
    cameraFrustumRight: { value: -40 },
    cameraNear: { value: 10 },
    cameraFar: { value: 74 },
    shadowBias: { value: -0.001, max: 0, min: -0.1 },
    shouldShowHelper: { value: false, label: 'Debug' }
  });

  useHelper(shouldShowHelper && directionalLightRef, DirectionalLightHelper);
  useHelper(shouldShowHelper && shadowCameraRef, CameraHelper);

  const simulationState = useStore((state) => state.simulationState);
  const setSimulationState = useStore((state) => state.setSimulationState);
  const setSimulationProgress = useStore((state) => state.setSimulationProgress);
  const simulationProgress = useStore((state) => state.simulationProgress);

  useEffect(() => {
    if (simulationState === 'reset' && directionalLightRef.current != null) {
      directionalLightRef.current.position.set(...position);
      accumulator.current = 0;
    }
  }, [simulationState]);

  const target = useMemo(() => {
    const target = new Object3D();
    target.position.set(0, 0, 0);
    return target;
  }, []);

  useFrame((state, delta) => {
    if (simulationState === 'play' && directionalLightRef.current != null) {
      const step = 0.001;
      directionalLightRef.current.position.lerp(simulationTarget, step);
      accumulator.current += step;

      if (accumulator.current >= 4) {
        setSimulationProgress(100);
        setSimulationState('pause'); // call it at the end
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight
        ref={directionalLightRef}
        intensity={1}
        color="white"
        position={position}
        target={target}
        castShadow
        shadow-bias={-0.004}
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}>
        <orthographicCamera
          top={cameraFrustumTop}
          left={cameraFrustumLeft}
          bottom={cameraFrustumBottom}
          right={cameraFrustumRight}
          ref={shadowCameraRef}
          near={cameraNear}
          far={cameraFar}
          attach="shadow-camera"
        />
      </directionalLight>
    </>
  );
}

export default Lights;
