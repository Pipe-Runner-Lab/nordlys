import clsx from 'clsx';
import React, { useEffect } from 'react';
import useStore from '../../store';
import Select from 'react-select';
import { BuildingType } from '../../store/store';

const options: Array<{ value: BuildingType; label: string }> = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'office', label: 'Office' }
];

function BuildingPanel(): JSX.Element {
  const buildingEditorMode = useStore((state) => state.buildingEditorMode);
  const removeBuilding = useStore((state) => state.removeBuilding);
  const setBuildingEditorMode = useStore((state) => state.setBuildingEditorMode);
  const selectedBuildingIds = useStore((state) => state.selectedBuildingIds);
  const clearSelectedBuildingIds = useStore((state) => state.clearSelectedBuildingIds);
  const setEditorMarkType = useStore((state) => state.setEditorMarkType);
  const editorMarkType = useStore((state) => state.editorMarkType);

  useEffect(() => {
    return () => {
      setBuildingEditorMode(undefined);
    };
  }, []);

  const deleteAll = (): void => {
    selectedBuildingIds.forEach((id) => {
      removeBuilding(id);
    });
    clearSelectedBuildingIds();
  };

  const isDeleteActive = selectedBuildingIds.length > 0;

  return (
    <div className="p-2 space-y-2">
      <div>
        <Select
          options={options}
          value={options.find((option) => option.value === editorMarkType)}
          defaultValue={options.find((option) => option.value === editorMarkType)}
          onChange={(item) => item != null && setEditorMarkType(item.value)}
        />
      </div>
      <div className="flex flex-row space-x-2">
        <button
          disabled={isDeleteActive}
          onClick={() => {
            buildingEditorMode !== 'insert'
              ? setBuildingEditorMode('insert')
              : setBuildingEditorMode(undefined);
          }}
          className={clsx('h-9 rounded-md flex-1', {
            'bg-green-300 shadow-lg': buildingEditorMode === 'insert',
            'bg-gray-300 shadow-lg': buildingEditorMode === undefined,
            'bg-gray-200 shadow-sm text-gray-400': isDeleteActive
          })}>
          Insert Mode
        </button>
        <button
          disabled={!isDeleteActive}
          onClick={deleteAll}
          className={clsx(
            'h-9 rounded-md  flex-1',
            isDeleteActive ? 'bg-blue-200 shadow-lg' : 'bg-gray-200 shadow-sm text-gray-400'
          )}>
          Delete
        </button>
      </div>

      {/* If person selects something from table, we disable add mode */}
    </div>
  );
}

export default BuildingPanel;
