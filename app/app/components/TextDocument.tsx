export default function TextDocument({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-screen-xl mx-auto my-4 md:my-8">
      <section className="prose dark:prose-invert">{children}</section>
    </div>
  );
}
