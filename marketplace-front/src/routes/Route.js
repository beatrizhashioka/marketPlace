import React from "react";
import { Route, Redirect } from "react-router-dom";

import {
  isAuthenticated,
  userLocal,
  isTokenExpired,
  logout
} from "../services/auth";

import Navigation from "../components/Navigation";

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  isAdmin = false,
  ...rest
}) {
  // const signed = !!localStorage.getItem('@CESTA/token');
  console.log("expired", isTokenExpired()); //caso token expire

  if (!isAuthenticated() && isPrivate) {
    return <Redirect to="/" />; //vai para raíz
  }
  //verifica se toke expirou
  if (isTokenExpired()) {
    logout();
    return <Redirect to="/" />;
  }
  //se autenticado
  if (isAuthenticated() && !isPrivate) {
    return <Redirect to="/home" />;
  }
  // verifica se é admin
  if (isAuthenticated() && isPrivate && isAdmin && !userLocal().isAdmin) {
    return <Redirect to="/home" />;
  }

  return (
    <>
      {isPrivate && <Navigation />}
      <Route {...rest} component={Component} />
    </>
  );
}
