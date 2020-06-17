import React from 'react';
import { Link } from 'react-router-dom';

function TopBar() {
  return (
    <div className="h-16 bg-blue-900 fixed top-0 left-0 right-0 flex justify-center">
      <div className="container flex justify-between items-center">
        <div className="text-white text-2xl">Missao Africa</div>
        <div className="text-white flex-1 ml-16">
          <Link to="/sponsors" className="mr-4 underline">
            Sponsors
          </Link>
          <Link to="/labels" className="mr-4 underline">
            Labels
          </Link>
        </div>
        <div className="text-white">Carol</div>
      </div>
    </div>
  );
}

export default TopBar;
