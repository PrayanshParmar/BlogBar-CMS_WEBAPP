import { create } from "zustand";

interface commentModelStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCommentModel = create<commentModelStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCommentModel;
