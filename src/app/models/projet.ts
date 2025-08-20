export interface Projet {
    id: number;
    titre: string;
    statut: string;
    coin: number;
    debloque: boolean;
    niveau?: string;
    description?: string;
}
