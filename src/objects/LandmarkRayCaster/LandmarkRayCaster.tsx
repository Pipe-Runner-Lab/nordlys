import React, { useRef, useEffect, useMemo } from 'react';
import useStore from '../../store/store';
import { Raycaster, Group, Object3D, Vector3 } from 'three';

interface LandmarkRayCasterProps {
  buildingsRef: React.RefObject<Group>;
  selectedBuildingIds: string[];
  debug: boolean;
}

function LandmarkRayCaster({
  buildingsRef,
  selectedBuildingIds,
  debug
}: LandmarkRayCasterProps): JSX.Element | null {
  const buildingMap = useStore((state) => state.buildingMap);

  const height = 10;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const raycasterRef = useRef<Raycaster>(null!);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const landmark = useMemo(
    () => buildingMap.find((building) => building.id === selectedBuildingIds[0]),
    [selectedBuildingIds]
  )!;

  /**
   * Set of buildings that are not the landmark
   * ! This is a fairly expensive operation, so we memoize it.
   * ! Also we know for a fact that during landmark mode, the buildingMap will not change.
   * ! We read the meshes including the landmark, but we filter out the landmark in other operations,
   * ! since its cheap to do it there.
   */
  const buildingMeshes = useMemo(() => {
    const output: Object3D[] = [];
    buildingsRef.current?.traverse((child) => {
      if (child.uuid.startsWith('building') && child.uuid !== landmark?.id) {
        output.push(child);
      }
    });
    return output;
  }, [landmark]);

  /**
   * Direction of the rays
   */
  const directions = useMemo(
    () =>
      buildingMeshes.map((mesh) => {
        const direction = new Vector3(mesh.position.x, height, mesh.position.z)
          .sub(new Vector3(landmark?.x ?? 0, height, landmark?.z ?? 0))
          .normalize();
        return direction;
      }),
    [buildingMeshes, landmark, height]
  );

  /**
   * Move a single raycaster around to find the closest building
   */
  useEffect(() => {
    if (raycasterRef.current != null) {
      directions.forEach((direction) => {
        raycasterRef.current.ray.origin.set(landmark?.x ?? 0, height, landmark?.z ?? 0);
        raycasterRef.current.ray.direction.set(direction.x, direction.y, direction.z);

        const intersects = raycasterRef.current.intersectObjects(buildingMeshes);

        if (intersects?.length !== undefined && intersects.length > 0) {
          // console.log('intersects', intersects);
        }
      });
    }
  }, [landmark, directions, buildingMeshes]);

  return (
    <>
      <raycaster ref={raycasterRef}></raycaster>
      {debug &&
        landmark != null &&
        directions.map((direction, idx) => {
          const origin = new Vector3(landmark.x, height, landmark.z);
          return <arrowHelper key={idx} args={[direction, origin, 20, 0xffff00, 0.5, 0.5]} />;
        })}
    </>
  );
}

export default LandmarkRayCaster;
