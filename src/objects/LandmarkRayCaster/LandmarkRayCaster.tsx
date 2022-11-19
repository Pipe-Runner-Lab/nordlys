import React, { useRef, useEffect, useMemo } from 'react';
import useStore from '../../store/store';
import { Raycaster, Group, Vector3 } from 'three';
import { BuildingHeightMap } from '../../constants/heights';

interface LandmarkRayCasterProps {
  buildingsRef: React.RefObject<Group>;
  selected: string[];
  debug: boolean;
}

const numberOfRays = 50;
const rayLength = 50 * Math.SQRT2;

function LandmarkRayCaster({
  buildingsRef,
  selected,
  debug
}: LandmarkRayCasterProps): JSX.Element | null {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const raycasterRef = useRef<Raycaster>(null!);

  const buildingDataMap = useStore((state) => state.buildingDataMap);
  const setBlocked = useStore((state) => state.setBlocked);
  const clearBlocked = useStore((state) => state.clearBlocked);

  useEffect(() => {
    return () => {
      clearBlocked();
    };
  });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const landmarkData = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    () => buildingDataMap.find((building) => building.id === selected[0])!,
    [selected]
  )!;
  const castHeight = BuildingHeightMap[landmarkData.type];
  const rayOrigin = useMemo(
    () => new Vector3(landmarkData.x, castHeight, landmarkData.z),
    [landmarkData]
  );

  /**
   * Set of buildings that are not the landmark
   * ! This is a fairly expensive operation, so we memoize it.
   * ! Also we know for a fact that during landmark mode, the buildingDataMap will not change.
   * ! We read the meshes including the landmark, but we filter out the landmark in other operations,
   * ! since its cheap to do it there.
   */
  const buildingMeshes = useMemo(() => {
    if (buildingsRef.current != null) {
      const buildingsParent = buildingsRef.current;
      return buildingDataMap.map(
        (buildingData) =>
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          buildingsParent.getObjectByName(buildingData.id)!
      );
    }

    return [];
  }, []);

  /**
   * Direction of the rays
   */
  const directionsVectors = useMemo(() => {
    const dTheta = (2 * Math.PI) / numberOfRays;
    const vectors = [];
    for (let i = 0; i < numberOfRays; i++) {
      const theta = i * dTheta;
      const x = 10 * Math.cos(theta);
      const z = 10 * Math.sin(theta);
      const vector = new Vector3(x, 0, z).normalize();
      vectors.push(vector);
    }
    return vectors;
  }, [buildingMeshes, landmarkData]);

  /**
   * Move a single raycaster around to find the closest building
   */
  useEffect(() => {
    if (raycasterRef.current != null) {
      const blockedBuildingIds: Record<string, boolean> = {};
      const filteredBuildingMeshes = buildingMeshes.filter((mesh) => mesh.name !== landmarkData.id);

      directionsVectors.forEach((direction) => {
        raycasterRef.current.ray.origin.set(rayOrigin.x, castHeight, rayOrigin.z);
        raycasterRef.current.ray.direction.set(direction.x, 0, direction.z);

        const intersects = raycasterRef.current.intersectObjects(filteredBuildingMeshes);

        if (intersects?.length != null && intersects.length > 0) {
          const [first, ...rest] = intersects;
          rest.forEach((intersect) => (blockedBuildingIds[intersect.object.name] = true));

          /**
           * * This also covers cases when the same building gets a view from a different angle
           */
          blockedBuildingIds[first.object.name] = false;
        }
      });

      setBlocked(
        Object.entries(blockedBuildingIds)
          .filter(([_, value]) => !!value)
          .map(([key, _]) => key)
      );
    }
  }, [landmarkData, directionsVectors, buildingMeshes, castHeight]);

  return (
    <>
      <raycaster near={0} far={rayLength} ref={raycasterRef}></raycaster>
      {debug &&
        directionsVectors.map((direction, idx) => {
          return (
            <arrowHelper key={idx} args={[direction, rayOrigin, rayLength, 0xffff00, 0.5, 0.5]} />
          );
        })}
    </>
  );
}

export default LandmarkRayCaster;
