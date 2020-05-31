import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Sponsors from './Sponsors/Sponsors';
import SponsorsImport from './Sponsors/SponsorsImport';
import SponsorsEdit from './Sponsors/SponsorsEdit';

function Routes() {
  return (
    <Switch>
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
