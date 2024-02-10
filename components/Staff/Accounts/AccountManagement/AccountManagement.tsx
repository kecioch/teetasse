"use client";

import ButtonFaIcon from "@/components/UI/Buttons/ButtonFaIcon";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import AccountsTable from "../AccountsTable/AccountsTable";
import { User } from "@/types/user";
import ConfirmDeleteModal, {
  ConfirmDeleteModalProps,
} from "@/components/UI/Modals/ConfirmDeleteModal";
import useFetch from "@/hooks/useFetch";
import { Role } from "@prisma/client";
import AddStaffModal from "../Modals/AddStaffModal";
import EditStaffModal from "../Modals/EditStaffModal";

interface Props {
  data: User[];
}

const AccountManagement = ({ data = [] }: Props) => {
  const { fetch, errorMsg, isFetching, clearErrorMsg } = useFetch();
  const [users, setUsers] = useState(data);
  const [deleteModal, setDeleteModal] = useState<ConfirmDeleteModalProps>({
    show: false,
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<{
    show: boolean;
    user?: User;
  }>({ show: false });

  const handleEditUser = (user: User) => {
    console.log("HANDLE EDIT USER", user);
    const index = users.findIndex((el) => el.id === user.id);
    const newUsers = [...users];
    newUsers[index] = user;
    setUsers(newUsers);
  };

  const handleAddUser = (user: User) => {
    setUsers((prev) => [...prev, user]);
    setShowAddModal(false);
  };

  const handleDeleteUser = (id: number) => {
    console.log("HANDLE DELETE USER", id);

    fetch.delete(`/api/users/${id}`).then((res) => {
      if (res.status !== 200) return;
      console.log(res);

      const newUsers = [...users];
      newUsers.splice(
        newUsers.findIndex((el) => el.id === id),
        1
      );
      setUsers(newUsers);
      setDeleteModal({ show: false });
    });
  };

  const openAddUser = () => {
    setShowAddModal(true);
  };

  const openEditUser = (id: number) => {
    const user = users.find((el) => el.id === id);
    setShowEditModal({ show: true, user });
  };

  const openDeleteUser = (id: number) => {
    setDeleteModal({
      show: true,
      title: "Account löschen",
      description: "Wollen Sie wirklich den Account löschen?",
      onNo: () => setDeleteModal({ show: false }),
      onYes: () => handleDeleteUser(id),
    });
  };

  return (
    <div>
      <div className="flex justify-between flex-wrap items-center gap-3">
        <h1 className="text-3xl uppercase text-gray-800">
          Mitarbeiterverwaltung
        </h1>
        <ButtonFaIcon icon={faAdd} color="success" onClick={openAddUser}>
          Hinzufügen
        </ButtonFaIcon>
      </div>
      <hr className="my-5" />
      <div>
        <AccountsTable
          users={users}
          onDelete={openDeleteUser}
          onEdit={openEditUser}
          isLoading={isFetching}
        />
        {showAddModal && (
          <AddStaffModal
            show={showAddModal}
            dismissible={false}
            position="top-center"
            onSubmit={handleAddUser}
            onClose={() => setShowAddModal(false)}
          />
        )}
        {showEditModal.show && (
          <EditStaffModal
            show={showEditModal.show}
            user={showEditModal.user}
            dismissible={false}
            position="top-center"
            onEdit={handleEditUser}
            onClose={() => setShowEditModal({ show: false })}
          />
        )}
        <ConfirmDeleteModal
          show={deleteModal.show}
          title={deleteModal.title}
          description={deleteModal.description}
          error={errorMsg}
          isLoading={isFetching}
          onClose={() => setDeleteModal({ show: false })}
          onNo={deleteModal.onNo}
          onYes={deleteModal.onYes}
        />
      </div>
    </div>
  );
};

export default AccountManagement;
