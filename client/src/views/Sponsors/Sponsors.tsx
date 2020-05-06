import React from 'react';
import Title from '../../components/Title';
import Button from '../../components/Button';
import { useHistory } from 'react-router-dom';
import Input from '../../components/Input';

function Sponsors() {
    const history = useHistory();

    return (
        <div>
            <Title title="Sponsors" />
            <div className="flex justify-between py-4">
                <div className="flex-1">
                    <Input placeHolder="Search sponsors..." className="w-1/2" />
                </div>
                <div>
                    <Button label="New Sponsor" onClick={() => console.log('...')} />
                    <Button label="Import Sponsors" onClick={() => history.push('/sponsors-import')} />
                </div>
            </div>
        </div>
    );
}

export default Sponsors;
