import { OrthographicCamera, Scene, WebGLRenderer } from 'three';
import { PerspectiveCamera } from 'three/src/Three';
import { ShadowMarker } from '../../../store/store';

export const getIntensity = (
  gl: WebGLRenderer,
  offscreenCanvas: HTMLCanvasElement,
  markers: ShadowMarker[],
  scene: Scene,
  camera: OrthographicCamera,
  defaultCamera: PerspectiveCamera
): ShadowMarker[] => {
  const ctx = offscreenCanvas.getContext('2d');

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
      const intensity = (65536 * c[0] + 256 * c[1] + c[2]) / 256 / 256 / 256;
      marker.intensity = intensity;
    });

    return markers;
  }

  return markers;
};
