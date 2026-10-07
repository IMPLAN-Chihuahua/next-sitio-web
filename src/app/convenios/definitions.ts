import { ColaboradorExterno, Media } from "../definitions";


export type Convenio = {
  readonly id: string;
  readonly documentId: string;
  codigo: string;
  shortDescripcion: string;
  colaboradores: ColaboradorExterno[];
  anio: number;
  convenio: Media;
  terminosReferencia: Media | null;
  presentacion: Media | null;
}