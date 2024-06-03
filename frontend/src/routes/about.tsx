import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="">
      <Button variant={"ghost"}>
        <SignInButton />
      </Button>
    </div>
  );
}
