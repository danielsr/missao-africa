import React from 'react';
import { Switch, Route } from 'react-router-dom';
import People from 'modules/People';
import PeopleImport from 'modules/PeopleImport';
import PeopleEdit from 'modules/People/PeopleEdit';
import Login from 'modules/Login';
import Labels from 'modules/Labels';
import LabelsEdit from 'modules/Labels/LabelsEdit';

function Routes() {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/people">
        <People />
      </Route>
      <Route path="/people-import">
        <PeopleImport />
      </Route>
      <Route path="/people-edit/:id">
        <PeopleEdit />
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
