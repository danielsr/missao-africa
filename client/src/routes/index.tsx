import React from 'react';
import { Route } from 'react-router-dom';
import People from 'modules/People';
import PeopleImport from 'modules/PeopleImport';
import PeopleEdit from 'modules/People/PeopleEdit';
import Login from 'modules/Login';
import Labels from 'modules/Labels';
import LabelsEdit from 'modules/Labels/LabelsEdit';

function Routes() {
  return (
    <>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/people">
        <People />
      </Route>
      <Route path="/people/:id">
        <PeopleEdit />
      </Route>
      <Route path="/people-import">
        <PeopleImport />
      </Route>
      <Route path="/labels">
        <Labels />
      </Route>
      <Route path="/labels/:id">
        <LabelsEdit />
      </Route>
    </>
  );
}

export default Routes;
