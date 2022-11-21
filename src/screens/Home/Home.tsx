/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Canvas } from '@react-three/fiber';
import Lights from '../../objects/Lights';
import Gizmo from '../../objects/Gizmo';
import Controls from '../../objects/Controls';
import Scene from '../../objects/Scene';
import EditorPanel from '../../components/EditorPanel';
import { PerspectiveCamera } from '@react-three/drei';

function Home(): JSX.Element {
  return (
    <div id="canvas-container" className="relative w-full h-full overflow-hidden">
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
