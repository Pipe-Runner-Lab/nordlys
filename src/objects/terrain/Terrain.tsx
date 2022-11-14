import React from 'react';

function Terrain(): JSX.Element {
  return (
    <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry args={[50, 50]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

export default Terrain;
