import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const fakeExpenses: Expense[] = [
  { id: 1, title: "Groceries", amount: 50 },
  { id: 2, title: "Utilities", amount: 100 },
  { id: 3, title: "Rent", amount: 1000 },
];

const expenseSchema = z.object({
  id: z.number().int().positive().max(1).optional(),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
});

type Expense = z.infer<typeof expenseSchema>;

export const expensesRoutes = new Hono()
  .get("/", (c) => {
    return c.json({ expense: fakeExpenses });
  })
  .post("/", zValidator("json", expenseSchema), async (c) => {
    const expenses = await c.req.valid("json");
    fakeExpenses.push({ ...expenses, id: fakeExpenses.length + 1 });
    c.status(201);
    return c.json(expenses);
  })
  .get("/total-spent", (c) => {
    const total = fakeExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    return c.json(total);
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((expence) => expence.id == id);
    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  });
