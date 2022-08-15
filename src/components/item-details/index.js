import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ItemDetails(props) {
  const cn = bem('ItemDetails');

  return <div className={cn()}>Item Details</div>;
}

export default React.memo(ItemDetails);
