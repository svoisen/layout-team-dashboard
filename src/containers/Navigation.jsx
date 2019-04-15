import './Navigation.css';
import React from 'react';
import { ROUTE_BACKLOG, ROUTE_FISSION, ROUTE_WEBCOMPAT, ROUTE_PERFORMANCE } from '../Routes';
import { Link } from 'react-router-dom';

function Navigation({ router }) {
  const location = router.location;
  const unprefixedPath = location.pathname.substring(1);

  return (
    <nav className="navigation">
      <ul>
        <li>{ unprefixedPath === ROUTE_BACKLOG ? <strong>Backlog</strong> : <Link to={ ROUTE_BACKLOG }>Backlog</Link> }</li>
        <li><Link to={ ROUTE_PERFORMANCE }>Performance</Link></li>
        <li><Link to={ ROUTE_FISSION }>Fission</Link></li>
        <li><Link to={ ROUTE_WEBCOMPAT }>Webcompat</Link></li>
      </ul>
    </nav>
  )
};

export default Navigation;