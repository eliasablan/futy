"use client";

import React, { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export default function FollowTeamButton({
  followId,
  following,
  team,
  teamName,
  user,
  className,
}: {
  followId?: number;
  following?: boolean;
  team: number;
  teamName: string;
  user: string;
  className?: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(!!following);
  const [followingId, setFollowingId] = useState<number>(followId ?? 0);

  const handleClick = api.teamFollow.follow.useMutation({
    onSuccess: (data) => {
      const follow = data[0];
      if (follow) {
        setFollowingId(follow.id);
        setIsFollowing(follow.active);
        setIsLoading(false);
        if (follow.active) {
          toast.success(`Followed ${teamName}`);
        } else {
          toast.success(`Unfollowed ${teamName}`);
        }
      }
      router.refresh();
    },
  });

  return (
    <Button
      onClick={() =>
        handleClick.mutate({
          followingId,
          team,
          teamName,
          user,
          action: !isFollowing,
        })
      }
      className={className}
      variant={isFollowing ? "outline" : "default"}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2Icon className="h-4 w-4 animate-spin" />
      ) : isFollowing ? (
        "Unfollow"
      ) : (
        "Follow"
      )}
    </Button>
  );
}
