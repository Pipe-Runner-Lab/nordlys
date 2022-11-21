import clsx from 'clsx';
import React, { useEffect } from 'react';
import useStore from '../../store';

function ShadowPanel(): JSX.Element {
  const simulationState = useStore((state) => state.simulationState);
  const setSimulationState = useStore((state) => state.setSimulationState);
  const simulationProgress = useStore((state) => state.simulationProgress);

  useEffect(() => {
    setSimulationState('reset');
  }, []);

  return (
    <div className="p-2 space-y-2">
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
        <div className="w-full bg-blue-300 rounded-full h-1.5 mb-4">
          <div
            className="bg-blue-500 h-1.5 rounded-full"
            style={{ width: `${simulationProgress}%` }}></div>
        </div>
      </div>
    </div>
  );
}

export default ShadowPanel;
