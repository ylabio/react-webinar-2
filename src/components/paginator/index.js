import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import React, { useMemo } from 'react';
import './style.css';

function Paginator({props}) {
  const cn = bem('Paginator');

  // fill(2, 5) returns [2, 3, 4, 5]
  const fill = (from, to) => {
    return Array.from({ length: to - from + 1 }, (v, k) => from + k);
  }

  // пересборка массива, если длина или метка изменились
  const array = useMemo(() => {
    if (props.total <= 5 || (props.current == 3 && props.total == 6))
      return fill(1, props.total);

    if (props.current < 3)
      return fill(1, 3).concat('...', props.total);

    if (props.current == 3)
      return fill(1, 4).concat('...', props.total);

    if (props.current == props.total - 2)
      return [1, '...'].concat(fill(props.current - 1, props.total));

    if (props.current > props.total - 2)
      return [1, '...'].concat(fill(props.total - 2, props.total));

    return [1, '...'].concat(fill(props.current - 1, props.current + 1)).concat('...', props.total);
  }, [props.total, props.current]);

  return (
    <div className={cn()}>
      {
        array.map((value, index) => {

          let style;
          switch (value) {
            default: style = 'normal'; break;
            case props.current: style = 'selected'; break;
            case "...": style = 'dots'; break;
          }

          return <div
            className={cn(style)}
            key={index}
            onClick={
              [props.current, "..."].includes(value) ? null : (e) => { props.onClick(value) }
            }
          >{value}</div>
        })
      }
    </div>
  );
};

Paginator.propTypes = {
  onClick: propTypes.func.isRequired,
  current: propTypes.number,
  total: propTypes.number
}

Paginator.defaultProps = {
  onClick: () => {}, // Значение по умолчанию - функция-заглушка
  current: 1,
  total: 1
}

export default React.memo(Paginator);