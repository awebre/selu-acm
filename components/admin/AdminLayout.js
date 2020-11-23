import { useSession } from "next-auth/client";
import { Error, MainLayout } from "components";

export default function AdminLayout({ children }) {
  const [session, loading] = useSession();
  if (loading) return null;

  if (!loading && !session)
    return (
      <Error
        title="ACM Officer Portal"
        message="Looks like you aren't logged in. Please log in before trying to access this page."
      />
    );

  return (
    <MainLayout>
      <MainLayout.Main justify="start" className="w-full">
        {children}
      </MainLayout.Main>
      <MainLayout.Drawer />
    </MainLayout>
  );
}
