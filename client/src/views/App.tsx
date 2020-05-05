import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import TopBar from '../components/TopBar';
import Routes from './Routes';

function App() {
    return (
        <Router>
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
        </Router>
    );
}

export default App;
