import React from 'react';

type TitleProps = {
    title: string;
    subTitle?: string | null;
};

function Title({ title, subTitle }: TitleProps) {
    return (
        <div className="border-solid border-b-2 border-gray-500">
            <h1 className="text-2xl">{title}</h1>
            {subTitle && <h2 className="text-gray-600 text-sm">{subTitle}</h2>}
        </div>
    );
}

export default Title;
