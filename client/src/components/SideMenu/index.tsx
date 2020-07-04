import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'css.gg/icons/css/user-list.css';
import 'css.gg/icons/css/user-add.css';
import 'css.gg/icons/css/tag.css';

function SideMenu() {
  const { pathname } = useLocation();
  const menuItems = [
    { label: 'People', to: '/people', icon: 'gg-user-list' },
    { label: 'Import People', to: '/people-import', icon: 'gg-user-add' },
    { label: 'Labels', to: '/labels', icon: 'gg-tag' },
  ].map((menuItem) => ({ ...menuItem, active: menuItem.to === pathname }));
  const baseClass = 'flex items-center mt-4 py-2 px-6 block border-l-4';
  const regularClass = `${baseClass} border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100`;
  const activeClass = `${baseClass} bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100`;

  return (
    <nav className="fixed top-0 left-0 bottom-0 w-64 bg-gray-900 flex flex-col text-white mt-20">
      {menuItems.map(({ label, to, active, icon }) => (
        <Link key={label} to={to} className={active ? activeClass : regularClass}>
          <span className="w-10">
            <i className={icon}></i>
          </span>
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}

export default SideMenu;
