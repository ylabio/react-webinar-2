import React, { memo } from 'react'
import { cn as bem } from "@bem-react/classname";
import "./style.css"
import propTypes from 'prop-types';

function CommentControl({ isAuth, showArea, callBacks, id, currentId, padding, t, isToArticle }) {
  const cn = bem('Comment-Control');
  if (!isAuth && showArea && currentId === id || isToArticle) {
    return (
      <div className={cn()}>
        <div style={{ paddingLeft: padding }} className={cn('wrapper')}>
          <button
            className={cn('link-big')}
            onClick={callBacks.onSignIn}
          >
            {t("comments.goLogin")},
          </button>
          {isToArticle ? t("comments.toLeaveNew") : t("comments.toReply")}
          {
            !isToArticle ? <span>
              <button onClick={callBacks.closeArea}
                className={cn('link-big-color')}
              >
                {t("comments.new.cancel")}
              </button>
            </span> :
              null
          }
        </div>
      </div>
    )
  }
  return (
    <div className={cn()}>
      <div style={{ paddingLeft: padding }}>
        <button className={cn('link')} onClick={callBacks.openArea} >{t("comments.reply")}</button>
      </div>
    </div>
  )
}

CommentControl.propTypes = {
  isAuth: propTypes.bool,
  showArea: propTypes.bool,
  callBacks: propTypes.object.isRequired,
  id: propTypes.string,
  currentId: propTypes.string,
  padding: propTypes.number,
  t: propTypes.func,
  isToArticle: propTypes.bool,
}

CommentControl.defaultProps = {
  padding: 0,
  t: (text) => text

}
export default memo(CommentControl) 
