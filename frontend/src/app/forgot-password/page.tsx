import Sidebar from "@/components/Sidebar";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default async function ForgotPasswordPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_280px] items-start">
        <ForgotPasswordForm />
        <Sidebar />
      </div>
    </div>
  );
}
