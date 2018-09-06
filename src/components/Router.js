import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import NotFound from './NotFound';
import Radio from './Radio';
import Chart from './chart/Chart';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/radio" component={Radio} />
            <Route exact path="/chart" component={Chart} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Router;