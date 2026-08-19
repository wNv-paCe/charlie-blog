import PostCard from "./PostCard";
import { Post } from "@/lib/api";

type PostListProps = {
  title?: string;
  posts: Post[];
};

export default async function PostList({ title, posts }: PostListProps) {
  return (
    <section>
      {title && <h2 className="mb-6 text-2xl font-bold">{title}</h2>}

      {posts.length === 0 ? (
        <p className="text-foreground">
          There are no posts. Why not publish a new one?
        </p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
