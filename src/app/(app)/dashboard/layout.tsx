import Dashboard from "~/components/layout/Dashboard";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Dashboard>{children}</Dashboard>;
}
