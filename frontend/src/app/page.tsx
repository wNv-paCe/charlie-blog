import PostList from "@/components/PostList";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_280px] items-start">
        <PostList />
        <Sidebar />
      </div>
    </div>
  );
}
