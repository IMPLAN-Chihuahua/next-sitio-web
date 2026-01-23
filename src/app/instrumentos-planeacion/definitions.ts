import { DatoGeografico } from "../cartografia/definitions";
import { Media, MultipleMedia, TemaDatosAbiertos } from "../definitions";


export type InstrumentosPageType = {
  readonly id: number;
  readonly documentId: string;
  titulo: string;
  descripcion: string;
  cover: Media;
}


export type InstrumentoPlaneacion = {
  readonly id: number;
  readonly documentId: string;
  nombre: string;
  nombreCorto: string;
  nombreCortoSlug: string;
  version: string;
  temaDatosAbiertos: TemaDatosAbiertos;
  cover: Media;
  fechaAprobacion: string;
  publicadoEn: string;
  acercaDePublicacion: string;
  archivosAdjuntos: MultipleMedia;
  contenido: string;
  descripcion: string;
  datosGeograficos: DatoGeografico[];
}