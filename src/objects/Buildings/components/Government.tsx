import React from 'react';
import useStore from '../../../store';
import { getColor } from '../utils/color';
import { useGLTF, useTexture } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

interface GovernmentProps {
  x?: number;
  z?: number;
  id?: string;
  placementMode?: boolean;
}

type GLTFResult = GLTF & {
  nodes: {
    ['2Story_Wide']: THREE.Mesh;
  };

  materials: {
    ['Texture.004']: THREE.MeshStandardMaterial;
  };
};

function Government({
  x = 0,
  z = 0,
  id = 'GOVERNMENT',
  placementMode = false
}: GovernmentProps): JSX.Element {
  const height = 0;

  const { nodes } = useGLTF(
    process.env.PUBLIC_URL + '/assets/government/government.glb'
  ) as unknown as GLTFResult;

  const selected = useStore((state) => state.selected);
  const blocked = useStore((state) => state.blocked);

  const isSelected = selected.includes(id);
  const isBlocked = blocked.includes(id);

  const color = getColor(isSelected, isBlocked, placementMode);
  const texture = useTexture(process.env.PUBLIC_URL + '/assets/government/Texture_Casino.png');

  return (
    <group dispose={null}>
      <mesh
        name={id}
        position={[x, height / 2, z]}
        castShadow
        receiveShadow
        geometry={nodes['2Story_Wide'].geometry}>
        {color != null ? (
          <meshBasicMaterial transparent opacity={0.5} color={color} />
        ) : (
          <meshStandardMaterial map={texture} color={'#fff'} />
        )}
      </mesh>
    </group>
  );
}

export default Government;
