import { OrbitControls } from '@react-three/drei';
import React from 'react';
import useStore from '../../store';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

function Controls(): JSX.Element {
  const isMenuOpen = useStore((state) => state.isMenuOpen);
  const orbitControlsRef = React.useRef<OrbitControlsImpl>(null);

  // TODO: Smooth Pan
  // useEffect(() => {
  //   if (!isMenuOpen && orbitControlsRef.current !== null) {
  //     orbitControlsRef.current.target.set(0, 0, 0);
  //   }
  // }, [isMenuOpen]);

  return (
    <OrbitControls
      ref={orbitControlsRef}
      autoRotate={!isMenuOpen}
      autoRotateSpeed={0.2}
      minPolarAngle={-Math.PI / 2}
      maxPolarAngle={Math.PI / 2.1}
    />
  );
}

export default Controls;
