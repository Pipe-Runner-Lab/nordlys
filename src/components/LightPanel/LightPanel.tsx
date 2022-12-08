import clsx from 'clsx';
import React, { useEffect, useMemo } from 'react';
import useStore from '../../store';
import { Column } from '@ant-design/plots';
import { AiOutlineDelete as DeleteIcon } from 'react-icons/ai';
import { generateConfig, generateData } from './utils/bar-data-engine';
import SimulationControls from '../SimulationControls';

function LightPanel(): JSX.Element {
  const setSimulationState = useStore((state) => state.setSimulationState);
  const setLightMarkerMode = useStore((state) => state.setLightMarkerMode);
  const lightMarkerMode = useStore((state) => state.lightMarkerMode);
  const lightMarkers = useStore((state) => state.lightMarkers);
  const removeLightMarker = useStore((state) => state.removeLightMarker);

  useEffect(() => {
    return () => {
      setLightMarkerMode(undefined);
    };
  }, []);

  useEffect(() => {
    setSimulationState('reset');
  }, []);

  const barData = generateData(lightMarkers);

  const barConfig = useMemo(() => generateConfig(), []);

  return (
    <div className="flex flex-col flex-1 p-2 space-y-2">
      <SimulationControls />

      <div className="flex flex-col p-2 space-y-2 border border-gray-400 border-solid rounded-md">
        <div className="flex w-full space-x-1 ">
          <div className="flex items-center justify-center flex-1 py-1 rounded-sm bg-violet-300">
            Intensity Markers
          </div>
          <button
            onClick={() =>
              lightMarkerMode === undefined
                ? setLightMarkerMode('insert')
                : setLightMarkerMode(undefined)
            }
            className={clsx('flex items-center justify-center py-1 rounded-sm w-28', {
              'bg-green-300 shadow-lg': lightMarkerMode === 'insert',
              'bg-gray-300 shadow-lg': lightMarkerMode === undefined
            })}>
            {lightMarkerMode === undefined ? 'Start Adding' : 'Stop Adding'}
          </button>
        </div>
        <div className="space-y-1 overflow-auto h-[240px] max-h-[240px]">
          {lightMarkers.map(({ x, z, intensity, id }, index) => (
            <div
              key={index}
              className="flex justify-between py-1 pl-4 pr-2 space-x-2 bg-indigo-200 rounded-sm">
              <div className="flex space-x-8">
                <div className="text-center">
                  ({x.toFixed(2)}, {z.toFixed(2)})
                </div>
              </div>
              <div>
                <button
                  className="flex items-center justify-center w-6 bg-red-200 border border-red-400 border-solid rounded-full aspect-square"
                  onClick={() => removeLightMarker(id)}>
                  <DeleteIcon className="fill-red-500" />
                </button>
              </div>
              {/* <div className="text-center">{intensity}</div> */}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-2 space-y-2 border border-gray-400 border-solid rounded-md">
        <div className="flex items-center justify-center w-full py-1 rounded-sm bg-violet-300">
          Light graph
        </div>
        <div className="flex items-end justify-center flex-1">
          <Column height={260} data={barData} xField="position" yField="intensity" {...barConfig} />
        </div>
      </div>
    </div>
  );
}

export default LightPanel;
