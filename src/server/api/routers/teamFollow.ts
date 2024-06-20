import { z } from "zod";

import { and, eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { teamsFollows } from "~/server/db/schema";

export const teamFollowRouter = createTRPCRouter({
  // Create a new 'teamFollower' for the user with the provided teamId
  // and active status
  // create: protectedProcedure
  //   .input(
  //     z.object({
  //       teamId: z.number().min(1),
  //       active: z.boolean(),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db.insert(teamsFollows).values({
  //       teamId: input.teamId,
  //       userId: ctx.session.user.id,
  //       active: input.active,
  //     });
  //   }),

  // Delete an existing 'teamFollower' with its id
  // delete: protectedProcedure
  //   .input(
  //     z.object({
  //       id: z.number(),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db.delete(teamFollowers).where(eq(teamFollowers.id, input.id));
  //   }),

  // Update an existing 'teamFollower' with its id and new status
  // update: protectedProcedure
  //   .input(
  //     z.object({
  //       id: z.number(),
  //       active: z.boolean(),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db
  //       .update(teamsFollows)
  //       .set({ active: input.active })
  //       .where(eq(teamsFollows.id, input.id));
  //   }),

  // Check if there is an existing 'teamFollower' a the user and a team
  // active or inactive to prevent from creating duplicates
  previouslyFollowed: protectedProcedure
    .input(z.object({ teamId: z.number(), userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db
        .select()
        .from(teamsFollows)
        .where(
          and(
            eq(teamsFollows.teamId, input.teamId),
            eq(teamsFollows.userId, input.userId),
          ),
        );
    }),
});
