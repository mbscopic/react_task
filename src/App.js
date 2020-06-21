import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from "react-router-dom";
import Products from './components/Product/Products';
import {Route, Redirect} from 'react-router'

const app = () => {
  return (
      <BrowserRouter>
          <Route path="/products" exact component={Products}/>
          <Route exact path="/">
              <Redirect to="/products" />
          </Route>
      </BrowserRouter>
  );
}

export default app;
