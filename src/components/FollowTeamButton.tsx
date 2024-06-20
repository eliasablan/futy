"use client";

import React, { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "./ui/button";
import { handleTeamFollow } from "~/lib/actions";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(!!following);
  const [followingId, setFollowingId] = useState<number>(followId ?? 0);

  const handleClick = async () => {
    setIsLoading(true);
    const response = await handleTeamFollow({
      followingId,
      team,
      user,
      action: !isFollowing,
    });

    if (response[0]?.active) {
      toast.success(`Followed ${teamName}`);
    } else {
      toast.success(`Unfollowed ${teamName}`);
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
