import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import propTypes from 'prop-types';

function LanguageLayout(props) {
  const cn = bem('Lang');

  return (
    <div className={cn()}>
      <div className={cn('item')} onClick={props.changeToRu}>
        RU
      </div>{' '}
      |{' '}
      <div className={cn('item')} onClick={props.changeToEng}>
        ENG
      </div>
    </div>
  );
}

LanguageLayout.propTypes = {
  changeToRu: propTypes.func,
  changeToEng: propTypes.func,
};

LanguageLayout.defaultProps = {
  changeToRu: () => {},
  changeToEng: () => {},
};

export default React.memo(LanguageLayout);
