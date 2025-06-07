import { notFound } from "next/navigation";
import ProfilePageClient from "@/components/ProfilePageClient";
import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from "@/actions/profile.action";

export default async function ProfilePageServer({
  params,
}: {
  params: { username: string };
}) {
  // 1) await params
  const { username } = await params;

  // 2) fetch the profile
  const user = await getProfileByUsername(username);
  if (!user) notFound();

  // 3) fetch everything in parallel
  const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id),
  ]);

  return (
    <ProfilePageClient
      user={user}
      posts={posts}
      likedPosts={likedPosts}
      isFollowing={isCurrentUserFollowing}
    />
  );
}
