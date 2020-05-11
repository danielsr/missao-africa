import React from 'react';
import { useHistory } from 'react-router-dom';
import Title from '../../components/Title';
import Button from '../../components/Button';
import Input from '../../components/Input';
import useSponsors from './useSponsors';
import { GridField } from '../../components/Grid';
import GridEdit from '../../components/GridEdit';
import Pagination from '../../components/Pagination';

function Sponsors() {
    const history = useHistory();
    const { sponsors, setSearch, search, pagination, setPageIndex } = useSponsors();
    const fields: GridField[] = [
        { name: 'name', label: 'Name' },
        { name: 'email', label: 'Email' },
    ];

    return (
        <div>
            <Title title="Sponsors" />
            <div className="flex justify-between py-4">
                <div className="flex-1">
                    <Input placeHolder="Search sponsors..." className="w-1/2" value={search} onChange={setSearch} />
                </div>
                <div>
                    <Button label="New Sponsor" onClick={() => history.push('/sponsors-edit/0')} />
                    <Button label="Import Sponsors" onClick={() => history.push('/sponsors-import')} />
                </div>
            </div>
            <GridEdit data={sponsors} fields={fields} editRoute="/sponsors-edit" />
            <Pagination {...pagination} onChange={setPageIndex} />
        </div>
    );
}

export default Sponsors;
