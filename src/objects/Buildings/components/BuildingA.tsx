import React from 'react';
import useStore from '../../../store';
import { getColor } from '../utils/color';

interface BuildingAProps {
  x?: number;
  z?: number;
  id?: string;
}

function BuildingA({ x = 0, z = 0, id = 'A' }: BuildingAProps): JSX.Element {
  const height = 8;

  const selected = useStore((state) => state.selected);
  const blocked = useStore((state) => state.blocked);

  console.log(blocked);

  const isSelected = selected.includes(id);
  const isBlocked = blocked.includes(id);

  const color = getColor(isSelected, isBlocked);

  return (
    <mesh name={id} position={[x, height / 2, z]} castShadow receiveShadow>
      <boxBufferGeometry args={[2, height, 2]} />
      <meshStandardMaterial color={color ?? 'red'} />
    </mesh>
  );
}

export default BuildingA;
