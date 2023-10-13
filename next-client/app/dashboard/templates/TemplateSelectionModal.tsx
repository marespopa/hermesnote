import DialogModal from "@/app/components/DialogModal";
import React from "react";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const TemplateSelectionModal = ({ isOpen, handleClose }: Props) => {
  return (
    <DialogModal isOpened={isOpen} onClose={handleClose}>
      Test
    </DialogModal>
  );
};

export default TemplateSelectionModal;
