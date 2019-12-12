import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { Container, List, Item, Logout, Back } from "./styles";
import { createHashHistory } from "history";
import { logout } from "../../services/auth";

export default function Navigation() {
  const [logged, setLogged] = useState(true); //useState para logged

  const history = createHashHistory();
  async function handleSubmit(e) {
    e.preventDefault();
    history.push("/"); //página "raiz"
  }

  async function back() {
    window.history.back(); //voltar
  }

  function handleLogout() {
    logout(); //para logout
    setLogged(!logged);
  }

  return (
    <Container>
      {!logged && <Redirect to="/" />}
      <List>
        <Item>
          <i className="material-icons">account_circle</i>
        </Item>
      </List>
      <Back onClick={back}>Voltar</Back>
      <Logout onClick={handleLogout}>Sair</Logout>
    </Container>
  );
}
