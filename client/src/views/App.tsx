import React, { useEffect } from 'react';
import TopBar from '../components/TopBar';
import Routes from '../routes';
import Toaster from '../components/Toaster';
import useToaster from '../store/useToaster';
import useLabels from './Labels/useLabels';

function App() {
  const { toaster } = useToaster();
  const { loadLabels } = useLabels();

  useEffect(() => {
    loadLabels();
  }, []);

  return (
    <div className="bg-gray-400 min-h-screen">
      <TopBar />
      {toaster.show && <Toaster text={toaster.text} />}
      <div className="flex justify-center">
        <div className="mt-24 mb-8 container">
          <div className="bg-gray-200 shadow-md rounded p-4">
            <Routes />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
