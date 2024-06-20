import { z } from "zod";

import { and, eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { playersFollows } from "~/server/db/schema";

export const playerFollowRouter = createTRPCRouter({
  previouslyFollowed: protectedProcedure
    .input(z.object({ playerId: z.number(), userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db
        .select()
        .from(playersFollows)
        .where(
          and(
            eq(playersFollows.playerId, input.playerId),
            eq(playersFollows.userId, input.userId),
          ),
        );
    }),
});
