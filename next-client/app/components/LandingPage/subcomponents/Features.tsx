import { containerStyle } from "@/app/constants/styles";

export default function Features() {
  return (
    <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 text-center prose prose-gray">
      <h2 className="text-3xl font-semibold mb-8">
        Why Choose Hermes Markdown?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-amber-100 p-6 rounded-md shadow-md">
          <h3 className="text-xl font-bold mb-4">Privacy First</h3>
          <p>
            Your content never leaves your device. Everything stays local
            and secure.
          </p>
        </div>
        <div className="bg-amber-100 p-6 rounded-md shadow-md">
          <h3 className="text-xl font-bold mb-4">Modern Interface</h3>
          <p>
            Enjoy a distraction-free workspace designed for focus and
            productivity.
          </p>
        </div>
        <div className="bg-amber-100 p-6 rounded-md shadow-md">
          <h3 className="text-xl font-bold mb-4">Real-Time Preview</h3>
          <p>See your markdown beautifully rendered as you type.</p>
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
