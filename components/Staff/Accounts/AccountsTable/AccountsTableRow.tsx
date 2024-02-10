"use client";

import { User } from "@/types/user";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, TableCell, TableRow } from "flowbite-react";
import React from "react";

interface Props {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
}

const AccountsTableRow = ({ user, onEdit, onDelete }: Props) => {
  return (
    <TableRow className="bg-white even:bg-gray-50 hover:bg-gray-200">
      <TableCell className="font-medium text-gray-900">{user.id}</TableCell>
      <TableCell>{user.firstName}</TableCell>
      <TableCell>{user.lastName}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        <div className="flex gap-3 justify-center items-center">
          <Button color="red" onClick={onDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
          <Button color="gray" onClick={onEdit}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default AccountsTableRow;
