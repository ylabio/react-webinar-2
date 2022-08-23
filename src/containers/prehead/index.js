import React, {useCallback, useMemo} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";
import Input from "../../components/input";
import ProfileData from "../../components/profile-data";
import LayoutFlex from "../../components/layout-flex";
import { Link, useNavigate } from "react-router-dom";
import {cn as bem} from "@bem-react/classname";

function Prehead() {

  const cn = bem('Prehead');

  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    isLogged: state.user.isLogged,
    user: state.user
  }));

  const {t} = useTranslate();

  function logout() {
    store.get('user').unAuthorize(select.user.token)
      .then((res) => {
        if (res.result) {
          navigate('/')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
        { select.isLogged ?
          <LayoutFlex flex="end" padding="10-20">
            <Link to={'/profile'}>
            <div className={cn('username')}>User 1</div>
            </Link>
            <button onClick={logout}>Выход</button> 
          </LayoutFlex>
        :
        <LayoutFlex flex="end" padding="10-20">
          <Link to={'/auth'}>
          <button>Вход</button>
          </Link>
        </LayoutFlex>
        }
        </>
  );
}

export default React.memo(Prehead);
