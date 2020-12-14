import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './navbar/Navbar';
import Home from './home/Home';
import Notes from './notes/Notes';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import { Container } from 'reactstrap';

const config = {
  clientId: 'this is a secret my clone of this repo has it',
  issuer: 'https://my-csunapp.okta.com/oauth2/default',
  redirectUri: 'https://notetakingapp-csun.herokuapp.com/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
};
const oktaAuth = new OktaAuth(config);

export default function LandingPage() {
  return (
    <Router>
      <Security oktaAuth={oktaAuth}>
        <NavBar />
        <Container>
          <Switch>
            <Route path='/login/callback' component={LoginCallback} />
            <Route path="/" component={Home} />
            <SecureRoute path="/Notes" component={Notes} />
          </Switch>
        </Container>
      </Security>
    </Router>
  );
}
