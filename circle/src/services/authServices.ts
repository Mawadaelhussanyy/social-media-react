import axios from "axios";
import type { registerData } from "../types/registerData";

class AuthServices {
  async signup(values: registerData) {
    const response = await axios.post(
      "https://route-posts.routemisr.com/users/signup",
      values
    );

    return response.data;
  }

  async signin(values: { email: string; password: string }) {
    const response = await axios.post(
      "https://route-posts.routemisr.com/users/signin",
      values
    );

    return response.data;
  }

  async getUserData() {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "https://route-posts.routemisr.com/users/profile-data",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
}

export default new AuthServices();