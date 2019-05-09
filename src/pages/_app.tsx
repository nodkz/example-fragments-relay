import React, { Component } from 'react';
import { History } from 'history';
import { Container } from 'react-bootstrap';
import { Environment } from 'relay-runtime';
import { Router } from 'react-router-dom';
import Menu from '../components/Menu';
import AppRoute from './_routes';
import RelayContext from '../RelayContext';

interface Props {
  history: History;
  relayEnv: Environment;
}

class App extends Component<Props> {
  render() {
    const { history, relayEnv } = this.props;
    return (
      <Container>
        <RelayContext.Provider value={relayEnv}>
          <Router history={history}>
            <Menu />
            <AppRoute />
          </Router>
        </RelayContext.Provider>
      </Container>
    );
  }
}

export default App;
