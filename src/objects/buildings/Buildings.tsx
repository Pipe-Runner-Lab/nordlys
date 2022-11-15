import React from 'react';
import useStore from '../../store';
import BuildingA from './components/BuildingA';
import BuildingB from './components/BuildingB';

interface BuildingsProps {
  baseHeight: number;
}

function Buildings({ baseHeight }: BuildingsProps): JSX.Element | null {
  const buildingMap = useStore((state) => state.buildingMap);

  return (
    <group position-y={baseHeight}>
      {buildingMap.map(({ type, id, x, z }) => {
        switch (type) {
          case 'apartment':
            return <BuildingA key={id} x={x} z={z} />;
          case 'office':
            return <BuildingB key={id} x={x} z={z} />;
          default:
            return null;
        }
      })}
    </group>
  );
}

export default Buildings;
