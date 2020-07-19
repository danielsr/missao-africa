import React from 'react';
import logo from 'assets/img/logo.png';
import style from './style.module.scss';
import Icon from 'components/Icon';
import useUser from 'modules/Login/hooks';

function TopBar() {
  const { user } = useUser();

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-white shadow flex justify-between p-3 items-center">
      <img className={style.logo} src={logo} alt="Missao Africa" />
      <div className="flex mr-4">
        <span className="mr-2">{user?.name}</span>
        <Icon icon="account_circle" />
      </div>
    </nav>
  );
}

export default TopBar;
