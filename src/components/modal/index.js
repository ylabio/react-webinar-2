import React, {useEffect} from "react";
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import "./style.css";
import Layout from "../layout";

function Modal(props) {
  const cn = bem("Modal");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  });

  return (
    <div className={cn()}>
      <Layout head={[<h1>{props.title}</h1>, <button onClick={props.onHideModal}>Закрыть</button>]}>
        {props.content}
      </Layout>
    </div>
  );
}

Modal.propTypes = {
  content: propTypes.node,
};

Modal.defaultProps = {
  content: <div/>
};

export default React.memo(Modal);