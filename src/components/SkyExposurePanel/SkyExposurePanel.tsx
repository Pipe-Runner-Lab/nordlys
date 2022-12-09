import React, { useEffect, useMemo } from 'react';
import useStore from '../../store/store';
import { Scatter } from '@ant-design/plots';
import clsx from 'clsx';
import { AiOutlineDelete as DeleteIcon } from 'react-icons/ai';
import { generateData, generateConfig } from './utils/scatter-data-engine';

const scatterConfig = generateConfig();

function SkyExposureAnalyser(): JSX.Element {
  const setSimulationState = useStore((state) => state.setSimulationState);
  const setSkyMarkerMode = useStore((state) => state.setSkyMarkerMode);
  const skyMarkerMode = useStore((state) => state.skyMarkerMode);
  const skyMarkers = useStore((state) => state.skyMarkers);
  const removeSkyMarker = useStore((state) => state.removeSkyMarker);

  useEffect(() => {
    return () => {
      setSkyMarkerMode(undefined);
    };
  }, []);

  useEffect(() => {
    setSimulationState('reset');
  }, []);

  const data = useMemo(() => generateData(skyMarkers), [skyMarkers]);

  return (
    <div className="flex flex-col flex-1 p-2 space-y-2">
      <div className="flex flex-col p-2 space-y-2 border border-gray-400 border-solid rounded-md">
        <div className="flex w-full space-x-1 ">
          <div className="flex items-center justify-center flex-1 py-1 rounded-sm bg-violet-300">
            Exposure Markers
          </div>
          <button
            onClick={() =>
              skyMarkerMode === undefined ? setSkyMarkerMode('insert') : setSkyMarkerMode(undefined)
            }
            className={clsx('flex items-center justify-center py-1 rounded-sm w-28', {
              'bg-green-300 shadow-lg': skyMarkerMode === 'insert',
              'bg-gray-300 shadow-lg': skyMarkerMode === undefined
            })}>
            {skyMarkerMode === undefined ? 'Start Adding' : 'Stop Adding'}
          </button>
        </div>
        <div className="space-y-1 overflow-auto h-[180px] max-h-[240px]">
          {skyMarkers.map(({ x, z, exposure, id }, index) => (
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
                  onClick={() => removeSkyMarker(id)}>
                  <DeleteIcon className="fill-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-2 space-y-2 border border-gray-400 border-solid rounded-md">
        <div className="flex items-center justify-center w-full py-1 rounded-sm bg-violet-300">
          Exposure Map
        </div>
        <div className="flex items-end justify-center flex-1">
          <Scatter data={data} xField="x" yField="z" {...scatterConfig} />
        </div>
      </div>
    </div>
  );
}

export default SkyExposureAnalyser;
