import React, { useEffect } from 'react';
import useStore from '../../store';

function BuildingPanel(): JSX.Element {
  const buildingEditorMode = useStore((state) => state.buildingEditorMode);
  const removeBuilding = useStore((state) => state.removeBuilding);
  const setBuildingEditorMode = useStore((state) => state.setBuildingEditorMode);
  const selectedBuildingIds = useStore((state) => state.selectedBuildingIds);

  useEffect(() => {
    return () => {
      setBuildingEditorMode(undefined);
    };
  }, []);

  const deleteAll = (): void => {
    selectedBuildingIds.forEach((id) => {
      removeBuilding(id);
    });
    console.log('delete all');
  };

  return (
    <div className="p-2">
      <button
        onClick={() => {
          buildingEditorMode !== 'insert'
            ? setBuildingEditorMode('insert')
            : setBuildingEditorMode(undefined);
        }}>
        Insert Mode
      </button>
      <button onClick={deleteAll}>Delete Selected ({selectedBuildingIds.length})</button>

      {/* If person selects something from table, we disable add mode */}
    </div>
  );
}

export default BuildingPanel;
