import { ModalInitialTypes } from "../types/modal.types";

export const initialState: ModalInitialTypes = {
  isOpen: false,
  title: null,
  message: null,
  success: false,
  promptMessage: null,
  promptLink: null,
  component: null,
  data: null,
  modalState: null,
  globalModalState: {
    betslip: false,
    placebet: false,
  },
};
