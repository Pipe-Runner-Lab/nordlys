import React from 'react';
import useStore from '../../../store';

interface BuildingBProps {
  x?: number;
  z?: number;
  uuid?: string;
}

function BuildingB({ x = 0, z = 0, uuid = 'B' }: BuildingBProps): JSX.Element {
  const height = 12;

  const selectedBuildingIds = useStore((state) => state.selectedBuildingIds);
  const isSelected = selectedBuildingIds.find((sel) => sel === uuid) != null;

  return (
    <mesh uuid={uuid} position={[x, height / 2, z]} castShadow receiveShadow>
      <boxBufferGeometry args={[3, height, 3]} />
      <meshStandardMaterial color={isSelected ? 'yellow' : 'blue'} />
    </mesh>
  );
}

export default BuildingB;
