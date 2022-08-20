import diff from "./index.js";

describe('Test diff', () => {

  test('simple', () => {
    expect(diff({a: 1, b: 2}, {})).toEqual({a: 1, b: 2});
    expect(diff({a: 1, b: 2}, {b: 2})).toEqual({a: 1});
    expect(diff({a: 1, b: 2}, {b: 2, a: 1})).toEqual(undefined);
  });

  test('deep', () => {
    const s = {a: 1, b: 2, c: {n1: 10, n2: {y: 1, x: 9}}};
    expect(diff(s, {})).toEqual(s);
    expect(diff(s, {b: 2, c: {n2: {x: 9}}})).toEqual({a: 1, c: {n1: 10, n2: {y: 1}}});
    expect(diff(s, {b: 2, c: {n2: {y: 1, x: 9}}})).toEqual({a: 1, c: {n1: 10}});
  });
});
