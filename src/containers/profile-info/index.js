import React, {useCallback, useMemo, useState} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Select from "../../components/select";
import Input from "../../components/input";
import LayoutProfile from "../../components/layout-profile";
import InputTitle from "../../components/input-title";
import Controls from "../../components/controls";

function ProfileInfo(){
    const store = useStore();

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    
    const {t} = useTranslate()

    const callbacks = {
        // Сортировка
        
        onLogin: useCallback((login, password) => store.get('autorization').setLogin(login, password), []),
        
    };

    const select = useSelector(state => ({
        sort: state.catalog.params.sort,
        query: state.catalog.params.query,
        categories: state.catalog.categories,
        category: state.catalog.params.category,
        user: state.autorization.user
      }));
    

    return (
        <LayoutProfile head={<h2>{t('Profile')}</h2>} t={t}>
            <div>Имя: <label>{select.user.profile.name}</label></div>
            <div>Телефон: <label>{select.user.profile.phone}</label></div>
            <div>email: <label>{select.user.email}</label></div>
        </LayoutProfile> 
    )
}


export default React.memo(ProfileInfo)