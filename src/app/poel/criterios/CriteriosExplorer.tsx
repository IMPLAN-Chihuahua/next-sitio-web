'use client';

import { useDeferredValue, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Box, Button, Chip, InputAdornment, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import CriterioMobileCard from './CriterioMobileCard';
import CriterioRow from './CriterioRow';
import PoelInfo from './PoelInfo';
import { Criterio, IndexedCriterio } from './types';
import { blocksToPlainText, codeVariantsEqualSearch, codeVariantsMatchSearch, getCodeSearchVariants, normalizeSearchText } from './utils';

interface Props {
    initialData: Criterio[];
}

export default function CriteriosExplorer({ initialData }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const codigosURL = useMemo(() => {
        const codigos = [searchParams.get('codigos'), searchParams.get('clave_uga')].filter(Boolean).join(',');
        if (!codigos) return [];
        return [...new Set(codigos.split(',').map((codigo) => codigo.trim().toUpperCase()).filter(Boolean))];
    }, [searchParams]);

    const [busqueda, setBusqueda] = useState('');
    const busquedaDiferida = useDeferredValue(busqueda);
    const [categoria, setCategoria] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);

    const indexedData = useMemo(
        (): IndexedCriterio[] =>
            initialData.map((criterio) => {
                const textoPlano = blocksToPlainText(criterio.descripcion);

                return {
                    criterio,
                    textoPlano,
                    textoBusqueda: normalizeSearchText(textoPlano),
                    categoriaBusqueda: normalizeSearchText(criterio.categoria?.nombre ?? ''),
                    codigoBusqueda: getCodeSearchVariants(criterio.codigo),
                };
            }),
        [initialData]
    );

    const categorias = useMemo(() => {
        const nombres = new Set(indexedData.map(({ criterio }) => criterio.categoria?.nombre).filter((nombre): nombre is string => Boolean(nombre)));
        return Array.from(nombres).sort();
    }, [indexedData]);

    function quitarCodigo(codigo: string) {
        const restantes = codigosURL.filter((c) => c !== codigo);
        const params = new URLSearchParams(searchParams.toString());

        if (restantes.length > 0) {
            params.set('codigos', restantes.join(','));
            params.delete('clave_uga');
        } else {
            params.delete('codigos');
            params.delete('clave_uga');
        }

        const query = params.toString();
        router.replace(query ? `${pathname}?${query}` : pathname);
        setPage(0);
    }

    function quitarTodosLosCodigos() {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('codigos');
        params.delete('clave_uga');

        const query = params.toString();
        router.replace(query ? `${pathname}?${query}` : pathname);
        setPage(0);
    }

    const resultado = useMemo(() => {
        let items = indexedData;

        if (codigosURL.length > 0) {
            const codigoVariants = codigosURL.map(getCodeSearchVariants);
            items = items.filter((item) => codigoVariants.some((variants) => codeVariantsEqualSearch(item.codigoBusqueda, variants)));
        }

        if (categoria) items = items.filter(({ criterio }) => criterio.categoria?.nombre === categoria);

        if (busquedaDiferida.trim()) {
            const q = normalizeSearchText(busquedaDiferida);
            const qCodigo = getCodeSearchVariants(q);
            items = items.filter((item) => codeVariantsMatchSearch(item.codigoBusqueda, qCodigo) || item.textoBusqueda.includes(q) || item.categoriaBusqueda.includes(q));
        }

        return items;
    }, [indexedData, codigosURL, categoria, busquedaDiferida]);

    const paginados = useMemo(() => resultado.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [resultado, page, rowsPerPage]);

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
                Criterios de Regulación Ecológica
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Busque y consulte las normas ambientales aplicables en el municipio.
            </Typography>

            <PoelInfo />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
                <TextField
                    fullWidth
                    placeholder="Buscar por código o palabra clave..."
                    value={busqueda}
                    onChange={(e) => {
                        setBusqueda(e.target.value);
                        setPage(0);
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        },
                        htmlInput: { 'aria-label': 'Buscar criterios por código o palabra clave' },
                    }}
                />

                <Select value={categoria} displayEmpty inputProps={{ 'aria-label': 'Filtrar criterios por categoría' }} onChange={(e) => { setCategoria(e.target.value); setPage(0); }} sx={{ width: { xs: '100%', sm: 250 }, flexShrink: 0 }}>
                    <MenuItem value="">Categoría: Todas</MenuItem>
                    {categorias.map((nombre) => (
                        <MenuItem key={nombre} value={nombre}>{nombre}</MenuItem>
                    ))}
                </Select>
            </Stack>

            {codigosURL.length > 0 && (
                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" sx={{ mb: 2, rowGap: 1 }}>
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>Filtros aplicados:</Typography>
                    {codigosURL.map((codigo) => (
                        <Chip key={codigo} label={codigo} onDelete={() => quitarCodigo(codigo)} size="small" sx={{ bgcolor: '#faf7cb' }} />
                    ))}
                    <Button size="small" color="inherit" onClick={quitarTodosLosCodigos} sx={{ textTransform: 'none', color: 'text.secondary' }}>Quitar todos</Button>
                </Stack>
            )}

            <Paper variant="outlined" sx={{ border: '1px solid #dfdfe1', overflow: 'hidden' }}>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' }, alignItems: 'center', minHeight: 48, bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', px: { xs: 0, sm: 1 } }}>
                    <TablePagination
                        component="div"
                        count={resultado.length}
                        page={page}
                        onPageChange={(_, newPage) => setPage(newPage)}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={(e) => {
                            setRowsPerPage(parseInt(e.target.value, 10));
                            setPage(0);
                        }}
                        rowsPerPageOptions={[10, 25, 50]}
                        labelRowsPerPage="Filas por página"
                        labelDisplayedRows={({ from, to, count }) => `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`}
                        sx={{
                            border: 0,
                            '& .MuiTablePagination-toolbar': { minHeight: '48px', px: { xs: 1, sm: 2 } },
                            '& .MuiTablePagination-selectLabel': { m: 0, display: { xs: 'none', sm: 'block' } },
                            '& .MuiTablePagination-displayedRows': { m: 0 },
                        }}
                    />
                </Box>

                <Box sx={{ display: { xs: 'block', sm: 'none' }, p: 1.5 }}>
                    <Stack spacing={1.5}>
                        {paginados.map((item) => (
                            <CriterioMobileCard key={`${item.criterio.tipo}-${item.criterio.codigo}`} criterio={item.criterio} textoPlano={item.textoPlano} />
                        ))}

                        {paginados.length === 0 && (
                            <Box sx={{ py: 5, px: 2, textAlign: 'center' }}>
                                <Typography variant="body2" color="text.secondary">No se encontraron criterios con esos parámetros de búsqueda.</Typography>
                            </Box>
                        )}
                    </Stack>
                </Box>

                <TableContainer sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Table size="medium">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Código</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Categoría</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold', width: '80px' }}>Detalle</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {paginados.map((item) => (
                                <CriterioRow key={`${item.criterio.tipo}-${item.criterio.codigo}`} criterio={item.criterio} textoPlano={item.textoPlano} />
                            ))}

                            {paginados.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                                        <Typography variant="body1" color="text.secondary">No se encontraron criterios con esos parámetros de búsqueda.</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}
