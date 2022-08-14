import createPagination from "./createPagination";

describe('1 элемент активный', () => {
  test('Проверка значения на выходе', () => {
    expect(createPagination(1,1)).toEqual([1]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(1,2)).toEqual([1,2]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(1,3)).toEqual([1,2,3]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(1,4)).toEqual([1,2,3,4]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(1,5)).toEqual([1,2,3,4,5]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(1,6)).toEqual([1,2,3,null,6]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(1,7)).toEqual([1,2,3,null,7]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(1,8)).toEqual([1,2,3,null,8]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(1,9)).toEqual([1,2,3,null,9]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(1,10)).toEqual([1,2,3,null,10]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(1,100)).toEqual([1,2,3,null,100]);
  })
})

describe('2 элемент активный', () => {
  test('Проверка значения на выходе', () => {
    expect(createPagination(2,2)).toEqual([1,2]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(2,3)).toEqual([1,2,3]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(2,4)).toEqual([1,2,3,4]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(2,5)).toEqual([1,2,3,4,5]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(2,6)).toEqual([1,2,3,null,6]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(2,7)).toEqual([1,2,3,null,7]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(2,8)).toEqual([1,2,3,null,8]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(2,9)).toEqual([1,2,3,null,9]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(2,10)).toEqual([1,2,3,null,10]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(2,100)).toEqual([1,2,3,null,100]);
  })
})

describe('3 элемент активный', () => {
  test('Проверка значения на выходе', () => {
    expect(createPagination(3,3)).toEqual([1,2,3]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(3,4)).toEqual([1,2,3,4]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(3,5)).toEqual([1,2,3,4,5]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(3,6)).toEqual([1,2,3,4,null,6]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(3,7)).toEqual([1,2,3,4,null,7]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(3,8)).toEqual([1,2,3,4,null,8]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(3,9)).toEqual([1,2,3,4,null,9]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(3,10)).toEqual([1,2,3,4,null,10]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(3,100)).toEqual([1,2,3,4,null,100]);
  })
})

describe('4 элемент активный', () => {
  test('Проверка значения на выходе', () => {
    expect(createPagination(4,4)).toEqual([1,2,3,4]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(4,5)).toEqual([1,2,3,4,5]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(4,6)).toEqual([1,null,3,4,5,6]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(4,7)).toEqual([1,null,3,4,5,null,7]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(4,8)).toEqual([1,null,3,4,5,null,8]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(4,9)).toEqual([1,null,3,4,5,null,9]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(4,10)).toEqual([1,null,3,4,5,null,10]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(4,100)).toEqual([1,null,3,4,5,null,100]);
  })
})

describe('5 элемент активный', () => {
  test('Проверка значения на выходе', () => {
    expect(createPagination(5,5)).toEqual([1,2,3,4,5]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(5,6)).toEqual([1,null,4,5,6]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(5,7)).toEqual([1,null,4,5,6,7]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(5,8)).toEqual([1,null,4,5,6,null,8]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(5,9)).toEqual([1,null,4,5,6,null,9]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(5,10)).toEqual([1,null,4,5,6,null,10]);
  })
  test('Проверка значения на выходе', () => {
    expect(createPagination(5,100)).toEqual([1,null,4,5,6,null,100]);
  })
})