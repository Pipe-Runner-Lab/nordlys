import React, { useRef } from 'react';
// import { Environment } from '@react-three/drei';
import Buildings from '../Buildings';
import Terrain from '../Terrain';
import Park from '../Park';
import { Group } from 'three';
import { useControls } from 'leva';
import LandmarkRayCaster from '../LandmarkRayCaster';
import useStore from '../../store/store';
// import LightBar from '../LightBar';
// import { Physics } from '@react-three/cannon';

function Scene(): JSX.Element {
  const { baseHeight } = useControls('Terrain', { baseHeight: { value: -1.5, min: -3, max: 3 } });
  const baseRef = useRef<Group>(null);
  const buildingsRef = useRef<Group>(null);
  const editMode = useStore((state) => state.editMode);
  const selectedBuildingIds = useStore((state) => state.selectedBuildingIds);
  const isLandmarkModeActive = editMode === 'landmark' && selectedBuildingIds.length === 1;
  const { debugMode: landmarkDebugMode } = useControls('Landmark', { debugMode: false });

  return (
    <>
      <color attach="background" args={['cyan']} />
      {/* <fog attach="fog" args={['#fff', 30, 40]} /> */}

      {/* <Environment preset="city" /> */}
      {/* <Physics> */}
      <Buildings ref={buildingsRef} baseHeight={baseHeight} />
      {/* <LightBar /> */}
      <Park />
      <Terrain height={baseHeight} ref={baseRef} />

      {isLandmarkModeActive && (
        <LandmarkRayCaster
          debug={landmarkDebugMode}
          selectedBuildingIds={selectedBuildingIds}
          buildingsRef={buildingsRef}
        />
      )}
      {/* </Physics> */}
    </>
  );
}

export default Scene;
