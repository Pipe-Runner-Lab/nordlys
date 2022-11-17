import { Select } from '@react-three/drei';
import React, { forwardRef } from 'react';
import { Group } from 'three';
import useStore from '../../store';
import Apartment from './components/Apartment';
import BuildingB from './components/BuildingB';

interface BuildingsProps {
  y: number;
}

function Buildings({ y }: BuildingsProps, ref: React.Ref<Group>): JSX.Element | null {
  const buildingDataMap = useStore((state) => state.buildingDataMap);
  const setSelected = useStore((state) => state.setSelected);
  const editMode = useStore((state) => state.editMode);

  const isSelectionActive = editMode === 'buildings' || editMode === 'landmark';
  const isMultiSelectActive = editMode === 'buildings';

  /**
   * * The buildings are written in a way to be moved up by their height/2.
   * * Hence for correct alignment, the group's y-value need to match the terrain's y-value.
   */
  return (
    <group ref={ref} position-y={y}>
      <Select
        box
        multiple={isMultiSelectActive}
        onChange={
          isSelectionActive
            ? (selected) => setSelected(selected.map(({ name }) => name))
            : undefined
        }>
        {buildingDataMap.map(({ type, id, x, z }) => {
          switch (type) {
            case 'apartment':
              return <Apartment id={id} key={id} x={x} z={z} />;
            case 'office':
              return <BuildingB id={id} key={id} x={x} z={z} />;
            default:
              return null;
          }
        })}
      </Select>
    </group>
  );
}

export default forwardRef(Buildings);
