import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import numberFormat from '../../utils/numberFormat';

import './style.css';

function ArticleSimple({ id, description, price, edition, onAdd, category, country }) {
  const callbacks = {
    onAdd: useCallback((e) => onAdd(id), [onAdd, id]),
  };

  return (
    <div className='ArticleSimple'>
      <p>{description}</p>
      <p>
        Страна производитель: <b>{country}</b>
      </p>
      <p>
        Категория: <b>{category}</b>
      </p>
      <p>
        Год выпуска: <b>{edition}</b>
      </p>
      <p>
        <b>Цена: {numberFormat(price)} ₽</b>
      </p>
      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  );
}

ArticleSimple.propTypes = {
  onAdd: propTypes.func,
};

ArticleSimple.defaultProps = {
  onAdd: () => {},
};

export default React.memo(ArticleSimple);
