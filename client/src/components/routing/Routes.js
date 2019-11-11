import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import AddTravel from '../profile-forms/AddTravel';
import Profile from '../profile/Profile';
import Profiles from '../profiles/Profiles';
import Group from '../group/Group';
import Groups from '../groups/Groups';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile/:id" component={Profile} />
        <Route exact path="/profiles" component={Profiles} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-travel" component={AddTravel} />
        <PrivateRoute exact path="/groups" component={Groups} />
        <PrivateRoute exact path="/groups/:id" component={Group} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes
