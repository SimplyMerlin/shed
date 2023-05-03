import { currentUser } from "@clerk/nextjs/app-beta";
import { db } from "~/db";
import { resource } from "~/db/schema";
import { CreateResource } from "~/app/_components/CreateResource";

export const runtime = "edge";
export const preferredRegion = "home";

const Feed = async () => {
  const resources = await db.select().from(resource);
  const self = await currentUser();
  return (
    <div>
      <span>{JSON.stringify(resources)}</span>
      <CreateResource />
    </div>
  );
};

export default Feed;
