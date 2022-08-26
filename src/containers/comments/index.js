import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {fetchComments} from '../../store-redux/comments-slice';

function Comments(props) {
  console.log(props);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchComments(props.articleId));
  });
  return <h2>Комментарии</h2>;
}

export default React.memo(Comments);
