import React, {useMemo} from 'react';
import LayoutFlex from '../../components/layouts/layout-flex';
import LoginControls from '../../components/login-controls';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

function CommonTopbar() {
  const store = useStore();
  const select = useSelector(state => ({
    username: state.auth.username,
    isSigned: state.auth.isSigned
  }));

  console.log(select.isSigned);
  const {t, lang} = useTranslate();

  const text = useMemo(
    () => ({
      login: t('login'),
      logout: t('logout')
    }),
    [lang]
  );

  return (
    <LayoutFlex flex='end'>
      <LoginControls
        text={text}
        username={select.username}
        isSigned={select.isSigned}
        onLogin={() => store.get('auth').login()}
      ></LoginControls>
    </LayoutFlex>
  );
}

export default React.memo(CommonTopbar);
