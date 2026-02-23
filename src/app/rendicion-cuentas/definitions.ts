import { Media, MultipleMedia } from "../definitions";


export type ReporteFinanciero = {
  readonly documentId: string;
  readonly id: number;
  anio: number;
  isAnual: boolean;
  trimestre: number | null;
  reportes: MultipleMedia;
}


export type RendicionDeCuentasPage = {
  readonly documentId: string;
  readonly id: number;
  cover: Media;
  titulo: string;
  descripcion: string;
  contenido: string;
}