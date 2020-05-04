import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Sponsors from './Sponsors/Sponsors';

function Routes() {
    return (
        <Switch>
            <Route path="/sponsors">
                <Sponsors />
            </Route>
            <Route path="/boletos">...</Route>
        </Switch>
    );
}

export default Routes;
