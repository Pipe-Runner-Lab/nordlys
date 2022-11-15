import { useHelper } from '@react-three/drei';
import { useControls } from 'leva';
import React, { useMemo, useRef } from 'react';
import {
  CameraHelper,
  DirectionalLight,
  DirectionalLightHelper,
  Object3D,
  OrthographicCamera
} from 'three';

function Lights(): JSX.Element {
  const directionalLightRef = useRef<DirectionalLight>(null);
  const shadowCameraRef = useRef<OrthographicCamera>(null);

  const { position, cameraFrustumRef, shouldShowHelper } = useControls('Sun', {
    position: { value: [30, 30, 30] },
    cameraFrustumRef: { value: 40, max: 50, min: 20 },
    shouldShowHelper: { value: false }
  });

  useHelper(shouldShowHelper && directionalLightRef, DirectionalLightHelper);
  useHelper(shouldShowHelper && shadowCameraRef, CameraHelper);

  const target = useMemo(() => {
    const target = new Object3D();
    target.position.set(0, 0, 0);
    return target;
  }, []);

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
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}>
        <orthographicCamera
          top={cameraFrustumRef}
          left={cameraFrustumRef}
          bottom={-cameraFrustumRef}
          right={-cameraFrustumRef}
          ref={shadowCameraRef}
          near={10}
          far={100}
          attach="shadow-camera"
        />
      </directionalLight>
    </>
  );
}

export default Lights;
