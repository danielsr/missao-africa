import React, { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Title from '../../components/Title';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useSponsors } from './useSponsors';
import Grid, { GridField } from '../../components/Grid';
import { useForm } from '../../hooks/useForm';

function Sponsors() {
    const history = useHistory();
    const { values, bind } = useForm({ search: '' });
    const { sponsors, fetchSponsors } = useSponsors();

    const fields: GridField[] = [
        { name: 'name', label: 'Name' },
        { name: 'email', label: 'Email' },
    ];

    useEffect(() => {
        fetchSponsors(values.search);
    }, [values.search]);

    return (
        <div>
            <Title title="Sponsors" />
            <div className="flex justify-between py-4">
                <div className="flex-1">
                    <Input placeHolder="Search sponsors..." className="w-1/2" {...bind('search')} />
                </div>
                <div>
                    <Button label="New Sponsor" onClick={() => history.push('/sponsors-edit/0')} />
                    <Button label="Import Sponsors" onClick={() => history.push('/sponsors-import')} />
                </div>
            </div>
            <Grid data={sponsors} fields={fields} />
        </div>
    );
}

export default Sponsors;
