import React from "react";
import Controls from "../controls";
import List from "../list";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import propTypes from "prop-types";
import { countingTotalPriceAllItems } from "../../utils";

function Modal(props) {
  const totalPriceAllItems = countingTotalPriceAllItems(
    props.consolidationItems
  );

  const cn = bem("Modal");

  return (
    <div className={cn()}>
      <div className={cn("group")}>
        <Controls setIsOpenedModal={props.setIsOpenedModal} />
        <div className={cn("indent")}></div>
        <List
          items={props.consolidationItems}
          onItemDelete={props.onItemDelete}
        />
        <div className={cn("total")}>
          <div className={cn("totalChild1")}>Итого</div>
          <div className={cn("totalChild2")}>
            {totalPriceAllItems
              ? `${new Intl.NumberFormat("ru-RU").format(
                  totalPriceAllItems
                )} \u20BD`
              : "пусто"}
          </div>
        </div>
      </div>
    </div>
  );
}

List.propTypes = {
  consolidationItems: propTypes.arrayOf(propTypes.object).isRequired,
  onItemDelete: propTypes.func,
};

List.defaultProps = {
  consolidationItems: [],
  setIsOpenedModal: () => {},
  onItemDelete: () => {},
};

export default React.memo(Modal);
