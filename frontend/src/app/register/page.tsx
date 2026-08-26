import Sidebar from "@/components/Sidebar";
import { RegisterForm } from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid h-full grid-cols-1 gap-8 md:grid-cols-[1fr_280px] items-start">
        <RegisterForm />
        <Sidebar />
      </div>
    </div>
  );
}
