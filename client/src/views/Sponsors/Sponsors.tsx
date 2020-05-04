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
            <InputFile onChange={importSponsors} />
            {error && <span>{error}</span>}
            {sponsors.length > 0 && !error && <Grid fields={fields} data={sponsors} />}
        </div>
    );
}

export default Sponsors;
