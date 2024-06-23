import { getServerAuthSession } from "~/server/auth";
import { SessionProvider } from "~/components/session-provider";

import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/sonner";

export const metadata = {
  title: "Futy",
  description: "Follow leagues, teams and players in the world of football",
  icons: [{ rel: "icon", url: "/ball.png" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <SessionProvider session={session}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>

            <Toaster />
          </SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
