import { Todo } from 'types';
import { v4 as uuidv4 } from 'uuid';

export const dummyData: Todo[] = [
    { id: 'f9e3bb32-2afe-4fd2-84e7-2ac82f7dcf7c', todo: 'Task 1', isCompleted: false, createdAt: Date() },
    { id: '6143b9fa-75de-4e51-8613-c2f16479e93f', todo: 'Task 2', isCompleted: false, createdAt: Date() }
]