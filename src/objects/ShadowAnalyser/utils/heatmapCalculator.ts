import { OrthographicCamera, Scene, WebGLRenderer } from 'three';
import { PerspectiveCamera } from 'three/src/Three';

export const R = 20;
export const numberOfPoints = R * R;
const parkMarkers: Array<[number, number]> = [];

for (let i = 0; i < numberOfPoints; i++) {
  const r = Math.floor(i / R);
  const c = i % R;

  const x = r / R;
  const z = c / R;
  parkMarkers.push([x, z]);
}

export const getHeatMap = (
  gl: WebGLRenderer,
  offscreenCanvas: HTMLCanvasElement,
  scene: Scene,
  camera: OrthographicCamera,
  defaultCamera: PerspectiveCamera,
  oldMap: number[]
): number[] => {
  const ctx = offscreenCanvas.getContext('2d', { willReadFrequently: true });

  if (ctx != null) {
    gl.render(scene, camera);
    const mainCanvas = gl.domElement;
    ctx.drawImage(mainCanvas, 0, 0);
    gl.render(scene, defaultCamera);

    parkMarkers.forEach(([xN, zN], idx) => {
      // Need to normalize position to canvas size
      const canvasX = xN * mainCanvas.width;
      const canvasY = zN * mainCanvas.height;

      const imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
      const c = imageData.data;
      const intensity = (65536 * c[0] + 256 * c[1] + c[2]) / 256 / 256 / 256;
      oldMap[idx] += intensity;
    });

    return oldMap;
  }

  return oldMap;
};
