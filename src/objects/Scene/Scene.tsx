/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from 'react';
import Buildings from '../Buildings';
import Terrain from '../Terrain';
import Park from '../Park';
import { Group } from 'three';
import { useControls } from 'leva';
import LandmarkRayCaster from '../LandmarkRayCaster';
import useStore from '../../store';
import ShadowAnalyser from '../ShadowAnalyser';

function Scene(): JSX.Element {
  const { terrainY } = useControls('Terrain', {
    terrainY: { value: -1.5, min: -3, max: 3, label: 'Terrain Y' }
  });
  const { debugMode: landmarkDebugMode } = useControls('Landmark', { debugMode: false });

  const buildingsRef = useRef<Group>(null);

  const editMode = useStore((state) => state.editMode);
  const selected = useStore((state) => state.selected);

  const isLandmarkModeActive = editMode === 'landmark' && selected.length === 1;
  const isShadowModeActive = editMode === 'shadow';

  return (
    <>
      <color attach="background" args={['#474E68']} />

      <Buildings ref={buildingsRef} y={terrainY} />
      <Park />
      <Terrain y={terrainY} />

      {isLandmarkModeActive && (
        <LandmarkRayCaster
          debug={landmarkDebugMode}
          selected={selected}
          buildingsRef={buildingsRef}
        />
      )}

      {isShadowModeActive && <ShadowAnalyser />}
    </>
  );
}

export default Scene;
