import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../../services/api";
import { login } from "../../../services/auth";

import Button from "../../../styles/components/Button";
import { Container, SignForm } from "../styles";

export default function SignIn({ history }) {
  const [loading, setLoading] = useState("disabled");
  const [user, setUser] = useState({ email: "", password: "" });

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
      const response = await api.post(`/sessions`, user);

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
      <SignForm onSubmit={handleSubmit}>
        <h1>
          <i className="material-icons md-48">store_mall_directory</i>
        </h1>

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
          Entrar
        </Button>
      </SignForm>
    </Container>
  );
}
