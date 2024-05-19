import { createFileRoute } from "@tanstack/react-router";
import { api } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const skeletonCount = [1, 2, 3, 4];

export const Route = createFileRoute("/expenses")({
  component: Expenses,
});

function Expenses() {
  async function fetchExpenses() {
    const res = await api.expenses.$get();
    if (!res.ok) {
      throw new Error("an error occured");
    }
    await new Promise((r) => setTimeout(r, 3000));
    const total = await res.json();
    return total;
  }

  const { isPending, data } = useQuery({
    queryKey: ["all-expense"],
    queryFn: fetchExpenses,
  });

  return (
    <>
      <div className="max-w-md mx-auto p-5">
        <Table>
          <TableCaption>A list of your all your expenses.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending
              ? skeletonCount.map(() => (
                  <TableRow>
                    <TableCell className="font-medium">
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                  </TableRow>
                ))
              : data?.expense.map((expense) => (
                  <TableRow>
                    <TableCell className="font-medium">{expense.id}</TableCell>
                    <TableCell>{expense.title}</TableCell>
                    <TableCell>{expense.amount}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
