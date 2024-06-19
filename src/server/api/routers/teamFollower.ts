import { z } from "zod";

import { and, eq, is } from "drizzle-orm";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { teamFollowers } from "~/server/db/schema";

export const teamFollowerRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        teamId: z.string().min(1),
        active: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(teamFollowers).values({
        userId: ctx.session.user.id,
        teamId: input.teamId,
        active: input.active,
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.teamFollower.delete({ id: input.id });
    }),

  isFollowed: protectedProcedure
    .input(z.object({ teamId: z.number(), userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db
        .select()
        .from(teamFollowers)
        .where(
          and(
            eq(teamFollowers.teamId, input.teamId),
            eq(teamFollowers.userId, input.userId),
          ),
        );
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.select().from(teamFollowers);
  }),
});
