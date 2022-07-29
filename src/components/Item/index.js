import React, { useEffect, useMemo, useState } from 'react';

function Item({
  title,
  code,
  isSelected = false,
  onClick = () => {},
  onDelete = () => {},
}) {
  const [selectCount, setSelectCount] = useState(0);

  const selectInfoMessage = useMemo(() => {
    if (!selectCount) {
      return '';
    }

    const messageHasEnd = [2,3,4].includes(selectCount % 10) && (Math.floor(selectCount / 10) % 10) != 1;
    return ` | Выделялся ${selectCount} раз${messageHasEnd ? 'а' : ''}`;
  }, [selectCount])

  useEffect(() => {
    if (isSelected) {
      setSelectCount(selectCount + 1);
    }
  }, [isSelected]);

  return (
    <div className='List__item'>
      <div
        className={'Item' + (isSelected ? ' Item_selected' : '')}
        onClick={() => onClick(isSelected)}
      >
        <div className='Item__number'>{code}</div>
        <div className='Item__title'>{title}{selectInfoMessage}</div>
        <div className='Item__actions'>
          <button onClick={onDelete}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}

export default Item;
