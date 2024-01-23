import { api1 } from "./APIs";

export const loginAPI = (request) => {
  return api1("POST", "auth/login-jwt", request);
};
