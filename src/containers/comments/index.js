import React, {useCallback} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import Item from "../../components/item";
import LayoutComments from "../../components/layout-comments";
import ItemComments from "../../components/item-comments";

function Comments() {

  const {t} = useTranslate();

  return (
    <LayoutComments title={'Комментарии (6)'}>
      <ItemComments/>
    </LayoutComments>
  );
}

export default React.memo(Comments);