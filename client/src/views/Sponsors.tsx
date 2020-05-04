import React from 'react';
import Title from '../components/Title';

function Sponsors() {
    return (
        <div>
            <Title title="Sponsors" />
            <table className="table-auto">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>001</td>
                        <td>Daniel</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Sponsors;
