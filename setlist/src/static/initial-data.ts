
export interface HashTable<T> {
    [key:string]: T;
}

export type task = {
    id: string
    content: string
}
export type column = {
    id: string
    title: string
    taskIds: string[]
}

export interface dndList {
    tasks: HashTable<task>
    columns: HashTable<column>
    columnOrder: string[]
}

export const initialData: dndList = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Take out the garbage' },
        'task-2': { id: 'task-2', content: 'Watch my favorite show' },
        'task-3': { id: 'task-3', content: 'charge my phone' },
        'task-4': { id: 'task-4', content: 'Cook dinner' },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To do',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
        }

    },
    columnOrder: ['column-1']
};
