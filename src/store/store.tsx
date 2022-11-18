import create from 'zustand';

// Editor state
type EditModes = 'buildings' | 'landmark' | 'sky-exposure' | 'shadow';
type BuildingEditorMode = 'insert' | undefined;

// Building Data
export type BuildingType = 'apartment' | 'office' | 'empirestate';
export interface BuildingData {
  id: string; // * id is being mapped to name since this is a uuid string
  // * and threeJS only supports integer ids
  x: number;
  y: number;
  z: number;
  type: BuildingType;
}

interface Store {
  [x: string]: any;
  buildingDataMap: BuildingData[];
  insertBuilding: (args: BuildingData) => void;
  removeBuilding: (id: string) => void;
  editMode: EditModes;
  setEditMode: (mode: EditModes) => void;
  editorMarkType: BuildingType;
  setEditorMarkType: (type: BuildingType) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  buildingEditorMode: BuildingEditorMode;
  setBuildingEditorMode: (mode: BuildingEditorMode) => void;
  selected: string[];
  setSelected: (ids: string[]) => void;
  clearSelected: () => void;
  blocked: string[];
  setBlocked: (ids: string[]) => void;
  clearBlocked: () => void;
}

const useStore = create<Store>((set) => ({
  buildingDataMap: [],
  insertBuilding: (building) =>
    set((state) => ({ buildingDataMap: [...state.buildingDataMap, building] })),
  removeBuilding: (id) =>
    set((state) => ({
      buildingDataMap: state.buildingDataMap.filter((building) => building.id !== id)
    })),
  editMode: 'buildings',
  setEditMode: (mode) => set({ editMode: mode }),
  editorMarkType: 'apartment',
  setEditorMarkType: (type) => set({ editorMarkType: type }),
  isMenuOpen: false,
  // * We reset everything when we close the menu
  setIsMenuOpen: (isOpen) =>
    isOpen
      ? set({ isMenuOpen: isOpen })
      : set({ isMenuOpen: isOpen, selected: [], blocked: [], buildingEditorMode: undefined }),
  buildingEditorMode: undefined,
  setBuildingEditorMode: (mode) => set({ buildingEditorMode: mode }),
  selected: [],
  setSelected: (ids) => set({ selected: ids }),
  clearSelected: () => set({ selected: [] }),
  blocked: [],
  setBlocked: (ids) => set({ blocked: ids }),
  clearBlocked: () => set({ blocked: [] })
}));

export default useStore;
