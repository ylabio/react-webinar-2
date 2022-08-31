import treeToList from "./index";

describe('treeToList', () => {
  test('test1', () => {

    const tree = [
      {
        _id: 2, title: "Электроника", children: [
          {
            _id: 3, title: "Телефоны", children: [
              {
                _id: 4, title: "Смартфоны", children: [
                  {_id: 5, title: "Аксессуары", children: []}
                ]
              },
            ]
          },
          {_id: 6, title: "Ноутбуки", children: []},
          {_id: 7, title: "Телевизоры", children: []}
        ]
      },
      {
        _id: 8, title: "Книги", children: [
          {_id: 9, title: "Учебники", children: []},
          {_id: 10, title: "Художественная", children: []},
          {_id: 11, title: "Комиксы", children: []}
        ]
      }
    ]

    const cb = (item, level) => ({value: item._id, title: '- '.repeat(level) + item.title});

    expect(treeToList(tree, cb)).toEqual([
      {value: 2, title: 'Электроника'},
      {value: 3, title: '- Телефоны'},
      {value: 4, title: '- - Смартфоны'},
      {value: 5, title: '- - - Аксессуары'},
      {value: 6, title: '- Ноутбуки'},
      {value: 7, title: '- Телевизоры'},
      {value: 8, title: 'Книги'},
      {value: 9, title: '- Учебники'},
      {value: 10, title: '- Художественная'},
      {value: 11, title: '- Комиксы'},
    ]);
  });
});
