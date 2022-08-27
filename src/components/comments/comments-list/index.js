import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import CommentItem from '../comment-item';
import './style.css';

function CommentsList(props) {
  const cn = bem('CommentsList');

  console.log(props.items);

  return (
    <ul className={cn()}>
      {props.items?.map((item) => <CommentItem item={item} key={item._id}/>)}
    </ul>
  )
}

CommentsList.propTypes = {
  item: propTypes.array,
}

CommentsList.defaultProps = {
}

export default React.memo(CommentsList);
