import React from 'react';
import Title from '../../components/Title';
import InputFile from '../../components/InputFile';
import { useSponsors } from './useSponsors';
import Grid, { GridField } from '../../components/Grid';

function Sponsors() {
    const { sponsors, importSponsors, error } = useSponsors();
    const fields: GridField[] = [
        { name: 'name', label: 'Name' },
        { name: 'email', label: 'Email' },
    ];

    return (
        <div>
            <Title title="Sponsors" />
            <div className="flex justify-between py-4">
                <div>Search</div>
                <div>
                    <button className="border-0 p-2 bg-gray-700 text-white rounded mr-2 text-sm">New Sponsor</button>
                    <button className="border-0 p-2 bg-gray-700 text-white rounded text-sm">Import Sponsors</button>
                </div>
            </div>
            <InputFile onChange={importSponsors} />
            {error && <span>{error}</span>}
            {sponsors.length > 0 && !error && <Grid fields={fields} data={sponsors} />}
        </div>
    );
}

export default Sponsors;
