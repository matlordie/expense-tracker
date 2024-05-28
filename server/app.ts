import { Hono } from "hono";
import { logger } from "hono/logger";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { expensesRoutes } from "./routes/expenses";
import { serveStatic } from "hono/bun";

const app = new Hono();
app.use(logger());
app.use("*", clerkMiddleware());

const apiRoutes = app
  .basePath("/api")
  .route("/expenses", expensesRoutes)
  .get("/profile", (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({
        message: "You are not logged in.",
        userId: null,
      });
    }
    if (auth?.userId) {
      return c.json({
        message: "You are logged in!",
        userId: auth?.userId,
      });
    }
  });

app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
export type ApiRoutes = typeof apiRoutes;
