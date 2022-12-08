import { useLoader } from '@react-three/fiber';
import React from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { parkPositions, parkSize } from '../../constants/positions';

function Park(): JSX.Element {
  const parkTexture = useLoader(TextureLoader, process.env.PUBLIC_URL + '/assets/park-texture.jpg');

  return (
    <group position={[parkPositions.x, -1.45, parkPositions.z]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh receiveShadow>
        <planeBufferGeometry args={[parkSize.w, parkSize.h]} />
        <meshStandardMaterial map={parkTexture} />
      </mesh>
    </group>
  );
}

export default Park;
