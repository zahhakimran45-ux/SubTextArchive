import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="metric-label mb-3">404</p>
      <h1 className="font-editorial text-3xl">This page drifted out of the archive.</h1>
      <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
        The record may have been deleted, or the link points somewhere that never existed. Nothing
        private is exposed by this page.
      </p>
      <div className="mt-6 flex gap-2">
        <Button asChild>
          <Link href="/dashboard">Back to Overview</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/recall">Open Recall</Link>
        </Button>
      </div>
    </main>
  );
}
