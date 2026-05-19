import { Media, MultipleMedia } from "../definitions";

export type ArchivoGrupo = {
  readonly id: number;
  Nombre: string;
  Archivo: Media[];
};

export type Licitacion = {
  readonly id: number;
  readonly documentId: string;

  estatus: 'Abierta' | 'Desierta' | 'Cancelada' | 'Cerrada';
  identificador: string;
  descripcion: string;

  fechaInicio: string;
  fechaResolucion: string | null;

  Convocatoria: ArchivoGrupo[];
  Bases: ArchivoGrupo[];
  Resolucion: ArchivoGrupo[];

  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type PlanAnual = {
  id: number;
  year: number;
  document: Media;
};

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
  planesAnuales: PlanAnual[];
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


export type Subasta = {
  readonly id: number;
  readonly documentId: string;
  identificador: string;
  shortDescripcion: string;
  estatus: 'Vigente' | 'Concluida';

  convocatoria: ArchivoGrupo[];
  bases: ArchivoGrupo[];
  resolucion: ArchivoGrupo[];

  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};