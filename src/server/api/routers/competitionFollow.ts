import { z } from "zod";

import { and, eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { competitionsFollows } from "~/server/db/schema";

export const competitionFollowRouter = createTRPCRouter({
  previouslyFollowed: protectedProcedure
    .input(z.object({ competitionCode: z.string(), userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.competitionsFollows.findFirst({
        where: and(
          eq(competitionsFollows.competitionCode, input.competitionCode),
          eq(competitionsFollows.userId, input.userId),
        ),
      });
    }),
  findByUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.competitionsFollows.findMany({
        where: and(
          eq(competitionsFollows.userId, input.userId),
          eq(competitionsFollows.active, true),
        ),
        orderBy: [competitionsFollows.competitionName],
      });
    }),
});
