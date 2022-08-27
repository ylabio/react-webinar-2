export default {
  load: (_id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: "comments/load" });

      try {
        const json = await services.api.request({
          url: `/api/v1/comments?search%5Bparent%5D=${_id}&limit=*&skip=0&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type,_tree)),count`,
        });
        // const json2 = await services.api.request({
        //   url: `/api/v1/comments?lang=ru&fields=%2A`,
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     text: "очень вкусная булка",
        //     parent: { _id: "6308ea439548cf7f16d48f35", _type: "comment" },
        //   }),
        // });

        // Товар загружен успешно
        dispatch({
          type: "comments/load-success",
          payload: { data: json.result.items, count: json.result.count },
        });
        console.log(json.result.items);
      } catch (e) {
        // Ошибка при загрузке
        dispatch({ type: "comments/load-error" });
      }
    };
  },
};

// const json = await services.api.request({
//   url: `/api/v1/comments?lang=ru&fields=%2A`,
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     text: "test comment",
//     parent: { _id: '6304a836deec4c4f8927d08b', _type:'article'},
//   }),
// });
