import { Media, MultipleMedia, Tag } from "@/app/definitions";


export type CentroEstudiosPageType = {
  readonly id: string;
  readonly documentId: string;
  titulo: string;
  descripcion: string;
  cover: Media;
}


export type Estudio = {
  readonly id: string;
  readonly documentId: string;
  nombre: string;
  contenido: string;
  slug: string;
  cover: Media;
  archivosAdjuntos: MultipleMedia;
  fichaEstudio: FichaEstudio;
}

export type FichaEstudio = {
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
}