import axios from "axios";

const baseUrl = "/api/login";

interface LoginCredentials {
  email: string;
  password: string;
}

const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
}

const login = async (credentials: LoginCredentials) => {
  const response = await axios.post(baseUrl, credentials, config);
  console.log(response)
  return response.data;
};

export default { login };
