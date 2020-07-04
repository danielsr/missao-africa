import React, { useEffect } from 'react';
import TopBar from 'components/TopBar';
import SideMenu from 'components/SideMenu';
import Routes from '../routes';
import Toaster from '../components/Toaster';
import useToaster from '../store/useToaster';
import { useLabels } from './Labels/hooks';

function App() {
  const { toaster } = useToaster();
  const { loadLabels } = useLabels();

  useEffect(() => {
    loadLabels();
  }, []);

  return (
    <div className="flex min-h-screen">
      <TopBar />
      <SideMenu />
      <Routes />
      {toaster.show && <Toaster text={toaster.text} />}
    </div>
  );
}

export default App;
