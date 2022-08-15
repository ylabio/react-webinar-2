import pluralRu from "plural-ru";
import pluralEng from "pluralize";

export default function plural(amount, languageName){
  if (languageName === 'Русский'){
    return pluralRu(amount, 'товар', 'товара', 'товаров');
  }
  else{
    return pluralEng('product', amount);
  }
}
