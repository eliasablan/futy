import { z } from "zod";

import { and, eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { playersFollows } from "~/server/db/schema";

export const playerFollowRouter = createTRPCRouter({
  previouslyFollowed: protectedProcedure
    .input(z.object({ playerId: z.number(), userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.playersFollows.findFirst({
        where: and(
          eq(playersFollows.playerId, input.playerId),
          eq(playersFollows.userId, input.userId),
        ),
      });
    }),

  findByUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.playersFollows.findMany({
        where: and(
          eq(playersFollows.userId, input.userId),
          eq(playersFollows.active, true),
        ),
        orderBy: [playersFollows.playerName],
      });
    }),

  follow: protectedProcedure
    .input(
      z.object({
        followingId: z.number(),
        player: z.number(),
        playerName: z.string(),
        user: z.string(),
        action: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.followingId) {
        const response = await ctx.db
          .update(playersFollows)
          .set({
            active: input.action,
          })
          .where(eq(playersFollows.id, input.followingId))
          .returning({
            id: playersFollows.id,
            active: playersFollows.active,
          });
        return response;
      }
      const response = await ctx.db
        .insert(playersFollows)
        .values({
          playerId: input.player,
          playerName: input.playerName,
          userId: ctx.session.user.id,
          active: input.action,
        })
        .returning({
          id: playersFollows.id,
          active: playersFollows.active,
        });
      return response;
    }),
});
