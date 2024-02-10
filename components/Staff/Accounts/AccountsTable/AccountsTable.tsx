"use client";

import { User } from "@/types/user";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import React from "react";
import AccountsTableRow from "./AccountsTableRow";

interface Props {
  users: User[];
  isLoading: boolean;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const AccountsTable = ({ users = [], onDelete, onEdit }: Props) => {
  return (
    <div className="overflow-x-auto">
      <Table striped hoverable className="bg-transparent">
        <TableHead>
          <TableHeadCell className="bg-zinc-600 text-white">ID</TableHeadCell>
          <TableHeadCell className="bg-zinc-600 text-white">
            Vorname
          </TableHeadCell>
          <TableHeadCell className="bg-zinc-600 text-white">
            Nachname
          </TableHeadCell>
          <TableHeadCell className="bg-zinc-600 text-white">
            Email
          </TableHeadCell>
          <TableHeadCell className="bg-zinc-600 text-white">
            <span className="sr-only">Bearbeiten</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="odd:bg-red-200!">
          {users.length <= 0 && (
            <TableRow className="bg-white even:bg-gray-50 hover:bg-gray-200">
              <TableCell colSpan={8} className="text-center">
                Keine Mitarbeiter vorhanden
              </TableCell>
            </TableRow>
          )}
          {users.map((item, index) => (
            <AccountsTableRow
              key={index}
              user={item}
              onEdit={() => onEdit(item.id)}
              onDelete={() => onDelete(item.id)}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AccountsTable;
