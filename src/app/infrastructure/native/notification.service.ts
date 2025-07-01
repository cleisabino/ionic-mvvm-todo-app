import { Injectable, signal } from '@angular/core';
import { LocalNotifications, PermissionStatus } from '@capacitor/local-notifications';
import { Task } from 'src/app/domain/entities/task.entity';

@Injectable({ providedIn: 'root' })
export class NotificationService {

    public permissionStatus = signal<PermissionStatus | null>(null)

    async requestPermission(): Promise<boolean> {
        const result: PermissionStatus = await LocalNotifications.requestPermissions();
        console.log(result);
        this.permissionStatus.set(result);
        return result.display === 'granted';
    }

    async scheduleReminder(task: Task) {
        if (!task.reminderDate) return;

        const permission = await this.requestPermission();
        if (!permission) return;

        await LocalNotifications.schedule({
        notifications: [{
            id: +task.id.replace(/\D/g, '').slice(0, 5),
            title: 'Lembrete',
            body: `Não se esqueça: ${task.title}`,
            schedule: { at: new Date(task.reminderDate) },
            sound: 'beep.caf',
        }]
        });
    }

    async cancelReminder(taskId: string) {
        const id = +taskId.replace(/\D/g, '').slice(0, 5);
        await LocalNotifications.cancel({ notifications: [{ id }] });
    }
}