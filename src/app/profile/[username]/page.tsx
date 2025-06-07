// src/app/profile/[username]/page.tsx
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
  params: Promise<{ username: string }>;
}) {
  // unwrap the promise
  const { username } = await params;

  const user = await getProfileByUsername(username);
  if (!user) notFound();

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
