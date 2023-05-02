import {
  ClerkProvider,
  OrganizationSwitcher,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs/app-beta";
import { SignInButton } from "~/app/_components/SignInButton";
import "./globals.css";

export const metadata = {
  title: "Shed",
  description:
    "A small building, usually made of wood, used for storing things.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body>
          <NavBar />
          <main>{children}</main>
        </body>
      </ClerkProvider>
    </html>
  );
}

const NavBar = () => {
  return (
    <nav className="border-b-2">
      <div className="mx-auto flex h-16 max-w-5xl justify-between">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold tracking-tight">Shed</span>
          <div className="pt-2">
            <OrganizationSwitcher />
          </div>
        </div>
        <div className="flex items-center">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};
