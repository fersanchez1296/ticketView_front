import { create } from "zustand";

interface SnackbarState {
  successSB: boolean;
  errorSB: boolean;
  sbMessage: string;
  sbStatus: string;
  openSuccessSB: (message: string, status: string) => void;
  closeSuccessSB: () => void;
  openErrorSB: (message: string, status: string) => void;
  closeErrorSB: () => void;
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
  successSB: false,
  errorSB: false,
  sbMessage: "",
  sbStatus: "",
  openSuccessSB: (message, status) =>
    set({ successSB: true, sbMessage: message, sbStatus: status }),
  closeSuccessSB: () => set({ successSB: false, sbMessage: "", sbStatus: "" }),
  openErrorSB: (message, status) => set({ errorSB: true, sbMessage: message, sbStatus: status }),
  closeErrorSB: () => set({ errorSB: false, sbMessage: "", sbStatus: "" }),
}));
