/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSpeeds } from './getSpeeds';

type TItem = {
  forecastFinishDate: number;
  startDate: number;
  realFinishDate: number;
  complexity?: number;
};
interface IPossibleItem extends TItem {
  [key: string]: any;
}
type TProps = {
  startDate: number;
  items: IPossibleItem[];
  testDiff: number;
  complexity?: number;
};

export const getTargetDate = ({
  items,
  testDiff,
  startDate,
  complexity,
}: TProps): number => {
  const sortedSpeeds = getSpeeds({ items, testDiff, complexity });
  const chartData = [
    ['Time', 'Предполагаемый процент выполнения'],
    ...sortedSpeeds.map((e, i, a) => [
      new Date(e + startDate).getTime(),
      (i + 1) * (100 / a.length),
    ]),
  ];
  const lastDataElement = chartData[chartData.length - 1]; // For example: ['8/25/2020', 100]
  const targetDate = new Date(lastDataElement[0]).getTime();

  return targetDate || new Date(startDate + testDiff).getTime();
};
