import { MainLayout } from "components";
import { BreadCrumb } from "./navigation";

export default function ContentPage({ children }) {
  return (
    <MainLayout>
      <div className="bg-green-600 w-full pt-24 pb-24 shadow-inner">
        <h1 className="text-7xl text-white text-center">SLU ACM</h1>
      </div>
      <BreadCrumb />
      <MainLayout.Main>{children}</MainLayout.Main>
      <MainLayout.Drawer />
    </MainLayout>
  );
}
