import AuthComponent from "@/components/modules/auth";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const AuthPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <div className="min-h-[90vh] py-6 px-4 flex justify-center items-center">
      <AuthComponent />
    </div>
  );
};

export default AuthPage;
