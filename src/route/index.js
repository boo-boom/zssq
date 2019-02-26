import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Loadable from './Loadable';
const Home = Loadable(() => import(/* webpackChunkName:"home" */'@views/home'));
const Community = Loadable(() => import(/* webpackChunkName:"community" */'@views/community'));
const Find = Loadable(() => import(/* webpackChunkName:"find" */'@views/find'));

const Routes = () => (
    <BrowserRouter>
        <Fragment>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/home' component={Home} />
                <Route path='/community' component={Community} />
                <Route path='/find' component={Find} />
                <Redirect to='/' />
            </Switch>
        </Fragment>
    </BrowserRouter>
)

export default Routes;