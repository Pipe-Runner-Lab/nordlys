/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from 'react';
import Buildings from '../Buildings';
import Terrain from '../Terrain';
import Park from '../Park';
import { Group } from 'three';
import { useControls } from 'leva';
import LandmarkRayCaster from '../LandmarkRayCaster';
import useStore from '../../store';
import LightAnalyser from '../LightAnalyser';
import ShadowAnalyser from '../ShadowAnalyser';
import SkyExposureAnalyser from '../SkyExposureAnalyser';

function Scene(): JSX.Element {
  const { terrainY } = useControls('Terrain', {
    terrainY: { value: -1.5, min: -3, max: 3, label: 'Terrain Y' }
  });
  const { debugMode: landmarkDebugMode } = useControls('Landmark', { debugMode: false });

  const buildingsRef = useRef<Group>(null);

  const editMode = useStore((state) => state.editMode);
  const selected = useStore((state) => state.selected);
  const isMenuOpen = useStore((state) => state.isMenuOpen);

  const isLandmarkModeActive = isMenuOpen && editMode === 'landmark' && selected.length === 1;
  const isLightModeActive = isMenuOpen && editMode === 'light';
  const isShadowModeActive = isMenuOpen && editMode === 'shadow';
  const isSkyModeActive = isMenuOpen && editMode === 'sky-exposure';

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

      {isLightModeActive && <LightAnalyser y={terrainY} />}
      {isShadowModeActive && <ShadowAnalyser />}
      {isSkyModeActive && <SkyExposureAnalyser buildingsRef={buildingsRef} y={terrainY} />}
    </>
  );
}

export default Scene;
