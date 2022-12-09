import React, { forwardRef, Suspense, useCallback } from 'react';
import { Group } from 'three';
import useStore from '../../store';
import Apartment from '../Buildings/components/Apartment';
import Skyscraper from '../Buildings/components/Skyscraper';
import Office from '../Buildings/components/Office';
import Hotel from '../Buildings/components/Hotel';
import Government from '../Buildings/components/Government';
import Hospital from '../Buildings/components/Hospital';
import House from '../Buildings/components/House';
import Shop from '../Buildings/components/Shop';

interface EditorMarkProps {
  y: number;
}

function EditorMark({ y }: EditorMarkProps, ref?: React.Ref<Group>): JSX.Element {
  const editorMark = useStore((state) => state.editorMark);

  const MarkComponent = useCallback((): JSX.Element | null => {
    switch (editorMark.type) {
      case 'apartment':
        return <Apartment placementMode rotationY={editorMark.rotationY} />;
      case 'office':
        return <Office placementMode rotationY={editorMark.rotationY} />;
      case 'skyscraper':
        return <Skyscraper placementMode rotationY={editorMark.rotationY} />;
      case 'hotel':
        return <Hotel placementMode rotationY={editorMark.rotationY} />;
      case 'government':
        return <Government placementMode rotationY={editorMark.rotationY} />;
      case 'house':
        return <House placementMode rotationY={editorMark.rotationY} />;
      case 'shop':
        return <Shop placementMode rotationY={editorMark.rotationY} />;
      case 'hospital':
        return <Hospital placementMode rotationY={editorMark.rotationY} />;
      default:
        return null;
    }
  }, [editorMark]);

  return (
    <group visible={false} ref={ref} position={[0, y, 0]}>
      <Suspense fallback={null}>
        <MarkComponent />
      </Suspense>
    </group>
  );
}

export default forwardRef(EditorMark);
