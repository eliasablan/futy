"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

export function HomepageCreate() {
  const router = useRouter();
  const [team, setTeam] = useState<string>("");

  const createFollow = api.teamFollower.create.useMutation({
    onSuccess: () => {
      router.refresh();
      toast("Followed team");
      setTeam("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createFollow.mutate({ teamId: team, active: true });
      }}
      className="flex flex-col gap-2"
    >
      <Input
        type="text"
        placeholder="Team"
        value={team}
        onChange={(e) => setTeam(e.target.value)}
      />
      <Button type="submit" disabled={createFollow.isPending}>
        {createFollow.isPending ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
