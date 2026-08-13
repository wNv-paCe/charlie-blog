import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PostList from "@/components/PostList";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-16 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_280px] items-start">
          <PostList />
          <Sidebar />
        </div>
      </main>

      <Footer />
    </div>
  );
}
