import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { ResumeDataSchemaType } from "@/lib/resume";

interface ResumeStore {
  resumeData: ResumeDataSchemaType | null;
  isLoading: boolean;
  error: string | null;
  setResumeData: (data: Partial<ResumeDataSchemaType>) => void;
  clearResumeData: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resumeData: null,
      isLoading: false,
      error: null,
      setResumeData: (data) =>
        set((state) => ({
          resumeData: { ...state.resumeData, ...data } as ResumeDataSchemaType,
          error: null,
        })),
      clearResumeData: () => set({ resumeData: null, error: null }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
    }),
    {
      name: "resume-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        resumeData: state.resumeData,
      }),
    },
  ),
);
