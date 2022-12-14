import { GizmoHelper, GizmoViewport } from '@react-three/drei';
import React from 'react';

function Gizmo(): JSX.Element {
  return (
    <GizmoHelper
      alignment="bottom-left" // widget alignment within scene
      margin={[80, 80]} // widget margins (X, Y)
    >
      <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
    </GizmoHelper>
  );
}

export default Gizmo;
