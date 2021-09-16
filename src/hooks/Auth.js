import decode from "jwt-decode";
import api from "../services/api";
import { authHeader } from "../services/authHeader";

export const login = async (email, password) => {
  return await api
    .post("/auth/authenticate", { email, password })
    .then((response) => {
      const {
        user,
        token,
        openClose,
        // totalPedidosProcess,
        totalUsers,
      } = response.data;

      if (user.typeUser === "user") {
        throw new Error("Usuário não tem permissão");
      }

      localStorage.setItem("_accessAuthenticatedTokenserginLanche", token);
      localStorage.setItem("_activeUserserginLanche", JSON.stringify(user));
      localStorage.setItem("_openCloseserginLanche", openClose);
      localStorage.setItem("_totalUsersserginLanche", totalUsers);

      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem("_accessAuthenticatedTokenserginLanche");
  localStorage.removeItem("_activeUserserginLanche");
  localStorage.removeItem("_openCloseserginLanche");
  localStorage.removeItem("_totalUsersserginLanche");
};

export const register = () => {
  return;
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("_accessAuthenticatedTokenserginLanche");

  if (token !== null) {
    // desestruturando pegando apenas a data de expiração do token
    const { exp } = decode(token);

    // Verificar se o token esta válido
    if (exp >= new Date().getTime() / 1000) {
      return true;
    }
  }
  return false;
};

export const upgradePassUser = async (dataUser) => {
  const { Authorization } = authHeader();
  const { userId, oldPassword, newPassword } = dataUser;
  const data = {
    oldPassword: oldPassword,
    newPassword: newPassword,
  };
  return await api
    .put(`auth/password/${userId}`, data, {
      headers: { Authorization: Authorization },
    })
    .then((response) => response.data);
};

export const upgradeUser = async (user) => {
  const { Authorization } = authHeader();
  const { id, name, email, phone } = user;
  const data = {
    name,
    email,
    phone,
  };

  return await api
    .put(`auth/users/${id}`, data, {
      headers: { Authorization: Authorization },
    })
    .then((response) => response.data);
};

export const getUserClient = async () => {
  const { Authorization } = authHeader();
  return await api
    .get("/auth/users", {
      headers: { Authorization: Authorization },
    })
    .then((response) => response.data);
};

export const blockedUser = async (user) => {
  const { Authorization } = authHeader();
  const { id } = user;
  return await api
    .get(`/auth/blocked/${id}`, {
      headers: { Authorization: Authorization },
    })
    .then((response) => {
      const dataUser = {
        ...user,
        blocked: response.data,
      };
      return dataUser;
    });
};
