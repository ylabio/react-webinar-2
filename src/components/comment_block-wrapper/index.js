import React, { useEffect, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import CommentBlock from '../comment_block/index'
import './style.css';

function CommentBlockWrapper(props) {

  const cn = bem('CommentBlockWrapper');
  const [list, setList] = useState(props?.data)
  
  useEffect(() => {
    setList(props?.data)
  }, [props.state, props?.data])

  return (
    <div className={cn()}>
        {
          list && list.map((item, i) => {
             let margin = item?.parent?._tree?.length - 1;
             return   <CommentBlock
                        key={i}
                        token={props.token}
                        commentId={item?._id}
                        text={item?.text}
                        author={item?.author?.profile?.name}
                        date={item?.dateCreate}
                        id={item?.author?._id}
                        margin={margin}
                        formToggle={props.formToggle}
                        setFormToggle={props.setFormToggle}
                        i={i}
                        list={list}
                        setList={setList}
                      />
          })
        }
    </div>
  )
}

CommentBlockWrapper.propTypes = {
  data: propTypes.array,
  message: propTypes.string,
  _id: propTypes.string,
  formToggle: propTypes.bool,
  setFormToggle: propTypes.func
}

CommentBlockWrapper.defaultProps = {
  data: [],
  message: '',
  _id: '',
  formToggle: false,
  setFormToggle: () => {}
}

export default React.memo(CommentBlockWrapper);
