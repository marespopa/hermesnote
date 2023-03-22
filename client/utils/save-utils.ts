export const saveFile = ({
  blob,
  fileName,
}: {
  blob: Blob;
  fileName: string;
}) => {
  if ("showSaveFilePicker" in window) {
    return exportNativeFileSystem({ blob, fileName });
  }

  return download({ blob, fileName });
};

const exportNativeFileSystem = async ({
  blob,
  fileName,
}: {
  blob: Blob;
  fileName: string;
}) => {
  const fileHandle: FileSystemFileHandle = await getNewFileHandle({ fileName });

  if (!fileHandle) {
    throw new Error("Cannot access filesystem");
  }

  await writeFile({ fileHandle, blob });
};

const getNewFileHandle = ({
  fileName,
}: {
  fileName: string;
}): Promise<FileSystemFileHandle> => {
  const opts: SaveFilePickerOptions = {
    suggestedName: fileName,
    types: [
      {
        description: "Markdown file",
        accept: {
          "text/plain": [".md"],
        },
      },
    ],
  };

  return showSaveFilePicker(opts);
};

const writeFile = async ({
  fileHandle,
  blob,
}: {
  fileHandle: FileSystemFileHandle;
  blob: Blob;
}) => {
  const writer: FileSystemWritableFileStream =
    await fileHandle.createWritable();
  await writer.write(blob);
  await writer.close();
};

const download = ({ fileName, blob }: { fileName: string; blob: Blob }) => {
  const a: HTMLAnchorElement = document.createElement("a");
  a.style.display = "none";
  document.body.appendChild(a);

  const url: string = window.URL.createObjectURL(blob);

  a.href = url;
  a.download = `${fileName}.md`;

  a.click();

  window.URL.revokeObjectURL(url);
  a.parentElement?.removeChild(a);
};
