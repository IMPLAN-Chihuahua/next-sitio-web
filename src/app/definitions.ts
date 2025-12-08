

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