import { useOktaAuth } from '@okta/okta-react';
import React from 'react';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

const LoginButton = () => {
const { oktaAuth, authState } = useOktaAuth();

  const login = async () => oktaAuth.signInWithRedirect('/');
  const logout = async () => oktaAuth.signOut('/');

  if(authState.isPending) {
    return <div>Loading...</div>;
  }
  else if(!authState.isAuthenticated) {
    return (
      <div>
        <Button onClick={login}>Login</Button>
      </div>
    );
  }
  else
  {
    return (
      <div>
        <Button onClick={logout}>Logout</Button>
      </div>
    );
  }

};

export default LoginButton;