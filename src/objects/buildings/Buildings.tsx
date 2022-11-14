import React from 'react';

function Buildings(): JSX.Element {
  const height = 2;

  return (
    <group>
      <mesh position={[1, height, 1]}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color="blue" />
      </mesh>
      <mesh position={[2, height, 2]}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color="green" />
      </mesh>
    </group>
  );
}

export default Buildings;
