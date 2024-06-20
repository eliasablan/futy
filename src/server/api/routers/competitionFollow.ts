import { z } from "zod";

import { and, eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { competitionsFollows } from "~/server/db/schema";

export const competitionFollowRouter = createTRPCRouter({
  // create: protectedProcedure
  //   .input(
  //     z.object({
  //       competitionCode: z.string().min(1),
  //       active: z.boolean(),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db.insert(competitionsFollows).values({
  //       userId: ctx.session.user.id,
  //       competitionCode: input.competitionCode,
  //       active: input.active,
  //     });
  //   }),

  // delete: protectedProcedure
  //   .input(
  //     z.object({
  //       id: z.number(),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db.competitionFollower.delete({ id: input.id });
  //   }),

  // getAll: protectedProcedure.query(({ ctx }) => {
  //   return ctx.db.select().from(competitionsFollows);
  // }),

  previouslyFollowed: protectedProcedure
    .input(z.object({ competitionCode: z.string(), userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db
        .select()
        .from(competitionsFollows)
        .where(
          and(
            eq(competitionsFollows.competitionCode, input.competitionCode),
            eq(competitionsFollows.userId, input.userId),
          ),
        );
    }),
});
