import { Media, MultipleMedia } from "../definitions";

export type Autor = {
    readonly id: number;
    readonly documentId: string;
    nombre: string;
    slug: string;
    role: string;
    bio: string;
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
    media: MultipleMedia;
    autors: Autor[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
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