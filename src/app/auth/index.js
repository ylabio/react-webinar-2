import React, {useCallback, useState} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import useTranslate from "../../hooks/use-translate";
import AuthBox from "../../components/auth-box";
import { useNavigate } from "react-router-dom";

function Auth() {
  const store = useStore();
  const navigate = useNavigate();

  const [data, setData] = useState({
    login: "test_1",
    password: "123456",
    error: false,
  })

  const {t} = useTranslate();

  const select = useSelector(state => ({
    items: state.basket.items,
  }));

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
        <AuthBox>
            <h2>Вход</h2>
            <span>Логин</span><br/>
            <input onChange={setLogin} value={data.login}></input><br/><br/>
            <span>Пароль</span><br/>
            <input onChange={setPassword} value={data.password}></input>
            {data.error ? <p>Некая ошибка от сервера</p> : <><br/><br/></>}
            <button onClick={auth}>Войти</button>
        </AuthBox>
      </Layout>
  )

  function setLogin(e) {
    setData({
        ...data,
        login: e.target.value,
    });
  }
  
  function setPassword(e) {
    setData({
        ...data,
        password: e.target.value,
    });
  }

  async function auth() {
    const result = await store.get('user').auth(data.login, data.password);
    if (result) {
      navigate("../profile");
    } else {
      setData({
        ...data,
        error: true,
    });
    }
  }
}

export default React.memo(Auth);
