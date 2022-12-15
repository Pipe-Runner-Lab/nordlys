import { OrthographicCamera, Scene, WebGLRenderer } from 'three';
import { PerspectiveCamera } from 'three/src/Three';
import { LightMarker } from '../../../store/store';

export const getIntensity = (
  gl: WebGLRenderer,
  offscreenCanvas: HTMLCanvasElement,
  markers: LightMarker[],
  scene: Scene,
  camera: OrthographicCamera,
  defaultCamera: PerspectiveCamera
): LightMarker[] => {
  const ctx = offscreenCanvas.getContext('2d', { willReadFrequently: true });

  if (ctx != null) {
    gl.render(scene, camera);
    const mainCanvas = gl.domElement;
    ctx.drawImage(mainCanvas, 0, 0);
    gl.render(scene, defaultCamera);

    markers.forEach((marker) => {
      // Need to normalize position to canvas size
      const canvasX = ((marker.x + 25) / 50) * mainCanvas.width;
      const canvasY = ((marker.z + 25) / 50) * mainCanvas.height;

      const imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
      const c = imageData.data;
      const intensity = (0.21 * c[0] + 0.72 * c[1] + 0.07 * c[2]) / 255;
      marker.intensity = intensity;
    });

    return markers;
  }

  return markers;
};
