import Sidebar from "@/components/Sidebar";
import { PostForm } from "../PostForm";

export default function NewPostPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_280px] items-start">
        <PostForm mode="create" />
        <Sidebar />
      </div>
    </div>
  );
}
