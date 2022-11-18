import React, { Suspense, useRef } from 'react';
import Buildings from '../Buildings';
import Terrain from '../Terrain';
import Park from '../Park';
import { Group } from 'three';
import { useControls } from 'leva';
import LandmarkRayCaster from '../LandmarkRayCaster';
import useStore from '../../store/store';
// import LightBar from '../LightBar';

function Scene(): JSX.Element {
  const { terrainY } = useControls('Terrain', {
    terrainY: { value: -1.5, min: -3, max: 3, label: 'Terrain Y' }
  });
  const { debugMode: landmarkDebugMode } = useControls('Landmark', { debugMode: false });

  const buildingsRef = useRef<Group>(null);

  const editMode = useStore((state) => state.editMode);
  const selected = useStore((state) => state.selected);

  const isLandmarkModeActive = editMode === 'landmark' && selected.length === 1;

  return (
    <>
      <color attach="background" args={['#474E68']} />
      <Suspense fallback={null}>
        <Buildings ref={buildingsRef} y={terrainY} />
      </Suspense>
      {/* <LightBar /> */}
      <Park />
      <Terrain y={terrainY} />

      {isLandmarkModeActive && (
        <LandmarkRayCaster
          debug={landmarkDebugMode}
          selected={selected}
          buildingsRef={buildingsRef}
        />
      )}
    </>
  );
}

export default Scene;
