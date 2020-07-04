import React from 'react';
import logo from 'assets/img/logo.png';
import style from './style.module.scss';

function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 h-20 bg-white shadow flex justify-between p-3 items-center">
      <img className={style.logo} src={logo} alt="Missao Africa" />
      <div>Carol Detoni</div>
    </div>
  );
}

export default TopBar;
