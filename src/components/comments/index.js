import React, {useCallback} from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import './style.css';
import Comment from '../comment';
import Spinner from '../spinner';
import CommentsHead from'../comments-head'
import CommentFild from '../comment-fild';
import CommentsList from '../comments-list';

function Comments(props) {
  
  const cn = bem('commentFild');
  const renders = {

    item: useCallback(item => (
      <Comment 
        item={item} 
        link={props.link} 
        sendComment={props.sendComment} 
        text={props.text} 
        place={props.place}
        cancelComment={props.cancelComment}
        parentId={props.parentId}
        changeParentId={props.changeParentId}
        changePlace={props.changePlace}
        changeText={props.changeText}
        exists={props.exists} 
        placeholder={'Мой овтет для '+item.author}              
      />
    )),
  }

  return (
    <Spinner active={false}>
      <CommentsHead number={props.comments.length}/>
      <CommentsList items={props.comments} renderItem={renders.item}  />
      <div className={cn('')}>
      {props.place==='article'&&
        <CommentFild 
        sendComment={props.sendComment} 
        text={props.text} 
        place={props.place}
        changeText={props.changeText}
        exists={props.exists}
        link={props.link}
        placeholder='Текст'
        />}
      </div>
    </Spinner>
  );
}
Comment.propTypes = {
  text: propTypes.string,
  place: propTypes.string,
  cancelComment: propTypes.func,
  sendComment: propTypes.func,
  changeText: propTypes.func,
  changePlace: propTypes.func,
  link: propTypes.func,
  changeParentId: propTypes.func,
  exists: propTypes.bool,
  placeholder: propTypes.string
}

export default React.memo(Comments);
