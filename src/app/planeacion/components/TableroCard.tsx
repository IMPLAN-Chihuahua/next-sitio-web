import {
    Box,
    Link,
    Typography,
} from '@mui/material';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { Tablero } from '../definitions';


interface Props {
    tablero: Tablero;
}


const categorias: Record<string, string> = {
    'revision-opinion': 'REVISIÓN Y OPINIÓN',
    'indicadores': 'INDICADORES',
    'calculadora': 'CALCULADORA',
    'consulta': 'CONSULTA',
    'seguimiento': 'SEGUIMIENTO',
};


export default function TableroCard({
    tablero,
}: Props) {
    const isActive = !tablero.enDesarrollo;

    const categoria =
        categorias[tablero.categoria] ??
        tablero.categoria.toUpperCase();

    return (
        <Box
            sx={{
                position: 'relative',

                display: 'flex',
                flexDirection: 'column',

                height: '100%',
                minHeight: 215,

                p: 3,

                borderRadius: 1,

                border: '1px solid',

                borderColor: isActive
                    ? 'divider'
                    : '#D9DDE3',

                borderStyle: isActive
                    ? 'solid'
                    : 'dashed',

                bgcolor: isActive
                    ? '#fff'
                    : '#fafafa',

                transition: 'all 0.2s ease',

                ...(isActive && {
                    '&:hover': {
                        transform: 'translateY(-2px)',

                        borderColor: 'secondary.main',

                        boxShadow:
                            '0 6px 20px rgba(0,0,0,0.06)',
                    },
                }),

                '&::before': isActive
                    ? {
                        content: '""',

                        position: 'absolute',

                        top: -1,
                        left: -1,
                        right: -1,

                        height: 5,

                        borderTopLeftRadius: 4,
                        borderTopRightRadius: 4,

                        bgcolor: 'secondary.main',
                    }
                    : undefined,
            }}
        >
            {/* CATEGORÍA */}
            <Typography
                sx={{
                    fontSize: '0.75rem',
                    fontWeight: 700,

                    letterSpacing: '0.08em',

                    color: isActive
                        ? 'text.secondary'
                        : 'text.disabled',

                    mb: 2,
                }}
            >
                {categoria}
            </Typography>


            {/* TÍTULO */}
            <Typography
                component="h3"
                sx={{
                    fontSize: '1.2rem',
                    lineHeight: 1.3,

                    fontWeight: 700,

                    color: isActive
                        ? 'text.primary'
                        : 'text.disabled',

                    mb: 1,
                }}
            >
                {tablero.titulo}
            </Typography>


            {/* DESCRIPCIÓN */}
            <Typography
                sx={{
                    color: isActive
                        ? 'text.secondary'
                        : 'text.disabled',

                    lineHeight: 1.55,

                    mb: 3,
                }}
            >
                {tablero.descripcion}
            </Typography>


            {/* LINK */}
            {isActive && tablero.url && (
                <Box
                    sx={{
                        mt: 'auto',
                    }}
                >
                    <Link
                        href={tablero.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="none"

                        sx={{
                            display: 'inline-flex',

                            alignItems: 'center',

                            gap: 0.7,

                            fontWeight: 600,

                            color: 'text.secondary',

                            '&:hover': {
                                color: 'secondary.main',
                                textDecoration: 'underline',
                            },
                        }}
                    >
                        Abrir tablero

                        <OpenInNewIcon
                            sx={{
                                fontSize: 17,
                            }}
                        />
                    </Link>
                </Box>
            )}
        </Box>
    );
}