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
    width: 320,
    color: ({ exposure }: { exposure: number }) => {
      const colors3 = ['rgb(252 165 165)', 'rgb(253 224 71)', 'rgb(190 242 100)'];
      // custom colorMapping function
      const idx = exposure < 25 ? 0 : exposure > 75 ? 2 : 1;
      return colors3[idx];
    },
    colorField: 'exposure',
    size: [8, 8],
    yAxis: {
      title: {
        text: 'z'
      },
      nice: true,
      max: 50,
      min: 0
    },
    xAxis: {
      title: {
        text: 'x'
      },
      max: 50,
      min: 0
    },
    meta: {
      exposure: {
        type: 'linear'
      }
    }
  };
}
