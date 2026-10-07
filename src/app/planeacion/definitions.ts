import { DatoGeografico } from "../cartografia/definitions";
import { Media, MultipleMedia, TemaInstrumentoPlaneacion } from "../definitions";


export type InstrumentosPageType = {
  readonly id: number;
  readonly documentId: string;
  titulo: string;
  descripcion: string;
  cover: Media;
}


export type InstrumentoPlaneacion = {
  readonly id: number;
  readonly documentId: string;
  nombre: string;
  nombreCorto: string;
  nombreCortoSlug: string;
  version: string;
  tema: TemaInstrumentoPlaneacion;
  cover: Media;
  fechaAprobacion: string | null;
  publicadoEn: string;
  acercaDePublicacion: string;
  archivosAdjuntos: MultipleMedia;
  contenido: string;
  descripcion: string;
  datosGeograficos: DatoGeografico[];
  anioPublicacion: number;
  vigente: boolean;
  destacado: boolean;
}

export type TableroEstado = 'activo' | 'desarrollo';

export interface Tablero {
  id: number;
  documentId?: string;

  titulo: string;
  categoria: string;
  descripcion: string;
  cover?: Media | null;

  url: string | null;

  enDesarrollo: boolean;
  activo: boolean;

  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
}

export interface GuiaManualDocumento {
  id: number;
  documentId?: string;

  name: string;
  alternativeText?: string | null;
  caption?: string | null;

  width?: number | null;
  height?: number | null;

  hash: string;
  ext: string;
  mime: string;

  size: number;
  url: string;

  previewUrl?: string | null;
}

export interface GuiaManual {
  id: number;
  documentId?: string;

  titulo: string;
  categoria: string;
  descripcion: string;
  cover?: Media | null;

  documento: GuiaManualDocumento | null;

  urlExterna: string | null;

  enDesarrollo: boolean;
  activo: boolean;

  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
}
