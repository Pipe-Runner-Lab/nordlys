import { useLoader } from '@react-three/fiber';
import React from 'react';
import parkImage from '../../assets/park-texture.jpg';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

function Park(): JSX.Element {
  const parkTexture = useLoader(TextureLoader, parkImage);

  return (
    <group position={[0, -1.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh receiveShadow>
        <planeBufferGeometry args={[10, 10]} />
        <meshStandardMaterial map={parkTexture} />
      </mesh>
    </group>
  );
}

export default Park;
