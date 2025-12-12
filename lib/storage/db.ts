import { openDB, DBSchema } from 'idb';

export interface Project {
    id: string;
    name: string;
    sequence: string;
    type: 'dna' | 'rna' | 'protein';
    created: number;
    updated: number;
    metadata?: Record<string, unknown>;
}

interface OpenGeneDB extends DBSchema {
    projects: {
        key: string;
        value: Project;
        indexes: { 'by-updated': number };
    };
    settings: {
        key: string;
        value: unknown;
    };
}

const DB_NAME = 'openginelab-db';
const DB_VERSION = 1;

export const initDB = async () => {
    return openDB<OpenGeneDB>(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('projects')) {
                const store = db.createObjectStore('projects', { keyPath: 'id' });
                store.createIndex('by-updated', 'updated');
            }
            if (!db.objectStoreNames.contains('settings')) {
                db.createObjectStore('settings');
            }
        },
    });
};

export const saveProject = async (project: Project) => {
    const db = await initDB();
    return db.put('projects', project);
};

export const getProject = async (id: string) => {
    const db = await initDB();
    return db.get('projects', id);
};

export const getAllProjects = async () => {
    const db = await initDB();
    return db.getAllFromIndex('projects', 'by-updated');
};

export const deleteProject = async (id: string) => {
    const db = await initDB();
    return db.delete('projects', id);
};
