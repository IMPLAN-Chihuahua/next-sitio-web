import { Media, MultipleMedia } from "../definitions";

export type Autor = {
    readonly id: number;
    readonly documentId: string;
    nombres: string;
    apellidos: string;
    prefix?: string;
    titulo?: string;
    descripcion?: string | null;
    email?: string;
    photo?: Media;
}

export type Novedades = {
    readonly id: number;
    readonly documentId: string;
    title: string;
    description: string;
    slug: string;
    content: string;
    seoTitle: string | null;
    seoDescription: string | null;
    cover: Media | null;
    media?: MultipleMedia;
    autor?: Autor[];
    tags?: Tag[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    fechaPublicacion: string;
    momentosDestacados: MultipleMedia | null;
}

export type EditorialData = {
    readonly id: number;
    readonly documentId: string;
    title: string;
    description: string;
    featuredPosts: Novedades[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export type Tag = {
    readonly id: number;
    readonly documentId: string;
    name: string;
    slug: string;
    hexColor: string;
    createdAt: string;
    updatedAt: string;
}