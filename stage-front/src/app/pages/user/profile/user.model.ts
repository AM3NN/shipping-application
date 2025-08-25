export interface Role {
    id: string;
    name: string;
    description?: string;
}

export interface UserEntity {
    id?: string;             // ID Keycloak
    username?: string;
    companyname?: string;
    email?: string;
    enabled?: boolean;
    birthdate?: string;       // ISO string ou Date
    position?: string;
    phoneNumber?: string;
    latitude?: number;
    longitude?: number;
    city?: string;
    postalCode?: string;
    street?: string;
    country?: string;
    roles?: Role[];
    profilePhoto?: string | ArrayBuffer; // base64 string pour affichage
    profilePhotoPath?: string;
}
