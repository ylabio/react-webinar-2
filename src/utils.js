/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * Изменяет склонение слова при изменении количества выделений записи
 */
 export const changeWordDeclension=(num, var1, var2, var3)=>{
  const n=num%100;
  const n1=n%10;
  if(n>10&&n<20){
  return var3;
  }
  if(n1>1&&n1<5){
  return var2;
  }
  if(n1===1){
  return var1;
  }
  return var3;
  }