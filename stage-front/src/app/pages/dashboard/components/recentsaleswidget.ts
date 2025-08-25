import { Component } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { UserService } from "../../user/profile/user.service";
import { MessageService } from "primeng/api";

@Component({
    standalone: true,
    selector: 'app-active-sessions-widget',
    imports: [CommonModule, TableModule, ButtonModule, RippleModule, DialogModule],
    template: `
        <div class="card !mb-8">
            <div class="font-semibold text-xl mb-4">Active Sessions</div>

            <p-table
                [value]="activeSessions"
                [paginator]="true"
                [rows]="5"
                responsiveLayout="scroll"
                [loading]="loading"
            >
                <ng-template pTemplate="header">
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Start</th>
                        <th>Last Access</th>
                        <th></th>
                    </tr>
                </ng-template>

                <ng-template pTemplate="body" let-session>
                    <tr>
                        <td>{{ session.username }}</td>
                        <td>{{ session.email }}</td>
                        <td>{{ session.start | date:'short' }}</td>
                        <td>{{ session.lastAccess | date:'short' }}</td>
                        <td>
                            <button pButton
                                    type="button"
                                    label="View Events"
                                    icon="pi pi-eye"
                                    class="p-button-sm p-button-text"
                                    (click)="viewUserEvents(session.userId)">
                            </button>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>

        <!-- Modal pour afficher les événements -->
        <p-dialog header="User Events" [(visible)]="eventsModalVisible" [modal]="true" [closable]="true" [style]="{width: '600px'}">
            <p-table [value]="userEvents" [paginator]="true" [rows]="10" responsiveLayout="scroll">
                <ng-template pTemplate="header">
                    <tr>
                        <th>Type</th>
                        <th>Time</th>

                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-event>
                    <tr>
                        <td>{{ event.type }}</td>
                        <td>{{ event.time | date:'short' }}</td>

                    </tr>
                </ng-template>
            </p-table>
        </p-dialog>
    `,
    providers: [UserService, MessageService],
})
export class ActiveSessionsWidget {
    activeSessions: any[] = [];
    loading = true;
    userEvents: any[] = [];
    eventsModalVisible = false; // Pour contrôler l'ouverture du modal

    constructor(private userService: UserService, private messageService: MessageService) {}

    ngOnInit() {
        this.userService.getActiveUsers().subscribe({
            next: (data: any) => {
                this.activeSessions = data.activeSessions || [];
                this.loading = false;
            },
            error: (err) => {
                console.error('Erreur récupération sessions actives:', err);
                this.loading = false;
            },
        });
    }

    viewUserEvents(userId: string) {
        this.userService.getUserEvents(userId).subscribe({
            next: (data: any) => {
                this.userEvents = data.events || [];
                this.eventsModalVisible = true; // Ouvre le modal
            },
            error: (err) => {
                console.error('Erreur récupération des events :', err);
                this.messageService.add({severity:'error', summary:'Error', detail:'Failed to load events'});
            }
        });
    }
}
