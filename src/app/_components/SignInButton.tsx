"use client";

import { useClerk } from "@clerk/nextjs/app-beta/client";

export const SignInButton = () => {
  const { openSignIn } = useClerk();

  return <button onClick={() => openSignIn()}>Sign In</button>;
};
