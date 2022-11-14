import { useControls } from 'leva';
import React, { useMemo } from 'react';
import { Object3D } from 'three';

function SunLight(): JSX.Element {
  const { position } = useControls('Sun', { position: { value: [0, 30, 0] } });

  const target = useMemo(() => {
    const target = new Object3D();
    target.position.set(0, 0, 0);
    return target;
  }, []);

  return (
    <>
      {/* <ambientLight intensity={0.1} /> */}
      <directionalLight
        intensity={1}
        color="white"
        position={position}
        target={target}
        castShadow
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
      />
    </>
  );
}

export default SunLight;
