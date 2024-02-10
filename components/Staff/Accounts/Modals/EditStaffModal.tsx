"use client";

import { User } from "@/types/user";
import { Modal } from "flowbite-react";
import React, { useState } from "react";
import EditStaffForm from "./Forms/EditStaffForm";
import PasswordStaffForm from "./Forms/PasswordStaffForm";

interface Props {
  show: boolean;
  user?: User;
  dismissible?: boolean;
  position?: string;
  onClose: () => void;
  onEdit: (user: User) => void;
}

const EditStaffModal = ({
  show,
  user,
  dismissible = false,
  position = "top-center",
  onClose,
  onEdit,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!user) return null;

  return (
    <Modal
      show={show}
      onClose={() => {
        if (!isLoading) onClose();
      }}
      position={position}
      dismissible={dismissible}
    >
      <Modal.Header className="uppercase text-gray-800">
        Mitarbeiter bearbeiten
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <EditStaffForm
            user={user}
            beforeSubmit={() => setIsLoading(true)}
            afterSubmit={() => setIsLoading(false)}
            disabled={isLoading}
            onEdit={onEdit}
          />
          <hr />
          <div>
            <p className="uppercase mb-3">Passwort ändern</p>
            <PasswordStaffForm
              user={user}
              beforeSubmit={() => setIsLoading(true)}
              afterSubmit={() => setIsLoading(false)}
              disabled={isLoading}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditStaffModal;
