import React, { useMemo } from 'react';
import useStore from '../../../store';
import { getColor } from '../utils/color';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { MeshStandardMaterial } from 'three';

interface ApartmentProps {
  x?: number;
  z?: number;
  id?: string;
}

type GLTFResult = GLTF & {
  nodes: {
    Cube001: THREE.Mesh;
    Cube001_1: THREE.Mesh;
    Cube001_2: THREE.Mesh;
    Cube001_3: THREE.Mesh;
  };
  materials: {
    Base: THREE.MeshStandardMaterial;
    Door: THREE.MeshStandardMaterial;
    Windows: THREE.MeshStandardMaterial;
    Roof2: THREE.MeshStandardMaterial;
  };
};

function Apartment({ x = 0, z = 0, id = 'A' }: ApartmentProps): JSX.Element {
  const height = 5.7;

  const { nodes, materials } = useGLTF(
    process.env.PUBLIC_URL + '/assets/skyscraper5.glb'
  ) as unknown as GLTFResult;

  const selected = useStore((state) => state.selected);
  const blocked = useStore((state) => state.blocked);

  const isSelected = selected.includes(id);
  const isBlocked = blocked.includes(id);

  const color = getColor(isSelected, isBlocked);

  // return (
  //   <mesh name={id} position={[x, height / 2, z]} castShadow receiveShadow>
  //     <boxBufferGeometry args={[2, height, 2]} />
  //     <meshStandardMaterial color={color ?? 'red'} />
  //   </mesh>
  // );

  const material: MeshStandardMaterial | undefined = useMemo(
    () => (color != null ? new MeshStandardMaterial({ color }) : undefined),
    [color]
  );

  return (
    <mesh name={id} position={[x, height / 2, z]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={material ?? materials.Base}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001_1.geometry}
        material={material ?? materials.Door}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001_2.geometry}
        material={material ?? materials.Windows}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001_3.geometry}
        material={material ?? materials.Roof2}
      />
    </mesh>
  );
}

export default Apartment;
