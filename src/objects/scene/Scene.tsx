import React, { useRef } from 'react';
import { Environment } from '@react-three/drei';
import Buildings from '../buildings';
import Terrain from '../terrain';
import Park from '../park';
import EditorMark from '../editor-mark/EditorMark';
import { Group } from 'three';

function Scene(): JSX.Element {
  const editorMarkRef = useRef<Group>(null);

  return (
    <>
      <color attach="background" args={['#000']} />
      {/* <fog attach="fog" args={['#fff', 30, 40]} /> */}
      <EditorMark ref={editorMarkRef} />

      <Environment preset="city" />
      <Buildings />
      <Park />
      <Terrain editorMarkRef={editorMarkRef} />
    </>
  );
}

export default Scene;
