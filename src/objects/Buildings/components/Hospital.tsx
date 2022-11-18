import React from 'react';
import useStore from '../../../store';
import { getColor } from '../utils/color';
import { useGLTF, useTexture } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

interface ApartmentProps {
  x?: number;
  z?: number;
  uuid?: string;
}

type GLTFResult = GLTF & {
  nodes: {
    ['4Story']: THREE.Mesh;
  };

  materials: {
    Texture: THREE.MeshStandardMaterial;
  };
};

function Hospital({ x = 0, z = 0, uuid = 'A' }: ApartmentProps): JSX.Element {
  const height = 0;

  const { nodes, materials } = useGLTF(
    process.env.PUBLIC_URL + '/assets/hospital/hospital.glb'
  ) as unknown as GLTFResult;

  const selected = useStore((state) => state.selected);
  const blocked = useStore((state) => state.blocked);

  const isSelected = selected.includes(uuid);
  const isBlocked = blocked.includes(uuid);

  const color = getColor(isSelected, isBlocked);
  const texture = useTexture(process.env.PUBLIC_URL + '/assets/hospital/Texture_DarkPurple.png');

  return (
    <group dispose={null}>
      <mesh
        name={uuid}
        position={[x, height / 2, z]}
        castShadow
        receiveShadow
        geometry={nodes['4Story'].geometry}
        material={materials.Texture}>
        <meshStandardMaterial map={texture} color={isSelected ? color : '#ffffff'} />
      </mesh>
    </group>
  );
}

export default Hospital;
