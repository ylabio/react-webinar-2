import React from 'react';
import numberFormat from '../../utils/number-format';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import propTypes from 'prop-types';

function DescriptionLayout(props) {
  const cn = bem('Description');

  return (
    <div className={cn()}>
      <div>{props.item.description}</div>
      <div>
        Страна производитель:{' '}
        <span>
          {{ ...props.item.maidIn }.title}{' '}
          {`(${{ ...props.item.maidIn }.code})`}
        </span>
      </div>
      <div>
        Категория: <span>{{ ...props.item.category }.title} </span>
      </div>
      <div>
        Год выпуска: <span>{props.item.edition}</span>
      </div>
      <div className={cn('price')}>
        Цена: {numberFormat(props.item.price)} ₽
      </div>
      <button onClick={() => props.addToBasket(props.item._id)}>
        {props.dictionary.add}
      </button>
    </div>
  );
}

DescriptionLayout.propTypes = {
  item: propTypes.object.isRequired,
  dictionary: propTypes.object,
  addToBasket: propTypes.func,
};

DescriptionLayout.defaultProps = {
  item: {},
  addToBasket: () => {},
};

export default React.memo(DescriptionLayout);
