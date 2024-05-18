import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "./lib/api";

function App() {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    async function fetchTotalSpent() {
      const res = await api.expenses["total-spent"].$get();
      const data = await res.json();
      setTotalSpent(data);
    }
    fetchTotalSpent();
  }, []);

  return (
    <>
      <div className="max-w-md mx-auto p-5">
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
