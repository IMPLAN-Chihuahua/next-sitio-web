import { TeamMember } from "../definitions";


export type UnidadTransparenciaPageType = {
  readonly id: string;
  readonly documentId: string;
  titulo: string;
  descripcion: string;
  contenido: string;
  equipo: EquipoUnidadTransparencia[];
}


export type EquipoUnidadTransparencia = {
  readonly id: string;
  readonly documentId: string;
  miembro: TeamMember;
  telefono: string;
  extension: string;
  rol: 'Titular' | 'Presidente' | 'Secretario' | 'Vocal';
}