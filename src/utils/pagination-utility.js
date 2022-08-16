/**
 * утилита расчета массива для пагинации
 * @return {pagination}
 */
export default function PaginationUtility(page, count){
    let pagination = [];
    let lastPage = Math.round(count/10);
    //сборка для элемента пагинации
    if (page < 3) {
    for (let i = 1 ; i < 7 ; i++){
        if(i < 4)  
        pagination.push(i);
        if (i === 4)
        pagination.push('...');
    }
    pagination.push(lastPage);
    }
    //сборка для элемента пагинации
    if (page === 3) {
    for (let i = 1 ; i < 7 ; i++){
        if(i <= 4)  
        pagination.push(i);
        if (i === 5)
        pagination.push('...');
    }
    pagination.push(lastPage);
    }
    //сборка для элемента пагинации
    if ((page > 3) && (page < lastPage-2)) {
    pagination.push(1);
    pagination.push('...');
    for (let i = 0 ; i < 3 ; i++){
        if((i <= 5))  
        pagination.push(i+page-1);
    }
    pagination.push('...');
    pagination.push(lastPage);
    }
    //сборка для элемента пагинации
    if ((page > 3) && (page === lastPage-2 || page === lastPage-1)) {
    pagination.push(1);
    pagination.push('...');
    for (let i = 0 ; i < 3 ; i++){
        if(i <= 3)  
        pagination.push(i+page-1);
    }
    if (page === lastPage-2)
        pagination.push(lastPage);
    }
    //сборка для элемента пагинации
    if ((page > 3) && (page === lastPage)){
    pagination.push(1);
    pagination.push('...');
    for (let i = 0 ; i < 3 ; i++){
        pagination.push(i+page-2);
    }
    }
    return pagination;
}