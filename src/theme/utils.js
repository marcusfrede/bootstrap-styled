import unitUtils from '@bootstrap-styled/utils/lib/unitUtils';

const { detectUnit, rmUnit } = unitUtils;

/**
 * Helper used to keep false values provided by userTheme
 * @param userValue
 * @param defaultValue
 * @returns {*}
 */
export function allowFalseValue(userValue, defaultValue) {
  return userValue === false ? userValue : userValue || defaultValue;
}


export function assertAscending(map, mapName) {
  let prevKey;
  let prevNum;
  let asserted = true;
  Object.keys(map).forEach((key) => {
    const num = map[key];
    if (prevNum == null) {
      // do nothing
    } else if (!comparable(rmUnit(prevNum), rmUnit(num))) {
      /* istanbul ignore if */
      if (process.env.NODE !== 'test') {
        console.warn(`Potentially invalid value for ${mapName}: This map must be in ascending order, but key '${key}' has value ${num} whose unit makes it incomparable to ${prevNum}, the value of the previous key '${prevKey}' !`); // eslint-disable-line no-console
      }
      asserted = false;
    } else if (rmUnit(prevNum) >= rmUnit(num)) {
      /* istanbul ignore if */
      if (process.env.NODE !== 'test') {
        console.warn(`Invalid value for ${mapName}: This map must be in ascending order, but key '${key}' has value ${num} which isn't greater than ${prevNum}, the value of the previous key '${prevKey}' !`); // eslint-disable-line no-console
      }
      asserted = false;
    }
    prevKey = key;
    prevNum = num;
  });
  return asserted;
}

export function assertStartAtZero(map) {
  const values = Object.keys(map).map((key) => map[key]);
  const firstValue = rmUnit(values[0]);
  let asserted = true;
  if (firstValue !== 0) {
    if (process.env.NODE !== 'test') {
      console.warn(`First breakpoint in $grid-breakpoints must start at 0, but starts at ${firstValue}.`); // eslint-disable-line no-console
    }
    asserted = false;
  }
  return asserted;
}

export function comparable(a, b) {
  return !isNaN(a + b); // eslint-disable-line no-restricted-globals
}

export function negativifyMap(map) {
  if (map instanceof Map) {
    let result = new Map();
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of map) {
      if (key !== 0 && key !== '0') {
        const detectedUnit = detectUnit(value);
        const newValue = (rmUnit(value) * -1) + detectedUnit;
        result = new Map([
          ...result,
          ...new Map([[`n${key}`, newValue]]),
        ]);
      }
    }
    return result;
  }
  let result = {};
  Object.keys(map).forEach((key) => {
    if (key !== 0 && key !== '0') {
      const detectedUnit = detectUnit(map[key]);
      const newValue = (rmUnit(map[key]) * -1) + detectedUnit;
      result = {
        ...result,
        ...{ [`n${key}`]: newValue },
      };
    }
  });
  return result;
}

export default {
  assertAscending,
  assertStartAtZero,
  comparable,
  negativifyMap,
};
