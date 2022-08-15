import React, {useMemo} from "react";
import PagItem, {dots} from "../components/pagination-item";

/**
 * Возвращает массив с объектами элементов пагинации
 * @param pagNum {number} количество страниц в каталоге
 * @param pagSel {number} номер страницы со списком товаров из каталога
 * @returns {Array.<{sel: bool, pag: number, pagEl: JSX}>}
 */
const usePaginate = (pagNum, pagSel) => {
  return useMemo(() => {
    const pagArr = [];
    const pagEl = (idx) => <PagItem idx={idx}/>;
    const pagCheckSel = (i) => (i + 1) === pagSel;

    function PagData(idx) {
      this.sel = pagCheckSel(idx);
      this.pag = idx + 1;
      this.pagEl = pagEl(idx + 1);
    }

    if (pagSel < 3) {
      for (let i = 0; i < pagNum; i++) {
        if (i === 0) {
          pagArr.push(new PagData(i))
        } else if (i > 0 && i < 3) {
          pagArr.push(new PagData(i))
        } else if (i === 3) {
          pagArr.push(dots)
        } else if (i > 3 && i < (pagNum - 1)) {
        } else if (i === (pagNum - 1)) {
          pagArr.push(new PagData(i))
        }
      }
    } else if (pagSel === 3) {
      for (let i = 0; i < pagNum; i++) {
        if (i < 2) {
          pagArr.push(new PagData(i))
        } else if (i === 2) {
          pagArr.push(new PagData(i))
        } else if (i === 3) {
          pagArr.push(new PagData(i))
        } else if (i === 4) {
          pagArr.push(dots)
        } else if (i > 4 && i < (pagNum - 1)) {
        } else if (i === (pagNum - 1)) {
          pagArr.push(new PagData(i))
        }
      }
    } else if (pagSel > 3 && pagSel < (pagNum - 3)) {
      for (let i = 0; i < pagNum; i++) {
        if (i === 0) {
          pagArr.push(new PagData(i))
        } else if (i === 1) {
          pagArr.push(dots)
        } else if (i > (pagSel - 3) && i < (pagSel + 1)) {
          pagArr.push(new PagData(i))
        } else if (i === pagSel + 1) {
          pagArr.push(dots)
        } else if (i > (pagSel + 1) && i < (pagNum - 1)) {
        } else if (i === (pagNum - 1)) {
          pagArr.push(new PagData(i))
        }
      }
    } else if (pagSel === (pagNum - 3)) {
      for (let i = 0; i < pagNum; i++) {
        if (i === 0) {
          pagArr.push(new PagData(i))
        } else if (i === 1) {
          pagArr.push(dots)
        } else if (i > (pagNum - 6) && i < (pagNum - 2)) {
          pagArr.push(new PagData(i))
        } else if (i === pagNum - 2) {
          pagArr.push(dots)
        }else if (i === (pagNum - 1)) {
          pagArr.push(new PagData(i))
        }
      }
    } else if (pagSel === (pagNum - 2)) {
      for (let i = 0; i < pagNum; i++) {
        if (i === 0) {
          pagArr.push(new PagData(i))
        } else if (i === 1) {
          pagArr.push(dots)
        } else if (i > (pagNum - 5) && i < pagNum) {
          pagArr.push(new PagData(i))
        }
      }
    } else if (pagSel === (pagNum - 1)) {
      for (let i = 0; i < pagNum; i++) {
        if (i === 0) {
          pagArr.push(new PagData(i))
        } else if (i === 1) {
          pagArr.push(dots)
        } else if (i > (pagNum - 4) && i < pagNum) {
          pagArr.push(new PagData(i))
        }
      }
    } else if (pagSel === (pagNum)) {
      for (let i = 0; i < pagNum; i++) {
        if (i === 0) {
          pagArr.push(new PagData(i))
        } else if (i === 1) {
          pagArr.push(dots)
        } else if (i > (pagNum - 4) && i < pagNum) {
          pagArr.push(new PagData(i))
        }
      }
    }
    console.log('pagArr', pagArr);
    return pagArr;
  }, [pagNum, pagSel])
}

export default usePaginate;
