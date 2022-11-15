import create from 'zustand';

export type BuildingType = 'apartment' | 'office';

type EditModes = 'buildings' | 'landmark' | 'sky-exposure' | 'shadow';
type BuildingEditorMode = 'insert' | undefined;

interface Building {
  id: string;
  x: number;
  z: number;
  type: BuildingType;
}

interface Store {
  buildingMap: Building[];
  addBuilding: (args: Building) => void;
  removeBuilding: (id: string) => void;
  editMode: EditModes;
  setEditMode: (mode: EditModes) => void;
  editorMarkType: BuildingType;
  setEditorMarkType: (type: BuildingType) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  buildingEditorMode: BuildingEditorMode;
  setBuildingEditorMode: (mode: BuildingEditorMode) => void;
  selectedBuildingIds: string[];
  setSelectedBuildingIds: (ids: string[]) => void;
  clearSelectedBuildingIds: () => void;
}

const useStore = create<Store>((set) => ({
  buildingMap: [],
  addBuilding: (building) => set((state) => ({ buildingMap: [...state.buildingMap, building] })),
  removeBuilding: (id) =>
    set((state) => ({ buildingMap: state.buildingMap.filter((building) => building.id !== id) })),
  editMode: 'buildings',
  setEditMode: (mode) => set({ editMode: mode }),
  editorMarkType: 'apartment',
  setEditorMarkType: (type) => set({ editorMarkType: type }),
  isMenuOpen: false,
  // * We reset everything when we close the menu
  setIsMenuOpen: (isOpen) =>
    isOpen
      ? set({ isMenuOpen: isOpen })
      : set({ isMenuOpen: isOpen, selectedBuildingIds: [], buildingEditorMode: undefined }),
  buildingEditorMode: undefined,
  setBuildingEditorMode: (mode) => set({ buildingEditorMode: mode }),
  selectedBuildingIds: [],
  setSelectedBuildingIds: (ids) => set({ selectedBuildingIds: ids }),
  clearSelectedBuildingIds: () => set({ selectedBuildingIds: [] })
}));

export default useStore;
