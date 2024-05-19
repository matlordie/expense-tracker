import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "./lib/api";
import { useQuery } from "@tanstack/react-query";

function App() {
  async function fetchTotalExpense() {
    const res = await api.expenses["total-spent"].$get();
    if (!res.ok) {
      throw new Error("an error occured");
    }
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
          <CardContent>{isPending ? "Loading..." : data}</CardContent>
        </Card>
      </div>
    </>
  );
}

export default App;
