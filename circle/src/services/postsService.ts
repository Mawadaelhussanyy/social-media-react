import axios from "axios";

const BASE_URL = "https://route-posts.routemisr.com";

function authHeaders() {
  return {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}

class PostsService {
  async getAllPosts() {
    const { data } = await axios.get(`${BASE_URL}/posts`, {
      headers: authHeaders(),
    });
    return data;
  }

  async addPost(formData: FormData) {
    // Do NOT set Content-Type manually: axios/browser adds the multipart boundary.
    const { data } = await axios.post(`${BASE_URL}/posts`, formData, {
      headers: authHeaders(),
    });
    return data;
  }
}

export default new PostsService();
