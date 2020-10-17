import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from './components/header/Hedaer';
import Main from './components/main/Main';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { appRoutes } from './redux/actions/routes';
import './App.scss';
import ErrorBoundary from './components/error/ErrorBoundary';
import Details from './components/content/details/Details';

const App = (props) => {
  const { appRoutes } = props;

  const routesArray = [
    {
      id: 1,
      path: '/',
      component: Main
    },
    {
      id: 2,
      path: '/:id/:name/details',
      component: Details
    }
  ];

  useEffect(() => {
    appRoutes(routesArray);
  }, [routesArray, appRoutes]);

  return (
    <Router>
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      <div className="app">
        <Switch>
          {routesArray.map((data) => (
            <Route key={data.id} exact path={data.path} component={data.component} {...props} />
          ))}
        </Switch>
      </div>
    </Router>
  );
};

App.propTypes = {
  appRoutes: PropTypes.func
};

export default connect(null, { appRoutes })(App);
