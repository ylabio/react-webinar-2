import StateModule from "../module";
import qs from 'qs';

const QS_OPTIONS = {
  stringify: {
    addQueryPrefix: true,
    arrayFormat: 'comma',
    encode: false
  },
  parse: {
    ignoreQueryPrefix: true,
    comma: true
  }
}

/**
 * Состояние каталога
 */
class CatalogState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items: [],
      count: 0,
      params: {
        page: 1,
        limit: 10,
        sort: 'order',
        query: '',
        category:'',
        
      },
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
   * Инициализация параметров.
   * Восстановление из query string адреса
   * @param params
   * @return {Promise<void>}
   */
  async initParams(params = {}){
    // Параметры из URl. Их нужно валидирвать, приводить типы и брать толкьо нужные
    const urlParams = qs.parse(window.location.search, QS_OPTIONS.parse) || {}
    let validParams = {};
    if (urlParams.page) validParams.page = Number(urlParams.page) || 1;
    if (urlParams.limit) validParams.limit = Number(urlParams.limit) || 10;
    if (urlParams.sort) validParams.sort = urlParams.sort;
    if (urlParams.query) validParams.query = urlParams.query;
    if (urlParams.category) validParams.category = urlParams.category;

// Итоговые параметры из начальных, из URL и из переданных явно
const newParams = {...this.initState().params, ...validParams, ...params};
// Установка параметров и подгрузка данных
await this.setParams(newParams, true);
}
/**
 * Сброс параметров к начальным
   * @param params
   * @return {Promise<void>}
   */
  async resetParams(params = {}){
    // Итоговые параметры из начальных, из URL и из переданных явно
    const newParams = {...this.initState().params, ...params};
    // Установк параметров и подгрузка данных
    await this.setParams(newParams);
  }

  /**
   * Устанвока параметров и загрузка списка товаров
   * @param params
   * @param historyReplace {Boolean} Заменить адрес (true) или сделаит новую запис в истории браузера (false)
   * @returns {Promise<void>}
   */
  async setParams(params = {}, historyReplace = false){
    const newParams = {...this.getState().params, ...params};

    // Установка новых параметров и признака загрузки
    this.setState({
      ...this.getState(),
      params: newParams,
      waiting: true
    });

    const skip = (newParams.page - 1) * newParams.limit;
    const response = await fetch(`/api/v1/articles?limit=${newParams.limit}&skip=${skip}&fields=items(*),count&sort=${newParams.sort}&search[query]=${newParams.query}${newParams.category?`&search[category]=${newParams.category}`:''}`);
    const json = await response.json();
    const responseCategori = await fetch(`api/v1/categories?fields=items(title,parent(title))`)
    const obj = await responseCategori.json();
    const categoriList= this.InitCatory(obj.result)

    // Установка полученных данных и сброс признака загрузки
    this.setState({
      ...this.getState(),
      items: json.result.items,
      count: json.result.count,
      categoryList:categoriList,
      waiting: false
    });

    // Запоминаем параметры в URL
    let queryString = qs.stringify(newParams, QS_OPTIONS.stringify);
    const url = window.location.pathname + queryString + window.location.hash;
    if (historyReplace) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }
  }
}

export default CatalogState;
