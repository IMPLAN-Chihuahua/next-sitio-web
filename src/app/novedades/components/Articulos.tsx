'use client'

import React, { useState, ChangeEvent, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Stack,
    Pagination,
    Grid,
    Chip,
    Typography,
    Alert,
    Paper,
    CardActionArea,
    Button
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Link from 'next/link';
import useSWR from 'swr';
import qs from 'qs';
import { cmsFetcher } from '@/app/services/http';
import { Novedad } from '../definitions';
import { motion, AnimatePresence } from 'framer-motion';
import { ClasificacionSpan } from '@/app/estudios-y-propuestas/components/Tile';
import { parse } from 'date-fns';
import { Masonry } from '@mui/lab';
import CardTiles from '@/app/components/CardTiles';
import { Overlay } from '@/app/components/LandingPageBanner';
import Image from 'next/image';
import { Star, StarBorderOutlined } from '@mui/icons-material';



const getImageUrl = (entry: Novedad) => {
    const url = entry?.cover?.url;
    return url ? `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${url}` : '';
};

const dateFormatOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('es-MX', dateFormatOptions);
};

export default function Articulos() {
    const [page, setPage] = useState(1);

    const queryParams = qs.stringify({
        sort: ['destacado:desc', 'fechaPublicacion:desc'],
        pagination: {
            page: page,
            pageSize: 6,
        },
        populate: '*'
    }, { encodeValuesOnly: true });

    const { data, error, isLoading } = useSWR<{
        data: Novedad[],
        meta: { pagination: { pageCount: number, total: number } }
    }>(`/entries?${queryParams.toString()}`, cmsFetcher);

    const [novedades, setNovedades] = useState<Novedad[]>([]);

    useEffect(() => {
        if (!data?.data) return;
        setNovedades(pre => {
            const existing = new Set(pre.map(n => n.id));
            const newItems = data.data.filter(
                item => !existing.has(item.id)
            );

            return [...pre, ...newItems]
        });
    }, [data?.data]);

    const handlePageChange = (_: ChangeEvent<unknown>) => {
        setPage(pre => pre + 1);
    };

    if (error) {
        return <Alert severity="error">Hubo un error al obtener las publicaciones</Alert>;
    }

    return (
        <Box>
            <NovedadesMasonry novedades={novedades} />

            {data?.meta && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: 1 }}>
                    <Button
                        onClick={handlePageChange}
                        variant='outlined'
                        sx={{ borderRadius: 5 }}
                        disabled={isLoading || novedades.length === data.meta.pagination.total}
                    >
                        {
                            isLoading ? 'Cargando' : 'Cargar más'
                        }
                    </Button>
                    <Typography textAlign={'center'}>{novedades.length} de {data.meta.pagination.total}</Typography>
                </Box>
            )}
        </Box>
    );
}



const NovedadesMasonry = (props: { novedades: Novedad[] }) => {
    const heights = [
        280, 420, 290, 420, 240,
        490, 310, 250, 385, 275,
        460, 200,
    ];

    return (
        <Masonry
            sequential
            columns={{ xs: 1, md: 3 }}
            spacing={2}
            defaultHeight={400}
            defaultColumns={3}
            defaultSpacing={2}
            sx={{
                mx: 'auto',
                minHeight: '600px'
            }}
        >
            {
                props.novedades.map((novedad, idx) => (
                    <motion.div
                        key={novedad.documentId}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Card
                            variant='outlined'
                            sx={{
                                height: heights[idx % heights.length],
                                borderColor: 'divider',
                                borderRadius: 5,
                                borderStyle: 'solid',
                                transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                                position: 'relative',
                                ":hover": {
                                    transform: 'translateY(-2px)',
                                    borderColor: 'secondary.main',
                                    boxShadow: '0 6px 10px rgba(255, 0, 0, 0.06)',
                                }
                            }}
                        >
                            <CardActionArea
                                LinkComponent={Link}
                                href={`/novedades/${novedad.slug}`}
                                aria-description={novedad.description}
                            >
                                {
                                    novedad.cover ? (
                                        <CardMedia
                                            component={'img'}
                                            height={heights[idx % heights.length]}
                                            image={getImageUrl(novedad)}
                                            alt=''
                                            role='presentation'
                                        />
                                    ) : (
                                        <Box
                                            sx={{
                                                height: heights[idx % heights.length],
                                                flex: 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                bgcolor: 'primary.900'
                                            }}
                                        >
                                            <Image
                                                src='/implan.svg'
                                                width={80}
                                                height={50}
                                                alt=''
                                                style={{
                                                    objectFit: 'contain',
                                                    filter: 'brightness(0) invert(1)'
                                                }}
                                            />
                                        </Box>
                                    )
                                }

                                {novedad.destacado && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 12,
                                            left: 12,
                                            zIndex: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            borderRadius: 999,
                                            p: '6px',
                                            bgcolor: '#fff',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                borderColor: '#fbc02d',
                                            },
                                            '&:hover .CardTiles-featuredText': {
                                                maxWidth: 80,
                                                opacity: 1,
                                                pl: 0.5,
                                                pr: 1,
                                            },
                                            '&:hover .CardTiles-featuredIcon': {
                                                color: '#fbc02d',
                                            },
                                        }}
                                    >
                                        <StarBorderOutlined
                                            className="CardTiles-featuredIcon"
                                            sx={{ color: '#999', transition: 'color 0.3s' }}
                                        />
                                        <Typography
                                            className="CardTiles-featuredText"
                                            variant="caption"
                                            sx={{
                                                maxWidth: 0,
                                                overflow: 'hidden',
                                                color: '#555',
                                                fontWeight: 500,
                                                whiteSpace: 'nowrap',
                                                opacity: 0,
                                                transition: 'all 0.3s ease-in-out',
                                            }}
                                        >
                                            Destacada
                                        </Typography>
                                    </Box>
                                )}
                                <Box
                                    position={'absolute'}
                                    sx={{
                                        background: 'linear-gradient(0deg,rgba(20, 20, 20, 1) 0%, rgba(77, 77, 77, 0.25) 90%)'
                                    }}
                                    top={0}
                                    bottom={0}
                                    right={0}
                                    left={0}
                                />
                                <Box
                                    position={'absolute'}
                                    zIndex={100}
                                    bottom={15}
                                    left={10}
                                    right={10}
                                    color='primary.50'
                                    sx={{
                                        textShadow: '1px 1px 2px black'
                                    }}
                                >
                                    <Typography
                                        fontWeight={600}
                                        color='inherit'
                                        sx={{
                                            textShadow: 'inherit'
                                        }}
                                    >{novedad.title}</Typography>
                                    <Typography
                                        variant='caption'
                                        color='inherit'
                                        sx={{
                                            textShadow: 'inherit'
                                        }}
                                    >
                                        {
                                            (novedad.autor &&
                                                novedad.autor.length > 0)
                                                ? ` ${novedad.autor[0]?.nombres} ${novedad.autor[0]?.apellidos}`
                                                : 'IMPLAN'}
                                        {' • '}
                                        {
                                            novedad.fechaPublicacion
                                            && parse(
                                                novedad.fechaPublicacion,
                                                'yyyy-MM-dd',
                                                new Date()
                                            ).toLocaleDateString('es-MX')
                                        }
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        color='inherit'

                                        sx={{
                                            display: '-webkit-box',
                                            textShadow: 'inherit',
                                            overflow: 'hidden',
                                            wordBreak: 'break-word',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 2,
                                        }}
                                    >{novedad.description}</Typography>
                                </Box>
                            </CardActionArea>

                        </Card>
                    </motion.div>
                ))
            }
        </Masonry>
    )
}