import { BuildingData } from '../../../store/store';

export function generateData(
  buildingDataMap: BuildingData[],
  blocked: string[]
): Array<{ type: string; value: number }> {
  const numBlocked = blocked.length;
  const numUnblocked = buildingDataMap.length - numBlocked;

  return [
    {
      type: 'Blocked',
      value: numBlocked
    },
    {
      type: 'In Sight',
      value: numUnblocked
    }
  ];
}

export function generateConfig(): object {
  return {
    appendPadding: [0, 0, 0, 0],
    radius: 0.75,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }: { percent: number }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center'
      }
    },
    interactions: [
      {
        type: 'element-active'
      }
    ]
  };
}
