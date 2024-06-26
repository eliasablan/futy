import { postRouter } from "~/server/api/routers/post";
import { teamFollowRouter } from "~/server/api/routers/teamFollow";
import { competitionFollowRouter } from "~/server/api/routers/competitionFollow";
import { playerFollowRouter } from "~/server/api/routers/playerFollow";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  teamFollow: teamFollowRouter,
  competitionFollow: competitionFollowRouter,
  playerFollow: playerFollowRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
