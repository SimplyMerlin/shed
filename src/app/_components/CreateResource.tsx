"use client";

import { useRouter } from "next/navigation";

import { useState, useTransition } from "react";

import useSWRMutation from "swr/mutation";

async function createPost(url: string, { arg }: { arg: string }) {
  console.log("fetchin", arg);
  await fetch(url, {
    method: "POST",
    body: JSON.stringify({ name: arg }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const CreateResource = () => {
  const [name, setName] = useState("");

  const [transitioning, startTransitioning] = useTransition();

  const router = useRouter();

  const { trigger, isMutating, data } = useSWRMutation(
    "/api/resource",
    createPost
  );

  const triggerWithTransition = async () => {
    await trigger(name);
    startTransitioning(() => {
      router.refresh();
      setName("");
    });
  };

  const disabled = isMutating || transitioning;

  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      disabled={disabled}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          void triggerWithTransition();
        }
      }}
    />
  );
};
