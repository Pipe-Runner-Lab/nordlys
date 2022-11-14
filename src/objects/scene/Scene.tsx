import { Environment } from '@react-three/drei';
import React from 'react';
import Buildings from '../buildings';
import Terrain from '../terrain';

function Scene(): JSX.Element {
  return (
    <>
      <color attach="background" args={['#fff']} />
      {/* <fog attach="fog" args={['#fff', 30, 40]} /> */}
      <Environment preset="city" />
      <Buildings />
      <Terrain />
    </>
  );
}

export default Scene;
