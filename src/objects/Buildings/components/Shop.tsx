import React from 'react';
import useStore from '../../../store';
import { getColor } from '../utils/color';
import { useGLTF, useTexture } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

interface ShopProps {
  x?: number;
  z?: number;
  id?: string;
  placementMode?: boolean;
  rotationY?: number;
}

type GLTFResult = GLTF & {
  nodes: {
    ['2Story_Sign']: THREE.Mesh;
  };

  materials: {
    ['Texture.006']: THREE.MeshStandardMaterial;
  };
};

function Shop({
  x = 0,
  z = 0,
  id = 'SHOP',
  placementMode = false,
  rotationY = 0
}: ShopProps): JSX.Element {
  const height = 0;

  const { nodes } = useGLTF(
    process.env.PUBLIC_URL + '/assets/shop/shop.glb'
  ) as unknown as GLTFResult;

  const selected = useStore((state) => state.selected);
  const blocked = useStore((state) => state.blocked);

  const isSelected = selected.includes(id);
  const isBlocked = blocked.includes(id);

  const color = getColor(isSelected, isBlocked, placementMode);
  const texture = useTexture(process.env.PUBLIC_URL + '/assets/shop/Texture_Signs.png');

  return (
    <group dispose={null}>
      <mesh
        name={id}
        position={[x, height / 2, z]}
        castShadow
        receiveShadow
        geometry={nodes['2Story_Sign'].geometry}
        rotation-y={rotationY}>
        {color != null ? (
          <meshBasicMaterial transparent opacity={0.5} color={color} />
        ) : (
          <meshStandardMaterial map={texture} color={'#fff'} />
        )}
      </mesh>
    </group>
  );
}

export default Shop;
