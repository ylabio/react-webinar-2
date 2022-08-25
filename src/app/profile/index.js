import React, {useCallback, useEffect, useMemo} from "react";
import useSelector from "../../hooks/use-selector";
import Layout from "../../components/layout";
import LayoutFlex from "../../components/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import ProfileList from "../../components/profile-list";
import Spinner from "../../components/spinner";
import useStore from "../../hooks/use-store";

function Profile(){

  const store = useStore()

    const select = useSelector(state => ({
        user: state.profile.user,
        waiting: state.profile.waiting,
    }));

    const items = [
      {title : 'Имя', value: select.user.username}, 
      {title :'телефон', value : typeof select.user.profile === "undefined"? null : select.user.profile.phone},
      {title :'email', value: select.user.email}]

      useEffect(()=>{ 
        store.get('profile').initState()
      }, [])

    const {t} = useTranslate();

    return(
      <Spinner active={select.waiting}>
        <Layout head={
            <LayoutFlex flex="between">
              <h1>{t('title')}</h1>
              <LocaleSelect/>
            </LayoutFlex>
          }>
          <Tools />
           <ProfileList items={items}/>
          </Layout>
      </Spinner>
    )
}

export default React.memo(Profile)
