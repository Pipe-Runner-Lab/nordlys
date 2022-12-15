import clsx from 'clsx';
import React, { useEffect } from 'react';
import useStore from '../../store';
import Select from 'react-select';
import { BuildingType } from '../../store/store';

const options: Array<{ value: BuildingType; label: string }> = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'office', label: 'Office' },
  { value: 'skyscraper', label: 'Skyscraper' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'government', label: 'Government' },
  { value: 'house', label: 'House' },
  { value: 'shop', label: 'Shop' },
  { value: 'hospital', label: 'Hospital' }
];

function BuildingPanel(): JSX.Element {
  const buildingEditorMode = useStore((state) => state.buildingEditorMode);
  const removeBuilding = useStore((state) => state.removeBuilding);
  const setBuildingEditorMode = useStore((state) => state.setBuildingEditorMode);
  const selected = useStore((state) => state.selected);
  const clearSelected = useStore((state) => state.clearSelected);
  const setEditorMark = useStore((state) => state.setEditorMark);
  const editorMark = useStore((state) => state.editorMark);
  const restoreBuildings = useStore((state) => state.restoreBuildings);

  const isMoveActive = buildingEditorMode === 'move';
  const isAddActive = buildingEditorMode === 'insert';
  const isSelectedOne = selected != null && selected.length === 1;

  useEffect(() => {
    return () => {
      setBuildingEditorMode(undefined);
      clearSelected();
      restoreBuildings();
    };
  }, []);

  const deleteAll = (): void => {
    selected.forEach((id) => {
      removeBuilding(id);
    });
    clearSelected();
  };

  const isDeleteActive = selected.length > 0 && !isMoveActive;

  return (
    <div className="p-2 space-y-2">
      <div>
        <Select
          options={options}
          value={options.find((option) => option.value === editorMark.type)}
          defaultValue={options.find((option) => option.value === editorMark.type)}
          onChange={(item) => item != null && setEditorMark({ type: item.value })}
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
      <div className="space-y-2">
        {isSelectedOne && !isMoveActive && (
          <div className="flex items-center justify-center p-4 text-blue-700 bg-blue-200 border border-blue-400 border-solid rounded-md border-1">
            M : Move selected building
          </div>
        )}
        {isMoveActive && (
          <div className="flex items-center justify-center p-4 text-red-700 bg-red-200 border border-red-400 border-solid rounded-md border-1">
            Esc : Cancel move
          </div>
        )}
        {(isAddActive || isMoveActive) && (
          <div className="flex flex-col items-center justify-center p-4 space-y-1 text-yellow-700 bg-yellow-200 border border-yellow-400 border-solid rounded-md border-1">
            <div>Q : Rotate anticlockwise</div>
            <div>E : Rotate clockwise</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BuildingPanel;
