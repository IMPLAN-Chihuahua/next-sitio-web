export interface StrapiBlockLeaf {
    type: string;
    text?: string;
    children?: StrapiBlockLeaf[];
}

export interface StrapiBlock {
    type: string;
    format?: string;
    children: StrapiBlockLeaf[];
}

export interface Categoria {
    id: number;
    nombre: string;
    slug: string;
}

export type CriterioTipo = 'criterio' | 'lineamiento';

export interface Criterio {
    id: number;
    codigo: string;
    descripcion: StrapiBlock[];
    categoria: Categoria | null;
    tipo: CriterioTipo;
    clavesUga: string[];
}

export interface IndexedCriterio {
    criterio: Criterio;
    textoPlano: string;
    textoBusqueda: string;
    categoriaBusqueda: string;
    codigoBusqueda: string[];
    clavesUgaBusqueda: string[][];
}
