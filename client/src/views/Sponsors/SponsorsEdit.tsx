import React from 'react';
import Title from '../../components/Title';
import Button from '../../components/Button';
import { useHistory } from 'react-router-dom';
import Input from '../../components/Input';
import useForm from '../../hooks/useForm';
import api from '../../services/api';

function SponsorsEdit() {
    const history = useHistory();
    const { values, bindInput } = useForm({ name: '', email: '' });
    const save = async () => {
        try {
            await api.saveSponsors(values);
            history.push('/sponsors');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Title title="Sponsors Form" />
            <div className="flex justify-between py-4">
                <div></div>
                <div>
                    <Button label="Save" onClick={save} />
                    <Button label="Cancel" onClick={() => history.push('/sponsors')} />
                </div>
            </div>
            <div className="w-1/2">
                <Input label="Name" className="mb-2" {...bindInput('name')} />
                <Input label="Email" {...bindInput('email')} />
            </div>
        </div>
    );
}

export default SponsorsEdit;
