import { WebGLRenderer, OrthographicCamera, Scene } from 'three';

export function renderToJPG(gl: WebGLRenderer, scene: Scene, camera: OrthographicCamera): void {
  gl.render(scene, camera);

  gl.domElement.toBlob(
    function (blob: Blob | null) {
      if (blob != null) {
        const a = document.createElement('a');
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = 'canvas.jpg';
        a.click();
      }
    },
    'image/jpg',
    1.0
  );
}
