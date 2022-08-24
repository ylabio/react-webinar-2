//Незнаю получилось нечитабельное чудовище но вроде работает и свой велосипед как никак.
const categoriesTransformer = (arr) => {
  try {
    const copyArr = JSON.parse(JSON.stringify(arr));
    if (!copyArr) return null;

    let resArr = [];
    const categoriesObj = {};

    //Трансформируем массив в обьект
    copyArr.forEach((c) => {
      categoriesObj[c._id] = c;
    });

    //Ищем и мутируем вложенность обьектов
    copyArr.forEach((c) => mutSourceAddNesting(categoriesObj, c._id));
    //Очистка от вложенных обьектов исходного обьекта с категориями
    Object.keys(categoriesObj).forEach((key) => {
      if (categoriesObj[key].isNested) delete categoriesObj[key];
    });

    //Трансформируем обьект в массив
    const categoriesArr = [];
      Object.keys(categoriesObj).forEach((key) => {
      categoriesArr.push(categoriesObj[key]);
    })

    //Сортировка верхнего уровня
    categoriesArr.sort((a, b) => a.order > b.order);

    categoriesArr.forEach((c) => {
      //Трансформируем вложенный обьект в последовательный массив
      const arr = convertToArr(c);
      resArr = [...resArr, ...arr];
    });

    //END
    return resArr;
  } catch (err) {
    console.log('categoriesTransformer error:', err);
    return null;
  }

  //UTILS
  function mutSourceAddNesting(source, key) {
    if (source?.[key]?.parent) {
      if (source[key].isNested) return null;
      const parentId = source[key].parent._id;
      const parent = source[parentId];
      const child = source[key];

      if (parent.child) {
        parent.child.push(child);
      } else {
        parent.child = [child];
      }
      child.isNested = true;

      return mutSourceAddNesting(source, parentId);
    }

    return null;
  }

  function convertToArr(obj, _res = [{ id: obj._id, value: obj._id, title: obj.title }], _level = ' - ') {
    if (obj.child) {
      //Сортировка нижнего уровня
      obj.child.sort((a,b) => {a.order > b.order})
      obj.child.forEach(c => {
        _res.push({ id: c._id, value: c._id, title: _level + c.title });
        if (c.child) convertToArr(c, _res, '- ' + _level);
      })
    }
    return _res;
  }
};

export default categoriesTransformer;
