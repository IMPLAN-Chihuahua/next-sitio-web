import { Media } from "../definitions";


export type AvisoPrivacidad = {
  readonly id: number;
  readonly documentId: string;
  titulo: string;
  seoUrl: string;
  contenido: string;
  adjunto: Media;
  fechaElaboracion: string;
  fechaModificacion: string | null;
  orden: number;
}