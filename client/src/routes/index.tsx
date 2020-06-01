import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Sponsors from '../views/Sponsors/Sponsors';
import SponsorsImport from '../views/Sponsors/SponsorsImport';
import SponsorsEdit from '../views/Sponsors/SponsorsEdit';
import Login from '../views/Login';

function Routes() {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/sponsors">
        <Sponsors />
      </Route>
      <Route path="/sponsors-import">
        <SponsorsImport />
      </Route>
      <Route path="/sponsors-edit/:id">
        <SponsorsEdit />
      </Route>
      <Route path="/boletos">...</Route>
    </Switch>
  );
}

export default Routes;
