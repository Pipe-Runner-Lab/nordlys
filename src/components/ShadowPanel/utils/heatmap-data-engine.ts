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
  const firstR = output.splice(0, R);
  output = [...firstR.reverse(), ...output];
  return output;
};

export const generateConfig = (): object => {
  return {
    height: 320,
    width: 320,
    xAxis: {
      position: 'top',
      title: {
        text: 'x'
      }
    },
    yAxis: {
      title: {
        text: 'z'
      }
    },
    color: [
      'rgb(132 204 22)',
      'rgb(163 230 53)',
      'rgb(132 204 22)',
      'rgb(252 165 165)',
      'rgb(248 113 113)',
      'rgb(239 68 68)'
    ]
  };
};
