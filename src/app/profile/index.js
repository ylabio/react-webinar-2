import React, {useEffect, useCallback} from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useSelector from "./../../hooks/use-selector";
import LoginHead from "../../components/login-head"
import {useNavigate} from "react-router-dom";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import Tools from "../../containers/tools";
import ProfileInfo from "../../components/profile-info";
import useInit from "../../hooks/use-init";

function ProfilePage() {
	const store = useStore();

	const {t} = useTranslate();

	const auth = useSelector((state) => state.auth);
	const navigate = useNavigate();
	useInit(async () => {
		if (auth.isLogin && localStorage.getItem("token"))
			await store.get('profile').self(localStorage.getItem("token"));
		else navigate("/auth");
	}, []);

	const profile = useSelector((state) => state.profile);
	const signout = useCallback(() => store.get('auth').signout(auth), []);


	return (
		<Layout auth={<LoginHead auth={auth} signout={signout}/>} head={
			<LayoutFlex flex="between">
				<h1>{t('title')}</h1>
				<LocaleSelect/>
			</LayoutFlex>
		}>
			<Tools/>
			<ProfileInfo profile={profile}/>
		</Layout>
	)
}

export default React.memo(ProfilePage);