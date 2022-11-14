import { OrbitControls } from '@react-three/drei';
import React from 'react';

function Controls(): JSX.Element {
  return <OrbitControls minPolarAngle={-Math.PI / 2} maxPolarAngle={Math.PI / 2.1} />;
}

export default Controls;
