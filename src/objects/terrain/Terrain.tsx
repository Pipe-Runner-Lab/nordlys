import { ThreeEvent } from '@react-three/fiber';
import { useControls } from 'leva';
import React, { forwardRef, useCallback } from 'react';
import { Group } from 'three';
import useStore from '../../store';

interface TerrainProps {
  editorMarkRef: React.RefObject<Group>;
  height: number;
}

function Terrain({ editorMarkRef, height }: TerrainProps, ref: React.Ref<Group>): JSX.Element {
  const editMode = useStore((state) => state.editMode);
  const addBuilding = useStore((state) => state.addBuilding);
  const editorMarkType = useStore((state) => state.editorMarkType);

  const { roughness } = useControls('Terrain', { roughness: { value: 1, min: 0, max: 1 } });

  const handleRayCast = useCallback((event: ThreeEvent<PointerEvent>) => {
    const {
      point: { x, z }
    } = event;
    editorMarkRef.current?.position.setX(x);
    editorMarkRef.current?.position.setZ(z);
  }, []);

  const handleClick = useCallback((event: ThreeEvent<MouseEvent>) => {
    const {
      point: { x, z }
    } = event;
    editorMarkRef.current?.position.setX(x);
    editorMarkRef.current?.position.setZ(z);
    addBuilding({ x, z, type: editorMarkType, id: `${x}-${z}-${editorMarkType}` });
  }, []);

  // TODO: Need a ref based re-render
  const isEditing = editMode === 'buildings';
  //  && editorMarkRef.current != null;

  return (
    <group ref={ref}>
      <mesh
        receiveShadow
        onPointerMove={isEditing ? handleRayCast : undefined}
        onClick={isEditing ? handleClick : undefined}
        position={[0, height, 0]}
        rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry args={[50, 50]} />
        <meshStandardMaterial color="#474E68" roughness={roughness} />
      </mesh>
    </group>
  );
}

export default forwardRef(Terrain);
