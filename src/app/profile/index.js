import React, {useMemo} from "react";
import {Navigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Spinner from "../../components/spinner";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import ProfileMenu from "../../containers/profile-menu";
import ProfileInfo from "../../components/profile-info";

function Profile(){
  const {lang, t} = useTranslate();

  const select = useSelector(state => ({
    waiting: state.authorisation.waiting,
    name: state.authorisation.data.name,
    phone:  state.authorisation.data.phone,
    email:  state.authorisation.data.email,
  }));

  const data = {
    profile: useMemo(() => ({
      title: t('profile.title'),
      name: t('profile.name'),
      phone: t('profile.phone'),
      email: t('profile.email'),
    }), [lang]),
  }

  if (!select.name && !select.waiting) return <Navigate replace to="/login"/>;

  return (
    <Layout head={
              <LayoutFlex flex="between">
                <h1>{t('title')}</h1>
                <LocaleSelect/>
              </LayoutFlex>
            }
            profileMenu={<ProfileMenu />}>
      <Tools/>
      <Spinner active={select.waiting}>
        <ProfileInfo data={data.profile} name={select.name} phone={select.phone} email={select.email}/>
      </Spinner>
    </Layout>
  )
}

export default React.memo(Profile);
