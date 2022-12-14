import create from 'zustand';
import { defaultCity } from '../constants/defaultCity';

// Editor state
type EditModes = 'buildings' | 'landmark' | 'sky-exposure' | 'light' | 'shadow';
type BuildingEditorMode = 'insert' | 'move' | undefined;

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
  rotationY?: number;
  type: BuildingType;
}

// Simulation Data
type simulationState = 'play' | 'pause' | 'reset';

// Light Data
type LightMarkerMode = 'insert' | undefined;
export interface LightMarker {
  id: string;
  x: number;
  z: number;
  intensity: number;
}

// Shadow Data
export type ShadowHeatMap = Array<{ x: number; z: number; value: number }>;

// Light Data
type SkyMarkerMode = 'insert' | undefined;
export interface SkyMarker {
  id: string;
  x: number;
  z: number;
  exposure: number;
}

interface Store {
  buildingDataMap: BuildingData[];
  insertBuilding: (args: BuildingData) => void;
  removeBuilding: (id: string) => void;
  editMode: EditModes;
  setEditMode: (mode: EditModes) => void;
  editorMark: { type: BuildingType; rotationY?: number };
  setEditorMark: (args: { type: BuildingType; rotationY?: number }) => void;
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
  lightMarkers: LightMarker[];
  lightMarkerMode: LightMarkerMode;
  setLightMarkerMode: (mode: LightMarkerMode) => void;
  addLightMarker: (position: LightMarker) => void;
  updateLightMarkers: (markers: LightMarker[]) => void;
  removeLightMarker: (id: string) => void;
  shadowHeatMap: ShadowHeatMap;
  setShadowHeatMap: (heatMap: ShadowHeatMap) => void;
  skyMarkers: SkyMarker[];
  skyMarkerMode: SkyMarkerMode;
  setSkyMarkerMode: (mode: SkyMarkerMode) => void;
  addSkyMarker: (position: SkyMarker) => void;
  updateSkyMarkers: (markers: SkyMarker[]) => void;
  removeSkyMarker: (id: string) => void;
}

const useStore = create<Store>((set) => ({
  buildingDataMap: defaultCity as BuildingData[],
  insertBuilding: (building) =>
    set((state) => ({ buildingDataMap: [...state.buildingDataMap, building] })),
  removeBuilding: (id) =>
    set((state) => ({
      buildingDataMap: state.buildingDataMap.filter((building) => building.id !== id)
    })),
  editMode: 'buildings',
  setEditMode: (mode) => set({ editMode: mode }),
  editorMark: { type: 'apartment' },
  setEditorMark: (args) => set({ editorMark: args }),
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
          skyMarkerMode: undefined,
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

  lightMarkers: [],
  lightMarkerMode: undefined,
  setLightMarkerMode: (mode) => set({ lightMarkerMode: mode }),
  addLightMarker: (marker) => set((state) => ({ lightMarkers: [...state.lightMarkers, marker] })),
  updateLightMarkers: (markers) => set({ lightMarkers: markers }),
  removeLightMarker: (id) =>
    set((state) => ({
      lightMarkers: state.lightMarkers.filter((marker) => marker.id !== id)
    })),

  shadowHeatMap: [],
  setShadowHeatMap: (heatMap) => set({ shadowHeatMap: heatMap }),

  skyMarkers: [],
  skyMarkerMode: undefined,
  setSkyMarkerMode: (mode) => set({ skyMarkerMode: mode }),
  addSkyMarker: (marker) => set((state) => ({ skyMarkers: [...state.skyMarkers, marker] })),
  updateSkyMarkers: (markers) => set({ skyMarkers: markers }),
  removeSkyMarker: (id) =>
    set((state) => ({
      skyMarkers: state.skyMarkers.filter((marker) => marker.id !== id)
    }))
}));

export default useStore;
