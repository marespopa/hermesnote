import Link from "next/link";

export default function DocumentationMessage() {
  return (
    <div className="my-16">
      <h3 className="text-sm max-w-1/2 text-center mx-auto">
        Want to learn more about how to write markdown?{" "}
        <Link
          className="text-slate-700 dark:text-white underline"
          href="/documentation"
        >
          Access the documentation page.
        </Link>
      </h3>
    </div>
  );
}
