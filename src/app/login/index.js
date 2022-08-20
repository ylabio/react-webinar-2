import React, {useCallback, useState} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import Input from "../../components/input";
import Field from "../../components/field";

function Login() {
  const store = useStore();

  useInit(async () => {

  }, []);

  const select = useSelector(state => ({}));

  const [data, setData] = useState({
    login: '',
    password: ''
  });

  const callbacks = {
    onChange: useCallback((value, name) => {
      setData(prevData => ({...prevData, [name]: value}));
    }, []),

    onSubmit: useCallback((e) => {
      e.preventDefault();
      console.log(data);
    }, [data])
  };

  const {t} = useTranslate();

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }>
      <Tools/>
      <LayoutFlex flex="start">
        <form onSubmit={callbacks.onSubmit}>
          <h2>{t('auth.title')}</h2>
          <Field label={t('auth.login')}>
            <Input name="login" onChange={callbacks.onChange} value={data.login}/>
          </Field>
          <Field label={t('auth.password')}>
            <Input name="password" type={"password"} onChange={callbacks.onChange}
                   value={data.password}/>
          </Field>
          <Field>
            <button type={"submit"}>{t('auth.signIn')}</button>
          </Field>
        </form>
      </LayoutFlex>
    </Layout>
  )
}

export default React.memo(Login);
