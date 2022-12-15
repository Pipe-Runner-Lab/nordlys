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
  const lightHelperRef = useRef<ArrowHelper>(null);
  const skyHelperRef = useRef<ArrowHelper>(null);

  const cacheBuildingDataMap = useStore((state) => state.cacheBuildingDataMap);
  const setCacheBuildingDataMap = useStore((state) => state.setCacheBuildingDataMap);
  const editMode = useStore((state) => state.editMode);
  const buildingEditorMode = useStore((state) => state.buildingEditorMode);
  const lightMarkerMode = useStore((state) => state.lightMarkerMode);
  const isMenuOpen = useStore((state) => state.isMenuOpen);
  const insertBuilding = useStore((state) => state.insertBuilding);
  const editorMark = useStore((state) => state.editorMark);
  const setEditorMark = useStore((state) => state.setEditorMark);
  const addLightMarker = useStore((state) => state.addLightMarker);
  const skyMarkerMode = useStore((state) => state.skyMarkerMode);
  const addSkyMarker = useStore((state) => state.addSkyMarker);
  const setBuildingEditorMode = useStore((state) => state.setBuildingEditorMode);
  const clearSelected = useStore((state) => state.clearSelected);
  const buildingDataMap = useStore((state) => state.buildingDataMap);
  const removeBuilding = useStore((state) => state.removeBuilding);
  const restoreBuildings = useStore((state) => state.restoreBuildings);

  const isInsertModeActive =
    isMenuOpen && buildingEditorMode === 'insert' && editMode === 'buildings';
  const isMoveModeActive = isMenuOpen && buildingEditorMode === 'move' && editMode === 'buildings';
  const isLightModeActive = isMenuOpen && lightMarkerMode === 'insert' && editMode === 'light';
  const isSkyModeActive = isMenuOpen && skyMarkerMode === 'insert' && editMode === 'sky-exposure';
  const selected = useStore((state) => state.selected);

  const isMovable = selected != null && selected.length === 1;

  useEffect(() => {
    const handleRotation = (event: KeyboardEvent): void => {
      const code = event.code;

      if (code === 'KeyQ' && (isInsertModeActive || isMoveModeActive)) {
        setEditorMark({
          ...editorMark,
          rotationY: (editorMark.rotationY ?? 0) + Math.PI / 2
        });
      }

      if (code === 'KeyE' && (isInsertModeActive || isMoveModeActive)) {
        setEditorMark({
          ...editorMark,
          rotationY: (editorMark.rotationY ?? 0) - Math.PI / 2
        });
      }

      if (code === 'KeyM' && isMovable) {
        setCacheBuildingDataMap(buildingDataMap);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const building = buildingDataMap.find((building) => building.id === selected[0]!);
        if (building != null) {
          setEditorMark({
            type: building?.type,
            rotationY: building?.rotationY
          });
          removeBuilding(building.id);
          setBuildingEditorMode('move');
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        editorMarkRef.current!.visible = true;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        editorMarkRef.current!.position.x = building?.x ?? 0;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        editorMarkRef.current!.position.z = building?.z ?? 0;
      }

      if (code === 'Escape' && isMoveModeActive) {
        setBuildingEditorMode(undefined);
        clearSelected();

        if (cacheBuildingDataMap != null) {
          restoreBuildings();
          // setCacheBuildingDataMap(null);
        }
      }
    };

    document.addEventListener('keyup', handleRotation, false);

    return () => {
      document.removeEventListener('keyup', handleRotation, false);
    };
  }, [isInsertModeActive, isMoveModeActive, editorMark, isMovable, selected, cacheBuildingDataMap]);

  useEffect(() => {
    if (editorMarkRef.current != null) {
      editorMarkRef.current.visible = false;

      if (isMoveModeActive) {
        editorMarkRef.current.visible = true;
      }
    }
  }, [isInsertModeActive, isMoveModeActive]);

  useEffect(() => {
    if (lightHelperRef.current != null) {
      lightHelperRef.current.visible = false;
    }
  }, [isLightModeActive]);

  useEffect(() => {
    if (skyHelperRef.current != null) {
      skyHelperRef.current.visible = false;
    }
  }, [isSkyModeActive]);

  const handlePointerMove = useCallback(
    ({ point: { x, z } }: ThreeEvent<PointerEvent>) => {
      if (editorMarkRef.current != null && (isInsertModeActive || isMoveModeActive)) {
        editorMarkRef.current.visible = true;
        editorMarkRef.current.position.setX(x);
        editorMarkRef.current.position.setZ(z);
      }

      if (lightHelperRef.current != null && isLightModeActive) {
        lightHelperRef.current.visible = true;
        lightHelperRef.current.position.setX(x);
        lightHelperRef.current.position.setZ(z);
      }

      if (skyHelperRef.current != null && isSkyModeActive) {
        skyHelperRef.current.visible = true;
        skyHelperRef.current.position.setX(x);
        skyHelperRef.current.position.setZ(z);
      }
    },
    [isLightModeActive, isInsertModeActive, isSkyModeActive, isMoveModeActive]
  );

  const handleClick = useCallback(
    ({ point: { x, z } }: ThreeEvent<MouseEvent>) => {
      if (isInsertModeActive || isMoveModeActive) {
        editorMarkRef.current?.position.setX(x);
        editorMarkRef.current?.position.setZ(z);
        insertBuilding({
          x,
          y: 0, // this will be adjusted based on terrain y
          z,
          type: editorMark.type,
          rotationY: editorMark.rotationY ?? 0,
          id: uuidv4()
        });

        if (isMoveModeActive) setBuildingEditorMode(undefined);
        return;
      }

      if (isLightModeActive) {
        addLightMarker({ x, z, id: uuidv4(), intensity: 0 });
      }

      if (isSkyModeActive) {
        addSkyMarker({ x, z, id: uuidv4(), exposure: 0 });
      }
    },
    [editorMark, isLightModeActive, isInsertModeActive, isSkyModeActive, isMoveModeActive]
  );

  const handlePointerOut = useCallback(() => {
    if (editorMarkRef.current != null && (isInsertModeActive || isMoveModeActive)) {
      editorMarkRef.current.visible = false;
    }

    if (lightHelperRef.current != null && isLightModeActive) {
      lightHelperRef.current.visible = false;
    }

    if (skyHelperRef.current != null && isSkyModeActive) {
      skyHelperRef.current.visible = false;
    }
  }, [isLightModeActive, isInsertModeActive, isSkyModeActive, isMoveModeActive]);

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
        ref={lightHelperRef}
        args={[new Vector3(0, 2, 0), new Vector3(0, y, 0), 100, 0xffff00, 0.5, 0.5]}
      />

      <arrowHelper
        visible={false}
        ref={skyHelperRef}
        args={[new Vector3(0, 2, 0), new Vector3(0, y, 0), 100, 0xffff00, 0.5, 0.5]}
      />
    </group>
  );
}

export default Terrain;
