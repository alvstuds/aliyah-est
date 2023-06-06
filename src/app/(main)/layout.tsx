import Menu from "@/components/Menu";
import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="fixed top-20 h-[calc(100vh-80px)] bg-white p-3 dark:bg-slate-900">
        <Menu />
      </div>
      <main className="ml-16 pt-20">
        <div className="mx-auto mt-8 max-w-7xl md:mt-16">
          <div className="container flex flex-col gap-6">{children}</div>
        </div>
      </main>
    </>
  );
}
