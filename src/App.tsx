import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login } from "./Login";
import { Home } from "./Home";
import { Group } from "./Group";
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" exact component={Home} />
        <Route path="/group/:groupId" exact component={Group} />
        <Route path="/" render={() => <div>404</div>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
