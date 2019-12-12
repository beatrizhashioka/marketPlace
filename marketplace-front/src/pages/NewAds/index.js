import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";

import Button from "../../styles/components/Button";
import { Container, SignForm, Content } from "./styles";
import Navigation from "../../components/Navigation";

export default function NewAds({ history }) {
  const [ads, setAds] = useState({ title: "", description: "", price: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post(`/ads`, ads);
      history.push("/home");
    } catch (err) {
      toast.error("Erro ao cadastrar anúncio!");
    }
  }

  function handleInputChange(e) {
    const { id, value } = e.target;
    setAds({
      ...ads,
      [id]: value
    });
  }

  return (
    <Container>
      <Content>
        <SignForm onSubmit={handleSubmit}>
          <h1>Cadastro de anúncio</h1>

          <span>TÍTULO</span>
          <input
            id="title"
            value={ads.title}
            required
            onChange={handleInputChange}
          />

          <span>DESCRIÇÃO</span>
          <input
            id="description"
            value={ads.description}
            required
            onChange={handleInputChange}
          />

          <span>PREÇO</span>
          <input
            id="price"
            type="number"
            value={ads.price}
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
