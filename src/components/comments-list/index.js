import React from "react";
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import "./styles.css";

function CommentsList(props) {
  const cn = bem('CommentsList');
  return (
    <div className={cn()}>
      <div className={cn('header')}>Комментарии ({props.comments.length})</div>
      <div>{props.comments.map(comment => 
        <div key={comment._id}>
          {/* Проверяем значение состояния для отображения формы добавления ответа,
              если оно совпадает с id ответа, то передаем его как пропс для рендера компонента ответа,
              иначе пустую строку. Предотвращает дополнительные рендеры компонентов в списке комментариев
              при открытии/закрытии форм
          */}
          {props.renderComment(comment, props.itemFooter === comment._id ? props.itemFooter : '')}
        </div>
      )}
      </div>
      {props.children}
    </div>
  )
}

CommentsList.propTypes = {
  comments: propTypes.array.isRequired,
  renderComment: propTypes.func.isRequired,
  itemFooter: propTypes.string.isRequired,
  children: propTypes.node.isRequired
}

export default React.memo(CommentsList);