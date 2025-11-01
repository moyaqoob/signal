import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import Header from "./header";
import { redirect } from "next/navigation";


const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/Signin"); // ✅ use redirect in server components
  }

  const user = {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
  };

  return (
    <div className="min-h-screen text-gray-400">
      <Header user={user} />
      <div className="container py-10">{children}</div>
    </div>
  );
};

export default Layout;
