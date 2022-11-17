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

  const { position, cameraFrustum, shouldShowHelper } = useControls('Sun', {
    position: { value: [24, 24, 24] },
    cameraFrustum: { value: 40, max: 50, min: 20 },
    shouldShowHelper: { value: false }
  });

  useHelper(shouldShowHelper && directionalLightRef, DirectionalLightHelper);
  useHelper(shouldShowHelper && shadowCameraRef, CameraHelper);

  const target = useMemo(() => {
    const target = new Object3D();
    target.position.set(0, 0, 0);
    return target;
  }, []);

  // TODO: Fix it, not working
  // useEffect(() => {
  //   if (shadowCameraRef.current != null) {
  //     shadowCameraRef.current.top = cameraFrustum;
  //     shadowCameraRef.current.left = cameraFrustum;
  //     shadowCameraRef.current.bottom = -cameraFrustum;
  //     shadowCameraRef.current.right = -cameraFrustum;
  //   }
  // }, [cameraFrustum]);

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
          top={cameraFrustum}
          left={cameraFrustum}
          bottom={-cameraFrustum}
          right={-cameraFrustum}
          ref={shadowCameraRef}
          near={10}
          far={74}
          attach="shadow-camera"
        />
      </directionalLight>
    </>
  );
}

export default Lights;
