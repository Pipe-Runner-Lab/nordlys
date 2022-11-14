import React from 'react';
import { Canvas } from '@react-three/fiber';
import Lights from '../../objects/lights';
import Gizmo from '../../objects/gizmo';
import Controls from '../../objects/controls';
import Scene from '../../objects/scene';

function Home(): JSX.Element {
  return (
    <div id="canvas-container" className="w-full h-full">
      <Canvas camera={{ position: [-15, 15, 18], fov: 35 }}>
        <Lights />
        <Scene />

        {/* Utilities */}
        <Controls />
        <Gizmo />
      </Canvas>
    </div>
  );
}

export default Home;
