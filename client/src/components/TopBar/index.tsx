import React, { useState } from 'react';
import logo from 'assets/img/logo.png';
import style from './style.module.scss';
import Icon from 'components/Icon';
import { useUser } from 'store/user/hooks';
import { logout } from 'services/auth';

function ContextMenu() {
  return (
    <div className="absolute shadow bg-white right-0 w-auto mr-4 mt-32 rounded flex flex-col">
      <button className="p-3 border-b hover:bg-gray-200 text-left focus:outline-none">
        Change password
      </button>
      <button
        className="p-3 border-b hover:bg-gray-200 text-left focus:outline-none"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

function TopBar() {
  const { user } = useUser();
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu((showMenu) => !showMenu);

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-white shadow flex justify-between p-3 items-center">
      <img className={style.logo} src={logo} alt="Missao Africa" />
      <div className="flex mr-4 cursor-pointer" onClick={toggleMenu}>
        <span className="mr-2">{user?.name}</span>
        <Icon icon="account_circle" />
      </div>
      {showMenu && <ContextMenu />}
    </nav>
  );
}

export default TopBar;
