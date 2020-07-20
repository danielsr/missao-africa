import React, { useEffect } from 'react';
import TopBar from 'components/TopBar';
import SideMenu from 'components/SideMenu';
import Routes from '../routes';
import Toaster from '../components/Toaster';
import useToaster from '../store/useToaster';
import { useLabels } from './Labels/hooks';
import { useLocation } from 'react-router-dom';

function App() {
  const { toaster } = useToaster();
  const { loadLabels } = useLabels();
  const { pathname } = useLocation();
  const isLoginRoute = pathname === '/login';

  useEffect(() => {
    !isLoginRoute && loadLabels();
  }, []);

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
