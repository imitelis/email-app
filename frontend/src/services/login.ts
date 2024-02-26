import axios from "axios";

const baseUrl = "http://0.0.0.0:8000/api/login";

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
