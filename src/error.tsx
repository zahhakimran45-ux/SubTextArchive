"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Production-safe logging: message and digest only, never user content.
    console.error("Subtext error boundary:", error.message, error.digest);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <AlertTriangle className="mb-4 h-8 w-8 text-warning" aria-hidden />
      <h1 className="font-editorial text-3xl">Something went wrong.</h1>
      <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
        The operation could not be completed. Your data has not been modified by this failure. Try
        again, or return to the overview.
      </p>
      {error.digest && (
        <p className="mt-2 text-2xs text-muted-foreground">Reference: {error.digest}</p>
      )}
      <div className="mt-6 flex gap-2">
        <Button onClick={reset}>Try again</Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard">Overview</Link>
        </Button>
      </div>
    </main>
  );
}
