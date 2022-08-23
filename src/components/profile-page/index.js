import React from "react";
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function ProfilePage({userData}) {
  const cn = bem('ProfilePage');

  return (
    <section className={cn()}>
      <h2>Профиль</h2>
      <div className={cn('wrapper')}>
        <div>Имя: <span className={cn('data')}>{userData?.profile?.name}</span></div>
        <div>Телефон: <span className={cn('data')}>{userData?.profile?.phone}</span></div>
        <div>email: <span className={cn('data')}>{userData?.email}</span></div>
      </div>
    </section>
  );
}

ProfilePage.propTypes = {
  userData: propTypes.object,
};

export default ProfilePage;