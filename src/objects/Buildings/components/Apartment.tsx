import React from 'react';
import useStore from '../../../store';
import { getColor } from '../utils/color';
import { useGLTF, useTexture } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { MeshStandardMaterial } from 'three';

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

function Apartment({ x = 0, z = 0, uuid = 'A' }: ApartmentProps): JSX.Element {
  const height = 0;

  const { nodes, materials } = useGLTF(
    process.env.PUBLIC_URL + '/assets/apartment.glb'
  ) as unknown as GLTFResult;

  const selected = useStore((state) => state.selected);
  const blocked = useStore((state) => state.blocked);

  const isSelected = selected.includes(uuid);
  const isBlocked = blocked.includes(uuid);

  const color = getColor(isSelected, isBlocked);
  const texture = useTexture(process.env.PUBLIC_URL + '/assets/apartexture.png');
  // return (
  //   <mesh name={id} position={[x, height / 2, z]} castShadow receiveShadow>
  //     <boxBufferGeometry args={[2, height, 2]} />
  //     <meshStandardMaterial color={color ?? 'red'} />
  //   </mesh>
  // );

  // const material: MeshStandardMaterial | undefined = useMemo(
  //   () => (color != null ? new MeshStandardMaterial({ color: color }) : undefined),
  //   [color]
  // );
  const material: MeshStandardMaterial | undefined = new MeshStandardMaterial({ color });

  return (
    <mesh
      name={uuid}
      position={[x, height / 2, z]}
      castShadow
      receiveShadow
      geometry={nodes['4Story'].geometry}
      material={isSelected ? material : materials.Texture}>
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
useGLTF.preload(process.env.PUBLIC_URL + '/assets/apartment.glb');
export default Apartment;
