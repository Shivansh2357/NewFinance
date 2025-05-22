import axios from "./axios";

export const loginUser = async (email, password) => {
  const res = await axios.post("/users/login", { email, password });
  return res.data;
};

export const registerUser = async (name, email, password) => {
  const res = await axios.post("/users/register", {
    name,
    email,
    password,
  });
  return res.data;
};
