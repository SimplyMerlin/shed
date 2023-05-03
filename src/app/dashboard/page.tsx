import { auth } from "@clerk/nextjs/app-beta";
import { redirect } from "next/navigation";
import ResourceList from "./ResourceList";
import { Suspense } from "react";

export const runtime = "edge";
export const preferredRegion = "home";

const Dashboard = () => {
  const user = auth();
  if (!user.userId) redirect("/");
  return (
    <div className="container mx-auto mt-8">
      <h1 className="mb-4 text-3xl font-bold">Your resources:</h1>
      <Suspense fallback={<div>wait...</div>}>
        {/* @ts-expect-error Server Component */}
        <ResourceList />
      </Suspense>
    </div>
  );
};

export default Dashboard;
