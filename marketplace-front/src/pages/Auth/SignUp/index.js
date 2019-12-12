import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../../services/api";
import { login } from "../../../services/auth";

import Navigation from "../../../components/Navigation";
import Button from "../../../styles/components/Button";
import { Container, SignForm, Content } from "../styles";

export default function SignUp({ history }) {
  const [loading, setLoading] = useState("disabled");
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    const isEnabled = () => {
      return user.email.length > 5 && user.password.length >= 6
        ? setLoading("")
        : setLoading("disabled");
    };
    isEnabled();
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post(`/users`, user);

      const userCreate = { email: user.email, password: user.password };

      const response = await api.post(`/sessions`, userCreate);

      const { token, user: userData } = response.data;

      if (token) {
        login(token, userData);
      }

      history.push("/home");
    } catch (err) {
      toast.error("Email ou senha inválido!");
    }
  }

  function handleInputChange(e) {
    const { id, value } = e.target;
    setUser({
      ...user,
      [id]: value
    });
  }

  return (
    <Container>
      <Content>
        <SignForm onSubmit={handleSubmit}>
          <h1>Cadastro de usuário</h1>

          <span>NOME</span>
          <input
            id="name"
            value={user.name}
            required
            onChange={handleInputChange}
          />

          <span>E-MAIL</span>
          <input
            id="email"
            type="email"
            value={user.email}
            required
            onChange={handleInputChange}
          />

          <span>SENHA</span>
          <input
            id="password"
            type="password"
            value={user.password}
            required
            onChange={handleInputChange}
          />

          <Button size="big" onClick={handleSubmit} type="submit">
            Cadastrar
          </Button>
        </SignForm>
      </Content>
    </Container>
  );
}
