import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostsService from "../services/postsService";

export default function Post() {
  const navigate = useNavigate();
  const [body, setBody] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!body.trim() && !image) {
      setMessage("Write something or choose an image.");
      return;
    }

    const formData = new FormData();
    formData.append("body", body);
    if (image) {
      formData.append("image", image);
    }

    try {
      setIsLoading(true);
      setMessage("");
      await PostsService.addPost(formData);
      setBody("");
      setImage(null);
      navigate("/");
    } catch (error: any) {
      console.log("Error:", error.response?.data);
      setMessage(error.response?.data?.message || "Could not add post");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 flex flex-col gap-3">
      <input
        type="text"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="What's on your mind?"
        className="border rounded-lg p-2"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] ?? null)}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
      >
        {isLoading ? "Posting..." : "Post"}
      </button>

      {message && <p className="text-sm text-red-500">{message}</p>}
    </form>
  );
}
