import React, { forwardRef } from 'react';
import { Group } from 'three';

function EditorMark(props: {}, ref?: React.Ref<Group>): JSX.Element {
  return (
    <group ref={ref} position={[0, 2, 0]}>
      <mesh castShadow>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#393E46" />
      </mesh>
    </group>
  );
}

export default forwardRef(EditorMark);
