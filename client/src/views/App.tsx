import React from 'react';
import TopBar from '../components/TopBar';
import Routes from '../routes';
import Toaster from '../components/Toaster';
import useToaster from '../store/useToaster';

function App() {
  const { toaster } = useToaster();
  return (
    <div className="bg-gray-300 min-h-screen">
      <TopBar />
      {toaster.show && <Toaster text={toaster.text} />}
      <div className="flex justify-center">
        <div className="mt-24 mb-8 container">
          <div className="bg-white shadow-md rounded p-4">
            <Routes />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
