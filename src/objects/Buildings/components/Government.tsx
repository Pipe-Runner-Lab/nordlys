import React from 'react';
import useStore from '../../../store';
import { getColor } from '../utils/color';
import { useGLTF, useTexture } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

interface GovernmentProps {
  x?: number;
  z?: number;
  uuid?: string;
}

type GLTFResult = GLTF & {
  nodes: {
    ['2Story_Wide']: THREE.Mesh;
  };

  materials: {
    ['Texture.004']: THREE.MeshStandardMaterial;
  };
};

function Government({ x = 0, z = 0, uuid = 'G' }: GovernmentProps): JSX.Element {
  const height = 0;

  const { nodes, materials } = useGLTF(
    process.env.PUBLIC_URL + '/assets/government/government.glb'
  ) as unknown as GLTFResult;

  const selected = useStore((state) => state.selected);
  const blocked = useStore((state) => state.blocked);

  const isSelected = selected.includes(uuid);
  const isBlocked = blocked.includes(uuid);

  const color = getColor(isSelected, isBlocked);
  const texture = useTexture(process.env.PUBLIC_URL + '/assets/government/Texture_Casino.png');

  return (
    <group dispose={null}>
      <mesh
        name={uuid}
        position={[x, height / 2, z]}
        castShadow
        receiveShadow
        geometry={nodes['2Story_Wide'].geometry}
        material={materials['Texture.004']}>
        <meshStandardMaterial map={texture} color={isSelected ? color : '#ffffff'} />
      </mesh>
    </group>
  );
}

export default Government;
