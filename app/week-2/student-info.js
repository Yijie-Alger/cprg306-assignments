import Link from "next/link";

export default function StudentInfo() {
  return (
    <div>
      <h1>Student Information</h1>
      <p>
        Name: Yijie Wu
      </p>
      <p>
        GitHub:
        <Link
          href="https://github.com/Yijie-Alger/cprg306-assignments"
          target="_blank"
          style={{
            textDecoration: "underline",
          }}
        >GitHub repository
        </Link>
      </p>
    </div>
  );
}