import { ShadowHeatMap } from '../../../store/store';
import { R } from '../../../objects/ShadowAnalyser/utils/heatmapCalculator';

export const generateData = (
  data: ShadowHeatMap
): Array<{ x: string; z: string; value: number }> => {
  let output = data?.map(({ x, z, value }) => ({
    x: x.toString(),
    z: z.toString(),
    value
  }));

  output = output.reverse();
  console.log(output);
  const firstR = output.splice(0, R);
  output = [...firstR.reverse(), ...output];
  return output;
};

export const generateConfig = (): object => {
  return {
    height: 320,
    width: 320,
    xAxis: {
      position: 'top'
    },
    yAxis: {},
    color: [
      'rgb(203 213 225)',
      'rgb(148 163 184)',
      'rgb(100 116 139)',
      'rgb(71 85 105)',
      'rgb(51 65 85)',
      'rgb(30 41 59)'
    ]
  };
};
