import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import propTypes from 'prop-types';

import 'style.css';

function Article({ description, price, edition, onAdd, category, country }) {
  let { id } = useParams();
  const callbacks = {
    onAdd: useCallback((e) => onAdd(id), [onAdd, id]),
  };

  return (
    <div className='article'>
      <p>{description}</p>
      <p>Страна производитель: {country}</p>
      <p>Категория: {category}</p>
      <p>
        Год выпуска: <b>{edition}</b>
      </p>
      <p>
        <b>Цена: {price}</b>
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
