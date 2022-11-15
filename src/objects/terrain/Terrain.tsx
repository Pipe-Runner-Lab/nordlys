import { ThreeEvent } from '@react-three/fiber';
import { useControls } from 'leva';
import React, { forwardRef, useCallback, useEffect, useRef } from 'react';
import { Group } from 'three';
import useStore from '../../store';
import EditorMark from '../editor-mark';

interface TerrainProps {
  height: number;
}

function Terrain({ height }: TerrainProps, ref: React.Ref<Group>): JSX.Element {
  const editMode = useStore((state) => state.editMode);
  const buildingEditorMode = useStore((state) => state.buildingEditorMode);
  const isMenuOpen = useStore((state) => state.isMenuOpen);
  const addBuilding = useStore((state) => state.addBuilding);
  const editorMarkType = useStore((state) => state.editorMarkType);

  const editorMarkRef = useRef<Group>(null);

  const { roughness } = useControls('Terrain', { roughness: { value: 1, min: 0, max: 1 } });

  // TODO: Need a ref based re-render
  const isInsertModeActive =
    isMenuOpen && buildingEditorMode === 'insert' && editMode === 'buildings';
  //  && editorMarkRef.current != null;

  useEffect(() => {
    if (editorMarkRef.current != null) {
      editorMarkRef.current.visible = false;
    }
  }, [isInsertModeActive]);

  const handlePointerMove = useCallback((event: ThreeEvent<PointerEvent>) => {
    if (editorMarkRef.current != null) {
      editorMarkRef.current.visible = true;
    }

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

  const handlePointerOut = useCallback((event: ThreeEvent<MouseEvent>) => {
    if (editorMarkRef.current != null) {
      editorMarkRef.current.visible = false;
    }
  }, []);

  return (
    <>
      <group ref={ref}>
        <mesh
          receiveShadow
          onPointerMove={isInsertModeActive ? handlePointerMove : undefined}
          onClick={isInsertModeActive ? handleClick : undefined}
          onPointerOut={isInsertModeActive ? handlePointerOut : undefined}
          position={[0, height, 0]}
          rotation={[-Math.PI / 2, 0, 0]}>
          <planeBufferGeometry args={[50, 50]} />
          <meshStandardMaterial color="#474E68" roughness={roughness} />
        </mesh>
      </group>

      <EditorMark baseHeight={height} ref={editorMarkRef} />
    </>
  );
}

export default forwardRef(Terrain);
