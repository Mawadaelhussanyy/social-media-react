import { useEffect, useState } from "react";
import PostsService from "../services/postsService";
import Comment from "../components/Comment";
import type { Post } from "../interfaces/postI";

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function getAllPosts() {
      try {
        const data = await PostsService.getAllPosts();
        setPosts(data.data?.posts ?? data.posts ?? []);
      } catch (error) {
        console.log("Failed to load posts", error);
      }
    }
    getAllPosts();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4 flex flex-col gap-4">
      {posts.length === 0 && <p className="text-gray-500">No posts yet.</p>}
      {posts.map((post) => (
        <div key={post._id} className="border rounded-xl p-4">
          <p className="font-semibold">{post.user?.name}</p>
          <p>{post.body}</p>
          {post.image && (
            <img src={post.image} alt="" className="mt-2 rounded-lg" />
          )}
          <Comment postId={post._id} />
        </div>
      ))}
    </div>
  );
}
