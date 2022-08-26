import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function NewCommentBlock({onAnswer, onChange}) {
	  // CSS классы по БЭМ
		const cn = bem('NewCommentBlock');
  return (
    <section className={cn()}>
      <span className={cn('title')}>Новый комментарий</span>
      <textarea className={cn('input')} onChange={onChange} />
			<button onClick={onAnswer}>Ответить</button>
    </section>
  );
}

NewCommentBlock.propTypes = {
  onAnswer: propTypes.func,
  onChange: propTypes.func,
};

NewCommentBlock.defaultProps = {
};

export default React.memo(NewCommentBlock);
