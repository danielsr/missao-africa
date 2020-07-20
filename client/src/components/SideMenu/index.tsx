import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from 'components/Icon';

function SideMenu() {
  const menuItems = [
    { label: 'People', to: '/people', icon: 'face' },
    { label: 'Import People', to: '/people-import', icon: 'publish' },
    { label: 'Labels', to: '/labels', icon: 'label' },
  ];

  return (
    <nav className="fixed top-0 left-0 bottom-0 w-64 bg-gray-900 flex flex-col text-white mt-20 pt-4">
      {menuItems.map(({ label, to, icon }) => (
        <NavLink
          key={label}
          to={to}
          className="flex items-center mt-4 px-6 py-2 text-gray-300 hover:bg-gray-600 hover:bg-opacity-25"
          activeClassName="border-r-4 border-gray-300 bg-gray-600 bg-opacity-25"
        >
          <Icon icon={icon} />
          <span className="ml-3">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default SideMenu;
