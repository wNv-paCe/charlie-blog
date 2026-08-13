import { getPosts } from "@/lib/api";
import PostCard from "./PostCard";

export default async function PostList() {
  const data = await getPosts(0, 10);

  return (
    <section>
      <div className="space-y-6">
        {data.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
