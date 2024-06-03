import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "@tanstack/react-router";

export function checkAuth() {
  const navigate = useNavigate();
  const user = useAuth();
  const isAuthenticated = user.isSignedIn;

  if (!isAuthenticated) {
    navigate({ to: "/about" });
  }

  return true;
}
