import { Media, MultipleMedia, Tag } from "@/app/definitions";


export type TrabajosPlaneacionPageType = {
  readonly id: string;
  readonly documentId: string;
  titulo: string;
  descripcion: string;
  cover: Media;
}


export type TrabajoPlaneacion = {
  readonly id: string;
  readonly documentId: string;
  nombre: string;
  contenido: string;
  slug: string;
  cover: Media | null;
  categoria: 'Proyecto' | 'Estudio';
  archivosAdjuntos: MultipleMedia;
  ficha: FichaTrabajoPlaneacion;
}

export type FichaTrabajoPlaneacion = {
  readonly id: string;
  readonly documentId: string;
  anio: number;
  codigo: string;
  periodicidad: string;
  inversion: number | null;
  esDesarrolloInterno: boolean;
  helperTextInversion: string | null;
  clasificaciones: Tag[];
  colaboradoresExternos: ColaboradorExterno[];
  superficieM2: number | null;
  superficieHas: number | null;
  estatus: string | null;
}