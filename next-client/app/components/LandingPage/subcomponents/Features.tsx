import { containerStyle } from "@/app/constants/styles";

export default function Features() {
  return (
    <section className={sectionStyle}>
      <div className={containerStyle}>
        <div className={gridStyle}>
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
              Keep your files organized and enhance metadata by adding
              frontmatter information such as titles, authors, or tags.
            </p>
          </div>
          <div className={gridItemStyle}>
            <h2 className={headingStyle}>Effortless PDF Exporting</h2>
            <p className={paragraphStyle}>
              Convert your Markdown files into stunning PDF documents in just a
              few clicks, preserving the formatting and structure of your
              content.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const sectionStyle = `mt-4 sm:mt-8 md:mt-32 my-16`;
const gridStyle = `flex gap-4`;
const gridItemStyle = `w-full sm:w-1/3 py-8 md:py-16 px-8 md:px-8 bg-sky-100 dark:bg-slate-900 rounded-md`;
const headingStyle = `text-2xl leading-tight text-gray-700 dark:text-white`;
const paragraphStyle = `mt-4 text-gray-600 dark:text-gray-200`;
