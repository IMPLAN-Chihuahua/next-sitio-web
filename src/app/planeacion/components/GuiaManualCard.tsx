import {
    Box,
    Chip,
    Link,
    Typography,
} from '@mui/material';

import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

import { GuiaManual } from '../definitions';


interface Props {
    guia: GuiaManual;
}


const categorias: Record<string, string> = {
    'diseno-urbano': 'DISEÑO URBANO',
    'equipamiento': 'EQUIPAMIENTO',
    'paisaje': 'PAISAJE',
    'bioclimatico': 'BIOCLIMÁTICO',
};


export default function GuiaManualCard({
    guia,
}: Props) {

    const isActive = !guia.enDesarrollo;

    /*
     * Si existe un documento subido a Strapi,
     * usamos ese primero.
     *
     * Si no, intentamos utilizar urlExterna.
     */
    const href = guia.documento
        ? `${process.env.NEXT_PUBLIC_IMPLAN_STATIC}${guia.documento.url}`
        : guia.urlExterna;

    /*
     * Convierte por ejemplo:
     * "diseno-urbano" -> "DISEÑO URBANO"
     *
     * Si llega una categoría nueva que todavía
     * no está en el objeto, mostramos el valor
     * que venga de Strapi.
     */
    const categoria =
        categorias[guia.categoria] ??
        guia.categoria.toUpperCase();


    return (
        <Box
            sx={{
                position: 'relative',

                display: 'flex',
                flexDirection: 'column',

                minHeight: 250,
                p: 3,

                border: '1px solid',
                borderStyle: isActive
                    ? 'solid'
                    : 'dashed',

                borderColor: 'divider',

                borderRadius: 2,

                bgcolor: isActive
                    ? '#fff'
                    : '#fafafa',

                transition: 'all 0.2s ease',

                ...(isActive && {
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        borderColor: 'secondary.main',
                        boxShadow:
                            '0 5px 18px rgba(0,0,0,0.06)',
                    },
                }),
            }}
        >
            {/* Estado */}
            {guia.enDesarrollo && (
                <Chip
                    label="EN DESARROLLO"
                    size="small"
                    variant="outlined"
                    sx={{
                        position: 'absolute',
                        top: 20,
                        right: 20,

                        height: 24,

                        borderColor: 'secondary.main',
                        color: 'secondary.main',

                        fontSize: '0.65rem',
                        fontWeight: 700,
                    }}
                />
            )}


            {/* Categoría */}
            <Box sx={{ mb: 2 }}>
                <Chip
                    label={categoria}
                    size="small"
                    sx={{
                        height: 24,

                        bgcolor: '#f3f3f5',
                        color: 'text.secondary',

                        fontSize: '0.65rem',
                        fontWeight: 600,

                        '& .MuiChip-label': {
                            px: 1.2,
                        },
                    }}
                />
            </Box>


            {/* Icono */}
            <Box
                sx={{
                    width: 38,
                    height: 38,

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    borderRadius: 1.5,

                    bgcolor: isActive
                        ? '#eef4ef'
                        : '#eeeeee',

                    color: isActive
                        ? 'primary.main'
                        : 'text.disabled',

                    mb: 2,
                }}
            >
                <MenuBookOutlinedIcon
                    sx={{
                        fontSize: 20,
                    }}
                />
            </Box>


            {/* Título */}
            <Typography
                component="h3"
                sx={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    lineHeight: 1.35,

                    color: isActive
                        ? 'text.primary'
                        : 'text.disabled',

                    mb: 1,
                }}
            >
                {guia.titulo}
            </Typography>


            {/* Descripción */}
            <Typography
                sx={{
                    fontSize: '0.85rem',
                    lineHeight: 1.6,

                    color: isActive
                        ? 'text.secondary'
                        : 'text.disabled',

                    mb: 3,
                }}
            >
                {guia.descripcion}
            </Typography>


            {/* Descarga / URL externa */}
            {isActive && href && (
                <Box sx={{ mt: 'auto' }}>
                    <Link
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 0.7,

                            fontSize: '0.8rem',
                            fontWeight: 600,

                            color: 'primary.main',

                            '&:hover': {
                                color: 'secondary.main',
                            },
                        }}
                    >
                        {guia.documento
                            ? 'Descargar guía'
                            : 'Abrir guía'}

                        <ArrowForwardIosRoundedIcon
                            sx={{
                                fontSize: 12,
                            }}
                        />
                    </Link>
                </Box>
            )}
        </Box>
    );
}