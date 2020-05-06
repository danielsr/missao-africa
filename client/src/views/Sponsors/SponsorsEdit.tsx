import React from 'react';
import Title from '../../components/Title';
import Button from '../../components/Button';
import { useHistory } from 'react-router-dom';
import Input from '../../components/Input';

function SponsorsEdit() {
    const history = useHistory();

    return (
        <div>
            <Title title="Sponsors Form" />
            <div className="flex justify-between py-4">
                <div></div>
                <div>
                    <Button label="Save" onClick={() => console.log('...')} />
                    <Button label="Cancel" onClick={() => history.push('/sponsors')} />
                </div>
            </div>
            <div className="w-1/2">
                <Input label="Name" className="mb-2" />
                <Input label="Email" />
            </div>
        </div>
    );
}

export default SponsorsEdit;
