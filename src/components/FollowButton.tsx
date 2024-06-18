"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "./ui/button";
import { followTeam } from "~/lib/actions";

export default function FollowButton({
  team,
  following,
}: {
  team: number;
  following?: {
    teamId: string;
    userId: string;
    active: boolean;
  };
}) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = async () => {
    await followTeam({
      team: team.toString(),
      user: session?.user.id,
      action: following?.active ? false : true,
    });
    if (following?.active) {
      toast.success("Unfollowed team");
    } else {
      toast.success("Followed team");
    }
    router.refresh();
  };

  if (!session) {
    return (
      <Button className="rounded-t-none" variant="outline" disabled>
        Log in to follow
      </Button>
    );
  }
  return (
    <Button
      onClick={() => handleClick()}
      className="rounded-t-none"
      variant={following?.active ? "default" : "outline"}
    >
      {following?.active ? "Following" : "Follow"}
    </Button>
  );
}
