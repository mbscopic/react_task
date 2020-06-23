import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from "react-router-dom";
import Products from './components/Product/Products';

const app = () => {
  return (
      <Switch>
          <Route exact path={["/", "/products"]} component={Products} />
      </Switch>
  );
}

export default app;
