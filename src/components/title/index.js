import React from 'react';
import { cn as bem } from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function Title({ title }) {
  const cn = bem('Title');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <h1>{title}</h1>
      </div>
    </div>
  )
}

Title.propTypes = {
  title: propTypes.string.isRequired,
}

Title.defaultProps = {
  title: 'Заголовок'
}

export default React.memo(Title);
