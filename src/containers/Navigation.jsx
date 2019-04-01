import './Navigation.css';
import React from 'react';
import { ROUTE_BACKLOG, ROUTE_FISSION, ROUTE_WEBCOMPAT } from '../Routes';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navigation">
      <ul>
        <li><Link to={ ROUTE_BACKLOG }>Backlog</Link></li>
        <li>Performance</li>
        <li><Link to={ ROUTE_FISSION }>Fission</Link></li>
        <li><Link to={ ROUTE_WEBCOMPAT }>Webcompat</Link></li>
      </ul>
    </nav>
  )
};

export default Navigation;