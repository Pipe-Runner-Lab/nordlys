import React from 'react';

const mat = {
  uniforms: {
    time: { type: 'f', value: 1.0 }
  },
  vertexShader: `
    uniform float time;
    
    void main(){
      gl_Position=vec4(position,1.);
    }
  `,
  fragmentShader: `
    uniform float time;
    void main(){
      float x=mod(time+gl_FragCoord.x,20.)<10.?1.:0.;
      float y=mod(time+gl_FragCoord.y,20.)<10.?1.:0.;
      // gl_FragColor=vec4(vec3(min(x,y)),1.);
      gl_FragColor=vec4(1., 0, 0,1.);
    }
  `
};

function LightBar(): JSX.Element {
  return (
    <mesh position={[0, -1.44 + 0.5, 0]}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <shaderMaterial attach="material" args={[mat]} />
      {/* <meshStandardMaterial attach="material" color="red" wireframe /> */}
    </mesh>
  );
}

export default LightBar;
