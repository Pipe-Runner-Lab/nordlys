import React, { forwardRef, useCallback } from 'react';
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
  const editorMarkType = useStore((state) => state.editorMarkType);

  const MarkComponent = useCallback((): JSX.Element | null => {
    switch (editorMarkType) {
      case 'apartment':
        return <Apartment />;
      case 'office':
        return <Office />;
      case 'skyscraper':
        return <Skyscraper />;
      case 'hotel':
        return <Hotel />;
      case 'government':
        return <Government />;
      case 'house':
        return <House />;
      case 'shop':
        return <Shop />;
      case 'hospital':
        return <Hospital />;
      default:
        return null;
    }
  }, [editorMarkType]);

  return (
    <group visible={false} ref={ref} position={[0, y, 0]}>
      <MarkComponent />
    </group>
  );
}

export default forwardRef(EditorMark);
