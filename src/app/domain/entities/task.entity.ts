export interface Task {
    id: string;
    title: string;
    description: string;
    reminderDate?: string;
    completed: boolean;
}