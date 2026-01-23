import { Media, MultipleMedia, TemaDatosAbiertos } from "../definitions";


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
  grupoCartografia: {
    id: number,
    grupo: string
  }
}

export enum Geometrias {
  Poligono = 'Polígonos',
  Linea = 'Lineas',
  Punto = 'Puntos'
}