import Link from "next/link";

export default function Page() {
  return (
    <main>
      <h1>CPRG 306: Web Development 2 - Assignments</h1>
      <p>
        <Link href="/week-2">
          Go to Week-2
        </Link>
        →
        <Link href="/week-3">
          Go to Week-3
        </Link>
      </p>
    </main>
  );
}