import React from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import ProfileInfo from "../../components/profile-info";
import Header from "../../containers/header";
import ContentTitle from "../../components/content-title";

function Profile() {
	const store = useStore();

  const select = useSelector(state => ({
		user: state.auth.user
  }));

  const {t} = useTranslate();

  return (
    <Layout head={<Header />}>
      <Tools/>
      <LayoutFlex flex="start" flexDirection="column" alignItems="start" padding="40-20">
				<ContentTitle text="Профиль"/>
				<ProfileInfo user={select.user}/>
			</LayoutFlex>
    </Layout>
  )
}

export default React.memo(Profile);
