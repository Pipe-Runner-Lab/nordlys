/* eslint-disable @typescript-eslint/no-unused-vars */
import { OrthographicCamera, useHelper } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { button, useControls } from 'leva';
import React, { useEffect, useRef } from 'react';
import {
  CameraHelper,
  OrthographicCamera as OrthographicCameraType,
  PerspectiveCamera,
  Vector3
} from 'three';
import useStore from '../../store/store';
import { getIntensity } from './utils/intensityCalculator';
import { renderToJPG } from './utils/screenshot';

interface LightAnalyserProps {
  y: number;
}

function ShadowAnalyser({ y }: LightAnalyserProps): JSX.Element {
  const { gl, scene, camera } = useThree();
  const shadowCameraRef = useRef<OrthographicCameraType>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
  const lightMarkers = useStore((state) => state.lightMarkers);
  const updateLightMarkers = useStore((state) => state.updateLightMarkers);
  const frameDeltaSum = useRef<number>(0);

  const { left, right, top, bottom, near, far, shouldShowHelper } = useControls('Light Analyser', {
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
      if (shadowCameraRef.current != null && lightMarkers.length > 0) {
        const computedIntensity = getIntensity(
          gl,
          offscreenCanvasRef.current,
          lightMarkers,
          scene,
          shadowCameraRef.current,
          camera as PerspectiveCamera
        );
        // gl.render(scene, camera);
        updateLightMarkers([...computedIntensity]);

        frameDeltaSum.current = 0;
      }
    }, 250);
    return () => clearInterval(interval);
  }, [lightMarkers]);

  return (
    <>
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

      {lightMarkers.map((marker) => {
        const color = marker.intensity > 0.1 ? 'green' : 'red';
        return (
          <arrowHelper
            key={marker.id}
            args={[
              new Vector3(0, 2, 0),
              new Vector3(marker.x, y, marker.z),
              50 * marker.intensity,
              color,
              0,
              0
            ]}
          />
        );
      })}
    </>
  );
}

export default ShadowAnalyser;
