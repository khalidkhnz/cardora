import { type Config } from "drizzle-kit";

import { env } from "@/env";
import { platform } from "@/lib/platform";

export default {
  schema: "./src/server/db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: [`${platform.dbTablePrefix}_*`, "user", "session", "account", "verification"],
} satisfies Config;
