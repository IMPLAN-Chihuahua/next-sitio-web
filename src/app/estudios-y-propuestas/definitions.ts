import { ColaboradorExterno, DepartamentoType, Media, MultipleMedia, Tag } from "@/app/definitions";


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
  resumen: string;
  archivosAdjuntos: MultipleMedia;
  ficha: FichaTrabajoPlaneacion;
  objetivos: ObjetivosEstudio;
  galeriaFotografica: MultipleMedia;
}

export type ObjetivosEstudio = {
  readonly id: number;
  general: string;
  especificos: Array<{ readonly id: number, descripcion: string }>
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
  departamentosAsignados: DepartamentoType[];
  superficieM2: number | null;
  superficieHas: number | null;
  estatus: string | null;
  localizacion: string | null;
}