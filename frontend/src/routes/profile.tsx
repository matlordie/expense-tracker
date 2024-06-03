import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { checkAuth } from "@/lib/auth-checker";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  checkAuth();
  async function getUserProfile() {
    const res = await api.profile.$get();
    await new Promise((r) => setTimeout(r, 1000));
    const profile = await res.json();
    return profile;
  }

  const { isPending, data, error } = useQuery({
    queryFn: getUserProfile,
    queryKey: ["profile-detail"],
  });

  if (isPending) {
    return (
      <div className="max-w-md mx-auto p-5">
        <Skeleton className="h-14 w-24"></Skeleton>
      </div>
    );
  } else if (error) {
    throw new Error("something went wrong");
  } else {
    return (
      <div className="max-w-md mx-auto p-5">
        <p className="">{data.message}</p>
        <p className="">{data.userId}</p>
      </div>
    );
  }
}
