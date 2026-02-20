import { MultipleMedia } from "../definitions";


export type ReporteFinanciero = {
  readonly documentId: string;
  readonly id: number;
  anio: number;
  isAnual: boolean;
  trimestre: number;
  reportes: MultipleMedia;
}