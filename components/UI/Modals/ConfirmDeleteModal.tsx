"use client";

import { Button, Modal } from "flowbite-react";
import React from "react";
import LoadingButton from "../Buttons/LoadingButton";

export interface ConfirmDeleteModalProps {
  show: boolean;
  title?: string;
  description?: string;
  error?: string;
  dismissible?: boolean;
  position?: string;
  isLoading?: boolean;
  onClose?: () => void;
  onYes?: () => void;
  onNo?: () => void;
}

const ConfirmDeleteModal = ({
  show,
  title,
  description,
  error,
  dismissible = false,
  isLoading = false,
  position = "top-center",
  onClose,
  onNo,
  onYes,
}: ConfirmDeleteModalProps) => {
  return (
    <Modal
      show={show}
      onClose={onClose}
      position={position}
      dismissible={dismissible}
    >
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex flex-col gap-3">
          {error && <p className="text-red-600">{error}</p>}
          <div className="flex gap-3">
            <LoadingButton
              color="failure"
              onClick={onYes}
              isLoading={isLoading}
            >
              Löschen
            </LoadingButton>
            <Button color="gray" onClick={onNo}>
              Abbrechen
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteModal;
