import React, { useRef } from 'react';
// import { Environment } from '@react-three/drei';
import Buildings from '../buildings';
import Terrain from '../terrain';
import Park from '../park';
import EditorMark from '../editor-mark/EditorMark';
import { Group } from 'three';
import { useControls } from 'leva';

function Scene(): JSX.Element {
  const { baseHeight } = useControls('Terrain', { baseHeight: { value: -1.5, min: -3, max: 3 } });

  const editorMarkRef = useRef<Group>(null);
  const baseRef = useRef<Group>(null);

  return (
    <>
      <color attach="background" args={['#fff']} />
      {/* <fog attach="fog" args={['#fff', 30, 40]} /> */}
      <EditorMark baseHeight={baseHeight} ref={editorMarkRef} />

      {/* <Environment preset="city" /> */}
      <Buildings baseHeight={baseHeight} />
      <Park />
      <Terrain height={baseHeight} ref={baseRef} editorMarkRef={editorMarkRef} />
    </>
  );
}

export default Scene;
