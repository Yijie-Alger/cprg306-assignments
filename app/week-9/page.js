"use client";

import Link from "next/link";
import { useUserAuth } from "../contexts/AuthContext";
import { useState } from "react";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await gitHubSignIn();
    } catch (error) {
      console.error("Error signing in:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await firebaseSignOut();
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm space-y-4 rounded-md border bg-white p-5 text-center text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      {user ? (
        <>
          <p>
            Welcome, <span className="font-semibold">{user.displayName}</span> (
            {user.email})
          </p>
          <Link
            href="/week-9/shopping-list"
            className="block rounded bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
          >
            Go to Shopping List
          </Link>
          <button
            onClick={handleSignOut}
            disabled={loading}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            {loading ? "Signing out..." : "Sign Out"}
          </button>
        </>
      ) : (
        <>
          <p className="text-gray-600">You are not signed in.</p>
          <button
            onClick={handleSignIn}
            disabled={loading}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            {loading ? "Signing in..." : "Sign In with GitHub"}
          </button>
        </>
      )}
    </div>
  );
}
