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

  follow: protectedProcedure
    .input(
      z.object({
        followingId: z.number(),
        team: z.number(),
        teamName: z.string(),
        user: z.string(),
        action: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.followingId) {
        const response = await ctx.db
          .update(teamsFollows)
          .set({
            active: input.action,
          })
          .where(eq(teamsFollows.id, input.followingId))
          .returning({
            id: teamsFollows.id,
            active: teamsFollows.active,
          });
        return response;
      }
      const response = await ctx.db
        .insert(teamsFollows)
        .values({
          teamId: input.team,
          teamName: input.teamName,
          userId: ctx.session.user.id,
          active: input.action,
        })
        .returning({
          id: teamsFollows.id,
          active: teamsFollows.active,
        });
      return response;
    }),
});
