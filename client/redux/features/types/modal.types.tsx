export interface ModalInitialTypes {
  title: null | string;
  message: null | string;
  success: boolean;
  promptMessage: null | string;
  promptLink: null | string;
  isOpen: boolean;
  component: null | string;
  data: string | null;
  modalState: null | string;
  globalModalState: { [key in string]: boolean };
}

export enum MODAL_ENUM {
  RECIPE_MODAL = "RecipeModal",
  DELETE_MODAL = "DeleteModal",
}
