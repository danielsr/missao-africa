import React from 'react';
import Title from '../components/Title';
import TopBar from '../components/TopBar';

function App() {
    return (
        <div className="bg-gray-300 h-screen">
            <TopBar />
            <div className="flex justify-center">
                <div className="mt-24 container">
                    <div className="bg-white shadow-md rounded p-4">
                        <Title title="Sponsors" />
                        <table className="table-auto">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>001</td>
                                    <td>Daniel</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
