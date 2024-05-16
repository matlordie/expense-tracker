import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function App() {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    async function fetchTotalSpent() {
      const res = await fetch("/api/expenses/total-spent");
      const data = await res.json();
      setTotalSpent(data.expenses);
    }
    fetchTotalSpent();
  }, []);

  return (
    <>
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Total Spent</CardTitle>
            <CardDescription>the total amount spent</CardDescription>
          </CardHeader>
          <CardContent>{totalSpent}</CardContent>
        </Card>
      </div>
    </>
  );
}

export default App;
