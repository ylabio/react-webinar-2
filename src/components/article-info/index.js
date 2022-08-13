import React, {useCallback} from "react";
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";

const ArticleInfo = ({onAdd, article, ln = {}}) => {
  const cn = bem('Article-info');

  const callbacks = {
    onAdd: useCallback(() => onAdd(article._id), [onAdd, article])
  };

  return (
    <div className={cn()}>
      <div>{article.description}</div>
      <div>
        {`${ln.maidIn}: `}
        <strong>
          {article.maidIn.title} ({article.maidIn.code})
        </strong>
      </div>
      <div>
        {ln.category}: <strong>{article.category.title}</strong>
      </div>
      <div>
        {ln.edition}: <strong>{article.edition}</strong>
      </div>
      <div>
        <strong>{ln.price}: {article.price} ₽</strong>
      </div>
      <button onClick={callbacks.onAdd}>{ln.action}</button>
    </div>
    );
};

ArticleInfo.propTypes = {
  article: propTypes.object.isRequired,
  onAdd: propTypes.func,
  ln: propTypes.objectOf(propTypes.string).isRequired,
}

ArticleInfo.defaultProps = {
  onAdd: () => {},
}

export default ArticleInfo;
