import React from "react";
import propTypes from "prop-types";
import "./style.css";

function CommentStub({link, stubLabel, hasCancelButton, handleCancel}) {

  return (
    <div className="CommentStub">
      <p>
        <span onClick={link} className="CommentStub-link">Войдите</span>, чтобы иметь возможность {stubLabel} {hasCancelButton && <span onClick={handleCancel} className="CommentStub-cancel">Отмена</span>}
      </p>
    </div>
  )
}

CommentStub.propTypes = {
  link: propTypes.func,
  stubLabel: propTypes.string,
  hasCancelButton: propTypes.bool,
  handleCancel: propTypes.func,
}

CommentStub.defaultProps = {
  link: () => {},
  stubLabel: 'комментировать',
  hasCancelButton: false,
  handleCancel: () => {},
}

export default React.memo(CommentStub);
