import { createSlice } from "@reduxjs/toolkit";

export enum ModalStates {
  CLOSED,
  CART_DRAWER,
}

export interface ModalState {
  showModal: ModalStates;
  showBackdrop: boolean;
}

const initialState: ModalState = {
  showModal: ModalStates.CLOSED,
  showBackdrop: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal(state, action) {
      state.showModal = action.payload;
      state.showBackdrop = true;
      // Disables Background Scrolling whilst the SideDrawer/Modal is open
      if (typeof window != "undefined" && window.document) {
        document.body.style.overflow = "hidden";
      }
    },
    setShowBackdrop(state, action) {
      state.showBackdrop = action.payload;
    },
    closeModal(state) {
      state.showModal = ModalStates.CLOSED;
      state.showBackdrop = false;
      // Unsets Background Scrolling to use when SideDrawer/Modal is closed
      document.body.style.overflow = "unset";
    },
  },
});

export const { setModal, setShowBackdrop, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
