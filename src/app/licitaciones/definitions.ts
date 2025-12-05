import { Media, MultipleMedia } from "../definitions";

export type Licitacion = {
  readonly id: number;
  readonly documentId: string;

  estatus: 'Abierta' | 'Desierta' | 'Cancelada' | 'Cerrada';
  identificador: string;
  descripcion: string;
  convocatoria: Convocatoria;
  bases: Bases | null;
  resolucion: Resolucion | null;
}


export type Convocatoria = {
  readonly id: number;
  readonly documentId: string;  
  fechaInicio: string;
  modificaciones: MultipleMedia;
  convocatoria: Media;
}


export type Bases = {
  readonly id: number;
  basesEditable: Media;
  actaJuntaAclaraciones: Media;
  actaApertura: Media | null;
  modificaciones: MultipleMedia;
  bases: Media;
  sesionesExtraordinarias: MultipleMedia;
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