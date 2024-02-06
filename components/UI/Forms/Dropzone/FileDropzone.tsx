"use client";

import { FileInput } from "flowbite-react";
import React, { useCallback } from "react";
import { Accept, useDropzone } from "react-dropzone";

interface Props {
  onDropFile: (files: File[]) => void;
  disabled?: boolean;
  accept?: Accept;
  subtext?: string;
}

const FileDropzone = ({
  onDropFile,
  disabled = false,
  subtext = ".PNG oder .JPG",
  accept = {
    "image/*": [".jpeg", ".png"],
  },
}: Props) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onDropFile(acceptedFiles);
    },
    [onDropFile]
  );

  const {
    acceptedFiles,
    isDragReject,
    isDragActive,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept,
    onDrop,
  });

  return (
    <div
      // htmlFor="dropzone-file"
      className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
      {...getRootProps()}
    >
      <div className="flex flex-col items-center justify-center pb-6 pt-5">
        <svg
          className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 16"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          />
        </svg>
        {!isDragActive ? (
          <>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Klicken zum Hochladen</span> oder{" "}
              <span className="font-semibold">drag and drop</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {subtext}
            </p>
          </>
        ) : (
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            Dateien hier loslassen
          </p>
        )}
        {isDragReject && (
          <p className="text-red-500 font-light text-sm px-10 text-center">
            Ausgewählte Dateien sind nicht zulässig.
            <br /> Wähle bitte eine .PNG oder .JPG
          </p>
        )}
      </div>
      <FileInput
        {...getInputProps()}
        id="dropzone-file"
        className="hidden"
        disabled={disabled}
      />
    </div>
  );
};

export default FileDropzone;
