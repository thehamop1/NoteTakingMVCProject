import { useOktaAuth } from '@okta/okta-react';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Jumbotron, Button } from 'reactstrap';

const Home = () => {
  const { authState } = useOktaAuth();
  if (authState.isPending) {
    return <div>Loading...</div>;
  }
  else if (!authState.isAuthenticated) {
    return (
      <div className="h-100">
        <Jumbotron id="FrontPage" className="h-100" >
          <h1 className="display-3">MVC based note taking application</h1>
          <p className="lead">This is a basic note taking application</p>
          <hr className="my-2" />
          <p>It uses React, SailsJS, Waterline ORM, and Postgres. Login to take notes.</p>
        </Jumbotron>
      </div>
    );
  }
  else {
    return (
      <div>
        <Redirect to={"/Notes"} />
      </div>
    );
  }
};

export default Home;