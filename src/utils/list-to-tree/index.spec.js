import listToTree from "./index";

describe('listToTree', () => {
  test('test1', () => {

    const list = [
      {_id: 2, title: 'Электроника', parent: null},
      {_id: 3, title: 'Телефоны', parent: {_id: 2}},
      {_id: 8, title: 'Книги', parent: null},
      {_id: 9, title: 'Учебники', parent: {_id: 8}},
      {_id: 6, title: 'Ноутбуки', parent: {_id: 2}},
      {_id: 7, title: 'Телевизоры', parent: {_id: 2}},
      {_id: 10, title: 'Художественная', parent: {_id: 8}},
      {_id: 11, title: 'Комиксы', parent: {_id: 8}},
      {_id: 4, title: 'Смартфоны', parent: {_id: 3}},
      {_id: 5, title: 'Аксессуары', parent: {_id: 3}},
    ]

    expect(listToTree(list)).toEqual([
      {
        _id: 2, title: "Электроника", parent: null, children: [
          {
            _id: 3, title: "Телефоны", parent: {_id: 2}, children: [
              {_id: 4, title: "Смартфоны", parent: {_id: 3}, children: []},
              {_id: 5, title: "Аксессуары", parent: {_id: 3}, children: []}
            ]
          },
          {_id: 6, title: "Ноутбуки", parent: {_id: 2}, children: []},
          {_id: 7, title: "Телевизоры", parent: {_id: 2}, children: []}
        ]
      },
      {
        _id: 8, title: "Книги", parent: null, children: [
          {_id: 9, title: "Учебники", parent: {_id: 8}, children: []},
          {_id: 10, title: "Художественная", parent: {_id: 8}, children: []},
          {_id: 11, title: "Комиксы", parent: {_id: 8}, children: []}
        ]
      }
    ]);
  });
});
