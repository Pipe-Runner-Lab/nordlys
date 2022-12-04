import create from 'zustand';

// Editor state
type EditModes = 'buildings' | 'landmark' | 'sky-exposure' | 'light';
type BuildingEditorMode = 'insert' | undefined;
type LightMarkerMode = 'insert' | undefined;
export interface ShadowMarker {
  id: string;
  x: number;
  z: number;
  intensity: number;
}

// Building Data
export type BuildingType =
  | 'apartment'
  | 'office'
  | 'skyscraper'
  | 'hotel'
  | 'government'
  | 'house'
  | 'shop'
  | 'hospital';
export interface BuildingData {
  id: string; // * id is being mapped to name since this is a uuid string
  // * and threeJS only supports integer ids
  x: number;
  y: number;
  z: number;
  type: BuildingType;
}

// Shadow Data
type simulationState = 'play' | 'pause' | 'reset';

interface Store {
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
  simulationState: simulationState;
  setSimulationState: (movement: simulationState) => void;
  simulationProgress: number;
  setSimulationProgress: (progress: number) => void;
  shadowMarkers: ShadowMarker[];
  lightMarkerMode: LightMarkerMode;
  setLightMarkerMode: (mode: LightMarkerMode) => void;
  addShadowMarkerPosition: (position: ShadowMarker) => void;
  updateShadowMarkers: (markers: ShadowMarker[]) => void;
  removeShadowMarkerPosition: (id: string) => void;
  clearShadowMarkerPositions: () => void;
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
      : set({
          isMenuOpen: isOpen,
          selected: [],
          blocked: [],
          buildingEditorMode: undefined,
          lightMarkerMode: undefined,
          simulationState: 'reset',
          simulationProgress: 0
        }),
  buildingEditorMode: undefined,
  setBuildingEditorMode: (mode) => set({ buildingEditorMode: mode }),
  selected: [],
  setSelected: (ids) => set({ selected: ids }),
  clearSelected: () => set({ selected: [] }),
  blocked: [],
  setBlocked: (ids) => set({ blocked: ids }),
  clearBlocked: () => set({ blocked: [] }),
  simulationState: 'reset',
  setSimulationState: (movement) =>
    set((state) => ({
      simulationState: movement,
      simulationProgress: movement === 'reset' ? 0 : state.simulationProgress
    })),
  simulationProgress: 0,
  setSimulationProgress: (progress) => set({ simulationProgress: progress }),
  shadowMarkers: [],
  lightMarkerMode: undefined,
  setLightMarkerMode: (mode) => set({ lightMarkerMode: mode }),
  addShadowMarkerPosition: (marker) =>
    set((state) => ({ shadowMarkers: [...state.shadowMarkers, marker] })),
  updateShadowMarkers: (markers) => set({ shadowMarkers: markers }),
  removeShadowMarkerPosition: (id) =>
    set((state) => ({
      shadowMarkers: state.shadowMarkers.filter((marker) => marker.id !== id)
    })),
  clearShadowMarkerPositions: () => set({ shadowMarkers: [] })
}));

export default useStore;
