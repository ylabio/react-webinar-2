import React, { useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import CommentsByCommentForm from '../comment-by-comment'
import { timeFixion } from '../../utils/counter';
import './style.css';


function CommentBlock(props) {
  const cn = bem('CommentBlock');
  const  [toggle, setToggle] = useState()
  return (
            <div 
            className={cn()}
            style={{marginLeft: `${30 * props.margin}px`}}
            >
              <div>
                <p><strong>{props?.author}</strong></p>
                <p className={cn('date')}>{timeFixion(`${props?.date}`)}</p>
              </div>
              <p className={cn('text')}>{props?.text}</p>
              <CommentsByCommentForm
                toggleFunc={setToggle}
                id={props.commentId}
                _type={props._type}
                list={props.list}
                setList={props.setList}
                i={props.i}
                commentId={props.commentId}
                formToggle={props.formToggle}
                setFormToggle={props.setFormToggle}
              />
            </div>
  )
}

CommentBlock.propTypes = {
  commentId: propTypes.string,
  text: propTypes.string,
  author: propTypes.string,
  date: propTypes.string,
  id: propTypes.string,
  margin: propTypes.number,
  formToggle: propTypes.bool,
  setFormToggle: propTypes.func,
  list: propTypes.array,
  setList: propTypes.func
}

CommentBlock.defaultProps = {
  commentId: '',
  text: '',
  author: '',
  date: '',
  id: '',
  margin: 0,
  formToggle: false,
  setFormToggle: () => {},
  list: [],
  setList: () => {}
}

export default React.memo(CommentBlock);
