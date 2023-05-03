import { auth } from "@clerk/nextjs/app-beta";
import { db } from "~/db";
import { resource } from "~/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

const ResourceList = async () => {
  const user = auth();
  if (!user.userId) return;

  const resources = await db
    .select()
    .from(resource)
    .where(eq(resource.ownerId, user.orgId || user.userId));
  return (
    <div className="grid grid-cols-3 gap-4">
      {resources.map((r) => (
        <Link
          href={`/dashboard/${r.id}`}
          key={r.id}
          className="rounded-xl border-2"
        >
          <h2 className="px-4 py-4 text-xl font-semibold">{r.name}</h2>
        </Link>
      ))}
    </div>
  );
};

export default ResourceList;
