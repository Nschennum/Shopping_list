import React, { Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';


class AppNavbar extends React.Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className='navbar-text mr-3'>
            <strong>{user ? `Welcome ${user.name}` : ''}</strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );
      return (
        <div>
        <Navbar color="dark" dark expand="lg" className="mb-5">
        <Container><NavbarBrand href="/"> <FontAwesomeIcon icon="utensils"/>{" "}Meal Planning</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
        {isAuthenticated ? authLinks : guestLinks}
        <p style={{paddingTop: '.5rem', paddingRight: '.5rem',paddingLeft: '.5rem'}}>|</p>
        <NavItem className="icon">
        <i className="fa fa-pinterest fa-2x" style={{marginTop: ".4rem"}}></i>
            <NavLink href="https://www.pinterest.com/">
            Inspiration
            </NavLink>
        </NavItem>
        </Nav>
        </Collapse>
        </Container></Navbar>
    </div>

      );
      }
}

const mSTP = state => ({
  auth: state.auth
});

export default connect(
  mSTP,
  null
)(AppNavbar);