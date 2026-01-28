import { create } from "zustand";

const useAppointmentStore = create((set) => ({
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
}));

export default useAppointmentStore;
