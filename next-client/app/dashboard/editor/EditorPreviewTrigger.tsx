"use client";
import { useState } from "react";
import DialogModal from "@/app/components/DialogModal";
import Button from "@/app/components/Button";
import { useAtom } from "jotai";
import { atom_contentEdited, atom_frontMatter } from "@/app/atoms/atoms";
import MarkdownExport from "@/app/services/markdown-export";
import toast from "react-hot-toast";
import { useKey } from "@/app/hooks/use-key";
import MarkdownPreview from "../components/MarkdownPreview";
import Portal from "@/app/components/Portal";

export default function EditorPreviewTrigger() {
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);
  const [contentEdited] = useAtom(atom_contentEdited);
  const [frontMatter] = useAtom(atom_frontMatter);

  useKey("ctrle", () => showPdfPreviewModal());

  return (
    <>
      <Button
        variant="small--info"
        label="Export to PDF"
        handler={() => showPdfPreviewModal()}
      />
      <Portal>
        <DialogModal
          isOpened={isPdfPreviewOpen}
          onClose={() => hidePdfPreviewModal()}
          styles={`dark:bg-white dark:text-gray-700`}
        >
          <div className="h-full">
            <div className={previewContainerStyles} id="pdfReport">
              <section className={previewStyles}>
                <MarkdownPreview content={contentEdited} />
              </section>
            </div>
            <div className="fixed bottom-2 right-2 sm:bottom-8 sm:right-8">
              <Button
                variant="primary"
                label="Export"
                handler={() => handlePdfExport()}
              />
            </div>
          </div>
        </DialogModal>
      </Portal>
    </>
  );

  function handlePdfExport() {
    const reportName = frontMatter.fileName.replace(".md", ".pdf");

    MarkdownExport.exportToPDF("#pdfReport", reportName)
      .then(() => {
        toast.success("File has been exported");
      })
      .catch((error) => {
        toast.error("File could not be exported");
        console.error(error);
      });
  }

  function showPdfPreviewModal() {
    setIsPdfPreviewOpen(true);
  }

  function hidePdfPreviewModal() {
    setIsPdfPreviewOpen(false);
  }
}

const previewContainerStyles = `mt-8`;
const previewStyles = `prose mx-auto prose-pre:bg-transparent prose-pre:px-0 prose-pre:text-gray-600`;
