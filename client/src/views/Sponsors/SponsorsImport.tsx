import React from 'react';
import { useHistory } from 'react-router-dom';
import Title from '../../components/Title';
import InputFile from '../../components/InputFile';
import { useImportSponsors } from './useImportSponsors';
import Grid, { GridField } from '../../components/Grid';
import Button from '../../components/Button';
import api from '../../services/api';

function SponsorsImport() {
    const history = useHistory();
    const { sponsors, importSponsors, error } = useImportSponsors();
    const fields: GridField[] = [
        { name: 'name', label: 'Name' },
        { name: 'email', label: 'Email' },
    ];

    return (
        <div>
            <Title title="Import Sponsors" />
            <div className="flex justify-between py-4">
                <div></div>
                <div>
                    <Button
                        label="Import"
                        onClick={() => api.importSponsors(sponsors)}
                        disabled={sponsors.length === 0}
                    />
                    <Button label="Cancel" onClick={() => history.push('/sponsors')} />
                </div>
            </div>
            <InputFile onChange={importSponsors} />
            {error && <span>{error}</span>}
            {sponsors.length > 0 && !error && <Grid fields={fields} data={sponsors} />}
        </div>
    );
}

export default SponsorsImport;
