import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Sponsors from '../views/Sponsors/Sponsors';
import SponsorsImport from '../views/Sponsors/SponsorsImport';
import SponsorsEdit from '../views/Sponsors/SponsorsEdit';
import Login from '../views/Login';
import Labels from '../views/Labels';
import LabelsEdit from '../views/Labels/LabelsEdit';

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
      <Route path="/labels">
        <Labels />
      </Route>
      <Route path="/labels-edit/:id">
        <LabelsEdit />
      </Route>
    </Switch>
  );
}

export default Routes;
