"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "./ui/button";
import { followTeam } from "~/lib/actions";

export default function FollowTeamButton({
  team,
  teamName,
  user,
  className,
  following,
}: {
  team: number;
  teamName: string;
  user: string;
  className?: string;
  following: {
    teamId: number;
    userId: string;
    active: boolean;
  }[];
}) {
  const router = useRouter();

  const handleClick = async () => {
    await followTeam({
      team: team.toString(),
      user: user,
      action: !following[0]?.active,
    });

    if (following[0]?.active) toast.success(`Unfollowed ${teamName}`);
    else toast.success(`Followed ${teamName}`);
    router.refresh();
  };

  return (
    <Button
      onClick={() => handleClick()}
      className={className}
      variant={
        following.length > 0
          ? following[0]?.active
            ? "outline"
            : "default"
          : "default"
      }
    >
      {following.length > 0
        ? following[0]?.active
          ? "Unfollow"
          : "Follow"
        : "Follow"}
    </Button>
  );
}
