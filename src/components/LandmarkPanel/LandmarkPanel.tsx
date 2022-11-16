import React, { useEffect } from 'react';
import useStore from '../../store';

function LandmarkPanel(): JSX.Element {
  const clearSelectedBuildingIds = useStore((state) => state.clearSelectedBuildingIds);
  const selectedBuildingIds = useStore((state) => state.selectedBuildingIds);

  useEffect(() => {
    return () => {
      clearSelectedBuildingIds();
    };
  }, []);

  return (
    <div className="p-2 space-y-2">
      <div>
        Currently Selected Landmark:{' '}
        {selectedBuildingIds.length > 0 ? selectedBuildingIds[0] : 'None'}
      </div>
    </div>
  );
}

export default LandmarkPanel;
