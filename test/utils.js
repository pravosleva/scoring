/* eslint-disable no-undef */
'use strict'
import {
  expect,
  // assert,
} from 'chai'
import { getTargetDate, getCurrentPercentage, getSpeeds } from '../dist/index.js'
// import { Map } from 'immutable'

describe('utils', () => {
  // it('1. linear', () => {
  //   const expectedVal = 1.5

  //   assert(linear({ x: 0.5, x1: 0, y1: 1, x2: 1, y2: 2 }) === expectedVal, 'Fuckup :(')
  // })

  const items = [
    {
      forecastFinishDate: new Date(2022, 10, 17).getTime(),
      startDate: new Date(2022, 5, 17).getTime(),
      realFinishDate: new Date(2022, 11, 17).getTime(),
    },
    {
      forecastFinishDate: new Date(2022, 10, 27).getTime(),
      startDate: new Date(2022, 9, 17).getTime(),
      realFinishDate: new Date(2022, 11, 17).getTime(),
    },
    {
      forecastFinishDate: new Date(2022, 10, 13).getTime(),
      startDate: new Date(2022, 9, 25).getTime(),
      realFinishDate: new Date(2022, 11, 20).getTime(),
      complexity: 1,
    },
  ];
  const testData = {
    forecastFinishDate: new Date(2024, 10, 17).getTime(),
    startDate: new Date(2023, 5, 17).getTime(),
  };
  const testDiff = testData.forecastFinishDate - testData.startDate;

  // NOTE: Deep equal https://medium.com/building-ibotta/testing-arrays-and-objects-with-chai-js-4b372310fe6d
  it('getSpeeds: no complexity', () => {
    const speeds = getSpeeds({ items, testDiff });
    const expected = [53634070588.23529, 66715551219.5122, 132164715789.47368];

    expect(speeds).to.eql(expected);
  });

  it('getSpeeds: complexity= 1', () => {
    const speeds = getSpeeds({ items, testDiff, complexity: 1 });
    const expected = [132164715789.47368];

    expect(speeds).to.eql(expected);
  });

  it('getTargetDate: no complexity', () => {
    const startDate = new Date(2022, 0, 0).getTime();
    const targetDate = getTargetDate({
      items,
      testDiff,
      startDate,
    });
    const expected = 1773062715789;

    expect(targetDate).to.equal(expected);
  });

  it('getTargetDate: complexity= 0 (outside of items)', () => {
    const startDate = new Date(2022, 0, 0).getTime();
    const complexity = 0;
    const targetDate = getTargetDate({
      items,
      testDiff,
      startDate,
      complexity,
    });
    const expected = 1685739600000;
    // console.log(new Date(targetDate))

    expect(targetDate).to.equal(expected);
  });

  it('getTargetDate: complexity= 1 (inside)', () => {
    const startDate = new Date(2022, 0, 0).getTime();
    const complexity = 1;
    const targetDate = getTargetDate({
      items,
      testDiff,
      startDate,
      complexity,
    });
    const expected = 1773062715789;
    // console.log(new Date(targetDate))

    expect(targetDate).to.equal(expected);
  });

  it.skip('getCurrentPercentage: complexity= 0 (outside of items)', () => {
    const startDate = new Date(2022, 0, 0).getTime();
    const complexity = 0;
    const targetDate = getTargetDate({
      items,
      testDiff,
      startDate,
      complexity,
    });
    const currentPercentage = getCurrentPercentage({
      startDate,
      targetDate,
    });
    const expected = 57.839098341718405;

    expect(currentPercentage).to.equal(expected);
  });

  it.skip('getCurrentPercentage: complexity= 1', () => {
    const startDate = new Date(2022, 0, 0).getTime();
    const complexity = 0;
    const targetDate = getTargetDate({
      items,
      testDiff,
      startDate,
      complexity,
    });
    const currentPercentage = getCurrentPercentage({
      startDate,
      targetDate,
    });
    const expected = 19.623967391876793;

    expect(currentPercentage).to.equal(expected);
  });
})
