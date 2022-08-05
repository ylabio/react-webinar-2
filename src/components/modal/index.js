import React from "react";
import Controls from "../controls";
import List from "../list";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import propTypes from "prop-types";

function Modal(props) {
  const cn = bem("Modal");

  return (
    <div className={cn()}>
      <div className={cn("group")}>
        <Controls setIsOpenedModal={props.setIsOpenedModal} />
        <List items={props.items} onItemDelete={props.onItemDelete} />
      </div>
    </div>
  );
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onItemDelete: propTypes.func,
};

List.defaultProps = {
  items: [],
  setIsOpenedModal: () => {},
  onItemDelete: () => {},
};

export default React.memo(Modal);
