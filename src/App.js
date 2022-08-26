import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Header } />
      </Switch>
    );
  }
}

export default App;
