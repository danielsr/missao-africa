import React from 'react';
import logo from 'assets/img/logo.png';
import style from './style.module.scss';
import 'css.gg/icons/css/user.css';

function TopBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-white shadow flex justify-between p-3 items-center">
      <img className={style.logo} src={logo} alt="Missao Africa" />
      <div className="flex mr-4">
        <span className="mr-4">Carol Detoni</span>
        <i className="gg-user"></i>
      </div>
    </nav>
  );
}

export default TopBar;
