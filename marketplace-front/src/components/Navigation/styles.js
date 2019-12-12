import styled from "styled-components";
//Estilização do código
export const Container = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  background: #202225;
  padding: 20px 10px;
  width: 80px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Item = styled.button`
  border: 0;
  background: transparent;
  margin: 0 0 8px;

  i {
    font-size: 55px;
    color: #fff;
  }

  &:hover i {
    border-radius: 30%;
  }
`;

export const Logout = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: 1px dashed #e04848;
  background: transparent;
  color: #e04848;
  font-weight: bold;
  transition: all 0.2s;

  &:hover {
    border-color: #a43d3d;
  }
`;

export const Back = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: 1px dashed #cecece;
  background: transparent;
  color: #fff;
  font-weight: bold;
  transition: all 0.2s;

  &:hover {
    border-color: #ffff;
  }
`;
