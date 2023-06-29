import Button from "@/components/Forms/Button";

interface Props {
  handleCreateFile: () => void;
  handleOpenFile: () => Promise<void>;
}
const DashboardBlankState = ({ handleCreateFile, handleOpenFile }: Props) => {
  return (
    <>
      <section>
        <h2>Choose your path</h2>
        <h1 className="mt-md">Editing Options in Hermes Notes</h1>
        <p className="mt-xl">
          Discover the flexibility of Hermes Notes with two powerful options at
          your fingertips. Open Existing Markdown File and Start from Scratch
          offer effortless editing and creation experiences. Edit, save, export,
          and update frontmatter for existing files, or begin fresh with a clean
          slate. Unleash your creativity, streamline your workflow, and bring
          your Markdown content to life with Hermes Notes.
        </p>
      </section>
      <section className="dashboard__options mt-xl">
        <div className="dashboard__option">
          <h2>Start from Scratch</h2>
          <p className="mt-md">
            Begin a new Markdown file in Hermes Notes. Focus on your content
            without distractions, format your document, and export it as a PDF
            when ready.
          </p>
          <Button
            variant="primary"
            label="Create File"
            handleClick={() => handleCreateFile()}
          ></Button>
        </div>
        <div className="dashboard__option">
          <h2>Open Existing Markdown File</h2>
          <p className="mt-md">
            Access and edit your pre-existing Markdown files within Hermes
            Notes. Update frontmatter, make changes, and save or export the file
            as a PDF.
          </p>
          <Button
            variant="primary"
            label="Open File"
            handleClick={() => handleOpenFile()}
          ></Button>
        </div>
      </section>
    </>
  );
};

export default DashboardBlankState;
