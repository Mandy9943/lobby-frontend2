import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const useSidebar = create<SidebarState>((set) => ({
  isOpen: true,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
}));

interface SettingModalState {
  isOpen: boolean;
  toggleSettingModal: () => void;
}

export const useSettingModal = create<SettingModalState>((set) => ({
  isOpen: false,
  toggleSettingModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));
