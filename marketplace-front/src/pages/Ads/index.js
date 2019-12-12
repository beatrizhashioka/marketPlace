import React, { useState, useEffect } from "react";

import { Container, Ads } from "./styles";
import Button from "../../styles/components/Button";
import api from "../../services/api";

let data = [];

export default function Anuncio({ history }) {
  const [ads, setAds] = useState([]);
  useEffect(() => {
    const getAds = async () => {
      const response = await api.get("/ads");
      setAds(response.data.docs);
    };
    getAds();
  }, []);
  async function handleSubmitAds() {
    history.push("/ads");
  }

  async function handleSubmitUser() {
    history.push("/signup");
  }

  return (
    <div>
      <Container>
        <header>
          <h1>Anúncios</h1>
          <div>
            <Button onClick={handleSubmitUser}>+ Usuário</Button>
            <Button onClick={handleSubmitAds}>+ Anúncio</Button>
          </div>
        </header>
        <div>
          {ads.map(function (object) {
            return (
              <Ads key={object._id}>
                <p>Título: {object.title}</p>
                <p>Descrição: {object.description}</p>
                <p>Preço: R$ {object.price}</p>
                <p>Anunciante: {object.author.name}</p>
                <p>E-mail: {object.author.email}</p>
              </Ads>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
