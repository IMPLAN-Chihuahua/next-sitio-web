import { getContrastRatio } from '@mui/material/styles';

import { StrapiBlock, StrapiBlockLeaf } from './types';

export function textToBlocks(text: string): StrapiBlock[] {
    return [{ type: 'paragraph', children: [{ type: 'text', text }] }];
}


export function strapiTextToBlocks(value: unknown): StrapiBlock[] {
    if (Array.isArray(value)) return value as StrapiBlock[];
    if (typeof value === 'string') return textToBlocks(value);
    return [];
}

/**
 * Aplana un campo Rich Text (Blocks) de Strapi v5 a texto plano.
 * Se usa tanto para el buscador (comparar contra el texto real)
 * como para mostrar el resumen truncado en la tabla.
 */
export function blocksToPlainText(blocks: StrapiBlock[] | null | undefined): string {
    if (!blocks || blocks.length === 0) return '';

    const collect = (nodes: StrapiBlockLeaf[]): string => nodes.map((node) => (node.children ? collect(node.children) : node.text ?? '')).join(' ');

    return blocks.map((block) => collect(block.children)).join(' ').replace(/\s+/g, ' ').trim();
}


function hashString(value: string): number {
    let hash = 0;

    for (let i = 0; i < value.length; i++) {
        hash = value.charCodeAt(i) + ((hash << 5) - hash);
    }

    return Math.abs(hash);
}


export function getCategoryColors(category: string) {
    const hash = hashString(category);

    const hue = hash % 360;

    const saturation = 60 + ((hash >> 8) % 10);

    const lightness = 68 + ((hash >> 16) % 8);

    const backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    const darkText = '#202022';
    const lightText = '#ffffff';

    const darkContrast = getContrastRatio(backgroundColor, darkText);

    const lightContrast = getContrastRatio(backgroundColor, lightText);

    return {
        backgroundColor,
        color: darkContrast >= lightContrast ? darkText : lightText,
    };
}


export function normalizeSearchText(value: string): string {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
}


function normalizeSearchCode(value: string): string {
    return normalizeSearchText(value).replace(/[^a-z0-9]/g, '');
}


export function getCodeSearchVariants(value: string): string[] {
    const base = normalizeSearchCode(value);

    const variants = new Set([base, base.replaceAll('chih', 'chh'), base.replaceAll('chh', 'chih')]);

    for (const variant of [...variants]) {
        if (variant.startsWith('uga')) {
            variants.add(variant.slice(3));
        }
    }

    return [...variants].filter(Boolean);
}


export function codeVariantsMatchSearch(codeVariants: string[], queryVariants: string[]): boolean {
    return queryVariants.some((queryVariant) => codeVariants.some((codeVariant) => codeVariant.includes(queryVariant)));
}


export function codeVariantsEqualSearch(codeVariants: string[], queryVariants: string[]): boolean {
    return queryVariants.some((queryVariant) => codeVariants.includes(queryVariant));
}
