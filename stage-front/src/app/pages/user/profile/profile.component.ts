import { Component, OnInit } from '@angular/core';
import {MessageService, PrimeTemplate} from 'primeng/api';
import { UserEntity } from './user.model';
import { UserService } from './user.service';
import { KeycloakService } from 'keycloak-angular';
import { FormsModule } from '@angular/forms';
import { Card } from 'primeng/card';
import {DatePipe, NgIf} from '@angular/common';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import {Dialog} from "primeng/dialog";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    imports: [
        FormsModule,
        Card,
        DatePipe,
        ButtonDirective,
        InputText,
        NgIf,
        PrimeTemplate,
        Dialog
    ],
    providers: [MessageService]
})
export class ProfileComponent implements OnInit {

    userId: string = '';
    userProfile: UserEntity = {
        id: '',
        username: '',
        companyname: '',
        email: '',
        enabled: false,
        birthdate: new Date().toISOString().split('T')[0],
        position: '',
        phoneNumber: '',
        latitude: 0,
        longitude: 0,
        city: '',
        postalCode: '',
        country: '',
        street:'',
        profilePhoto: new Uint8Array(),

    };
    editMode: boolean = false;
    profilePhotoPreview: string | ArrayBuffer | null = null;
    selectedFile: File | null = null;
    displayDialog: boolean=false;

    constructor(
        private userService: UserService,
        private keycloakService: KeycloakService,
        private messageService: MessageService
    ) {}

    async ngOnInit() {
        // Récupérer le userId depuis Keycloak
        this.userId = await this.keycloakService.getKeycloakInstance().idTokenParsed?.sub || '';
        this.loadProfile();
    }

    loadProfile() {
        if (!this.userId) return;
        this.userService.getUserProfile(this.userId).subscribe({
            next: (data) => {
                this.userProfile = data;
            },
            error: (err) => {
                console.error('Erreur chargement profil:', err);
                this.messageService.add({severity:'error', summary:'Erreur', detail:'Impossible de charger le profil.'});
            }
        });
    }

    toggleEdit() {
        if (!this.userProfile) return;
        this.editMode = !this.editMode;
    }

    saveProfile() {
        if (!this.userProfile) return;
        this.userService.updateUserProfile(this.userId, this.userProfile).subscribe({
            next: () => {
                this.messageService.add({severity:'success', summary:'Succès', detail:'Profil mis à jour'});
                this.editMode = false;
                this.loadProfile();
            },
            error: (err) => {
                console.error('Erreur mise à jour:', err);
                this.messageService.add({severity:'error', summary:'Erreur', detail:'Impossible de mettre à jour le profil.'});
            }
        });
    }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
        if (!this.selectedFile) return;
        const reader = new FileReader();
        reader.onload = () => this.profilePhotoPreview = reader.result;
        reader.readAsDataURL(this.selectedFile);
    }

    uploadPhoto() {
        if (!this.selectedFile) return;
        this.userService.uploadProfilePhoto(this.userId, this.selectedFile).subscribe({
            next: () => {
                this.messageService.add({severity:'success', summary:'Succès', detail:'Photo de profil mise à jour'});
                this.loadProfile();
            },
            error: (err) => {
                console.error('Erreur upload photo:', err);
                this.messageService.add({severity:'error', summary:'Erreur', detail:'Impossible de télécharger la photo.'});
            }
        });
    }
}
