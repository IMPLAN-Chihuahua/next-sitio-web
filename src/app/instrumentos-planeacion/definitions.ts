import { Media, MultipleMedia, Tag, TemaDatosAbiertos } from "../definitions";


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
  temaDatosAbiertos: TemaDatosAbiertos;
  cover: Media;
  fechaAprobacion: string;
  publicadoEn: string;
  acercaDePublicacion: string;
  archivosAdjuntos: MultipleMedia;
  contenido: string;
  descripcion: string;
  datosGeograficos: DatoGeografico[];
}


export type DatoGeografico = {
  readonly id: number;
  readonly documentId: string;
  objetoGeografico: string;
  geometria: Geometrias;
  escala: string;
  edicion: number;
  proyeccion: string;
  datum: string;
  datosPublicacion: string;
  descripcion: string;
  archivosDescargables: MultipleMedia;
  cover: Media;
  temaDatosAbiertos: TemaDatosAbiertos;
}

export enum Geometrias {
  Poligono = 'Polígonos',
  Linea = 'Lineas',
  Punto = 'Puntos'
}