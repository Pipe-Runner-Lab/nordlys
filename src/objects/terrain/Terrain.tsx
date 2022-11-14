import { useControls } from 'leva';
import React from 'react';
import { Group } from 'three';

function Terrain({ editorMarkRef }: { editorMarkRef: React.RefObject<Group> }): JSX.Element {
  const { roughness } = useControls({ roughness: { value: 1, min: 0, max: 1 } });

  return (
    <mesh
      receiveShadow
      onPointerMove={(e) => {
        if (editorMarkRef.current !== null) {
          editorMarkRef.current.position.setX(e.point.x);
          editorMarkRef.current.position.setZ(e.point.z);
        }
      }}
      position={[0, -1.5, 0]}
      rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry args={[50, 50]} />
      <meshStandardMaterial color="#fff" roughness={roughness} />
    </mesh>
  );
}

export default Terrain;
