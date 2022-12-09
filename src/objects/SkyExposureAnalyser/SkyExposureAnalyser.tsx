import { useControls } from 'leva';
import React, { useEffect, useMemo, useRef } from 'react';
import { Group, Raycaster, Vector3 } from 'three';
import useStore from '../../store/store';
import { getExposure } from './utils/exposureCalculator';

interface SkyExposureAnalyserProps {
  y: number;
  buildingsRef: React.RefObject<Group>;
}

const R = 10;
const kMax = 20;
const kMin = 1;
const alphaTheta = 10;

const rayLength = 50 * Math.SQRT2;

function SkyExposureAnalyser({ y, buildingsRef }: SkyExposureAnalyserProps): JSX.Element {
  // lifted the ray origin by 1px
  const rayOrigin = new Vector3(0, y + 1, 0);

  const { shouldShowHelper } = useControls('Sky Exposure Analyser', {
    shouldShowHelper: { value: false, label: 'Debug' }
  });

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const raycasterRef = useRef<Raycaster>(null!);

  const buildingDataMap = useStore((state) => state.buildingDataMap);
  const skyMarkers = useStore((state) => state.skyMarkers);
  const updateSkyMarkers = useStore((state) => state.updateSkyMarkers);
  const oldMarkerLength = useRef<number>(skyMarkers.length);

  /**
   * Set of buildings that are not the landmark
   * ! This is a fairly expensive operation, so we memoize it.
   * ! Also we know for a fact that during landmark mode, the buildingDataMap will not change.
   * ! We read the meshes including the landmark, but we filter out the landmark in other operations,
   * ! since its cheap to do it there.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
   * * This will not change for all the points, since direction of vector is constant,
   * * and we are only changing the origin of the ray.
   */
  const directionsVectors = useMemo(() => {
    const vectors = [];
    for (let i = 0; i <= 90; i += alphaTheta) {
      const angle = (i * Math.PI) / 180;
      const numberOfRays = Math.floor(kMin - (kMin - kMax) * Math.cos(angle));
      const dTheta = (2 * Math.PI) / numberOfRays;
      const r = R * Math.cos(angle);
      const h = R * Math.sin(angle);
      for (let i = 0; i < numberOfRays; i++) {
        const theta = i * dTheta;
        const x = r * Math.cos(theta);
        const z = r * Math.sin(theta);
        const vector = new Vector3(x, h, z).normalize();
        vectors.push(vector);
      }
    }
    return vectors;
  }, []);

  useEffect(() => {
    const updatedSkyMarkers = skyMarkers.map((marker) => {
      return {
        ...marker,
        x: marker.x,
        z: marker.z,
        exposure: getExposure(
          marker.x,
          rayOrigin.y,
          marker.z,
          buildingMeshes,
          raycasterRef.current,
          rayLength,
          directionsVectors
        )
      };
    });
    updateSkyMarkers([...updatedSkyMarkers]);
  }, []);

  useEffect(() => {
    if (skyMarkers.length > oldMarkerLength.current) {
      oldMarkerLength.current = skyMarkers.length;

      const lastMarker = skyMarkers.pop();
      if (lastMarker != null) {
        const updatedSkyMarkers = [
          ...skyMarkers,
          {
            ...lastMarker,
            exposure: getExposure(
              lastMarker.x,
              rayOrigin.y,
              lastMarker.z,
              buildingMeshes,
              raycasterRef.current,
              rayLength,
              directionsVectors
            )
          }
        ];
        updateSkyMarkers(updatedSkyMarkers);
      }
    } else {
      oldMarkerLength.current = skyMarkers.length;
    }
  }, [skyMarkers]);

  return (
    <>
      <raycaster near={0} far={rayLength} ref={raycasterRef}></raycaster>

      {shouldShowHelper &&
        directionsVectors.map((direction, idx) => {
          return (
            <arrowHelper key={idx} args={[direction, rayOrigin, rayLength, 0xffff00, 0.5, 0.5]} />
          );
        })}

      {skyMarkers.map((marker) => {
        return (
          <arrowHelper
            key={marker.id}
            args={[new Vector3(0, 2, 0), new Vector3(marker.x, y, marker.z), 5, 'green', 0, 0]}
          />
        );
      })}
    </>
  );
}

export default SkyExposureAnalyser;
