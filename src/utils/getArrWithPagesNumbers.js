export default function getArrWithPagesNumbers(data){
    let count = 0;
    if(data.result.count % 10){
      count = parseInt(data.result.count/10 + 1)
    }else{
      count = data.result.count/10
    }
    const arr = []
    for(let i = 1 ; i <= count ; i++){
    arr.push(i)
    }  
    return arr;         
    
}
