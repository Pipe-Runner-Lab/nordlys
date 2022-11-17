import { Scatter } from '@ant-design/charts';
import { Pie } from '@ant-design/plots';
import React, { useEffect, useMemo } from 'react';
import useStore from '../../store';
import {
  generateConfig as generatePieConfig,
  generateData as generatePieData
} from './utils/pie-data-engine';
import {
  generateConfig as generateScatterConfig,
  generateData as generateScatterData
} from './utils/scatter-data-engine';

const pieConfig = generatePieConfig();
const scatterConfig = generateScatterConfig();

function LandmarkPanel(): JSX.Element {
  const clearSelected = useStore((state) => state.clearSelected);
  const selected = useStore((state) => state.selected);
  const buildingDataMap = useStore((state) => state.buildingDataMap);
  const blocked = useStore((state) => state.blocked);

  const landmark = selected.length > 0 ? selected[0] : null;

  useEffect(() => {
    return () => {
      clearSelected();
    };
  }, []);

  const pieData = useMemo(() => {
    const data = generatePieData(buildingDataMap, blocked);
    return data;
  }, [landmark, blocked]);

  const scatterData = useMemo(() => {
    const data = generateScatterData(buildingDataMap, blocked, landmark ?? '');
    return data;
  }, [landmark, blocked]);

  return (
    <div className="p-2 space-y-2">
      {landmark != null ? (
        <div className="w-auto space-y-2">
          <div className="w-full text-lg text-center text-gray-700">Landmark Analysis</div>
          <div className="w-full px-2">
            <Scatter data={scatterData} xField="x" yField="z" {...scatterConfig} />
          </div>
          <div className="w-full">
            <Pie height={220} data={pieData} angleField="value" colorField="type" {...pieConfig} />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center p-4 text-red-700 border border-red-400 border-solid rounded-md bg-rose-200 border-1">
          Please select a landmark to begin analysis
        </div>
      )}
    </div>
  );
}

export default LandmarkPanel;
