import React from 'react';
import useStore from '../../../store';
import { getColor } from '../utils/color';
import { useGLTF, useTexture } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

interface HouseProps {
  x?: number;
  z?: number;
  id?: string;
  placementMode?: boolean;
}

type GLTFResult = GLTF & {
  nodes: {
    ['1Story']: THREE.Mesh;
  };

  materials: {
    ['Texture.005']: THREE.MeshStandardMaterial;
  };
};

function House({ x = 0, z = 0, id = 'HOUSE', placementMode = false }: HouseProps): JSX.Element {
  const height = 0;

  const { nodes } = useGLTF(
    process.env.PUBLIC_URL + '/assets/house/house.glb'
  ) as unknown as GLTFResult;

  const selected = useStore((state) => state.selected);
  const blocked = useStore((state) => state.blocked);

  const isSelected = selected.includes(id);
  const isBlocked = blocked.includes(id);

  const color = getColor(isSelected, isBlocked, placementMode);
  const texture = useTexture(process.env.PUBLIC_URL + '/assets/house/Texture_Dark.png');

  return (
    <group dispose={null}>
      <mesh
        name={id}
        position={[x, height / 2, z]}
        castShadow
        receiveShadow
        geometry={nodes['1Story'].geometry}
      >
        {color != null ? (
          <meshBasicMaterial transparent opacity={0.5} color={color} />
        ) : (
          <meshStandardMaterial map={texture} color={'#fff'} />
        )}
      </mesh>
    </group>
  );
}

export default House;
