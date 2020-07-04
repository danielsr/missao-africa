import React from 'react';
import { Link } from 'react-router-dom';
// import style from './style.module.scss';

function SideMenu() {
  return (
    <nav className="fixed top-0 left-0 bottom-0 w-64 bg-gray-800 flex flex-col text-white mt-20">
      <Link to="/sponsors" className="mr-4 underline">
        Sponsors
      </Link>
      <Link to="/labels" className="mr-4 underline">
        Labels
      </Link>
    </nav>
  );
}

export default SideMenu;
