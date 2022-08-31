import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import actionsArticleComments from "../../store-redux/article-comments/actions";
import useInit from "../../hooks/use-init";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import CommentList from "../../components/comment-list";
import Spinner from "../../components/spinner";
import useSelector from "../../hooks/use-selector";

function Comments({id}) {
  const storeRedux = useStoreRedux();

  const [idUnder, setIdUnder] = useState(id);
  const itemRefs = useRef([]);

  useInit(async () => {
    storeRedux.dispatch(actionsArticleComments.load(id));
  }, [id, storeRedux]);

  const select = useSelectorRedux(state => ({
    comments: state.articleComments.data,
    count: state.articleComments.count,
    lastId: state.articleComments.lastId,
    waiting: state.articleComments.waiting
  }), shallowEqual);

  const exists = useSelector(state => state.session.exists);

  const options = {
    comments: useMemo(() => [
      ...treeToList(
        listToTree(select.comments, "_id", "article"),
        (item, level) => ({
          id: item._id,
          name: item.author.profile.name,
          text: item.text, 
          dateCreate: item.dateCreate, 
          level
        })
      )
    ], [select.comments]),
  }
  // console.log(itemRefs)

  useEffect(() => {
    if (Object.keys( itemRefs.current ).length > 0 && select.lastId) {
      try {
        itemRefs.current[select.lastId].scrollIntoView({ behavior: "smooth" });
        storeRedux.dispatch(actionsArticleComments.clearLastId());
      } catch (e) {
        console.log("Резкий переход");
      }
    }
  }, [select.comments])

  const submitComment = (text, type) => {
    if(text.trim() !== '') {
      storeRedux.dispatch(actionsArticleComments.submitComment(idUnder, type, text));
      setIdUnder(id);
    }
  }

  return(
    <Spinner active={select.waiting}>
      <CommentList 
        comments={options.comments} 
        idArticle={id} 
        idUnder={idUnder} 
        count={select.count} 
        setIdUnder={setIdUnder}
        submitComment={submitComment}
        exists={exists}
        itemRefs={itemRefs}
        />
    </Spinner>
  );
}

export default React.memo(Comments);