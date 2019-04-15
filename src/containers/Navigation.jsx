import './Navigation.css';
import React from 'react';
import { ROUTE_BACKLOG, ROUTE_FISSION, ROUTE_WEBCOMPAT, ROUTE_PERFORMANCE } from '../Routes';
import { Link } from 'react-router-dom';

function renderLink(location, label, route) {
  const unprefixedPath = location.pathname.substring(1);
  return (
    <li>{ unprefixedPath === route ? <strong>{ label }</strong> : <Link to={ route }>{ label }</Link> }</li>
  )
}

function Navigation({ router }) {
  const location = router.location;

  return (
    <nav className="navigation">
      <ul>
        { renderLink(location, 'Backlog', ROUTE_BACKLOG) }
        { renderLink(location, 'Performance', ROUTE_PERFORMANCE) }
        { renderLink(location, 'Fission', ROUTE_FISSION) }
        { renderLink(location, 'Webcompat', ROUTE_WEBCOMPAT) }
      </ul>
    </nav>
  )
};

export default Navigation;