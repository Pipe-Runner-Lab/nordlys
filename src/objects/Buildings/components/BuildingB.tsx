import React from 'react';
import useStore from '../../../store';
import { getColor } from '../utils/color';

interface BuildingBProps {
  x?: number;
  z?: number;
  id?: string;
}

function BuildingB({ x = 0, z = 0, id = 'B' }: BuildingBProps): JSX.Element {
  const height = 12;

  const selected = useStore((state) => state.selected);
  const blocked = useStore((state) => state.blocked);

  const isSelected = selected.includes(id);
  const isBlocked = blocked.includes(id);

  const color = getColor(isSelected, isBlocked);

  return (
    <mesh name={id} position={[x, height / 2, z]} castShadow receiveShadow>
      <boxBufferGeometry args={[3, height, 3]} />
      <meshStandardMaterial color={color ?? 'blue'} />
    </mesh>
  );
}

export default BuildingB;
