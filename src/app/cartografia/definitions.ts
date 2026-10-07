import { Media, MultipleMedia, TemaInstrumentoPlaneacion } from "../definitions";


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
  tema: TemaInstrumentoPlaneacion;
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