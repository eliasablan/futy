import React from "react";

export default function PlayerPage({ params }: { params: { id: number } }) {
  return <div>Player {params.id}</div>;
}
