import decode from "jwt-decode";

export const TOKEN_KEY = "@CESTA:token";
export const USER = "@CESTA:user";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null; //autenticado guardo o token

export const getToken = () => localStorage.getItem(TOKEN_KEY); //para pegar o token

//Para login- token
export const login = (token, user) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER, JSON.stringify(user));
};
//Para logout- remove token
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER);
};

//Para pegar usuário
export const userLocal = () => JSON.parse(localStorage.getItem(USER));
//Para verificar se token está expirado
export const isTokenExpired = () => {
  try {
    const decoded = decode(getToken());
    console.log(decoded);
    const date = new Date() / 1000;
    console.log(date);

    if (decoded.exp < date) {
      return true;
    }

    return false;
  } catch (err) {
    console.log("Expired check failed!"); //se erro
    return false;
  }
};
