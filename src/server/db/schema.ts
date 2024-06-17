import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `futy_${name}`);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdById: varchar("createdById", { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (example) => ({
    createdByIdIdx: index("createdById_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const bets = createTable("bet", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  // team_id: varchar("team_id", { length: 255 })
  //   .notNull()
  //   .references(() => teams.id),
  // match_id: varchar("match_id", { length: 255 })
  //   .notNull()
  //   .references(() => matches.id),
  bet_type: varchar("bet_type", { length: 255 }).notNull(),
  amount: varchar("amount", { length: 255 }).notNull(),
  created_at: timestamp("created_at", { withTimezone: true }).notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true }),
});

export const users = createTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  }),
);

export const authenticators = createTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  }),
);

export const teamFollowers = createTable(
  "teamFollowers",
  {
    teamId: varchar("teamCode", { length: 55 }).notNull(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    active: boolean("active").notNull().default(true),
  },
  (teamFollowers) => ({
    teamIdIdx: index("teamFollowers_teamId_idx").on(teamFollowers.teamId),
    userIdIdx: index("teamFollowers_userId_idx").on(teamFollowers.userId),
  }),
);

export const competitionFollowers = createTable(
  "competitionFollowers",
  {
    competitionId: varchar("competitionCode", { length: 55 }).notNull(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    active: boolean("active").notNull().default(true),
  },
  (competitionFollowers) => ({
    competitionIdIdx: index("competitionFollowers_competitionId_idx").on(
      competitionFollowers.competitionId,
    ),
    userIdIdx: index("competitionFollowers_userId_idx").on(
      competitionFollowers.userId,
    ),
  }),
);

export const playerFollowers = createTable(
  "playerFollowers",
  {
    playerId: varchar("playerCode", { length: 55 }).notNull(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    active: boolean("active").notNull().default(true),
  },
  (playerFollowers) => ({
    playerIdIdx: index("playerFollowers_playerId_idx").on(
      playerFollowers.playerId,
    ),
    userIdIdx: index("playerFollowers_userId_idx").on(playerFollowers.userId),
  }),
);
