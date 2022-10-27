import { linear } from 'math-interpolate';

type TProps = {
  startDate: number;
  targetDate: number;
};

// NOTE: ATTENTION! Derty function!

export const getCurrentPercentage = ({
  startDate: t0,
  targetDate: t100,
}: TProps): number => {
  const nowDate = new Date().getTime();
  const result = linear({
    x1: t0,
    y1: 0,
    x2: t100,
    y2: 100,
    x: nowDate,
  });

  return result;
};
