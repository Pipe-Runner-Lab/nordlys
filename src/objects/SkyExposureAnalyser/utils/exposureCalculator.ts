import { Raycaster, Object3D, Event, Vector3 } from 'three';

export const getExposure = (
  x: number,
  h: number,
  z: number,
  buildingMeshes: Array<Object3D<Event>>,
  raycaster: Raycaster,
  rayLength: number,
  directions: Vector3[]
): number => {
  raycaster.ray.origin.set(x, h, z);
  const total = directions.length;
  let hits = 0;
  directions.forEach((direction) => {
    raycaster.ray.direction.set(direction.x, 0, direction.z);
    const intersects = raycaster.intersectObjects(buildingMeshes);

    if (intersects?.length != null && intersects.length > 0) {
      hits++;
    }
  });

  return Number((100 - (hits / total) * 100).toFixed(1));
};
