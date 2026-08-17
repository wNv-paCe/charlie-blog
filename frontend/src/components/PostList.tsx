import PostCard from "./PostCard";
import { Post } from "@/lib/api";

type PostListProps = {
  posts: Post[];
};

export default async function PostList({ posts }: PostListProps) {
  return (
    <section>
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
