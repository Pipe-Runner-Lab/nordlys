import { ThreeEvent } from '@react-three/fiber';
import { useControls } from 'leva';
import React, { useCallback, useEffect, useRef } from 'react';
import { Group } from 'three';
import useStore from '../../store';
import EditorMark from '../EditorMark';
import { v4 as uuidv4 } from 'uuid';

interface TerrainProps {
  y: number;
}

function Terrain({ y }: TerrainProps): JSX.Element {
  const { roughness } = useControls('Terrain', { roughness: { value: 1, min: 0, max: 1 } });

  const editorMarkRef = useRef<Group>(null);

  const editMode = useStore((state) => state.editMode);
  const buildingEditorMode = useStore((state) => state.buildingEditorMode);
  const isMenuOpen = useStore((state) => state.isMenuOpen);
  const insertBuilding = useStore((state) => state.insertBuilding);
  const editorMarkType = useStore((state) => state.editorMarkType);

  const isInsertModeActive =
    isMenuOpen && buildingEditorMode === 'insert' && editMode === 'buildings';

  useEffect(() => {
    if (editorMarkRef.current != null) {
      editorMarkRef.current.visible = false;
    }
  }, [isInsertModeActive]);

  const handlePointerMove = useCallback(({ point: { x, z } }: ThreeEvent<PointerEvent>) => {
    if (editorMarkRef.current != null) {
      editorMarkRef.current.visible = true;
      editorMarkRef.current.position.setX(x);
      editorMarkRef.current.position.setZ(z);
    }
  }, []);

  const handleClick = useCallback(
    ({ point: { x, z } }: ThreeEvent<MouseEvent>) => {
      if (editorMarkRef.current != null) {
        editorMarkRef.current?.position.setX(x);
        editorMarkRef.current?.position.setZ(z);
        insertBuilding({
          x,
          y: 0, // this will be adjusted based on terrain y
          z,
          type: editorMarkType,
          id: uuidv4()
        });
      }
    },
    [editorMarkType]
  );

  const handlePointerOut = useCallback(() => {
    if (editorMarkRef.current != null) {
      editorMarkRef.current.visible = false;
    }
  }, []);

  return (
    <group>
      <mesh
        receiveShadow
        onPointerMove={isInsertModeActive ? handlePointerMove : undefined}
        onClick={isInsertModeActive ? handleClick : undefined}
        onPointerOut={isInsertModeActive ? handlePointerOut : undefined}
        position={[0, y, 0]}
        rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry args={[50, 50]} />
        <meshStandardMaterial color="#474E68" roughness={roughness} />
      </mesh>

      <EditorMark y={y} ref={editorMarkRef} />
    </group>
  );
}

export default Terrain;
