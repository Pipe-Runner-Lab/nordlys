import React from 'react';

interface BuildingBProps {
  x?: number;
  z?: number;
}

function BuildingB({ x = 0, z = 0 }: BuildingBProps): JSX.Element {
  const height = 12;

  return (
    <mesh position={[x, height / 2, z]} castShadow receiveShadow>
      <boxBufferGeometry args={[3, height, 3]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}

export default BuildingB;
