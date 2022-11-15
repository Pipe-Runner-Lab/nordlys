import create from 'zustand';

type BuildingType = 'apartment' | 'office';

type EditModes = 'buildings' | 'landmark' | 'sky-exposure' | undefined;

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
}

const useStore = create<Store>((set) => ({
  buildingMap: [],
  addBuilding: (building) => set((state) => ({ buildingMap: [...state.buildingMap, building] })),
  removeBuilding: (id) =>
    set((state) => ({ buildingMap: state.buildingMap.filter((building) => building.id !== id) })),
  editMode: 'buildings',
  setEditMode: (mode) => set({ editMode: mode }),
  editorMarkType: 'apartment',
  setEditorMarkType: (type) => set({ editorMarkType: type })
}));

export default useStore;
