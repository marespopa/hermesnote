export default function Features() {
  return (
    <section className={gridStyle}>
      <div className={gridItemStyle}>
        <h2 className={headingStyle}>Create and Edit .md Files</h2>
        <p className={paragraphStyle}>
          Start fresh with our intuitive editor, allowing you to create new
          Markdown files or edit existing ones with ease.
        </p>
      </div>
      <div className={gridItemStyle}>
        <h2 className={headingStyle}>Frontmatter Support</h2>
        <p className={paragraphStyle}>
          Keep your files organized and enhance metadata by adding frontmatter
          information such as titles, authors, or tags.
        </p>
      </div>
      <div className={gridItemStyle}>
        <h2 className={headingStyle}>Effortless PDF Exporting</h2>
        <p className={paragraphStyle}>
          Convert your Markdown files into stunning PDF documents in just a few
          clicks, preserving the formatting and structure of your content.
        </p>
      </div>
    </section>
  );
}

const gridStyle = `mt-4 sm:mt-8 md:mt-32 flex flex-wrap my-16 bg-sky-200 dark:bg-slate-900 rounded-md`;
const gridItemStyle = `w-full sm:w-1/3 py-8 md:py-16 px-8 md:px-8`;
const headingStyle = `text-xl leading-tight text-gray-700 dark:text-white`;
const paragraphStyle = `mt-4 text-gray-600 dark:text-gray-200`;
