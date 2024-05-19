import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "../lib/api";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  async function fetchTotalExpense() {
    const res = await api.expenses["total-spent"].$get();
    if (!res.ok) {
      throw new Error("an error occured");
    }
    await new Promise((r) => setTimeout(r, 1000));
    const total = await res.json();
    return total;
  }

  const { isPending, data } = useQuery({
    queryKey: ["total-expense"],
    queryFn: fetchTotalExpense,
  });

  return (
    <>
      <div className="max-w-md mx-auto p-5">
        <Card>
          <CardHeader>
            <CardTitle>Total Spent</CardTitle>
            <CardDescription>the total amount spent</CardDescription>
          </CardHeader>
          <CardContent>
            {isPending ? <Skeleton className="h-6 w-11"></Skeleton> : data}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
