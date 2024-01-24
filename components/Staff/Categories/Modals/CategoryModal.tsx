import { Modal } from "flowbite-react";
import React from "react";

const CategoryModal = () => {
  return (
    <Modal show={true} position="top-center">
      <Modal.Header className="uppercase text-gray-800">
        Neue Category
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6"></div>
      </Modal.Body>
    </Modal>
  );
};

export default CategoryModal;
