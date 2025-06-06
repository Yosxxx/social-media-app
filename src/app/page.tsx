import CreatePost from "@/components/CreatePost";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      {user ? (
        <div className="lg:col-span-6">
          <CreatePost />
        </div>
      ) : null}
      <div className="grid cols">Who To Follow</div>
    </div>
  );
}
