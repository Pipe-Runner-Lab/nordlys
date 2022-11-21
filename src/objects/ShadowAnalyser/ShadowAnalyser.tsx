import { OrthographicCamera, useHelper } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { button, useControls } from 'leva';
import React, { useEffect, useState } from 'react';
import { CameraHelper } from 'three';
import { OrthographicCamera as OrthographicCameraType } from 'three/src/Three';
import { renderToJPG } from './utils/screenshot';

function ShadowAnalyser(): JSX.Element {
  const { gl, scene } = useThree();
  const shadowCameraRef = React.useRef<OrthographicCameraType>(null);
  const [exportIt, setExportIt] = useState(false);

  const { left, right, top, bottom, near, far, shouldShowHelper } = useControls('Shadow Analyser', {
    left: { value: 25, min: 0, max: 500 },
    right: { value: 25, min: 0, max: 500 },
    top: { value: 25, min: 0, max: 500 },
    bottom: { value: 25, min: 0, max: 500 },
    near: { value: 0, min: -100, max: 100 },
    far: { value: 4, min: 0, max: 100 },
    shouldShowHelper: { value: true, label: 'Debug' },
    screenshot: button((get) => {
      if (shadowCameraRef.current != null) {
        renderToJPG(gl, scene, shadowCameraRef.current);
      }
    })
  });

  useHelper(shouldShowHelper && shadowCameraRef, CameraHelper);

  useEffect(() => {
    if (shadowCameraRef.current != null) {
      shadowCameraRef.current.lookAt(0, 0, 0);
    }
  }, []);

  useFrame(({ scene }, delta) => {
    if (shadowCameraRef.current != null) {
      if (exportIt) {
        renderToJPG(gl, scene, shadowCameraRef.current);
        setExportIt(false);
      }
    }
  });

  return (
    <group>
      <OrthographicCamera
        position={[0, 0.1, 0]}
        near={near}
        far={far}
        left={-left}
        right={right}
        top={top}
        bottom={-bottom}
        zoom={1}
        ref={shadowCameraRef}
      />
    </group>
  );
}

export default ShadowAnalyser;
