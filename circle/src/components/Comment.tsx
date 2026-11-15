import { useEffect, useState } from "react";
import CommentService from "../services/commentService";
import type { CommentI } from "../interfaces/commentI";

export default function Comment({ postId }: { postId: string }) {
  const [comments, setComments] = useState<CommentI[]>([]);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function loadComments() {
    try {
      const data = await CommentService.getPostComments(postId);
      setComments(data.data?.comments ?? data.comments ?? []);
    } catch (error: any) {
      console.log("Error:", error.response?.data);
    }
  }

  useEffect(() => {
    loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setIsLoading(true);
      setMessage("");
      await CommentService.addComment(postId, content.trim());
      setContent("");
      await loadComments();
    } catch (error: any) {
      console.log("Error:", error.response?.data);
      setMessage(error.response?.data?.message || "Could not add comment");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-3 border-t pt-3 flex flex-col gap-2">
      {comments.map((c) => (
        <div key={c._id} className="bg-gray-100 rounded-lg px-3 py-2 text-sm">
          <p className="font-semibold">{c.commentCreator?.name}</p>
          <p>{c.content}</p>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border rounded-lg px-3 py-1"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-3 py-1 rounded-lg disabled:opacity-50"
        >
          {isLoading ? "..." : "Send"}
        </button>
      </form>

      {message && <p className="text-sm text-red-500">{message}</p>}
    </div>
  );
}
