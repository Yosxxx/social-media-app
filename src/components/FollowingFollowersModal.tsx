// components/FollowingFollowersModal.tsx
"use client";

import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

interface User {
  id: string;
  username: string;
  name?: string;
  image?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: "Followers" | "Following";
  users: User[];
  searchTerm: string;
  onSearchChange: (v: string) => void;
}

export default function FollowingFollowersModal({
  isOpen,
  onClose,
  title,
  users,
  searchTerm,
  onSearchChange,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm w-full overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg">{title}</DialogTitle>
            <DialogClose asChild></DialogClose>
          </div>
          <div className="mt-3">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder={`Search ${title.toLowerCase()}`}
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[20rem] mt-4 space-y-1">
          {users.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No {title.toLowerCase()} found.
            </div>
          ) : (
            users.map((u) => (
              <Link
                key={u.id}
                href={`/profile/${u.username}`} // ← adjust path to your route
                className="flex items-center gap-x-3 p-2 hover:bg-muted rounded"
              >
                <Avatar>
                  <AvatarImage
                    src={u.image ?? "/default-avatar.png"}
                    alt={u.username}
                  />
                </Avatar>
                <div>
                  <p className="font-medium">{u.username}</p>
                  {u.name && (
                    <p className="text-sm text-muted-foreground">{u.name}</p>
                  )}
                </div>
              </Link>
            ))
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
