export const runtime = "experimental-edge";
export const preferredRegion = "home";

import { auth } from "@clerk/nextjs/app-beta";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "~/db";
import { resource } from "~/db/schema";

const PostSchema = z.object({
  name: z.string().min(1).max(32),
});

export async function POST(request: Request) {
  const { userId, orgId } = auth();

  const ownerId = orgId || userId;

  if (!ownerId) {
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
      .values({ ownerId: ownerId, name: name, id: nanoid() })
      .execute();

    console.log("successfully inserted new post", insert);

    return new NextResponse("success!");
  } catch (e) {
    console.log("error", e);
    return new NextResponse("error", { status: 500 });
  }
}
