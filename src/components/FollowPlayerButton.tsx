"use client";

import React, { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export default function FollowPlayerButton({
  followId,
  following,
  player,
  playerName,
  user,
  className,
}: {
  followId?: number;
  following?: boolean;
  player: number;
  playerName: string;
  user: string;
  className?: string;
}) {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState<boolean>(!!following);
  const [followingId, setFollowingId] = useState<number>(followId ?? 0);

  const handleClick = api.playerFollow.follow.useMutation({
    onSuccess: (data) => {
      const follow = data[0];
      if (follow) {
        setFollowingId(follow.id);
        setIsFollowing(follow.active);
        if (follow.active) {
          toast.success(`Followed ${playerName}`);
        } else {
          toast.success(`Unfollowed ${playerName}`);
        }
      }
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Button
      onClick={() =>
        handleClick.mutate({
          followingId,
          player,
          playerName,
          user,
          action: !isFollowing,
        })
      }
      className={className}
      variant={isFollowing ? "outline" : "default"}
      disabled={handleClick.isPending}
    >
      {handleClick.isPending ? (
        <Loader2Icon className="my-2 h-4 w-4 animate-spin" />
      ) : isFollowing ? (
        "Unfollow"
      ) : (
        "Follow"
      )}
    </Button>
  );
}
