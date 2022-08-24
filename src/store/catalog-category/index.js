import StateModule from "../module";

/**
 * Состояние каталога
 */
class CatalogCategory extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      waiting: false,
      categoryList:[]
    };
  }
InitCatory(obj){
  let categoryList={items:[]}
  let w=0
  for(let i=0;i<obj.items.length;i++) {
    if(!obj.items[i].parent){
    categoryList={...categoryList,...categoryList.items.push({...obj.items[i],weigth:`${w}`})}
    w++
    obj.items[i]=0
  }
}
obj.items=obj.items.filter(u=>u!=0)
do{
  for(let k=0;k<categoryList.items.length;k++) {
    for(let m=0;m<obj.items.length;m++) {
      if(obj.items[m].parent._id==categoryList.items[k]._id){
        categoryList={...categoryList,...categoryList.items.push({...obj.items[m],weigth:categoryList.items[k].weigth+`${m}`})}
    obj.items[m]=0
}
}
obj.items=obj.items.filter(u=>u!=0)
}
} while(obj.items.length>0)
function compare(a,b){
if (a.weigth<b.weigth) {return -1}
if (a.weigth>b.weigth) {return 1}
};
categoryList.items.sort(compare)
categoryList.items=categoryList.items.map(u=>{return {...u,title:'-'.repeat(u.weigth.length-1)+`${u.title}`}})
categoryList.items.unshift({title: 'Все',_id:''})
return categoryList.items
}
  /**
   * Загрузка категорий товаров
   * @param params
   * @param historyReplace {Boolean} Заменить адрес (true) или сделаит новую запис в истории браузера (false)
   * @returns {Promise<void>}
   */
  async setCategoryList(){
    this.setState({
      ...this.getState(),
      waiting: true
    });
    const responseCategori = await fetch(`api/v1/categories?limit=*&fields=items(title,parent(title))`)
    const obj = await responseCategori.json();
    const categoriList= this.InitCatory(obj.result)

    // Установка полученных данных и сброс признака загрузки
    this.setState({
      ...this.getState(),
      categoryList:categoriList,
      waiting: false
    });
  }
}
export default CatalogCategory;
