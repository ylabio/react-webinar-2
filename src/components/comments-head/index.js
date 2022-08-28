import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function CommentsHead({number}){
  return (
    <div className='HeadComments'>
      Комментарии ({number})
    </div>
  )
}

CommentsHead.propTypes = {
  number: propTypes.number
}

export default React.memo(CommentsHead);
