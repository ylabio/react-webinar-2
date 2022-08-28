import React, {useCallback, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Field from '../../components/field';
import Input from '../../components/input';
import Layout from '../../components/layout';
import LayoutFlex from '../../components/layout-flex';
import HeadContainer from '../../containers/head';
import ToolsContainer from '../../containers/tools';
import TopContainer from '../../containers/top';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

function Login() {
  const {t} = useTranslate();
  const store = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    waiting: state.session.waiting,
    errors: state.session.errors
  }));

  const [data, setData] = useState({
    login: '',
    password: ''
  });

  const callbacks = {
    onChange: useCallback((value, name) => {
      setData(prevData => ({...prevData, [name]: value}));
    }, []),

    onSubmit: useCallback(
      e => {
        e.preventDefault();
        store.get('session').signIn(data, () => {
          // Возврат на страницу, с которой пришли
          const back =
            location.state?.back && location.state?.back !== location.pathname
              ? location.state?.back
              : '/';
          navigate(back, {replace: true});
        });
      },
      [data, location.state]
    )
  };

  return (
    <Layout>
      <TopContainer />
      <HeadContainer />
      <ToolsContainer />

      <LayoutFlex>
        <form onSubmit={callbacks.onSubmit}>
          <h2>{t('auth.title')}</h2>
          <Field label={t('auth.login')} error={select.errors?.login}>
            <Input name='login' onChange={callbacks.onChange} value={data.login} />
          </Field>
          <Field label={t('auth.password')} error={select.errors?.password}>
            <Input
              name='password'
              type='password'
              onChange={callbacks.onChange}
              value={data.password}
            />
          </Field>
          <Field error={select.errors?.other} />
          <Field>
            <button disabled={select.waiting} type='submit'>
              {t('auth.signIn')}
            </button>
          </Field>
        </form>
      </LayoutFlex>
    </Layout>
  );
}

export default React.memo(Login);
