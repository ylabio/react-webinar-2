import React, {useCallback } from "react";
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import actionsComments from "../../store-redux/comments/actions"
import CommentHead from "../../components/comment-head";
import CommentItem from "../../components/comment-item";
import NewComment from "../new-comment";
import UnauthComment from "../../components/unauth-comment";
import Footer from "../../components/footer";
import dataParser from "../../utils/data-parser";
import parser from '../../utils/comments-parser';



function CommentsList(){
    const params = useParams();
    const storeRedux = useStoreRedux();
    const navigate = useNavigate();

    const exists = useSelector(state => state.session.exists)
  
    useInit(async () => {
      storeRedux.dispatch(actionsComments.load(params.id));
    }, [params.id]);

    const selectRedux = useSelectorRedux(state => ({
      comments:  typeof state.comments.data === "undefined" ? []: parser(state.comments.data.items, params.id),
      selected: state.comments.selected,
      activeField: state.comments.active
    }), shallowEqual);

    const callbacks = {
      // Переход к авторизации
      onSignIn: useCallback(() => {
        navigate('/login', {state: {back: location.pathname}});
      }, [location.pathname]),
      onClikcHandler: useCallback( id => {
        storeRedux.dispatch(actionsComments.setActiveField('comment'))
        storeRedux.dispatch(actionsComments.setActiveItem(id))
      }, [])
    }
 
    return(
      <>
          <CommentHead count={typeof selectRedux.comments === 'undefined'? null : selectRedux.comments.length}/>
          {typeof selectRedux.comments === 'undefined'
            ? null
            :selectRedux.comments.map(item =>
              <CommentItem
                date={dataParser(item.content.dateCreate)}
                content={item.content.text}
                exists={exists}
                keyId={item.id} 
                level={item.level} 
                name={item.content.author.profile.name}
                onClikcHandler={callbacks.onClikcHandler}
                onSignIn={callbacks.onSignIn}
                selected={selectRedux.selected === item.id? true : false}
                activeField={selectRedux.activeField}
              />
              )
            }
            {exists 
            ? selectRedux.activeField === 'article'? <NewComment articleId={params.id} type='article'/> : null
            : <UnauthComment onSignIn={callbacks.onSignIn}/>}
            <Footer />
        </>
    )
}

export default React.memo(CommentsList)