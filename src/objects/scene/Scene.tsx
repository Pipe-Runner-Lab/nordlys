import React, { useRef } from 'react';
// import { Environment } from '@react-three/drei';
import Buildings from '../buildings';
import Terrain from '../terrain';
import Park from '../park';
import { Group } from 'three';
import { useControls } from 'leva';
import { Physics } from '@react-three/cannon';

function Scene(): JSX.Element {
  const { baseHeight } = useControls('Terrain', { baseHeight: { value: -1.5, min: -3, max: 3 } });
  const baseRef = useRef<Group>(null);

  return (
    <>
      <color attach="background" args={['#fff']} />
      {/* <fog attach="fog" args={['#fff', 30, 40]} /> */}

      {/* <Environment preset="city" /> */}
      <Physics>
        <Buildings baseHeight={baseHeight} />
        <Park />
        <Terrain height={baseHeight} ref={baseRef} />
      </Physics>
    </>
  );
}

export default Scene;
