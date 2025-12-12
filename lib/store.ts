import { create } from 'zustand'
import { Project, saveProject } from '@/lib/storage/db'

interface EditorState {
    project: Project | null;
    isDirty: boolean;
    lastSaved: number;
    selection: { start: number; end: number } | null;

    initProject: (p: Project) => void;
    updateSequence: (seq: string) => void;
    setSelection: (start: number | null, end: number | null) => void;
    save: () => Promise<void>;
}

export const useEditorStore = create<EditorState>((set, get) => ({
    project: null,
    isDirty: false,
    lastSaved: Date.now(),
    selection: null,

    initProject: (p) => set({ project: p, isDirty: false, selection: null }),

    updateSequence: (seq) => set((state) => {
        if (!state.project) return {};
        // Don't mark dirty if no change
        if (state.project.sequence === seq) return {};

        return {
            project: { ...state.project, sequence: seq, updated: Date.now() },
            isDirty: true
        }
    }),

    setSelection: (start, end) => set({ selection: (start !== null && end !== null) ? { start, end } : null }),

    save: async () => {
        const { project, isDirty } = get();
        if (project && isDirty) {
            try {
                await saveProject(project);
                set({ isDirty: false, lastSaved: Date.now() });
                console.log("Auto-saved project", project.id);
            } catch (err) {
                console.error("Failed to save project", err);
            }
        }
    }
}))
