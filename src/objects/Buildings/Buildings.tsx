import { Select } from '@react-three/drei';
import React, { forwardRef, Suspense } from 'react';
import { Group } from 'three';
import useStore from '../../store';
import Apartment from './components/Apartment';
import Skyscraper from './components/Skyscraper';
import Office from './components/Office';
import Hotel from './components/Hotel';
import Hospital from './components/Hospital';
import Shop from './components/Shop';
import Government from './components/Government';
import House from './components/House';

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
    <Suspense fallback={null}>
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
                return <Office id={id} key={id} x={x} z={z} />;
              case 'skyscraper':
                return <Skyscraper id={id} key={id} x={x} z={z} />;
              case 'hotel':
                return <Hotel id={id} key={id} x={x} z={z} />;
              case 'government':
                return <Government id={id} key={id} x={x} z={z} />;
              case 'house':
                return <House id={id} key={id} x={x} z={z} />;
              case 'shop':
                return <Shop id={id} key={id} x={x} z={z} />;
              case 'hospital':
                return <Hospital id={id} key={id} x={x} z={z} />;
              default:
                return null;
            }
          })}
        </Select>
      </group>
    </Suspense>
  );
}

export default forwardRef(Buildings);
