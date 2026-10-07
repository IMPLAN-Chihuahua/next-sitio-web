export enum SectorType {
    SOCIAL = "SOCIAL",
    PUBLICO = "PUBLICO",
    PRIVADO = "PRIVADO",
    TECNICO_ACADEMICO = "TECNICO_ACADEMICO",
    PUBLICO_FEDERAL = "PUBLICO_FEDERAL",
    PUBLICO_ESTATAL = "PUBLICO_ESTATAL",
    PUBLICO_MUNICIPAL = "PUBLICO_MUNICIPAL"
}

export interface Consejero {
    id: number;
    documentId: string;
    nombre: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;

    commission_member: boolean;
    has_voice: boolean;
    can_vote: boolean;

    suplente: string | null;

    sector: SectorType | string | null;
}