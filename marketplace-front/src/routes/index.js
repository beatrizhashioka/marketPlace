import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import Route from "./Route";
import Ads from "../pages/Ads";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";
import NewAds from "../pages/NewAds";
//Para rotas. /ads, /home são privadas. /signup é para administrador
export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/ads" component={NewAds} isPrivate />
        <Route exact path="/home" component={Ads} isPrivate />
        <Route exact path="/signup" component={SignUp} isPrivate isAdmin />
      </Switch>
    </BrowserRouter>
  );
}
