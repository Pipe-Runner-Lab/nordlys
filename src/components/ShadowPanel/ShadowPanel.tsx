import { Heatmap } from '@ant-design/plots';
import React, { useMemo } from 'react';
import useStore from '../../store/store';
import SimulationControls from '../SimulationControls';
import { generateConfig, generateData } from './utils/heatmap-data-engine';

function ShadowPanel(): JSX.Element {
  const simulationState = useStore((state) => state.simulationState);
  const shadowHeatMap = useStore((state) => state.shadowHeatMap);
  const setShadowHeatMap = useStore((state) => state.setShadowHeatMap);

  const heatData = generateData(shadowHeatMap);
  const heatConfig = useMemo(() => generateConfig(), []);

  return (
    <div className='className="flex flex-col flex-1 p-2 space-y-2'>
      <SimulationControls pauseable={false} onStart={() => setShadowHeatMap([])} />
      <div className="flex flex-col flex-1 p-2 space-y-2 border border-gray-400 border-solid rounded-md min-h-[60%]">
        <div className="flex items-center justify-center w-full py-1 rounded-sm bg-violet-300">
          Shadow Heatmap
        </div>
        <div className="flex items-center justify-center flex-1">
          {heatData.length > 0 ? (
            <Heatmap xField="x" yField="z" colorField="value" data={heatData} {...heatConfig} />
          ) : (
            <div>
              {simulationState === 'play'
                ? 'Collecting data...'
                : 'Start computation to collect data'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShadowPanel;
