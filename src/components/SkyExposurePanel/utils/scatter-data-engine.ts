import { SkyMarker } from '../../../store/store';

export function generateData(
  skyMarkers: SkyMarker[]
): Array<{ exposure: number; x: number; z: number }> {
  const output = [];
  for (const marker of skyMarkers) {
    const { x, z, exposure } = marker;
    output.push({ x: 50 - (x + 25), z: z + 25, exposure });
  }
  return output;
}

export function generateConfig(): object {
  return {
    colorField: 'exposure',
    size: [8, 8],
    yAxis: {
      nice: true,
      line: {
        style: {
          stroke: '#aaa'
        }
      },
      max: 50,
      min: 0
    },
    xAxis: {
      max: 50,
      min: 0
    }
  };
}
