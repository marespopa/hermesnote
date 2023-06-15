import Link from "next/link";

export default function AccessDenied() {
  return (
    <>
      <h1>Access Denied</h1>
      <div>
        <Link href="/api/auth/signin">
          You must be signed in to view this page
        </Link>
      </div>
    </>
  );
}
