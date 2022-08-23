export async function postData(url, data){
    try {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
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