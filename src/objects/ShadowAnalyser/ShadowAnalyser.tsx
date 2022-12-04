/* eslint-disable @typescript-eslint/no-unused-vars */
import { OrthographicCamera, useHelper } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { button, useControls } from 'leva';
import React, { useEffect, useRef } from 'react';
import { CameraHelper } from 'three';
import { OrthographicCamera as OrthographicCameraType, PerspectiveCamera } from 'three/src/Three';
import useStore from '../../store/store';
import { getIntensity } from './utils/intensityCalculator';
import { renderToJPG } from './utils/screenshot';

interface ShadowAnalyserProps {
  defaultCameraRef: React.RefObject<PerspectiveCamera | null>;
}

function ShadowAnalyser({ defaultCameraRef }: ShadowAnalyserProps): JSX.Element {
  const { gl, scene, camera } = useThree();
  const shadowCameraRef = useRef<OrthographicCameraType>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
  const shadowMarkerPositions = useStore((state) => state.shadowMarkers);
  const updateShadowMarkers = useStore((state) => state.updateShadowMarkers);
  const frameDeltaSum = useRef<number>(0);

  const { left, right, top, bottom, near, far, shouldShowHelper } = useControls('Shadow Analyser', {
    left: { value: 25, min: 0, max: 500 },
    right: { value: 25, min: 0, max: 500 },
    top: { value: 25, min: 0, max: 500 },
    bottom: { value: 25, min: 0, max: 500 },
    near: { value: 0, min: -100, max: 100 },
    far: { value: 4, min: 0, max: 100 },
    shouldShowHelper: { value: false, label: 'Debug' },
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

    // Ensure same height and width as the main canvas
    offscreenCanvasRef.current.width = gl.domElement.width;
    offscreenCanvasRef.current.height = gl.domElement.height;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (shadowCameraRef.current != null && shadowMarkerPositions.length > 0) {
        const computedIntensity = getIntensity(
          gl,
          offscreenCanvasRef.current,
          shadowMarkerPositions,
          scene,
          shadowCameraRef.current,
          camera as PerspectiveCamera
        );
        gl.render(scene, camera);
        updateShadowMarkers([...computedIntensity]);

        frameDeltaSum.current = 0;
      }
    }, 500);
    return () => clearInterval(interval);
  }, [shadowMarkerPositions]);

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
