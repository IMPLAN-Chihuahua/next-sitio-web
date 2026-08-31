import { StrapiBlock, StrapiBlockLeaf } from './types';

export function textToBlocks(text: string): StrapiBlock[] {
    return [
        {
            type: 'paragraph',
            children: [
                {
                    type: 'text',
                    text,
                },
            ],
        },
    ];
}


export function strapiTextToBlocks(value: unknown): StrapiBlock[] {
    if (Array.isArray(value)) {
        return value as StrapiBlock[];
    }

    if (typeof value === 'string') {
        return textToBlocks(value);
    }

    return [];
}

/**
 * Aplana un campo Rich Text (Blocks) de Strapi v5 a texto plano.
 * Se usa tanto para el buscador (comparar contra el texto real)
 * como para mostrar el resumen truncado en la tabla.
 */
export function blocksToPlainText(blocks: StrapiBlock[] | null | undefined): string {
    if (!blocks || blocks.length === 0) return '';

    const collect = (nodes: StrapiBlockLeaf[]): string =>
        nodes
            .map((node) => (node.children ? collect(node.children) : node.text ?? ''))
            .join(' ');

    return blocks
        .map((block) => collect(block.children))
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
}
