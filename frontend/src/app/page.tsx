import PostList from "@/components/PostList";
import Sidebar from "@/components/Sidebar";
import { getPosts } from "@/lib/api";

export default async function Home() {
  const data = await getPosts(0, 10);
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_280px] items-start">
        <PostList posts={data.posts} />
        <Sidebar />
      </div>
    </div>
  );
}
