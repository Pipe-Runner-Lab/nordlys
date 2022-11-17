import { BuildingData } from '../../../store/store';

export function generateData(
  buildingDataMap: BuildingData[],
  blocked: string[],
  landmarkID: string
): Array<{ type: string; x: number; z: number }> {
  const output = [];
  for (const building of buildingDataMap) {
    const { x, z } = building;
    if (building.id === landmarkID) {
      output.push({
        type: 'Landmark',
        x: 50 - (x + 25),
        z: z + 25
      });
    } else {
      const type = blocked.includes(building.id) ? 'Blocked' : 'In Sight';
      output.push({ type, x: 50 - (x + 25), z: z + 25 });
    }
  }
  return output;
}

export function generateConfig(): object {
  return {
    colorField: 'type',
    shapeField: 'type',
    size: [8, 8],
    color: ({ type }: { type: string }) => {
      switch (type) {
        case 'Blocked':
          return 'red';
        case 'In Sight':
          return 'green';
        default:
          return 'yellow';
      }
    },
    shape: ({ type }: { type: string }) => {
      switch (type) {
        case 'Blocked':
          return 'square';
        case 'In Sight':
          return 'square';
        default:
          return 'triangle';
      }
    },
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
