'use client';

import React, {
    useDeferredValue,
    useMemo,
    useState,
} from 'react';
import {
    useRouter,
    usePathname,
    useSearchParams,
} from 'next/navigation';
import { motion } from 'framer-motion';

import {
    Box,
    Stack,
    TextField,
    InputAdornment,
    Select,
    MenuItem,
    Chip,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    TablePagination,
    Paper,
    IconButton,
    Collapse,
    Button,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { getContrastRatio } from '@mui/material/styles';

import { Criterio } from './types';
import { blocksToPlainText } from './utils';
import PoelInfo from './PoelInfo';

const MotionTableRow =
    motion.create(TableRow);
const MotionBox =
    motion.create(Box);


function hashString(value: string): number {
    let hash = 0;

    for (let i = 0; i < value.length; i++) {
        hash =
            value.charCodeAt(i) +
            ((hash << 5) - hash);
    }

    return Math.abs(hash);
}


function getCategoryColors(category: string) {
    const hash = hashString(category);

    const hue = hash % 360;

    const saturation =
        60 + ((hash >> 8) % 10);

    const lightness =
        68 + ((hash >> 16) % 8);

    const backgroundColor =
        `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    const darkText = '#202022';
    const lightText = '#ffffff';

    const darkContrast =
        getContrastRatio(
            backgroundColor,
            darkText
        );

    const lightContrast =
        getContrastRatio(
            backgroundColor,
            lightText
        );

    return {
        backgroundColor,

        color:
            darkContrast >= lightContrast
                ? darkText
                : lightText,
    };
}


function normalizeSearchText(value: string): string {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim();
}


function normalizeSearchCode(value: string): string {
    return normalizeSearchText(value)
        .replace(/[^a-z0-9]/g, '');
}


function getCodeSearchVariants(
    value: string
): string[] {
    const base =
        normalizeSearchCode(value);

    const variants = new Set([
        base,
        base.replaceAll(
            'chih',
            'chh'
        ),
        base.replaceAll(
            'chh',
            'chih'
        ),
    ]);

    for (const variant of [
        ...variants,
    ]) {
        if (
            variant.startsWith(
                'uga'
            )
        ) {
            variants.add(
                variant.slice(3)
            );
        }
    }

    return [...variants].filter(
        Boolean
    );
}


function codeVariantsMatchSearch(
    codeVariants: string[],
    queryVariants: string[]
): boolean {
    return queryVariants.some(
        (queryVariant) =>
            codeVariants.some(
                (codeVariant) =>
                    codeVariant.includes(
                        queryVariant
                    )
            )
    );
}


function codeVariantsEqualSearch(
    codeVariants: string[],
    queryVariants: string[]
): boolean {
    return queryVariants.some(
        (queryVariant) =>
            codeVariants.includes(
                queryVariant
            )
    );
}


interface IndexedCriterio {
    criterio: Criterio;
    textoPlano: string;
    textoBusqueda: string;
    categoriaBusqueda: string;
    codigoBusqueda: string[];
}


function CriterioRow({
    criterio,
    textoPlano,
}: {
    criterio: Criterio;
    textoPlano: string;
}) {
    const [open, setOpen] =
        useState(false);

    return (
        <React.Fragment>
            <MotionTableRow
                hover
                initial={{
                    opacity: 0,
                    y: 3,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.12,
                    ease: 'easeOut',
                }}
                onClick={() =>
                    setOpen(!open)
                }
                sx={{
                    cursor: 'pointer',

                    '& > *': {
                        borderBottom:
                            'unset',
                    },

                    bgcolor: open
                        ? '#f4f4f7'
                        : 'inherit',

                    transition:
                        'background-color 0.2s ease',
                }}
            >
                {/* Código */}
                <TableCell
                    sx={{
                        whiteSpace: 'nowrap',
                    }}
                >
                    <Chip
                        label={
                            criterio.codigo
                        }
                        size="small"
                        sx={{
                            bgcolor:
                                '#202022',

                            color:
                                '#faf7cb',

                            fontWeight:
                                700,
                        }}
                    />
                </TableCell>

                {/* Categoría */}
                <TableCell>
                    {criterio.categoria
                        ?.nombre ? (
                        <Chip
                            label={
                                criterio
                                    .categoria
                                    .nombre
                            }
                            size="small"
                            sx={{
                                ...getCategoryColors(
                                    criterio
                                        .categoria
                                        .nombre
                                ),

                                fontWeight:
                                    500,
                            }}
                        />
                    ) : (
                        '—'
                    )}
                </TableCell>

                {/* Descripción */}
                <TableCell>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            display:
                                '-webkit-box',

                            WebkitLineClamp:
                                2,

                            WebkitBoxOrient:
                                'vertical',

                            overflow:
                                'hidden',
                        }}
                    >
                        {textoPlano}
                    </Typography>
                </TableCell>

                {/* Botón detalle */}
                <TableCell align="right">
                    <IconButton
                        aria-label={
                            open
                                ? `Contraer detalle del criterio ${criterio.codigo}`
                                : `Expandir detalle del criterio ${criterio.codigo}`
                        }
                        aria-expanded={
                            open
                        }
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();

                            setOpen(
                                !open
                            );
                        }}
                        sx={{
                            color: open
                                ? '#e3a74d'
                                : '#9d9d9f',
                        }}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
            </MotionTableRow>

            {/* Detalle expandido */}
            <TableRow>
                <TableCell
                    colSpan={4}
                    sx={{
                        paddingBottom: 0,
                        paddingTop: 0,
                    }}
                >
                    <Collapse
                        in={open}
                        timeout="auto"
                        unmountOnExit
                    >
                        <Box
                            sx={{
                                m: 2,
                                p: 3,

                                bgcolor:
                                    '#fdfcea',

                                borderRadius:
                                    2,

                                border:
                                    '1px solid #f7f1aa',
                            }}
                        >
                            <Typography
                                variant="subtitle2"
                                component="p"
                                gutterBottom
                                fontWeight={
                                    700
                                }
                                color="secondary.900"
                            >
                                Descripción
                                Completa
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.primary"
                                sx={{
                                    whiteSpace:
                                        'pre-wrap',
                                }}
                            >
                                {
                                    textoPlano
                                }
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


function CriterioMobileCard({
    criterio,
    textoPlano,
}: {
    criterio: Criterio;
    textoPlano: string;
}) {
    const [open, setOpen] =
        useState(false);

    return (
        <MotionBox
            initial={{
                opacity: 0,
                y: 4,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.12,
                ease: 'easeOut',
            }}
        >
            <Paper
                variant="outlined"
                sx={{
                    p: 2,
                    borderColor: open
                        ? '#f0d86d'
                        : '#dfdfe1',
                    bgcolor: open
                        ? '#fffef3'
                        : 'background.paper',
                    transition:
                        'background-color 0.2s ease, border-color 0.2s ease',
                }}
            >
                <Stack
                    direction="row"
                    spacing={1.25}
                    alignItems="flex-start"
                    justifyContent="space-between"
                >
                    <Stack
                        spacing={1}
                        sx={{
                            minWidth: 0,
                        }}
                    >
                        <Chip
                            label={
                                criterio.codigo
                            }
                            size="small"
                            sx={{
                                alignSelf:
                                    'flex-start',
                                bgcolor:
                                    '#202022',
                                color:
                                    '#faf7cb',
                                fontWeight:
                                    700,
                            }}
                        />

                        {criterio.categoria
                            ?.nombre ? (
                            <Chip
                                label={
                                    criterio
                                        .categoria
                                        .nombre
                                }
                                size="small"
                                sx={{
                                    alignSelf:
                                        'flex-start',
                                    maxWidth:
                                        '100%',
                                    ...getCategoryColors(
                                        criterio
                                            .categoria
                                            .nombre
                                    ),
                                    fontWeight:
                                        500,
                                }}
                            />
                        ) : null}
                    </Stack>

                    <IconButton
                        aria-label={
                            open
                                ? `Contraer detalle del criterio ${criterio.codigo}`
                                : `Expandir detalle del criterio ${criterio.codigo}`
                        }
                        aria-expanded={open}
                        size="small"
                        onClick={() =>
                            setOpen(
                                !open
                            )
                        }
                        sx={{
                            flexShrink: 0,
                            color: open
                                ? '#e3a74d'
                                : '#9d9d9f',
                        }}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </Stack>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    onClick={() =>
                        setOpen(!open)
                    }
                    sx={{
                        mt: 1.5,
                        display:
                            '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient:
                            'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.65,
                        cursor: 'pointer',
                    }}
                >
                    {textoPlano}
                </Typography>

                <Button
                    size="small"
                    color="inherit"
                    onClick={() =>
                        setOpen(!open)
                    }
                    sx={{
                        mt: 1,
                        px: 0,
                        minWidth: 0,
                        color: open
                            ? '#c78222'
                            : 'text.secondary',
                        textTransform:
                            'none',
                        fontWeight: 700,
                    }}
                >
                    {open
                        ? 'Ocultar detalle'
                        : 'Ver detalle'}
                </Button>

                <Collapse
                    in={open}
                    timeout="auto"
                    unmountOnExit
                >
                    <Box
                        sx={{
                            mt: 1.5,
                            p: 2,
                            bgcolor:
                                '#fdfcea',
                            borderRadius: 1,
                            border:
                                '1px solid #f7f1aa',
                        }}
                    >
                        <Typography
                            variant="body2"
                            color="text.primary"
                            sx={{
                                whiteSpace:
                                    'pre-wrap',
                                lineHeight: 1.7,
                            }}
                        >
                            {textoPlano}
                        </Typography>
                    </Box>
                </Collapse>
            </Paper>
        </MotionBox>
    );
}


interface Props {
    initialData: Criterio[];
}


export default function CriteriosExplorer({
    initialData,
}: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams =
        useSearchParams();

    /*
     * Códigos recibidos desde la URL
     *
     * ?codigos=AF1,AF2,AF3
     * ?clave_uga=UGA-CHH-101
     */
    const codigosURL = useMemo(() => {
        const codigos = [
            searchParams.get(
                'codigos'
            ),
            searchParams.get(
                'clave_uga'
            ),
        ]
            .filter(Boolean)
            .join(',');

        if (!codigos) {
            return [];
        }

        return [
            ...new Set(
                codigos
                    .split(',')
                    .map((codigo) =>
                        codigo
                            .trim()
                            .toUpperCase()
                    )
                    .filter(Boolean)
            ),
        ];
    }, [searchParams]);

    /*
     * Estado de filtros y paginación
     */
    const [busqueda, setBusqueda] =
        useState('');
    const busquedaDiferida =
        useDeferredValue(busqueda);

    const [categoria, setCategoria] =
        useState('');

    const [page, setPage] =
        useState(0);

    const [
        rowsPerPage,
        setRowsPerPage,
    ] = useState(25);

    const indexedData = useMemo(
        (): IndexedCriterio[] =>
            initialData.map((criterio) => {
                const textoPlano =
                    blocksToPlainText(
                        criterio.descripcion
                    );

                return {
                    criterio,
                    textoPlano,
                    textoBusqueda:
                        normalizeSearchText(
                            textoPlano
                        ),
                    categoriaBusqueda:
                        normalizeSearchText(
                            criterio.categoria
                                ?.nombre ??
                            ''
                        ),
                    codigoBusqueda:
                        getCodeSearchVariants(
                            criterio.codigo
                        ),
                };
            }),
        [initialData]
    );

    /*
     * Categorías disponibles
     */
    const categorias = useMemo(() => {
        const nombres = new Set(
            indexedData
                .map(
                    ({ criterio }) =>
                        criterio.categoria
                            ?.nombre
                )
                .filter(
                    (
                        nombre
                    ): nombre is string =>
                        Boolean(nombre)
                )
        );

        return Array.from(
            nombres
        ).sort();
    }, [indexedData]);


    function quitarCodigo(
        codigo: string
    ) {
        const restantes =
            codigosURL.filter(
                (c) => c !== codigo
            );

        const params =
            new URLSearchParams(
                searchParams.toString()
            );

        if (
            restantes.length > 0
        ) {
            params.set(
                'codigos',
                restantes.join(',')
            );
            params.delete(
                'clave_uga'
            );
        } else {
            params.delete(
                'codigos'
            );
            params.delete(
                'clave_uga'
            );
        }

        const query =
            params.toString();

        router.replace(
            query
                ? `${pathname}?${query}`
                : pathname
        );

        setPage(0);
    }


    function quitarTodosLosCodigos() {
        const params =
            new URLSearchParams(
                searchParams.toString()
            );

        params.delete('codigos');
        params.delete('clave_uga');

        const query =
            params.toString();

        router.replace(
            query
                ? `${pathname}?${query}`
                : pathname
        );

        setPage(0);
    }


    /*
     * Resultado después de aplicar
     * todos los filtros
     */
    const resultado = useMemo(() => {
        let items = indexedData;

        /*
         * Filtro desde URL
         */
        if (
            codigosURL.length > 0
        ) {
            const codigoVariants =
                codigosURL.map(
                    getCodeSearchVariants
            );

            items = items.filter(
                (item) =>
                    codigoVariants.some(
                        (variants) =>
                            codeVariantsEqualSearch(
                                item.codigoBusqueda,
                                variants
                            )
                    )
            );
        }

        /*
         * Filtro categoría
         */
        if (categoria) {
            items = items.filter(
                ({ criterio }) =>
                    criterio.categoria
                        ?.nombre ===
                    categoria
            );
        }

        /*
         * Búsqueda
         */
        if (busquedaDiferida.trim()) {
            const q =
                normalizeSearchText(
                    busquedaDiferida
                );
            const qCodigo =
                getCodeSearchVariants(q);

            items = items.filter(
                (item) =>
                    codeVariantsMatchSearch(
                        item.codigoBusqueda,
                        qCodigo
                    ) ||
                    item.textoBusqueda.includes(
                        q
                    ) ||
                    item.categoriaBusqueda.includes(
                        q
                    )
            );
        }

        return items;
    }, [
        indexedData,
        codigosURL,
        categoria,
        busquedaDiferida,
    ]);


    /*
     * Registros de la página actual
     */
    const paginados = useMemo(
        () =>
            resultado.slice(
                page *
                rowsPerPage,

                page *
                rowsPerPage +
                rowsPerPage
            ),
        [
            resultado,
            page,
            rowsPerPage,
        ]
    );


    return (
        <Box
            sx={{
                p: {
                    xs: 2,
                    md: 4,
                },
            }}
        >
            {/* Título */}
            <Typography
                variant="h4"
                component="h1"
                fontWeight={700}
                gutterBottom
            >
                Criterios de
                Regulación Ecológica
            </Typography>

            <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                    mb: 3,
                }}
            >
                Busque y consulte las
                normas ambientales
                aplicables en el
                municipio.
            </Typography>


            {/* Información POEL */}
            <PoelInfo />


            {/* Buscador y categoría */}
            <Stack
                direction={{
                    xs: 'column',
                    sm: 'row',
                }}
                spacing={2}
                sx={{
                    mb: 2,
                }}
            >
                <TextField
                    fullWidth
                    placeholder="Buscar por código o palabra clave..."
                    value={busqueda}
                    onChange={(e) => {
                        setBusqueda(
                            e.target.value
                        );

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

                        htmlInput: {
                            'aria-label':
                                'Buscar criterios por código o palabra clave',
                        },
                    }}
                />

                <Select
                    value={categoria}
                    displayEmpty
                    inputProps={{
                        'aria-label':
                            'Filtrar criterios por categoría',
                    }}
                    onChange={(e) => {
                        setCategoria(
                            e.target
                                .value
                        );

                        setPage(0);
                    }}
                    sx={{
                        width: {
                            xs: '100%',
                            sm: 250,
                        },

                        flexShrink: 0,
                    }}
                >
                    <MenuItem value="">
                        Categoría:
                        Todas
                    </MenuItem>

                    {categorias.map(
                        (nombre) => (
                            <MenuItem
                                key={
                                    nombre
                                }
                                value={
                                    nombre
                                }
                            >
                                {
                                    nombre
                                }
                            </MenuItem>
                        )
                    )}
                </Select>
            </Stack>


            {/* Filtros recibidos por URL */}
            {codigosURL.length >
                0 && (
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        flexWrap="wrap"
                        sx={{
                            mb: 2,
                            rowGap: 1,
                        }}
                    >
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            fontWeight={600}
                        >
                            Filtros
                            aplicados:
                        </Typography>

                        {codigosURL.map(
                            (codigo) => (
                                <Chip
                                    key={
                                        codigo
                                    }
                                    label={
                                        codigo
                                    }
                                    onDelete={() =>
                                        quitarCodigo(
                                            codigo
                                        )
                                    }
                                    size="small"
                                    sx={{
                                        bgcolor:
                                            '#faf7cb',
                                    }}
                                />
                            )
                        )}

                        <Button
                            size="small"
                            color="inherit"
                            onClick={
                                quitarTodosLosCodigos
                            }
                            sx={{
                                textTransform:
                                    'none',

                                color:
                                    'text.secondary',
                            }}
                        >
                            Quitar todos
                        </Button>
                    </Stack>
                )}


            {/*
             * =====================================================
             * TABLA
             *
             * Ahora Paper contiene:
             *
             * 1. La paginación ARRIBA
             * 2. La tabla
             *
             * Ya NO existe TablePagination al final.
             * =====================================================
             */}
            <Paper
                variant="outlined"
                sx={{
                    border:
                        '1px solid #dfdfe1',

                    overflow:
                        'hidden',
                }}
            >
                {/*
                 * PAGINACIÓN SUPERIOR
                 */}
                <Box
                    sx={{
                        display: 'flex',

                        justifyContent:
                            {
                                xs: 'center',
                                sm: 'flex-end',
                            },

                        alignItems:
                            'center',

                        minHeight: 48,

                        bgcolor:
                            'background.paper',

                        borderBottom:
                            '1px solid',

                        borderColor:
                            'divider',

                        px: {
                            xs: 0,
                            sm: 1,
                        },
                    }}
                >
                    <TablePagination
                        component="div"
                        count={
                            resultado.length
                        }
                        page={page}
                        onPageChange={(
                            _,
                            newPage
                        ) =>
                            setPage(
                                newPage
                            )
                        }
                        rowsPerPage={
                            rowsPerPage
                        }
                        onRowsPerPageChange={(
                            e
                        ) => {
                            setRowsPerPage(
                                parseInt(
                                    e.target
                                        .value,
                                    10
                                )
                            );

                            setPage(
                                0
                            );
                        }}
                        rowsPerPageOptions={[
                            10,
                            25,
                            50,
                        ]}
                        labelRowsPerPage="Filas por página"
                        labelDisplayedRows={({
                            from,
                            to,
                            count,
                        }) =>
                            `${from}–${to} de ${count !==
                                -1
                                ? count
                                : `más de ${to}`
                            }`
                        }
                        sx={{
                            border: 0,

                            /*
                             * Hace la barra un poco
                             * más compacta.
                             */
                            '& .MuiTablePagination-toolbar':
                            {
                                minHeight:
                                    '48px',
                                px: {
                                    xs: 1,
                                    sm: 2,
                                },
                            },

                            '& .MuiTablePagination-selectLabel':
                            {
                                m: 0,
                                display: {
                                    xs: 'none',
                                    sm: 'block',
                                },
                            },

                            '& .MuiTablePagination-displayedRows':
                            {
                                m: 0,
                            },
                        }}
                    />
                </Box>


                {/*
                 * TABLA
                 */}
                <Box
                    sx={{
                        display: {
                            xs: 'block',
                            sm: 'none',
                        },
                        p: 1.5,
                    }}
                >
                    <Stack spacing={1.5}>
                        {paginados.map(
                            (item) => (
                                <CriterioMobileCard
                                    key={
                                        `${item.criterio.tipo}-${item.criterio.codigo}`
                                    }
                                    criterio={
                                        item.criterio
                                    }
                                    textoPlano={
                                        item.textoPlano
                                    }
                                />
                            )
                        )}

                        {paginados.length ===
                            0 && (
                                <Box
                                    sx={{
                                        py: 5,
                                        px: 2,
                                        textAlign:
                                            'center',
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        No se
                                        encontraron
                                        criterios con
                                        esos parámetros
                                        de búsqueda.
                                    </Typography>
                                </Box>
                            )}
                    </Stack>
                </Box>

                <TableContainer
                    sx={{
                        display: {
                            xs: 'none',
                            sm: 'block',
                        },
                    }}
                >
                    <Table size="medium">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        fontWeight:
                                            'bold',
                                    }}
                                >
                                    Código
                                </TableCell>

                                <TableCell
                                    sx={{
                                        fontWeight:
                                            'bold',
                                    }}
                                >
                                    Categoría
                                </TableCell>

                                <TableCell
                                    sx={{
                                        fontWeight:
                                            'bold',
                                    }}
                                >
                                    Descripción
                                </TableCell>

                                <TableCell
                                    align="right"
                                    sx={{
                                        fontWeight:
                                            'bold',

                                        width:
                                            '80px',
                                    }}
                                >
                                    Detalle
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {paginados.map(
                                (item) => (
                                    <CriterioRow
                                        key={
                                            `${item.criterio.tipo}-${item.criterio.codigo}`
                                        }
                                        criterio={
                                            item.criterio
                                        }
                                        textoPlano={
                                            item.textoPlano
                                        }
                                    />
                                )
                            )}

                            {paginados.length ===
                                0 && (
                                    <MotionTableRow
                                        initial={{
                                            opacity: 0,
                                        }}
                                        animate={{
                                            opacity: 1,
                                        }}
                                        transition={{
                                            duration: 0.16,
                                        }}
                                    >
                                        <TableCell
                                            colSpan={
                                                4
                                            }
                                            align="center"
                                            sx={{
                                                py: 6,
                                            }}
                                        >
                                            <Typography
                                                variant="body1"
                                                color="text.secondary"
                                            >
                                                No se
                                                encontraron
                                                criterios
                                                con esos
                                                parámetros
                                                de
                                                búsqueda.
                                            </Typography>
                                        </TableCell>
                                    </MotionTableRow>
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}
