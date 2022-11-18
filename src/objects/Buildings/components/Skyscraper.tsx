import React from 'react';
import useStore from '../../../store';
import { getColor } from '../utils/color';
import { useGLTF, useTexture } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

interface SkyscraperProps {
  x?: number;
  z?: number;
  uuid?: string;
}

type GLTFResult = GLTF & {
  nodes: {
    ['6Story_Stack']: THREE.Mesh;
  };
  materials: {
    ['Texture.001']: THREE.MeshStandardMaterial;
  };
};

function Skyscraper({ x = 0, z = 0, uuid = 'SK' }: SkyscraperProps): JSX.Element {
  const height = 0;

  const { nodes, materials } = useGLTF(
    process.env.PUBLIC_URL + '/assets/skyscraper/skyscraper.glb'
  ) as unknown as GLTFResult;

  const selected = useStore((state) => state.selected);
  const blocked = useStore((state) => state.blocked);

  const isSelected = selected.includes(uuid);
  const isBlocked = blocked.includes(uuid);

  const color = getColor(isSelected, isBlocked);
  const texture = useTexture(process.env.PUBLIC_URL + '/assets/skyscraper/Texture_DarkBlue.png');

  return (
    <group dispose={null}>
      <mesh
        name={uuid}
        position={[x, height / 2, z]}
        castShadow
        receiveShadow
        geometry={nodes['6Story_Stack'].geometry}
        material={materials['Texture.001']}>
        <meshStandardMaterial map={texture} color={isSelected ? color : '#ffffff'} />
      </mesh>
    </group>
  );
}

export default Skyscraper;
