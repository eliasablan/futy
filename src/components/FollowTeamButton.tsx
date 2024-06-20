"use client";

import React, { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "./ui/button";
import { handleTeamFollow } from "~/lib/actions";

export default function FollowTeamButton({
  followingId,
  following,
  team,
  teamName,
  user,
  className,
}: {
  followingId?: number;
  following?: boolean;
  team: number;
  teamName: string;
  user: string;
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(!!following);

  const handleClick = async () => {
    setIsLoading(true);
    await handleTeamFollow({
      followingId,
      team,
      user,
      action: !isFollowing,
    });

    if (isFollowing) {
      toast.success(`Unfollowed ${teamName}`);
    } else {
      toast.success(`Followed ${teamName}`);
    }
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
