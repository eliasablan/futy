"use client";
import React from "react";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();
  const handleClick = api.teamFollower.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <Button
      onClick={() => handleClick.mutate({ id: id })}
      variant="destructive"
      className="mt-2 gap-2"
    >
      <TrashIcon className="w-5" />
      Eliminar
    </Button>
  );
}
