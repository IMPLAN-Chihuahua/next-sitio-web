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

export const metadata: Metadata = {
    title: 'Criterios ecológicos',
};

async function getCriterios(): Promise<Criterio[]> {
    const url =
        `${process.env.NEXT_PUBLIC_IMPLAN_CMS}` +
        `/criterio-ecologicos` +
        `?populate=categoria_poel` +
        `&pagination[pageSize]=300` +
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
    const collator = new Intl.Collator('es', {
        numeric: true,
        sensitivity: 'base',
    });

    return (json.data ?? [])
        .map((item: any) => ({
            id: item.id,
            codigo: item.codigo,
            descripcion: item.descripcion ?? [],
            categoria: item.categoria_poel ?? null,
        }))
        .sort((a: Criterio, b: Criterio) =>
            collator.compare(a.codigo, b.codigo)
        );
}

async function CriteriosContent() {
    const criterios = await getCriterios();

    return (
        <CriteriosExplorer
            initialData={criterios}
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