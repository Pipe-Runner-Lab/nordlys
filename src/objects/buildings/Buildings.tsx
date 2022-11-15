import { Select } from '@react-three/drei';
import React from 'react';
import useStore from '../../store';
import BuildingA from './components/BuildingA';
import BuildingB from './components/BuildingB';

interface BuildingsProps {
  baseHeight: number;
}

function Buildings({ baseHeight }: BuildingsProps): JSX.Element | null {
  const buildingMap = useStore((state) => state.buildingMap);
  const setSelectedBuildingIds = useStore((state) => state.setSelectedBuildingIds);

  return (
    <group position-y={baseHeight}>
      <Select
        box
        multiple
        onChange={(data) => setSelectedBuildingIds(data.map((item) => item.uuid))}>
        {buildingMap.map(({ type, id, x, z }) => {
          switch (type) {
            case 'apartment':
              return <BuildingA uuid={id} key={id} x={x} z={z} />;
            case 'office':
              return <BuildingB uuid={id} key={id} x={x} z={z} />;
            default:
              return null;
          }
        })}
      </Select>
    </group>
  );
}

export default Buildings;
