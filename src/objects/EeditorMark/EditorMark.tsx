import React, { forwardRef, useCallback } from 'react';
import { Group } from 'three';
import useStore from '../../store';
import BuildingA from '../buildings/components/BuildingA';
import BuildingB from '../buildings/components/BuildingB';

interface EditorMarkProps {
  baseHeight: number;
}

function EditorMark({ baseHeight }: EditorMarkProps, ref?: React.Ref<Group>): JSX.Element {
  const editorMarkType = useStore((state) => state.editorMarkType);

  const MarkComponent = useCallback((): JSX.Element | null => {
    switch (editorMarkType) {
      case 'apartment':
        return <BuildingA />;
      case 'office':
        return <BuildingB />;
      default:
        return null;
    }
  }, [editorMarkType]);

  return (
    <group visible={false} ref={ref} position={[0, baseHeight, 0]}>
      <MarkComponent />
    </group>
  );
}

export default forwardRef(EditorMark);
