import React from 'react';
import './App.css';
import Header from '../components/Header';
import ProductOverviewContainer from './ProductOverviewContainer'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />
            <ProductOverviewContainer />
          </Route>
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
