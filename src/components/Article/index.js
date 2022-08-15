import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import propTypes from 'prop-types';
import numberFormat from '../../utils/numberFormat';

import 'style.css';

function Article({ description, price, edition, onAdd, category, country }) {
  let { id } = useParams();
  const callbacks = {
    onAdd: useCallback((e) => onAdd(id), [onAdd, id]),
  };

  return (
    <div className='article'>
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

Article.propTypes = {
  onAdd: propTypes.func,
};

Article.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Article);
