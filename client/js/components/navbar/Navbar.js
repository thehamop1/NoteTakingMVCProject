import React, { Component } from 'react';
import LoginButton from './loginbutton/LoginButton'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';

export default class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar className="justify-content-between" color="light" light expand="md">
          <NavbarBrand href="/">Note Taking Application</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse className="flex-row-reverse" isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <LoginButton />
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
