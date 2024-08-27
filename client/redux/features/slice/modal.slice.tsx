import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalInitialTypes } from "../types/modal.types";
import { initialState } from "../constants/modal.constants";

const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openComponentModal: (
      state: ModalInitialTypes,
      {
        payload,
      }: PayloadAction<{
        component: string;
        data: string;
        modalState?: string;
      }>
    ) => {
      const modalObj = payload;
      // Check if it's a component modal
      state.isOpen = true;
      state.component = modalObj.component;
      state.data = modalObj.data || null;
      // Check for global modal state
      if (modalObj.modalState) {
        const modal = modalObj.modalState;
        state.globalModalState[modal] = true;
      }
    },

    closeModal: (state: ModalInitialTypes) => {
      state.isOpen = false;
      state.component = null;
      state.data = null;
    },
  },
});
export const { openComponentModal, closeModal } = ModalSlice.actions;
export default ModalSlice.reducer;
