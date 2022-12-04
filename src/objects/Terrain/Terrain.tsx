import { ThreeEvent } from '@react-three/fiber';
import { useControls } from 'leva';
import React, { useCallback, useEffect, useRef } from 'react';
import { ArrowHelper, Group, Vector3 } from 'three';
import useStore from '../../store';
import EditorMark from '../EditorMark';
import { v4 as uuidv4 } from 'uuid';

interface TerrainProps {
  y: number;
}

function Terrain({ y }: TerrainProps): JSX.Element {
  const { roughness } = useControls('Terrain', { roughness: { value: 1, min: 0, max: 1 } });

  const editorMarkRef = useRef<Group>(null);
  const helperRef = useRef<ArrowHelper>(null);

  const editMode = useStore((state) => state.editMode);
  const buildingEditorMode = useStore((state) => state.buildingEditorMode);
  const lightMarkerMode = useStore((state) => state.lightMarkerMode);
  const isMenuOpen = useStore((state) => state.isMenuOpen);
  const insertBuilding = useStore((state) => state.insertBuilding);
  const editorMarkType = useStore((state) => state.editorMarkType);
  const addShadowMarkerPosition = useStore((state) => state.addShadowMarkerPosition);

  const isInsertModeActive =
    isMenuOpen && buildingEditorMode === 'insert' && editMode === 'buildings';
  const isShadowModeActive = isMenuOpen && lightMarkerMode === 'insert' && editMode === 'light';

  useEffect(() => {
    if (editorMarkRef.current != null) {
      editorMarkRef.current.visible = false;
    }
  }, [isInsertModeActive]);

  useEffect(() => {
    if (helperRef.current != null) {
      helperRef.current.visible = false;
    }
  }, [isShadowModeActive]);

  const handlePointerMove = useCallback(
    ({ point: { x, z } }: ThreeEvent<PointerEvent>) => {
      if (editorMarkRef.current != null && isInsertModeActive) {
        editorMarkRef.current.visible = true;
        editorMarkRef.current.position.setX(x);
        editorMarkRef.current.position.setZ(z);
      }

      if (helperRef.current != null && isShadowModeActive) {
        helperRef.current.visible = true;
        helperRef.current.position.setX(x);
        helperRef.current.position.setZ(z);
      }
    },
    [isShadowModeActive, isInsertModeActive]
  );

  const handleClick = useCallback(
    ({ point: { x, z } }: ThreeEvent<MouseEvent>) => {
      if (editorMarkRef.current != null && isInsertModeActive) {
        editorMarkRef.current?.position.setX(x);
        editorMarkRef.current?.position.setZ(z);
        insertBuilding({
          x,
          y: 0, // this will be adjusted based on terrain y
          z,
          type: editorMarkType,
          id: uuidv4()
        });

        return;
      }

      if (isShadowModeActive) {
        addShadowMarkerPosition({ x, z, id: uuidv4(), intensity: 0 });
      }
    },
    [editorMarkType, isShadowModeActive, isInsertModeActive]
  );

  const handlePointerOut = useCallback(() => {
    if (editorMarkRef.current != null && isInsertModeActive) {
      editorMarkRef.current.visible = false;
    }

    if (helperRef.current != null && isShadowModeActive) {
      helperRef.current.visible = false;
    }
  }, [isShadowModeActive, isInsertModeActive]);

  return (
    <group>
      <mesh
        receiveShadow
        onPointerMove={handlePointerMove}
        onClick={handleClick}
        onPointerOut={handlePointerOut}
        position={[0, y, 0]}
        rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry args={[50, 50]} />
        <meshStandardMaterial color="#474E68" roughness={roughness} />
      </mesh>

      <EditorMark y={y} ref={editorMarkRef} />

      <arrowHelper
        visible={false}
        ref={helperRef}
        args={[new Vector3(0, 2, 0), new Vector3(0, y, 0), 100, 0xffff00, 0.5, 0.5]}
      />
    </group>
  );
}

export default Terrain;
