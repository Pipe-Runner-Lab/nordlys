import clsx from 'clsx';
import React, { useEffect } from 'react';
import useStore from '../../store';

function ShadowPanel(): JSX.Element {
  const simulationState = useStore((state) => state.simulationState);
  const setSimulationState = useStore((state) => state.setSimulationState);
  const simulationProgress = useStore((state) => state.simulationProgress);
  const setShadowMode = useStore((state) => state.setShadowMode);
  const shadowMode = useStore((state) => state.shadowMode);
  const shadowMarkers = useStore((state) => state.shadowMarkers);

  useEffect(() => {
    return () => {
      setShadowMode(undefined);
    };
  }, []);

  useEffect(() => {
    setSimulationState('reset');
  }, []);

  return (
    <div className="flex flex-col flex-1 p-2 space-y-2">
      <div className="flex space-x-2">
        <button
          disabled={simulationProgress === 100}
          onClick={() => {
            simulationState === 'play' ? setSimulationState('pause') : setSimulationState('play');
          }}
          className={clsx('h-9 rounded-md flex-1', {
            'bg-green-300 shadow-lg': simulationProgress < 100,
            'bg-gray-200 shadow-sm text-gray-400': simulationProgress === 100
          })}>
          {simulationState === 'play' ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={() => {
            setSimulationState('reset');
          }}
          className="flex-1 bg-red-300 rounded-md shadow-lg h-9">
          Reset
        </button>
      </div>
      <div>
        <div className="w-full bg-blue-300 rounded-full h-1.5 mt-1 mb-2">
          <div
            className="bg-blue-500 h-1.5 rounded-full"
            style={{ width: `${simulationProgress}%` }}></div>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-2 space-y-2 border border-gray-400 border-solid rounded-md">
        <div className="flex w-full space-x-1 ">
          <div className="flex items-center justify-center flex-1 py-1 rounded-sm bg-violet-300">
            Intensity Markers
          </div>
          <button
            onClick={() =>
              shadowMode === undefined ? setShadowMode('insert') : setShadowMode(undefined)
            }
            className={clsx('flex items-center justify-center py-1 rounded-sm w-28', {
              'bg-green-300 shadow-lg': shadowMode === 'insert',
              'bg-gray-300 shadow-lg': shadowMode === undefined
            })}>
            {shadowMode === undefined ? 'Start Adding' : 'Stop Adding'}
          </button>
        </div>
        <div className="space-y-1 overflow-auto">
          {shadowMarkers.map(({ x, z, intensity }, index) => (
            <div
              key={index}
              className="flex justify-between px-4 py-1 space-x-2 bg-indigo-200 rounded-sm">
              <div className="flex space-x-8">
                <div className="text-center">{Math.round(x)}</div>
                <div className="text-center">{Math.round(z)}</div>
              </div>
              <div className="text-center">{intensity}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-2 space-y-2 border border-gray-400 border-solid rounded-md">
        <div className="flex items-center justify-center w-full py-1 rounded-sm bg-violet-300">
          Shadow Map
        </div>
      </div>
    </div>
  );
}

export default ShadowPanel;
