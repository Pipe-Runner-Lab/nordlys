import React from 'react';

function Buildings(): JSX.Element {
  return (
    <group>
      <mesh>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color="blue" />
      </mesh>
    </group>
  );
}

export default Buildings;
