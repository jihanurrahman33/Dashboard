import { create } from "zustand";

const useCallLogStore = create((set) => ({
  selectedCallId: null,
  setSelectedCallId: (id) => set({ selectedCallId: id }),
}));

export default useCallLogStore;
