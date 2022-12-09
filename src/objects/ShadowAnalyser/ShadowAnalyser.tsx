import React, { useEffect, useRef } from 'react';
import useStore, { ShadowHeatMap } from '../../store/store';
import {
  CameraHelper,
  OrthographicCamera as OrthographicCameraType,
  PerspectiveCamera
} from 'three';
import { useThree } from '@react-three/fiber';
import { button, useControls } from 'leva';
import { renderToJPG } from '../LightAnalyser/utils/screenshot';
import { OrthographicCamera, useHelper } from '@react-three/drei';
import { getHeatMap, numberOfPoints, R } from './utils/heatmapCalculator';
import { parkPositions, parkSize } from '../../constants/positions';

const subDivisionW = Number((parkSize.w / R).toFixed(2));
const subDivisionH = Number((parkSize.h / R).toFixed(2));
const xAxisAdjustment = parkPositions.x - parkSize.w / 2 + 0.5;
const zAxisAdjustment = parkPositions.z - parkSize.h / 2 + 0.5;

function ShadowAnalyser(): JSX.Element {
  const { gl, scene, camera } = useThree();
  const shadowCameraRef = useRef<OrthographicCameraType>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
  const simulationState = useStore((state) => state.simulationState);
  const simulationProgress = useStore((state) => state.simulationProgress);
  const setSimulationState = useStore((state) => state.setSimulationState);
  const shadowData = useRef<number[] | null>(null);
  const setShadowHeatMap = useStore((state) => state.setShadowHeatMap);

  const { left, right, top, bottom, near, far, shouldShowHelper } = useControls('Shadow Analyser', {
    left: { value: parkPositions.x - parkSize.w / 2, min: 0, max: 500 },
    right: { value: parkPositions.x + parkSize.w / 2, min: 0, max: 500 },
    top: { value: parkPositions.z - parkSize.h / 2, min: 0, max: 500 },
    bottom: { value: parkPositions.z + parkSize.h / 2, min: 0, max: 500 },
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

    // Setup calculation matrix (reset)
    shadowData.current = new Array(numberOfPoints).fill(0);
  }, []);

  useEffect(() => {
    if (shadowCameraRef.current != null && shadowData.current != null) {
      if (simulationState === 'play') {
        if (simulationProgress < 100) {
          getHeatMap(
            gl,
            offscreenCanvasRef.current,
            scene,
            shadowCameraRef.current,
            camera as PerspectiveCamera,
            shadowData.current
          );
          // gl.render(scene, camera);
        } else {
          // Set heatmap
          if (shadowData.current != null) {
            const heatMap: ShadowHeatMap = [];
            const maxValue = Math.max(...shadowData.current);
            shadowData.current.forEach((value, idx) => {
              heatMap.push({
                x: (idx % R) * subDivisionW + xAxisAdjustment,
                z: Math.floor(idx / R) * subDivisionH + zAxisAdjustment,
                value: value / maxValue
              });
            });
            setShadowHeatMap(heatMap);
          }

          // Reset simulation and shadow data
          setSimulationState('reset');
          shadowData.current = new Array(numberOfPoints).fill(0);
        }
      }
    }
  }, [simulationState, simulationProgress]);

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
    </>
  );
}

export default ShadowAnalyser;
