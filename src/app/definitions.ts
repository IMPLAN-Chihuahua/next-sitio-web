export type Project = {
  readonly id: number;
  description: string;
  title: string;
  media: Media[];
  buttons: SectionButtons[];
}

export type Section = {
  readonly id: number;
  title: string;
  description: string;
  media: Media;
  buttons: SectionButtons[];
}

type SectionButtons = {
  readonly id: number;
  text: string;
  url: string;
}

export type Platform = {
  readonly id: number;
  name: string;
  catchPhrase: string;
  description: string;
  url: string;
  media: Media;
}

export type Stellar = {
  readonly id: number;
  media: Media;
  title: string;
  Buttons: SectionButtons[]
}

export type Media = {
  readonly id: number;
  readonly documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: MediaFormats | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export type MediaFormats = {
  large: MediaFormat;
  small: MediaFormat;
  medium: MediaFormat;
  thumbnail: MediaFormat;
}

export type MediaFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null | string;
  size: number;
  width: number;
  height: number;
  sizeInBytes: string;
}

export type MultipleMedia = Media[]



export type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}


export type Tag = {
  readonly id: string;
  readonly documentId: string;
  name: string;
  slug: string;
  hexColor: string;
}


export type ColaboradorExterno = {
  readonly id: number;
  readonly documentId: string;
  nombre: string;
  acronimo: string | null;
}


export type DepartamentoType = {
  readonly id: number;
  readonly documentId: string;
  nombre: string;
  activo: boolean;
}

export type Value = {
  readonly id: number;
  title: string;
  description: string;
  icon: Media | null;
}

export type TeamMember = {
  readonly id: number;
  readonly documentId: string;
  nombres: string;
  apellidos: string;
  email: string;
  titulo: string;
  descripcion: string;
  photo: Media;
  departamento: DepartamentoType;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export type VacanteTipo = 'Practicas' | 'Trabajo' | 'Servicio';
export type VacanteHorario = 'Flexible' | 'Completo' | 'Objetivos';
export type VacanteModalidad = 'presencial' | 'hibrido' | 'remoto' | 'campo';

export type Vacante = {
  readonly id: number;
  readonly documentId: string;
  title: string;
  description: string;
  tipo: VacanteTipo;
  horario: VacanteHorario;
  modalidad: VacanteModalidad;
  departamento: DepartamentoType;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}