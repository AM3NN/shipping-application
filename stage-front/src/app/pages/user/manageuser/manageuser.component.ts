import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../profile/user.service";
import {Role, UserEntity} from "../profile/user.model";
import { Chip } from "primeng/chip";
import {Table, TableModule} from "primeng/table";
import {Button, ButtonDirective} from "primeng/button";
import { Toolbar } from "primeng/toolbar";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";
import {MultiSelect} from "primeng/multiselect";

@Component({
    selector: 'app-manageuser',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        Chip,
        TableModule,
        Button,
        Toolbar,
        DialogModule,
        InputTextModule,
        DropdownModule,
        MultiSelect,
        ButtonDirective
    ],
    templateUrl: './manageuser.component.html',
    styleUrl: './manageuser.component.scss'
})
export class ManageuserComponent implements OnInit {
    users: UserEntity[] = [];
    loading = true;
    error: string | null = null;
    @ViewChild('dt') table!: Table;
    userDialog: boolean = false;
    submitted: boolean = false;
    userForm!: FormGroup;
    roleesDropdown: { label: string; value: string }[] = [];
    roles = [
        { label: 'Admin', value: 'ROLE_ADMIN' },
        { label: 'Client', value: 'ROLE_CLIENT' }
    ];
    rolees: Role[] = [];
    constructor(
        private userService: UserService,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.loadUsers();

        this.userForm = this.fb.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],   // ✅ ajouté
            roles: [[], Validators.required]
        });
        this.userService.getAllRoles().subscribe({
            next: (data: Role[]) => {
                this.roleesDropdown = data.map(r => ({
                    label: r.name,
                    value: r.name
                }));
            },
            error: (err) => console.error('Erreur récupération des rôles:', err)
        });

    }

    /** Charger les utilisateurs */
    loadUsers() {
        this.userService.getAllUsers().subscribe({
            next: (data) => {
                this.users = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Erreur récupération utilisateurs:', err);
                this.error = 'Impossible de charger les utilisateurs';
                this.loading = false;
            }
        });
    }

    /** Appliquer classes selon rôle */
    getRoleClass(role: string): string {
        switch (role) {
            case 'ROLE_ADMIN':
                return 'role-admin';
            case 'ROLE_CLIENT':
                return 'role-client';
            default:
                return 'role-default';
        }
    }

    /** Ouvrir le dialog */
    openNew() {
        this.userForm.reset();
        this.submitted = false;
        this.userDialog = true;
    }

    /** Sauvegarder utilisateur */
    saveUser() {
        this.submitted = true;
        if (this.userForm.valid) {
            const newUser = this.userForm.value;

            this.userService.createUser(newUser).subscribe({
                next: (res) => {
                    console.log('Utilisateur créé:', res);
                    this.userDialog = false;
                    this.loadUsers(); // ✅ recharge la liste après ajout
                },
                error: (err) => {
                    console.error('Erreur ajout utilisateur:', err);
                }
            });
        }
    }

    exportCSV() {
        if (this.table) {
            this.table.exportCSV();
        }
    }
}
