import { z } from "zod";

import { and, eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { teamsFollows } from "~/server/db/schema";

export const teamFollowRouter = createTRPCRouter({
  previouslyFollowed: protectedProcedure
    .input(z.object({ teamId: z.number(), userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.teamsFollows.findFirst({
        where: and(
          eq(teamsFollows.teamId, input.teamId),
          eq(teamsFollows.userId, input.userId),
        ),
      });
    }),
  findByUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.teamsFollows.findMany({
        where: and(
          eq(teamsFollows.userId, input.userId),
          eq(teamsFollows.active, true),
        ),
        orderBy: [teamsFollows.teamName],
      });
    }),
});
