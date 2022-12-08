import React from 'react';
import useStore from '../../store/store';
import clsx from 'clsx';

interface SimulationControlsProps {
  pauseable?: boolean;
  onStart?: () => void;
}

function SimulationControls({ pauseable = true, onStart }: SimulationControlsProps): JSX.Element {
  const simulationState = useStore((state) => state.simulationState);
  const simulationProgress = useStore((state) => state.simulationProgress);
  const setSimulationState = useStore((state) => state.setSimulationState);

  return (
    <>
      <div className="flex space-x-2">
        {pauseable ? (
          <>
            <button
              disabled={simulationProgress === 100}
              onClick={() => {
                simulationState === 'play'
                  ? setSimulationState('pause')
                  : setSimulationState('play');
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
          </>
        ) : (
          <button
            onClick={
              simulationState === 'play'
                ? () => {
                    setSimulationState('reset');
                  }
                : () => {
                    setSimulationState('play');
                    if (onStart != null) {
                      onStart();
                    }
                  }
            }
            className={clsx('h-9 rounded-md flex-1 shadow-lg', {
              'bg-green-300 ': simulationState === 'reset',
              'bg-red-300 ': simulationState === 'play'
            })}>
            {simulationState === 'play' ? 'Stop Computation' : 'Start Computation'}
          </button>
        )}
      </div>
      <div>
        <div className="w-full bg-blue-300 rounded-full h-1.5 mt-1 mb-2">
          <div
            className="bg-blue-500 h-1.5 rounded-full"
            style={{ width: `${simulationProgress}%` }}></div>
        </div>
      </div>
    </>
  );
}

export default SimulationControls;
