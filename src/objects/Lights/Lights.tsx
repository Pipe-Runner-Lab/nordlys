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
