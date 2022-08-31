import React, { useState, useCallback } from "react";
import { useStore } from "react-redux";
import postActions from '../../store-redux/post/actions'
import actionsComments from "../../store-redux/comments/actions";
import CommentForm from "../../components/comment-form";

function NewComment({articleId, type}){
    const [data, setData] = useState('');
    const storeRedux = useStore();

    const callbacks = {
        onChange: useCallback(value => {
          setData(value);
        }, []),

        onSubmitHandler: useCallback(e => {
            if (data.length === 0 ){
                e.preventDefault()
                return false }
            else {
                storeRedux.dispatch(postActions.post(data, articleId, type))
                }
        }),

        onCancel: useCallback(()=>{
            storeRedux.dispatch(actionsComments.setActiveField('article'));
            storeRedux.dispatch(actionsComments.setActiveItem(null))
        })
    }

    return(
        <>
            <CommentForm 
                onChange={callbacks.onChange} 
                onSubmitHandler={callbacks.onSubmitHandler}
                onCancel={callbacks.onCancel}
                value={data} 
                type={type}
        
            />
        </>
    )
}

export default NewComment