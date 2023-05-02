export const runtime = "experimental-edge";
export const preferredRegion = "home";

import { auth } from "@clerk/nextjs/app-beta";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "~/db";
import { resource } from "~/db/schema";

const PostSchema = z.object({
  name: z.string().min(1).max(32),
});

export async function POST(request: Request) {
  const user = auth();

  const userId = user.userId;

  if (!userId) {
    return new NextResponse("Not authorized", { status: 401 });
  }

  const body: unknown = await request.json();

  const parsed = PostSchema.safeParse(body);

  if (!parsed.success) {
    return new NextResponse("Invalid body", { status: 400 });
  }

  const { name } = parsed.data;

  try {
    const insert = await db
      .insert(resource)
      .values({ owner: userId, name: name })
      .execute();

    console.log("successfully inserted new post", insert);

    return new NextResponse("success!");
  } catch (e) {
    console.log("error", e);
    return new NextResponse("error", { status: 500 });
  }
}
