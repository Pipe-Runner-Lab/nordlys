import React from 'react';
import useStore from '../../../store';
import { getColor } from '../utils/color';
import { useGLTF, useTexture } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

interface HotelProps {
  x?: number;
  z?: number;
  id?: string;
  placementMode?: boolean;
  rotationY?: number;
}

type GLTFResult = GLTF & {
  nodes: {
    ['4Story_Wide_2Doors_Roof']: THREE.Mesh;
  };

  materials: {
    Texture: THREE.MeshStandardMaterial;
  };
};

function Hotel({
  x = 0,
  z = 0,
  id = 'HOTEL',
  placementMode = false,
  rotationY = 0
}: HotelProps): JSX.Element {
  const height = 0;

  const { nodes } = useGLTF(
    process.env.PUBLIC_URL + '/assets/hotel/hotel.glb'
  ) as unknown as GLTFResult;

  const selected = useStore((state) => state.selected);
  const blocked = useStore((state) => state.blocked);

  const isSelected = selected.includes(id);
  const isBlocked = blocked.includes(id);

  const color = getColor(isSelected, isBlocked, placementMode);
  const texture = useTexture(process.env.PUBLIC_URL + '/assets/hotel/Texture_Red.png');

  return (
    <group dispose={null}>
      <mesh
        name={id}
        position={[x, height / 2, z]}
        rotation-y={rotationY}
        castShadow
        receiveShadow
        geometry={nodes['4Story_Wide_2Doors_Roof'].geometry}>
        {color != null ? (
          <meshBasicMaterial transparent opacity={0.5} color={color} />
        ) : (
          <meshStandardMaterial map={texture} color={'#fff'} />
        )}
      </mesh>
    </group>
  );
}

export default Hotel;
