import React, {useCallback} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import User from "../../components/user";

function UserContainer() {

  const store = useStore();



  const select = useSelector(state => ({
    name: state.profile.name,
    phone: state.profile.phone,
    email: state.profile.email,
    waiting: state.profile.waiting
  }));

  const {t} = useTranslate();

  return (
    <Spinner active={select.waiting}>
      <User 
        t={t}
        name= {select.name}
        phone= {select.phone}
        email= {select.email}/>
    </Spinner>
  );
}

export default React.memo(UserContainer);
