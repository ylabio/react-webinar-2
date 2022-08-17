import React from "react";
import "./style.css";
import {cn as bem} from "@bem-react/classname";

const Loader = () => {
    const cn = bem('Loader');

    return (
      <div className={cn()}>
          <div className={cn('part')} />
          <div className={cn('part')} />
          <div className={cn('part')} />
          <div className={cn('part')} />
          <div className={cn('part')} />
          <div className={cn('part')} />
          <div className={cn('part')} />
          <div className={cn('part')} />
          <div className={cn('part')} />
      </div>
    );
};

export default React.memo(Loader);
