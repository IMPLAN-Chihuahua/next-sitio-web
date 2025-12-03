import { Media, MultipleMedia } from "../definitions";

export type Licitacion = {
  readonly id: number;
  readonly documentId: string;

  estatus: 'Abierta' | 'Desierta' | 'Cancelada' | 'Cerrada';
  identificador: string;
  descripcion: string;
  convocatoria: Convocatoria;
  
}


export type Convocatoria = {
  readonly id: number;
  readonly documentId: string;  
  fechaInicio: string;
  modificaciones: MultipleMedia;
  convocatoria: Media;
  bases: Bases | null;
  resolucion: Resolucion | null;
}


export type Bases = {
  readonly id: number;
  basesEditable: Media;
  actaJuntasAclaraciones: MultipleMedia;
  actaApertura: Media;
  modificaciones: MultipleMedia;
  bases: Media;
}


export type Resolucion = {
  id: number;
  cancelacionLicitacion: Media;
  actaDiferimientoFallo: Media;
  actaFallo: Media;
}


export type LicitacionPage = {
  readonly id: number;
  readonly documentId: string;
  titulo: string;
  descripcion: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover: Media;
  procesoCompra: ProcesoCompraStep[];
  planAdquisiciones: Media;
}

export type ProcesoCompraStep = {
  id: number;
  procedimiento: string;
  descripcion: string;
}


export type AdquisicionDirecta = {
  readonly id: string;
  readonly documentId: string;
  adquisicion: string;
  resolucion: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  fechaResolucion: string;
  dictamenExcepcion: Media;
}