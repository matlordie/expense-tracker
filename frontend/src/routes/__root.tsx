import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  ClerkLoading,
  ClerkLoaded,
} from "@clerk/clerk-react";

import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex justify-between mx-5 items-center my-5">
        <div className="p-2 flex gap-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{" "}
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
          <Link to="/expenses" className="[&.active]:font-bold">
            Expenses
          </Link>{" "}
          <Link to="/create-expense" className="[&.active]:font-bold">
            Create
          </Link>
          <Link to="/profile" className="[&.active]:font-bold">
            Profile
          </Link>
        </div>

        <div className="">
          <ClerkLoading>
            <Loader className="animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <Button size={"sm"}>
                <SignInButton />
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
      <hr />
      <Outlet />
    </>
  ),
});
