import React from 'react';

type ButtonProps = {
    label: string;
    onClick: Function;
};

function Button({ label, onClick }: ButtonProps) {
    return (
        <button
            className="border-0 p-2 bg-blue-900 hover:bg-blue-800 text-white rounded mr-2 text-sm"
            onClick={() => onClick()}
        >
            {label}
        </button>
    );
}

export default Button;
