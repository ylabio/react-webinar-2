import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useToken from '../../hooks/use-token';
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import ProfileInfo from "../../components/profile-info"

function Profile() {
  
  const navigate = useNavigate();
  const {t} = useTranslate();
  
  const select = useSelector(state => ({
    auth: state.auth,
  }));
  
  const {name, phone, email} = select.auth.profile;  

  // Проверка авторизации по сохраненному токену
  useToken('shop');

  useEffect(() => {
    if(!select.auth.authorized) navigate('/login');
  }, [select.auth.authorized]); 
  
  return (
    <Layout 
      head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect/>
        </LayoutFlex>} 
      > 
      <Tools/>
      <ProfileInfo
        name={name}
        phone={phone}
        email={email}
        t={t}
      />
    </Layout>
  )
}

export default React.memo(Profile);
