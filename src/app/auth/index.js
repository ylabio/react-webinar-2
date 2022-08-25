import React, { useEffect, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from "../../components/login-form";
import LoginHead from "../../components/login-head";
import Tools from "../../containers/tools";
 function Login() {
	const store = useStore();

	const {t} = useTranslate();

	const auth = useSelector((state) => state.auth);
	const sign = useCallback((login, password) => store.get('auth').sign(login, password), []);
	const signout = useCallback(() => store.get('auth').signout(auth), []);
	const navigate = useNavigate();

	useEffect(() => {
		if (auth.isLogin && window.history.state && window.history.state.idx > 0) {
			//window.history.state - убеждаемся, что есть история браузера на этой вкладке
			//чтобы было куда вернуться. Без проверки, если нет истории на вкладке, будет рефреш страницы
			navigate(-1);
		} else if (auth.isLogin) {
			navigate('/', { replace: true });
		}
	}, [auth.isLogin]);

	return (
		<Layout auth={<LoginHead auth={auth} signout={signout}/>} head={
			<LayoutFlex flex="between">
				<h1>{t('title')}</h1>
				<LocaleSelect/>
			</LayoutFlex>
		}>
			<Tools/>
			<LoginForm sign={sign}/>
		</Layout>
	)
}

export default React.memo(Login);