import React from 'react';
import Title from '../../components/Title';
import InputFile from '../../components/InputFile';
import { useSponsors } from './useSponsors';

function Sponsors() {
    const { sponsors, importSponsors, error } = useSponsors();

    return (
        <div>
            <Title title="Sponsors" />
            <InputFile onChange={importSponsors} />
            {error && <span>{error}</span>}
            <table className="table-auto">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {sponsors?.map((sponsor, index) => (
                        <tr key={`Sponsor_Row_${index}`}>
                            <td>{sponsor[1]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Sponsors;
