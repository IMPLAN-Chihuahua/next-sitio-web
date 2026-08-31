import type { Metadata } from 'next';
import { Suspense } from 'react';
import {
    CircularProgress,
    Container,
    Box,
    Toolbar,
} from '@mui/material';

import { Criterio } from './types';
import CriteriosExplorer from './CriteriosExplorer';
import { strapiTextToBlocks } from './utils';

export const metadata: Metadata = {
    title: 'Criterios ecológicos',
};

const LINEAMIENTO_ECOLOGICO = {
    id: -1,
    nombre: 'Lineamiento Ecológico',
    slug: 'lineamiento-ecologico',
};

const collator = new Intl.Collator('es', {
    numeric: true,
    sensitivity: 'base',
});

type CriterioEcologicoResponse = {
    id: number;
    codigo?: string | null;
    descripcion?: unknown;
    categoria_poel?: Criterio['categoria'];
};

type LineamientoEcologicoResponse = {
    id: number;
    clave_uga?: string | null;
    claveUga?: string | null;
    codigo?: string | null;
    lineamiento?: unknown;
    descripcion?: unknown;
    descripcion_sumaria?: unknown;
};

async function getCriterios(): Promise<Criterio[]> {
    const url =
        `${process.env.NEXT_PUBLIC_IMPLAN_CMS}` +
        `/criterio-ecologicos` +
        `?populate=categoria_poel` +
        `&pagination[pageSize]=900` +
        `&sort=codigo:asc`;

    const res = await fetch(url, {
        next: {
            revalidate: 3600,
        },
    });

    if (!res.ok) {
        throw new Error(
            `No se pudo cargar criterios ecológicos (${res.status})`
        );
    }
    const json = await res.json();

    return ((json.data ?? []) as CriterioEcologicoResponse[])
        .map((item): Criterio => ({
            id: item.id,
            codigo: item.codigo ?? '',
            descripcion: strapiTextToBlocks(item.descripcion),
            categoria: item.categoria_poel ?? null,
            tipo: 'criterio',
        }))
        .filter((item: Criterio) => Boolean(item.codigo))
        .sort((a: Criterio, b: Criterio) =>
            collator.compare(a.codigo, b.codigo)
        );
}

async function getLineamientosEcologicos(): Promise<Criterio[]> {
    const url =
        `${process.env.NEXT_PUBLIC_IMPLAN_CMS}` +
        `/lineamiento-ecologicos` +
        `?pagination[pageSize]=900` +
        `&sort=clave_uga:asc`;

    const res = await fetch(url, {
        next: {
            revalidate: 3600,
        },
    });

    if (!res.ok) {
        throw new Error(
            `No se pudo cargar lineamientos ecológicos (${res.status})`
        );
    }

    const json = await res.json();

    return ((json.data ?? []) as LineamientoEcologicoResponse[])
        .map((item): Criterio => ({
            id: item.id,
            codigo:
                item.clave_uga ??
                item.claveUga ??
                item.codigo ??
                '',
            descripcion: strapiTextToBlocks(
                item.lineamiento ??
                    item.descripcion ??
                    item.descripcion_sumaria
            ),
            categoria: LINEAMIENTO_ECOLOGICO,
            tipo: 'lineamiento',
        }))
        .filter((item: Criterio) => Boolean(item.codigo))
        .sort((a: Criterio, b: Criterio) =>
            collator.compare(a.codigo, b.codigo)
        );
}

async function CriteriosContent() {
    const [criterios, lineamientos] =
        await Promise.all([
            getCriterios(),
            getLineamientosEcologicos(),
        ]);

    const rows = [
        ...criterios,
        ...lineamientos,
    ].sort((a, b) =>
        collator.compare(a.codigo, b.codigo)
    );

    return (
        <CriteriosExplorer
            initialData={rows}
        />
    );
}

export default function CriteriosPage() {
    return (
        <>
            <Toolbar variant="dense" />

            <Container sx={{ my: 3 }}>
                <Suspense
                    fallback={
                        <Box
                            display="flex"
                            justifyContent="center"
                            py={5}
                        >
                            <CircularProgress />
                        </Box>
                    }
                >
                    <CriteriosContent />
                </Suspense>
            </Container>
        </>
    );
}
