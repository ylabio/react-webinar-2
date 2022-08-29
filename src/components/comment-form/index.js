import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import ProtectedComment from '../../containers/protected-comment';
import { useParams } from 'react-router-dom';
import propTypes from 'prop-types';

function CommentForm(props) {
  const cn = bem('CommentForm');
  const [message, setMessage] = React.useState('');
  const params = useParams();

  const data = {
    text: message,
    parent: {
      _id: props.id,
      _type: props.type,
    },
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    console.log(props.id);
    props.addPost(data, props.userName, params.id, props.id);
    setMessage('');
  };

  return (
    <div className={cn() + ' ' + cn(!props.active ? 'hide' : 'show')}>
      <ProtectedComment cancel={props.children}>
        <form onSubmit={onSubmit} className={cn()}>
          <label>
            <p className={cn('title')}>{props.lable}</p>
            <textarea
              value={message}
              placeholder="Текст"
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <div className={cn('buttons')}>
            <input type="submit" value="Отправить" />
            {props.children && <button type="button">{props.children}</button>}
          </div>
        </form>
      </ProtectedComment>
    </div>
  );
}

CommentForm.propTypes = {
  addPost: propTypes.func,
  id: propTypes.string,
  type: propTypes.string,
  lable: propTypes.string,
  children: propTypes.node,
  active: propTypes.bool,
};

CommentForm.defaultProps = {};

export default React.memo(CommentForm);
