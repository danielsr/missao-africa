import React from 'react';
import { useLocation } from 'react-router-dom';
import TopBar from 'components/TopBar';
import SideMenu from 'components/SideMenu';
import Routes from 'routes';
import Toaster from 'components/Toaster';
import useToaster from 'store/useToaster';

function App() {
  const { toaster } = useToaster();
  const { pathname } = useLocation();
  const isLoginRoute = pathname === '/login';

  return (
    <div className="flex min-h-screen">
      {!isLoginRoute && (
        <>
          <TopBar />
          <SideMenu />
        </>
      )}
      <Routes />
      {toaster.show && <Toaster text={toaster.text} />}
    </div>
  );
}

export default App;
