import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Loadable from "./Loadable";
import TabBar from '@components/TabBar';

const ErrPage = Loadable(() => import(/* webpackChunkName:"404" */ "@views/404"));
const Home = Loadable(() => import(/* webpackChunkName:"home" */ "@views/home"));
const Community = Loadable(() => import(/* webpackChunkName:"community" */ "@views/community"));
const Find = Loadable(() => import(/* webpackChunkName:"find" */ "@views/find"));
const Classify = Loadable(() => import(/* webpackChunkName:"classify" */ "@views/classify"));
const Search = Loadable(() => import(/* webpackChunkName:"search" */ "@views/search"));

const Routes = () => (
  <BrowserRouter>
    <Fragment>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/community" component={Community} />
        <Route path="/find" component={Find} />
        <Route path="/404" component={ErrPage} />
        <Route path="/classify" component={Classify} />
        <Route path="/search" component={Search} />
        <Redirect exact from="/" to="/home" />
        <Redirect to="/404" />
      </Switch>
      <TabBar/>
    </Fragment>
  </BrowserRouter>
);

export default Routes;
