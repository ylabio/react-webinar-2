import { cn as bem } from "@bem-react/classname";
import React, { useCallback, useState } from 'react';
import "./style.css"
import propTypes from 'prop-types';

function TextArea({ callBacks, parent, isToArticle, padding, t }) {
  const cn = bem('Text-area');
  const [text, setText] = useState("");
  const send = useCallback(() => {
    setText("")
    callBacks.closeArea();
    callBacks.sendComment(text, parent, isToArticle ? "article" : "comment");
  }, [text])
  return (
    <div className={cn()} >
      <div style={{ paddingLeft: padding }}>
        <p className={cn('title')}>
          {
            isToArticle ? t("comments.new.toArticle") : t("comments.new.toComment")
          }
        </p>
        <textarea className={cn('area')}
          onChange={(e) => setText(e.target.value)}
          value={text}
          required
        ></textarea>
        <div className={cn('buttons')}>
          <button className={cn('button')} onClick={send} disabled={!text}>{t("comments.send")}</button>
          {
            !isToArticle ? <button className={cn('button')} onClick={callBacks.closeArea}>{t("comments.new.cancel")}</button> : null
          }
        </div>
      </div>
    </div>
  )
}

TextArea.propTypes = {
  callBacks: propTypes.object.isRequired,
  parent: propTypes.string.isRequired,
  isToArticle: propTypes.bool.isRequired,
  padding: propTypes.number,
  t: propTypes.func
}

TextArea.defaultProps = {
  padding: 0,
  t: (text) => text
}

export default React.memo(TextArea);
