import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Something went wrong while talking to the server.";
    return Promise.reject(new Error(message));
  }
);

export default axiosClient;
