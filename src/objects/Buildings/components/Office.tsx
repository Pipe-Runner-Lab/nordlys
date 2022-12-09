import React from 'react';
import useStore from '../../../store';
import { getColor } from '../utils/color';
import { useGLTF, useTexture } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

interface OfficeProps {
  x?: number;
  z?: number;
  id?: string;
  placementMode?: boolean;
  rotationY?: number;
}

type GLTFResult = GLTF & {
  nodes: {
    ['2Story_Wide_2Doors']: THREE.Mesh;
  };

  materials: {
    Texture: THREE.MeshStandardMaterial;
  };
};

const modelPath = process.env.PUBLIC_URL + '/assets/office/office.glb';
const texturePath = process.env.PUBLIC_URL + '/assets/office/Texture_Light2.png';

function Office({
  x = 0,
  z = 0,
  id = 'HOTEL',
  placementMode = false,
  rotationY = 0
}: OfficeProps): JSX.Element {
  const height = 0;

  const { nodes } = useGLTF(modelPath) as unknown as GLTFResult;
  const texture = useTexture(texturePath);

  const selected = useStore((state) => state.selected);
  const blocked = useStore((state) => state.blocked);

  const isSelected = selected.includes(id);
  const isBlocked = blocked.includes(id);

  const color = getColor(isSelected, isBlocked, placementMode);

  return (
    <group dispose={null}>
      <mesh
        name={id}
        position={[x, height / 2, z]}
        castShadow
        receiveShadow
        geometry={nodes['2Story_Wide_2Doors'].geometry}
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

export default Office;

useGLTF.preload(modelPath);
