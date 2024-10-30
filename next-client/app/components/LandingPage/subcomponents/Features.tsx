import { containerStyle } from "@/app/constants/styles";

export default function Features() {
  return (
    <section className={sectionStyle} data-testid="Features">
      <div className={containerStyle}>
        <div className={gridStyle} data-testid="FeaturesList">
          <div className={gridItemStyle}>
            <h2 className={headingStyle}>Seamless Editing</h2>
            <p className={paragraphStyle}>
              Create and edit .md files effortlessly with our intuitive editor.
            </p>
          </div>
          <div className={gridItemStyle}>
            <h2 className={headingStyle}>Privacy First</h2>
            <p className={paragraphStyle}>
              Your data, your privacy. All your files are stored locally on your
              device.
            </p>
          </div>
          <div className={gridItemStyle}>
            <h2 className={headingStyle}>Effortless PDF Exporting</h2>
            <p className={paragraphStyle}>
              Convert your Markdown files into clean PDFs with a single click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const sectionStyle = `mt-4 sm:mt-8 md:mt-32 my-16`;
const gridStyle = `flex flex-col md:flex-row gap-4`;
const gridItemStyle = `w-full sm:w-1/3 py-8 md:py-16 px-8 md:px-8 bg-amber-100 dark:bg-slate-900 rounded-md`;
const headingStyle = `text-2xl leading-tight text-white-700 dark:text-white`;
const paragraphStyle = `mt-4 text-gray-600 dark:text-gray-200`;
