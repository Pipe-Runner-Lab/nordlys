import React, { useRef, useEffect, useMemo } from 'react';
import useStore from '../../store/store';
import { Raycaster, Group, Object3D } from 'three';

interface LandmarkRayCasterProps {
  buildingsRef: React.RefObject<Group>;
}

function LandmarkRayCaster({ buildingsRef }: LandmarkRayCasterProps): JSX.Element {
  const selectedBuildingIds = useStore((state) => state.selectedBuildingIds);
  const buildingMap = useStore((state) => state.buildingMap);

  const raycasterRef = useRef<Raycaster>(null);

  if (selectedBuildingIds.length !== 1) {
    throw new Error('One and only one landmark can be selected');
  }

  const landmark = buildingMap.find((building) => building.id === selectedBuildingIds[0]);

  const buildings = useMemo(() => {
    const output: Object3D[] = [];
    buildingsRef.current?.traverse((child) => {
      if (child.uuid.startsWith('building') && child.uuid !== landmark?.id) {
        output.push(child);
      }
    });
    return output;
  }, [buildingMap, buildingsRef.current, landmark]);

  useEffect(() => {
    if (raycasterRef.current != null && landmark != null) {
      buildingMap
        .filter((building) => building.id !== landmark.id)
        .forEach((building) => {
          raycasterRef.current?.ray.origin.set(landmark.x, 0, landmark.z);
          raycasterRef.current?.ray.direction.set(building.x, 0, building.z).normalize();
          const intersects = raycasterRef.current?.intersectObjects(buildings);

          if (intersects?.length !== undefined && intersects.length > 0) {
            // console.log('intersects', intersects);
          }
        });
    }
  }, [landmark, buildings]);

  return <raycaster ref={raycasterRef}></raycaster>;
}

export default LandmarkRayCaster;
