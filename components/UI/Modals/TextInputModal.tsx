import { Button, Label, Modal, TextInput } from "flowbite-react";
import React from "react";
import LoadingButton from "../Buttons/LoadingButton";

interface FormElements extends HTMLFormControlsCollection {
  textinput: HTMLInputElement;
}

interface InputFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export interface TextInputModalProps {
  title?: string;
  button?: {
    title?: string;
  };
  input?: {
    title?: string;
    placeholder?: string;
    defaultValue?: string;
  };
  show: boolean;
  dismissible?: boolean;
  position?: string;
  error?: string;
  isLoading?: boolean;
  onClose?: () => void;
  onSubmit?: (input: string) => void;
}

const TextInputModal = ({
  title,
  button,
  input,
  show,
  error,
  onClose,
  onSubmit,
  isLoading = false,
  position = "top-center",
  dismissible = false,
}: TextInputModalProps) => {
  const handleSubmit = (ev: React.FormEvent<InputFormElement>) => {
    ev.preventDefault();
    const inputText = ev.currentTarget.elements.textinput.value;
    if (onSubmit) onSubmit(inputText);
  };

  return (
    <Modal
      show={show}
      position={position}
      onClose={onClose}
      dismissible={dismissible}
    >
      <Modal.Header className="uppercase text-gray-800">{title}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="textinput" value={input?.title} />
              </div>
              <TextInput
                id="textinput"
                type="text"
                placeholder={input?.placeholder}
                defaultValue={input?.defaultValue}
                required
              />
            </div>
            {error && <span className="text-red-600">{error}</span>}
            <LoadingButton
              color="success"
              type="submit"
              className="mt-5"
              isLoading={isLoading}
            >
              {button?.title}
            </LoadingButton>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TextInputModal;
