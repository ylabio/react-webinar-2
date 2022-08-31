import React, {useCallback, useEffect, useState} from "react";
import NotAuth from "../../components/article-comments/notAuth";
import Send from "../../components/article-comments/send";
import useTranslate from "../../hooks/use-translate";

function SendContainer({ 
  sendComment, 
  isView, 
  parentId,
  parentName,
  parentType, 
  cancel, 
  isAuth, 
  onSignIn, 
  title,
}) {

  const {t} = useTranslate();

  const [text, setText] = useState('');

  useEffect(() => {
    setText(parentName ? `${t('send.placeholder')} ${parentName}\n` : '')
  }, [parentName, t])

  const callbacks = {
    sendComment: useCallback(() => sendComment(text, parentId, parentType), [text, parentId, parentType]),
    changeText: useCallback((e) => setText(e.currentTarget.value), []),
    cancel: useCallback(() => {
      setText(parentName ? `${t('send.placeholder')} ${parentName}\n` : '')
      cancel()
    }, [t, parentName]),
  };

  if (!isAuth && isView) return <NotAuth parentType={parentType} cancel={cancel} action={onSignIn} t={t} />

  if (!isView) return

  return <Send  title={title}
                action={callbacks.sendComment}
                value={text}
                onChange={callbacks.changeText}
                cancel={callbacks.cancel}
                isCancelBtn={parentType === 'comment'}
                t={t}/>
}

export default React.memo(SendContainer);