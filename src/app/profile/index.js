import React from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import Spinner from "../../components/spinner";
import Layout from "../../components/layout";
import TopContainer from "../../containers/top";
import HeadContainer from "../../containers/head";
import ToolsContainer from "../../containers/tools";
import ProfileCard from "../../components/profile-card";

function Profile(){
  const store = useStore();

  const select = useSelector(state => ({
    profile: state.profile.data,
    waiting: state.profile.waiting,
    exists: state.session.exists
  }));

  useInit(async () => {
    await store.get('profile').load();
  }, []);

  return (
    <Layout>
      <TopContainer/>
      <HeadContainer/>
      <ToolsContainer/>
      <Spinner active={select.waiting}>
        <ProfileCard data={select.profile}/>
      </Spinner>
    </Layout>
  )
}

export default React.memo(Profile);
