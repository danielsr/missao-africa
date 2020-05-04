import React from 'react';

function TopBar() {
    return (
        <div className="h-16 bg-black fixed top-0 left-0 right-0 flex justify-center">
            <div className="container flex justify-between items-center">
                <div className="text-white text-2xl">Missao Africa</div>
                <div className="text-white flex-1 ml-12 mt-1 text-sm">
                    <span className="mr-4">Sponsors</span>
                    <span className="mr-4">Boletos</span>
                </div>
                <div className="text-white">Carolina</div>
            </div>
        </div>
    );
}

export default TopBar;
