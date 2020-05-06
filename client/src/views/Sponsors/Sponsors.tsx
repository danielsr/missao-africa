import React from 'react';
import Title from '../../components/Title';
import InputFile from '../../components/InputFile';
import { useSponsors } from './useSponsors';
import Grid, { GridField } from '../../components/Grid';
import Button from '../../components/Button';

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
                    <Button label="New Sponsor" onClick={() => console.log('...')} />
                    <Button label="Import Sponsors" onClick={() => console.log('...')} />
                </div>
            </div>
            <InputFile onChange={importSponsors} />
            {error && <span>{error}</span>}
            {sponsors.length > 0 && !error && <Grid fields={fields} data={sponsors} />}
        </div>
    );
}

export default Sponsors;
