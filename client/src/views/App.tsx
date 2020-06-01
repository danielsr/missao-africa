import React from 'react';
import TopBar from '../components/TopBar';
import Routes from '../routes';

function App() {
  return (
    <div className="bg-gray-300 min-h-screen">
      <TopBar />
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
