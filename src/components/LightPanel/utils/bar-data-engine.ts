import { LightMarker } from '../../../store/store';

export const generateData = (
  data: LightMarker[]
): Array<{ position: string; intensity: number }> => {
  return data.map((marker) => ({
    position: `(${parseFloat(marker.x.toFixed(1))}, ${parseFloat(marker.z.toFixed(1))})`,
    intensity: parseFloat(marker.intensity.toFixed(2))
  }));
};

export const generateConfig = (): object => {
  return {
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6
      }
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false
      }
    },
    yAxis: {
      max: 1,
      min: 0
    }
  };
};
