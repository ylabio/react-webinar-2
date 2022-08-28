import React from "react";
import Comment from "../comment";
import Title from "./title";
import SendContainer from "../../containers/send-container";
import Layout from "./layout";

function ArticleComments({
  comments,
  sendComment,
  text,
  changeText,
  onSignIn,
  articleId,
  isAuth,
  sendId,
  setSendId,
  cancel,
  articleType,
  t,
  lang,
}) {

  return (
    <Layout>

      <Title count={comments.length} t={t} />

      { comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            setSendId={setSendId}
            onChange={changeText}
            value={text}
            lang={lang}
            t={t}
            sendContainer={
              <SendContainer  sendComment={sendComment}
                              sendId={sendId}
                              parentId={comment._id}
                              parentType={'comment'}
                              cancel={cancel}
                              isAuth={isAuth}
                              onSignIn={onSignIn}
                              title={t('send.new-reply')} />
            }
          />
        ))
      }

      <SendContainer  sendComment={sendComment}
                      sendId={sendId}
                      parentId={articleId}
                      parentType={articleType}
                      cancel={cancel}
                      isAuth={isAuth}
                      onSignIn={onSignIn}
                      title={t('send.new-comment')} />

    </Layout>
  );
}

export default React.memo(ArticleComments);
