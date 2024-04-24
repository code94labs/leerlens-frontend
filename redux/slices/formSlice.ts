import { createSlice } from "@reduxjs/toolkit";

export type FormState = {
  isModified: boolean;
};

type InitialState = {
  formDetails: FormState;
};

const initialState: FormState = {
  isModified: false,
};

const formSlice = createSlice({
  name: "formDetails",
  initialState,
  reducers: {
    resetForm: (state) => {
      state.isModified = initialState.isModified;
    },
    setFormModified: (state) => {
      state.isModified = true;
    },
  },
});

export const { resetForm, setFormModified } = formSlice.actions;

export const selectForm = (state: InitialState) => state.formDetails;

export default formSlice.reducer;
