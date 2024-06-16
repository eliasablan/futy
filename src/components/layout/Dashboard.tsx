import Sidebar from "~/components/layout/Sidebar";
import Header from "~/components/layout/Header";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* Sidebar */}
      <Sidebar />

      <div className="relative flex flex-col pb-4 sm:pl-14">
        <Header />
        {/* Page Header */}
        <main className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-4 p-4 md:grid-cols-5">
          {/* Page Content */}
          {children}
        </main>
      </div>
    </div>
  );
}
