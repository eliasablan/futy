"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "./ui/button";
import { followTeam } from "~/lib/actions";
import { LoaderIcon } from "lucide-react";

export default function FollowButton({
  team,
  teamName,
  user,
  following,
}: {
  team: number;
  teamName: string;
  user: string;
  following: {
    teamId: number;
    userId: string;
    active: boolean;
  }[];
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleClick = async () => {
    setIsLoading(true);
    await followTeam({
      team: team.toString(),
      user: user,
      action: !following[0]?.active,
    });

    if (following[0]?.active) toast.success(`Unfollowed ${teamName}`);
    else toast.success(`Followed ${teamName}`);
    router.refresh();
    setIsLoading(false);
  };

  return (
    <Button
      onClick={() => handleClick()}
      className="rounded-t-none"
      disabled={isLoading}
      variant={
        following.length > 0
          ? following[0]?.active
            ? "outline"
            : "default"
          : "default"
      }
    >
      {isLoading ? (
        <LoaderIcon className="h-4 w-4" />
      ) : following.length > 0 ? (
        following[0]?.active ? (
          "Unfollow"
        ) : (
          "Follow"
        )
      ) : (
        "Follow"
      )}
    </Button>
  );
}
