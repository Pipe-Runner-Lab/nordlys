import React from 'react';

interface BuildingAProps {
  x?: number;
  z?: number;
}

function BuildingA({ x = 0, z = 0 }: BuildingAProps): JSX.Element {
  const height = 8;

  return (
    <mesh position={[x, height / 2, z]} castShadow receiveShadow>
      <boxBufferGeometry args={[2, height, 2]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

export default BuildingA;
