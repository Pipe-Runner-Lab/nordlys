import React from 'react';
import { Canvas } from '@react-three/fiber';
import Lights from '../../objects/lights';
import Gizmo from '../../objects/gizmo';
import Controls from '../../objects/controls';
import Scene from '../../objects/scene';
import EditorPanel from '../../components/editor-panel';
import { PerspectiveCamera } from '@react-three/drei';

function Home(): JSX.Element {
  return (
    <div id="canvas-container" className="relative w-full h-full">
      <Canvas shadows>
        <PerspectiveCamera position={[45, 26, 45]} fov={35} far={500} near={1} makeDefault />
        <Lights />
        <Scene />

        {/* Utilities */}
        <Controls />
        <Gizmo />
      </Canvas>

      <EditorPanel />
    </div>
  );
}

export default Home;
