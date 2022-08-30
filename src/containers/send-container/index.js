import React, {useCallback, useState} from "react";
import NotAuth from "../../components/article-comments/notAuth";
import Send from "../../components/article-comments/send";
import useTranslate from "../../hooks/use-translate";

function SendContainer({ 
  sendComment, 
  isParent, 
  parentId, 
  parentType, 
  cancel, 
  isAuth, 
  onSignIn, 
  title,
}) {

  const {t} = useTranslate();

  const [text, setText] = useState('');

  const callbacks = {
    sendComment: useCallback(() => sendComment(text, parentId, parentType), [text, parentId, parentType]),
    changeText: useCallback((e) => setText(e.currentTarget.value), []),
  };

  if (!isAuth && isParent) return <NotAuth action={onSignIn} t={t} />

  if (!isParent) return

  return <Send  title={title}
                action={callbacks.sendComment}
                value={text}
                onChange={callbacks.changeText}
                cancel={cancel}
                isCancelBtn={parentType === 'comment'}
                t={t}/>
}

export default React.memo(SendContainer);