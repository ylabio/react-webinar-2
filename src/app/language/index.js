import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import useStore from '../../utils/use-store';

function Language() {
  const cn = bem('Lang');

  const store = useStore();

  const callbacks = {
    changeToEng: React.useCallback(() => {
      store.get('language').changeLang('eng');
    }, []),
    changeToRu: React.useCallback(() => {
      store.get('language').changeLang('ru');
    }, []),
  };

  return (
    <div className={cn()}>
      <div className={cn('item')} onClick={callbacks.changeToRu}>
        RU
      </div>{' '}
      |{' '}
      <div className={cn('item')} onClick={callbacks.changeToEng}>
        ENG
      </div>
    </div>
  );
}

export default Language;
