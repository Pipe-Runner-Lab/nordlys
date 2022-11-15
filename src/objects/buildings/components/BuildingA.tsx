import React from 'react';
import useStore from '../../../store';

interface BuildingAProps {
  x?: number;
  z?: number;
  uuid?: string;
}

function BuildingA({ x = 0, z = 0, uuid = 'A' }: BuildingAProps): JSX.Element {
  const height = 8;

  const selectedBuildingIds = useStore((state) => state.selectedBuildingIds);
  const isSelected = selectedBuildingIds.find((sel) => sel === uuid) != null;

  return (
    <mesh uuid={uuid} position={[x, height / 2, z]} castShadow receiveShadow>
      <boxBufferGeometry args={[2, height, 2]} />
      <meshStandardMaterial color={isSelected ? 'yellow' : 'red'} />
    </mesh>
  );
}

export default BuildingA;
