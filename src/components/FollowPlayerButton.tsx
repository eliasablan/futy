"use client";

import React, { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "./ui/button";
import { handlePlayerFollow } from "~/lib/actions";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(!!following);
  const [followingId, setFollowingId] = useState<number>(followId ?? 0);

  const handleClick = async () => {
    setIsLoading(true);
    const response = await handlePlayerFollow({
      followingId,
      player,
      user,
      action: !isFollowing,
    });

    if (response[0]?.active) {
      toast.success(`Unfollowed ${playerName}`);
    } else {
      toast.success(`Followed ${playerName}`);
    }
    if (response[0]?.id) setFollowingId(response[0].id);
    setIsLoading(false);
    setIsFollowing(!isFollowing);
  };

  return (
    <Button
      onClick={() => handleClick()}
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
