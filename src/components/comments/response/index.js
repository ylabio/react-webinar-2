import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './styles.css';

function CommentsResponse({ openForm }) {
  const cn = bem('CommentsResponse');

  return (
    <div className={cn()} onClick={openForm}>
      Ответить
    </div>
  );
}

CommentsResponse.propTypes = {
  openForm: propTypes.func.isRequired,
};

CommentsResponse.defaultProps = {};

export default React.memo(CommentsResponse);
