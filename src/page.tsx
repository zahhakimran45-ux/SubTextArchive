import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bookmark,
  Clock3,
  Eye,
  FileSearch,
  Lock,
  MessagesSquare,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  robots: { index: true, follow: true },
};

const NAV = [
  { href: "/#features", label: "Features" },
  { href: "/#privacy", label: "Privacy" },
  { href: "/#faq", label: "FAQ" },
];

const COMPARISON = [
  { capability: "Import and parse your own chat exports", subtext: true, generic: "Limited" },
  { capability: "Deterministic statistics with documented definitions", subtext: true, generic: false },
  { capability: "Personal memory archive tied to source messages", subtext: true, generic: false },
  { capability: "Unified full-text search across chats and memories", subtext: true, generic: "Partial" },
  { capability: "Row-level isolation and local-first operation", subtext: true, generic: false },
  { capability: "Claims about hidden emotions or intentions", subtext: false, generic: true },
];

const FAQS = [
  {
    q: "Does Subtext tell me how someone feels about me?",
    a: "No. Subtext measures observable facts — message counts, timing, lengths, response intervals. It never claims to infer another person's hidden emotions, loyalty, or intentions from statistics.",
  },
  {
    q: "Where is my data stored?",
    a: "You can run Subtext fully locally with encrypted SQLite storage. In production it uses Supabase PostgreSQL with Row Level Security, so rows are isolated per account. Raw export files are only retained briefly while you review an import.",
  },
  {
    q: "Are my conversations sent to an AI service?",
    a: "Not by default. All counting and statistics are computed deterministically in code. Optional embedding-based semantic search is disabled unless you explicitly configure and consent to an external provider.",
  },
  {
    q: "Can I delete everything?",
    a: "Yes. Individual conversations, memories, and the entire account can be deleted. Exports are available as machine-readable JSON at any time. Infrastructure backup retention is documented honestly in the privacy documentation.",
  },
  {
    q: "What formats can I import?",
    a: "Plain-text WhatsApp exports are supported today, including 12/24-hour timestamps, multiline messages, system messages, and media placeholders. The parser is designed so additional formats can be added without changing the rest of the product.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Subtext home">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/15 text-primary">
              <MessagesSquare className="h-4 w-4" aria-hidden />
            </span>
            <span className="font-editorial text-lg tracking-tight">Subtext</span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex" aria-label="Primary">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">Explore Subtext</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="container grid gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
          <div>
            <Badge variant="secondary" className="mb-5">
              <Sparkles className="h-3 w-3" aria-hidden /> Private by design
            </Badge>
            <h1 className="font-editorial text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Some conversations stay with you.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Understand your conversations, preserve the moments that matter, and find the things
              you thought you&apos;d forgotten.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Explore Subtext <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/#features">See how it works</Link>
              </Button>
            </div>
            <p className="mt-6 text-xs leading-5 text-muted-foreground/80">
              No conversation is required to start. The memory archive works on its own, and a
              fictional demo workspace is available without uploading anything private.
            </p>
          </div>

          {/* Illustrative product preview — clearly labeled, static marketing content */}
          <div className="surface-elevated p-5" aria-label="Illustrative product preview">
            <p className="metric-label mb-4">Illustrative preview · not your data</p>
            <div className="space-y-3">
              <div className="rounded-md border border-border bg-secondary/40 p-3">
                <div className="mb-1 flex items-center justify-between text-2xs uppercase tracking-wider text-muted-foreground">
                  <span>Conversation timeline</span>
                  <span>Tue</span>
                </div>
                <p className="text-sm leading-6">
                  Keep both. The summer line is the one people will remember.
                </p>
              </div>
              <div className="ml-8 rounded-md border border-border bg-secondary/40 p-3">
                <div className="mb-1 flex items-center justify-between text-2xs uppercase tracking-wider text-muted-foreground">
                  <span>Wed · 09:14</span>
                </div>
                <p className="text-sm leading-6">
                  I found the photo you mentioned — the one with the flooded platform.
                </p>
              </div>
              <div className="rounded-md border border-primary/30 bg-primary/10 p-4">
                <div className="mb-1.5 flex items-center gap-2 text-2xs uppercase tracking-wider text-primary">
                  <Bookmark className="h-3 w-3" aria-hidden /> Saved to Afterthought
                </div>
                <p className="font-editorial text-base leading-7">
                  The summer commute line — the anchor for the whole station chapter.
                </p>
                <p className="mt-1.5 text-xs text-muted-foreground">Tags: writing, important</p>
              </div>
            </div>
          </div>
        </section>

        {/* Product introduction */}
        <section id="features" className="border-t border-border/70 bg-card/30 py-16">
          <div className="container">
            <h2 className="font-editorial text-2xl sm:text-3xl">Three connected capabilities</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              One private archive, three ways to return to it. Each capability is built on the same
              imported data — nothing is fabricated.
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: BarChart3,
                  title: "Subtext Analytics",
                  body: "Measurable patterns over time: activity, participation, response intervals, sessions, and gaps — each with its calculation definition and sample size.",
                },
                {
                  icon: Bookmark,
                  title: "Afterthought",
                  body: "A personal memory archive for meaningful messages, notes, and moments. You decide what matters; the app never decides for you.",
                },
                {
                  icon: Search,
                  title: "Recall",
                  body: "Unified full-text search across conversations and memories, with phrases, filters, date ranges, highlighting, and links back to the source.",
                },
              ].map((feature) => (
                <div key={feature.title} className="surface p-6">
                  <feature.icon className="mb-4 h-5 w-5 text-primary" aria-hidden />
                  <h3 className="text-base font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capability previews */}
        <section className="container grid gap-12 py-16 lg:grid-cols-2">
          <div className="surface p-6">
            <div className="mb-4 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" aria-hidden />
              <h2 className="text-lg font-semibold">Analytics you can audit</h2>
            </div>
            <div className="flex h-40 items-end gap-1.5" aria-hidden>
              {[34, 52, 41, 68, 47, 73, 58, 82, 64, 91, 70, 88].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-primary/40"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Every chart is computed from your imported messages in deterministic code. Caveats,
              exclusions (such as messages without timestamps), and sample sizes are shown beside
              the numbers.
            </p>
          </div>
          <div className="surface p-6">
            <div className="mb-4 flex items-center gap-2">
              <FileSearch className="h-4 w-4 text-primary" aria-hidden />
              <h2 className="text-lg font-semibold">Recall, honestly</h2>
            </div>
            <div className="space-y-2.5 text-sm">
              <p className="rounded-md border border-border bg-secondary/40 px-3 py-2 font-mono text-xs">
                &ldquo;meeting next week&rdquo; from:asha after:last month
              </p>
              <p className="text-muted-foreground">
                Exact phrases, participant and date filters, and keyword matching — with anything
                the parser cannot understand treated as an ordinary keyword rather than a guess.
              </p>
              <p className="rounded-md border border-border bg-secondary/40 px-3 py-2 font-mono text-xs">
                tag:important type:memory
              </p>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section id="privacy" className="border-t border-border/70 bg-card/30 py-16">
          <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Lock className="h-5 w-5" aria-hidden />
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl">Privacy-first principles</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Private conversations are sensitive data. The product is built around that fact
                rather than around it.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: ShieldCheck, text: "Row-level isolation per account, enforced in the database." },
                { icon: Eye, text: "Imported text is never rendered as trusted HTML or logged in clear text." },
                { icon: Clock3, text: "Raw uploads expire from staging after one hour." },
                { icon: Lock, text: "Optional AI processing is off until you switch it on." },
              ].map((item) => (
                <div key={item.text} className="surface flex items-start gap-3 p-4">
                  <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <p className="text-sm leading-6 text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="container py-16">
          <h2 className="font-editorial text-2xl sm:text-3xl">What Subtext does differently</h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-2xs uppercase tracking-wider text-muted-foreground">
                  <th className="py-3 pr-4 font-medium">Capability</th>
                  <th className="py-3 pr-4 font-medium text-primary">Subtext</th>
                  <th className="py-3 font-medium">Generic chat tools</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.capability} className="border-b border-border/60">
                    <td className="py-3 pr-4 text-muted-foreground">{row.capability}</td>
                    <td className="py-3 pr-4">
                      {row.subtext === true ? (
                        <Badge variant="success">Included</Badge>
                      ) : (
                        <Badge variant="outline">Refused by design</Badge>
                      )}
                    </td>
                    <td className="py-3">
                      {row.generic === true ? (
                        <Badge variant="warning">Often included</Badge>
                      ) : row.generic === "Partial" ? (
                        <Badge variant="secondary">Partial</Badge>
                      ) : row.generic === "Limited" ? (
                        <Badge variant="secondary">Limited</Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-border/70 bg-card/30 py-16">
          <div className="container max-w-3xl">
            <h2 className="font-editorial text-2xl sm:text-3xl">Questions, answered plainly</h2>
            <div className="mt-8 space-y-3">
              {FAQS.map((faq) => (
                <details key={faq.q} className="surface group p-5">
                  <summary className="cursor-pointer list-none text-sm font-medium marker:hidden [&::-webkit-details-marker]:hidden">
                    {faq.q}
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="container py-16">
          <div className="surface-elevated flex flex-col items-center gap-5 px-6 py-12 text-center">
            <h2 className="font-editorial text-2xl sm:text-3xl">Begin with a single conversation.</h2>
            <p className="max-w-lg text-sm leading-6 text-muted-foreground">
              Create a private account, import a WhatsApp text export or load the fictional demo,
              and decide for yourself what is worth remembering.
            </p>
            <Button size="lg" asChild>
              <Link href="/signup">
                Explore Subtext <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/70 py-10">
        <div className="container flex flex-col gap-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 text-primary">
              <MessagesSquare className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="font-editorial text-base text-foreground">Subtext</span>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            <Link href="/#features" className="hover:text-foreground">Features</Link>
            <Link href="/#privacy" className="hover:text-foreground">Privacy</Link>
            <Link href="/login" className="hover:text-foreground">Sign in</Link>
            <Link href="/signup" className="hover:text-foreground">Create account</Link>
          </nav>
          <p className="text-xs">© {new Date().getFullYear()} Subtext. Built for private reflection.</p>
        </div>
      </footer>
    </div>
  );
}
