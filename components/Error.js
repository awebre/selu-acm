import MainLayout from "./MainLayout";
import RedAlert from "./RedAlert";
import Link from "./Link";

export default function Error({ title, message }) {
  return (
    <MainLayout>
      <MainLayout.Main>
        <h1 className="text-7xl my-10">{title}</h1>
        <RedAlert>{message}</RedAlert>
        <Link href="/">Go Home</Link>
      </MainLayout.Main>
      <MainLayout.Drawer />
    </MainLayout>
  );
}
