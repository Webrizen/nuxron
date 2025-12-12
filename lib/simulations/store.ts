import { create } from 'zustand'

export interface SimulationJob {
    id: string;
    type: 'gc-content' | 'translation' | 'mw';
    status: 'queued' | 'running' | 'complete' | 'error';
    submitted: number;
    result?: any;
    error?: string;
    projectName: string;
}

interface SimulationStore {
    jobs: SimulationJob[];
    addJob: (job: SimulationJob) => void;
    updateJob: (id: string, updates: Partial<SimulationJob>) => void;
    removeJob: (id: string) => void;
}

export const useSimulationStore = create<SimulationStore>((set) => ({
    jobs: [],
    addJob: (job) => set((state) => ({ jobs: [job, ...state.jobs] })),
    updateJob: (id, updates) => set((state) => ({
        jobs: state.jobs.map(j => j.id === id ? { ...j, ...updates } : j)
    })),
    removeJob: (id) => set((state) => ({
        jobs: state.jobs.filter(j => j.id !== id)
    }))
}))
