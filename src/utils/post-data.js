export async function postData(url, data){
    try {
        const response = await fetch(url, {
          method: 'POST', // или 'PUT'
          body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const json = await response.json();
        return json;
      } catch (error) {
        console.error('Ошибка:', error);
      }
}