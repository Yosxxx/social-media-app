import { getPosts } from "@/actions/post.action";
import { getDbUserId } from "@/actions/user.action";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import UserSearch from "@/components/UserSearch";
import WhoToFollow from "@/components/WhoToFollow";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  const posts = await getPosts();
  const dbUserId = await getDbUserId();

  return (
    // <div>
    //   <UserSearch />
    //   <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
    //     {user ? (
    //       <div className="lg:col-span-6">
    //         {user ? <CreatePost /> : null}
    //         <div className="space-y-6">
    //           {posts.map((post) => (
    //             <PostCard key={post.id} post={post} dbUserId={dbUserId} />
    //           ))}
    //         </div>
    //       </div>
    //     ) : null}
    //     <div className="grid cols">
    //       <WhoToFollow />
    //     </div>
    //   </div>
    // </div>

    <div className=" grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        <UserSearch />
        {user ? <CreatePost /> : null}
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} dbUserId={dbUserId} />
          ))}
        </div>
      </div>
      <div className="grid cols">
        <WhoToFollow></WhoToFollow>
      </div>
    </div>
  );
}
