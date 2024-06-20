import DeleteButton from "./DeleteButton";

interface HomepageListProps {
  follows: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    teamId: number;
    active: boolean;
  }[];
}

export function HomepageList({ follows }: HomepageListProps) {
  return (
    <ul className="my-4 flex flex-col items-center">
      <p className="mb-4">Follows</p>
      {follows.length > 0
        ? follows.map((follow, idx) => {
            return (
              <li key={idx} className="my-2 flex flex-col border-2 p-2">
                <p>{follow.id}</p>
                <p>{follow.teamId}</p>
                <p>{follow.userId}</p>
                <p>{JSON.stringify(follow.active)}</p>
                <p>{follow.createdAt.toDateString()}</p>
                <DeleteButton id={follow.id} />
              </li>
            );
          })
        : null}
    </ul>

    // <form
    //   onSubmit={(e) => {
    //     e.preventDefault();
    //     createFollow.mutate({ teamId: team, userId: user, active: true });
    //   }}
    //   className="flex flex-col gap-2"
    // >
    //   <Input
    //     type="text"
    //     placeholder="Team"
    //     value={team}
    //     onChange={(e) => setTeam(e.target.value)}
    //   />
    //   <Input
    //     type="text"
    //     placeholder="User"
    //     value={user}
    //     onChange={(e) => setUser(e.target.value)}
    //   />
    //   <Button type="submit" disabled={createFollow.isPending}>
    //     {createFollow.isPending ? "Submitting..." : "Submit"}
    //   </Button>
    // </form>
  );
}
