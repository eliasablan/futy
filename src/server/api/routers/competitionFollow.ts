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

  follow: protectedProcedure
    .input(
      z.object({
        followingId: z.number(),
        competition: z.string(),
        competitionName: z.string(),
        user: z.string(),
        action: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.followingId) {
        const response = await ctx.db
          .update(competitionsFollows)
          .set({
            active: input.action,
          })
          .where(eq(competitionsFollows.id, input.followingId))
          .returning({
            id: competitionsFollows.id,
            active: competitionsFollows.active,
          });
        return response;
      }
      const response = await ctx.db
        .insert(competitionsFollows)
        .values({
          competitionCode: input.competition,
          competitionName: input.competitionName,
          userId: ctx.session.user.id,
          active: input.action,
        })
        .returning({
          id: competitionsFollows.id,
          active: competitionsFollows.active,
        });
      return response;
    }),
});
