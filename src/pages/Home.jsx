import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { UserLink } from './Home.styled';

export default class Home extends Component {
  render() {
    return (
      <>
        <NavLink>
          <UserLink to="/home">Home</UserLink>
          <UserLink to="/portfolio">Portfolio</UserLink>
          <UserLink to="/contacts">Contacts</UserLink>
        </NavLink>
      </>
    );
  }
}
