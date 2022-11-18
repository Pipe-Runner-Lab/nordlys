import React from 'react';
import useStore from '../../../store';
import { getColor } from '../utils/color';
interface BuildingBProps {
  x?: number;
  z?: number;
  uuid?: string;
}

function BuildingB({ x = 0, z = 0, uuid = 'B' }: BuildingBProps): JSX.Element {
  const height = 12;

  const selected = useStore((state) => state.selected);
  const blocked = useStore((state) => state.blocked);

  const isSelected = selected.includes(uuid);
  const isBlocked = blocked.includes(uuid);
  const color = getColor(isSelected, isBlocked);

  return (
    <mesh name={uuid} position={[x, height / 2, z]} castShadow receiveShadow>
      <boxBufferGeometry args={[3, height, 3]} />
      <meshStandardMaterial color={isSelected ? color : 'blue'} />
    </mesh>
  );
}

export default BuildingB;
