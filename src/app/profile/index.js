import React from "react";
import Header from "../../containers/header";
import Layout from "../../components/layout";
import Tools from "../../containers/tools";
import useSelector from "../../hooks/use-selector";
import UserProfile from "../../components/user-profile";

function Profile() {
  const select = useSelector((state) => ({
    name: state.profile.name,
    email: state.profile.email,
    phone: state.profile.phone,
  }));

  return (
    <Layout head={<Header />}>
      <Tools />
      <UserProfile userData={{ name: select.name, email: select.email, phone: select.phone }} />
    </Layout>
  );
}

export default React.memo(Profile);
