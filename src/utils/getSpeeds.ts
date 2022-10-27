/* eslint-disable @typescript-eslint/no-explicit-any */
type TItem = {
  forecastFinishDate: number;
  startDate: number;
  realFinishDate: number;
  complexity?: number;
};
interface IPossibleItem extends TItem {
  [key: string]: any;
}

export const _getSpeeds = (items: IPossibleItem[]): number[] =>
  items.map(
    (e) =>
      (e.forecastFinishDate / 1000 - e.startDate / 1000) /
      (e.realFinishDate / 1000 - e.startDate / 1000),
  );

export const getSpeeds = ({
  items,
  testDiff,
  complexity,
}: {
  items: IPossibleItem[];
  testDiff: number;
  complexity?: number;
}): number[] => {
  const speeds =
    typeof complexity === 'number' ?
      _getSpeeds(
          items.filter(
            ({ complexity: _complexity }) => _complexity === complexity,
          ),
        ) :
      _getSpeeds(items);

  return speeds.map((v) => testDiff / v).sort((e1, e2) => e1 - e2);
};
