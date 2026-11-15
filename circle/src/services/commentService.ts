import axios from "axios";

const BASE_URL = "https://route-posts.routemisr.com";

function authHeaders() {
  return {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}

class CommentService {
  async getPostComments(postId: string) {
    const { data } = await axios.get(`${BASE_URL}/posts/${postId}/comments`, {
      headers: authHeaders(),
    });
    return data;
  }

  async addComment(postId: string, content: string) {
    const { data } = await axios.post(
      `${BASE_URL}/posts/${postId}/comments`,
      { content },
      { headers: authHeaders() }
    );
    return data;
  }

  async deleteComment(postId: string, commentId: string) {
    const { data } = await axios.delete(
      `${BASE_URL}/posts/${postId}/comments/${commentId}`,
      { headers: authHeaders() }
    );
    return data;
  }
}

export default new CommentService();
