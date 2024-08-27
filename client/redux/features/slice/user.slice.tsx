import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserStateType } from "../types/user.types";
import { initialState } from "../constants/user.constants";

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state: UserStateType, action: PayloadAction<any>) {
      const userObj = action.payload;
      const newState = { ...state };
      Object.assign(newState, userObj);
      return newState;
    },
    setIsFormData(state: UserStateType) {
      state.isFormData = true;
    },
    resetIsFormData(state: UserStateType) {
      state.isFormData = false;
    },
    logoutUser(state: UserStateType) {
      const newState = { ...state };
      newState.user = null;
      newState.token = null;
      return newState;
    },
  },
});

export const { updateUser, logoutUser, setIsFormData, resetIsFormData } =
  UserSlice.actions;
export default UserSlice.reducer;
