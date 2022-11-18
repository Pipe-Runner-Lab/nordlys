import React from 'react';
import useStore from '../../../store';
import { getColor } from '../utils/color';
import { useGLTF, useTexture } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { MeshStandardMaterial } from 'three';

interface EmpirestateProps {
  x?: number;
  z?: number;
  uuid?: string;
}

type GLTFResult = GLTF & {
  nodes: {
    ['10068_empire_state_building']: THREE.Mesh;
  };
  materials: {
    orig_orig_orig_Standard_13: THREE.MeshStandardMaterial;
  };
};

function Empirestate({ x = 0, z = 0, uuid = 'E' }: EmpirestateProps): JSX.Element {
  const height = 0;

  const { nodes, materials } = useGLTF(
    process.env.PUBLIC_URL + '/assets/empirestate.glb'
  ) as unknown as GLTFResult;

  const selected = useStore((state) => state.selected);
  const blocked = useStore((state) => state.blocked);

  const isSelected = selected.includes(uuid);
  const isBlocked = blocked.includes(uuid);

  const color = getColor(isSelected, isBlocked);
  const texture = useTexture(process.env.PUBLIC_URL + '/assets/empirestate.jpg');
  // const material: MeshStandardMaterial | undefined = useMemo(
  //   () => (color != null ? new MeshStandardMaterial({ color: color }) : undefined),
  //   [color]
  // );
  const material: MeshStandardMaterial | undefined = new MeshStandardMaterial({ color });
  return (
    <mesh
      name={uuid}
      position={[x, height / 2, z]}
      rotation-x={-Math.PI / 2}
      scale={0.0004}
      castShadow
      receiveShadow
      geometry={nodes['10068_empire_state_building'].geometry}
      material={isSelected ? material : materials.orig_orig_orig_Standard_13}>
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
useGLTF.preload(process.env.PUBLIC_URL + '/assets/empirestate.glb');
export default Empirestate;
