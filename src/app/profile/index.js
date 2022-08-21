import React, { useEffect } from 'react';
import useTranslate from '../../hooks/use-translate';
import Tools from '../../containers/tools';
import LayoutFlex from '../../components/layout-flex';
import Layout from '../../components/layout';
import LocaleSelect from '../../containers/locale-select';
import AuthHead from '../../containers/auth-head';
import ProfileCard from '../../containers/profile-card';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';

function Profile() {
	const { isAuth } = useSelector((state) => ({
		isAuth: state.user.isAuth,
	}));

	const navigate = useNavigate();
	useEffect(() => {
		if (isAuth === false) {
			navigate('/login');
		}
	}, [isAuth]);

	const { t } = useTranslate();

	if (isAuth === false) {
		return null;
	}

	return (
		<Layout
			auth={<AuthHead />}
			head={
				<LayoutFlex flex='between'>
					<h1>{t('title')}</h1>
					<LocaleSelect />
				</LayoutFlex>
			}
		>
			<Tools />
			<ProfileCard />
		</Layout>
	);
}

export default React.memo(Profile);
