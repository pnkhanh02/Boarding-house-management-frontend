import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8888/api/v1/",
  headers: { "content-type": "application/json" },
});

export const api1 = (method, endpoint, payload) => {
  return axiosClient(endpoint, { method: method, data: payload })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
console.log("TK",token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const api = (method, endpoint, payload) => {
  return axiosClient(endpoint, { method: method, data: payload })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};