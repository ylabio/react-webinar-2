import React, {useEffect} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import useTranslate from "../../hooks/use-translate";
import { useNavigate } from "react-router-dom";


function Auth() {
  const store = useStore();
  const navigate = useNavigate();

  const {t} = useTranslate();

  const select = useSelector(state => ({
    token: state.user.items,
    user: state.user.user,
  }));

  useEffect(()=>{
    if (select.user == undefined) {
      navigate("../auth")
    }
  })

  return (
    <Layout head={
      <>
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect/>
        </LayoutFlex>
      </>
      }>
        <Tools/>
        <h2>Профиль</h2>
        <p>Имя: {select.user ? select.user.profile.name : null}</p>
        <p>Телефон: {select.user ? select.user.profile.phone : null}</p>
        <p>Email: {select.user ? select.user.email : null}</p>
    </Layout>
  )
}

export default React.memo(Auth);
